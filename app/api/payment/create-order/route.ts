// app/api/payment/create-order/route.ts - Fixed with shorter receipt generation
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

    const { planType = 'student_starter_monthly' } = await req.json()
    
    // Validate planType exists in our SUBSCRIPTION_PLANS
    if (!SUBSCRIPTION_PLANS[planType as keyof typeof SUBSCRIPTION_PLANS]) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
    }
    
    const plan = SUBSCRIPTION_PLANS[planType as keyof typeof SUBSCRIPTION_PLANS]

    // Generate a shorter receipt that stays within 40 characters
    // Use first 8 chars of user ID + timestamp in base36 to keep it short
    const shortUserId = user.id.substring(0, 8)
    const shortTimestamp = Date.now().toString(36) // Convert to base36 for shorter string
    const receipt = `sub_${shortUserId}_${shortTimestamp}` // Format: sub_12345678_abc123

    // Ensure receipt is within 40 character limit
    if (receipt.length > 40) {
      // Fallback to even shorter format if needed
      const fallbackReceipt = `s${shortUserId}${shortTimestamp}`.substring(0, 40)
      console.log(`Receipt truncated to: ${fallbackReceipt}`)
    }

    const finalReceipt = receipt.length <= 40 ? receipt : `s${shortUserId}${shortTimestamp}`.substring(0, 40)

    console.log(`Creating order with receipt: ${finalReceipt} (length: ${finalReceipt.length})`)

    const order = await razorpay.orders.create({
      amount: plan.amount,
      currency: plan.currency,
      receipt: finalReceipt,
      notes: {
        userId: user.id,
        planType: planType,
        userEmail: session.user.email
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
    
    // Provide more specific error information
    if (error && typeof error === 'object' && 'error' in error) {
      const razorpayError = error as any
      return NextResponse.json(
        { 
          error: 'Failed to create order',
          details: razorpayError.error?.description || 'Unknown Razorpay error',
          code: razorpayError.error?.code
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}