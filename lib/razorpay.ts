// lib/razorpay.ts - Updated server-side Razorpay configuration with technical template
import Razorpay from 'razorpay'
import crypto from 'crypto'

// This should only be used on the server side
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return generatedSignature === signature
}

// Server-side subscription plans with limits - Updated with technical template
export const SUBSCRIPTION_PLANS = {
  student_starter_monthly: {
    name: 'Student Starter',
    amount: 9900, // ₹99
    currency: 'INR',
    description: 'Perfect for getting started with basic features',
    features: [
      'Unlimited Fresher Template Downloads',
      '1 AI-Enhanced Resume Download',
      'ATS-Friendly Formats',
      'PDF Export',
      'Email Support',
      'Basic Resume Builder'
    ],
    limits: {
      templates: ['fresher'], // Only fresher template
      unlimitedDownloads: ['fresher'], // Unlimited for fresher without AI
      aiEnhancedDownloads: 1, // Only 1 AI-enhanced download
      totalDownloads: null // No limit on basic downloads
    }
  },
  student_pro_monthly: {
    name: 'Student Pro',
    amount: 29900, // ₹299
    currency: 'INR',
    description: 'For serious job seekers with advanced features',
    features: [
      'Unlimited General, Fresher & Technical Template Downloads',
      '5 AI-Enhanced Resume Downloads',
      'All Premium Templates (including Technical)',
      'Advanced ATS Optimization',
      'PDF Export',
      'Priority Support',
      'LinkedIn Profile Tips'
    ],
    limits: {
      templates: ['fresher', 'general', 'technical'], // All templates including technical
      unlimitedDownloads: ['fresher', 'general', 'technical'], // Unlimited for all templates without AI
      aiEnhancedDownloads: 5, // 5 AI-enhanced downloads
      totalDownloads: null // No limit on basic downloads
    }
  }
}

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS

export interface SubscriptionLimits {
  templates: string[]
  unlimitedDownloads: string[]
  aiEnhancedDownloads: number
  totalDownloads: number | null
}

export function getSubscriptionLimits(planType: string): SubscriptionLimits {
  const plan = SUBSCRIPTION_PLANS[planType as SubscriptionPlan]
  return plan?.limits || {
    templates: [],
    unlimitedDownloads: [],
    aiEnhancedDownloads: 0,
    totalDownloads: 0
  }
}