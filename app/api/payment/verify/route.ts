// app/api/payment/verify/route.ts - Updated payment verification with usage tracking
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

    // Calculate expiry date (30 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    // Update or create subscription with usage reset
    const subscription = await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        status: 'active',
        planType: planType,
        razorpayId: paymentId,
        expiresAt: expiresAt,
        // Reset usage counters for new billing cycle
        aiDownloadsUsed: 0,
        totalDownloads: 0,
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        status: 'active',
        planType: planType,
        razorpayId: paymentId,
        expiresAt: expiresAt,
        aiDownloadsUsed: 0,
        totalDownloads: 0
      }
    })

    // Log the subscription creation/update
    console.log(`Subscription ${subscription.id} updated for user ${user.id} with plan ${planType}`)

    return NextResponse.json({ 
      success: true,
      message: 'Payment verified and subscription activated successfully',
      subscription: {
        planType: subscription.planType,
        status: subscription.status,
        expiresAt: subscription.expiresAt,
        aiDownloadsUsed: subscription.aiDownloadsUsed,
        totalDownloads: subscription.totalDownloads
      }
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}