// app/api/upload/guest-image/route.ts - Guest image upload API
import { NextRequest, NextResponse } from 'next/server'
import { uploadGuestImage } from '@/lib/cloudinary-guest'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const sessionId = formData.get('sessionId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Generate session ID if not provided
    const finalSessionId = sessionId || nanoid()

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

    // Upload to Cloudinary as guest image
    const uploadResult = await uploadGuestImage(buffer, file.name, finalSessionId)

    return NextResponse.json({ 
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      guestToken: uploadResult.guestToken,
      sessionId: finalSessionId,
      message: 'Guest image uploaded successfully',
      temporary: true
    })
  } catch (error) {
    console.error('Guest image upload error:', error)
    return NextResponse.json(
      { error: 'Image upload failed' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const publicId = searchParams.get('publicId')

    if (!publicId) {
      return NextResponse.json({ error: 'Public ID required' }, { status: 400 })
    }

    // Delete from Cloudinary
    const { deleteGuestImage } = await import('@/lib/cloudinary-guest')
    await deleteGuestImage(publicId)

    return NextResponse.json({ message: 'Guest image deleted successfully' })
  } catch (error) {
    console.error('Guest image deletion error:', error)
    return NextResponse.json(
      { error: 'Image deletion failed' },
      { status: 500 }
    )
  }
}