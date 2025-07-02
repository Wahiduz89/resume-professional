// app/api/upload/profile-image/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, file.name, user.id)

    // Store image info in database (optional - for tracking)
    try {
      await prisma.userImage.create({
        data: {
          userId: user.id,
          publicId: uploadResult.public_id,
          secureUrl: uploadResult.secure_url,
          format: uploadResult.format,
          bytes: uploadResult.bytes
        }
      })
    } catch (dbError) {
      // If UserImage model doesn't exist or fails, continue without storing
      console.log('UserImage model not found or failed, skipping database storage:', dbError)
    }

    return NextResponse.json({ 
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      message: 'Image uploaded successfully' 
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return NextResponse.json(
      { error: 'Image upload failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const publicId = searchParams.get('publicId')

    if (!publicId) {
      return NextResponse.json({ error: 'Public ID required' }, { status: 400 })
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(publicId)

    // Delete from database if UserImage model exists
    try {
      await prisma.userImage.deleteMany({
        where: { publicId }
      })
    } catch (dbError) {
      console.log('UserImage model not found, skipping database deletion:', dbError)
    }

    return NextResponse.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error('Image deletion error:', error)
    return NextResponse.json(
      { error: 'Image deletion failed' },
      { status: 500 }
    )
  }
}