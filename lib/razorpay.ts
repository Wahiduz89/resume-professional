import Razorpay from 'razorpay'
import crypto from 'crypto'

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

export const SUBSCRIPTION_PLANS = {
  student_starter_monthly: {
    name: 'Student Starter',
    amount: 9900, // ₹99 for basic student plan
    currency: 'INR',
    description: 'Perfect for getting started',
    features: [
      '1 Resume Template',
      'ATS-Friendly Formats',
      'PDF Export',
      'Cover Letter Templates',
      'Email Support',
      'Basic Resume Builder'
    ]
  },
  student_pro_monthly: {
    name: 'Student Pro',
    amount: 29900, // ₹299 for advanced student plan
    currency: 'INR',
    description: 'For serious job seekers',
    features: [
      '3 Resume Templates',
      'AI Content Enhancement',
      'ATS-Friendly Formats',
      'PDF Export',
      'Cover Letter Templates',
      'Priority Support'
    ]
  }
}