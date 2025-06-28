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
  monthly: {
    name: 'Monthly Plan',
    amount: 99900, // ₹999 in paise
    currency: 'INR',
    description: 'Create unlimited resumes for 30 days',
    features: [
      'Unlimited Resume Creation',
      'All Templates Access',
      'AI Content Enhancement',
      'PDF Export',
      'Priority Support'
    ]
  }
}