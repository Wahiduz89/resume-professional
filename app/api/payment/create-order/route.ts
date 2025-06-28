import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { razorpay, SUBSCRIPTION_PLANS } from '@/lib/razorpay'
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

    const { planType = 'monthly' } = await req.json()
    const plan = SUBSCRIPTION_PLANS[planType as keyof typeof SUBSCRIPTION_PLANS]

    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: plan.currency,
      receipt: `sub_${user.id}_${Date.now()}`,
      notes: {
        userId: user.id,
        planType: planType
      }
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}