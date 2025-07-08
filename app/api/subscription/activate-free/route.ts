// app/api/subscription/activate-free/route.ts - API endpoint for free plan activation
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planType } = await req.json()

    // Validate that this is indeed the free plan
    if (planType !== 'student_basic_monthly') {
      return NextResponse.json({ error: 'Invalid plan type for free activation' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user already has an active subscription
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: user.id }
    })

    if (existingSubscription && existingSubscription.status === 'active') {
      return NextResponse.json({ 
        error: 'User already has an active subscription',
        currentPlan: existingSubscription.planType 
      }, { status: 400 })
    }

    // Set expiry date far in the future for free plan (effectively permanent)
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 100) // 100 years from now

    // Create or update subscription for free plan
    const subscription = await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        status: 'active',
        planType: planType,
        razorpayId: null, // No payment involved
        expiresAt: expiresAt,
        aiDownloadsUsed: 0,
        totalDownloads: 0,
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        status: 'active',
        planType: planType,
        razorpayId: null, // No payment involved
        expiresAt: expiresAt,
        aiDownloadsUsed: 0,
        totalDownloads: 0
      }
    })

    console.log(`Free plan activated for user ${user.id}`)

    return NextResponse.json({ 
      success: true,
      message: 'Free plan activated successfully',
      subscription: {
        planType: subscription.planType,
        status: subscription.status,
        expiresAt: subscription.expiresAt,
        aiDownloadsUsed: subscription.aiDownloadsUsed,
        totalDownloads: subscription.totalDownloads
      }
    })
  } catch (error) {
    console.error('Free plan activation error:', error)
    return NextResponse.json(
      { error: 'Failed to activate free plan' },
      { status: 500 }
    )
  }
}