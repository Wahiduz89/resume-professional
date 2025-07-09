// app/api/upload/transfer-guest-image/route.ts - Transfer guest image to authenticated user
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { transferGuestImageToUser } from '@/lib/cloudinary-guest'
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

    const { guestPublicId } = await req.json()

    if (!guestPublicId) {
      return NextResponse.json({ error: 'Guest public ID required' }, { status: 400 })
    }

    // Transfer the guest image to the authenticated user
    const result = await transferGuestImageToUser(guestPublicId, user.id)

    // Store the new image info in database
    try {
      await prisma.userImage.create({
        data: {
          userId: user.id,
          publicId: result.public_id,
          secureUrl: result.secure_url,
          format: result.secure_url.split('.').pop() || 'jpg',
          bytes: 0 // We don't have this info from transfer
        }
      })
    } catch (dbError) {
      console.log('UserImage model not found or failed, skipping database storage:', dbError)
    }

    return NextResponse.json({ 
      url: result.secure_url,
      publicId: result.public_id,
      message: 'Image transferred successfully' 
    })
  } catch (error) {
    console.error('Guest image transfer error:', error)
    return NextResponse.json(
      { error: 'Image transfer failed' },
      { status: 500 }
    )
  }
}