import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { verifyPaymentSignature } from '@/lib/razorpay'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId, paymentId, signature, planType } = await req.json()

    const isValid = verifyPaymentSignature(orderId, paymentId, signature)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update or create subscription
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30 days for monthly plan

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        status: 'active',
        planType: planType,
        razorpayId: paymentId,
        expiresAt: expiresAt
      },
      create: {
        userId: user.id,
        status: 'active',
        planType: planType,
        razorpayId: paymentId,
        expiresAt: expiresAt
      }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Payment verified successfully' 
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}