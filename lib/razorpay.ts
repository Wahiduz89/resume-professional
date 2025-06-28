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
  student_monthly: {
    name: 'Student Plan',
    amount: 9900, // ₹99 only for students
    currency: 'INR',
    description: 'Perfect for students and freshers',
    features: [
      '3 Resume Templates',
      'AI Content Enhancement',
      'ATS-Friendly Formats',
      'PDF Export',
      'Cover Letter Templates',
      'LinkedIn Profile Tips'
    ]
  },
  professional_monthly: {
    name: 'Professional Plan',
    amount: 29900, // ₹299 for working professionals
    currency: 'INR',
    description: 'For experienced professionals',
    features: [
      'All Student Features',
      'Unlimited Templates',
      'Priority AI Enhancement',
      'Multiple Export Formats',
      'Resume Analytics',
      'Priority Support'
    ]
  }
}