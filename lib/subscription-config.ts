// lib/subscription-config.ts - Updated client-side subscription configuration with student basic plan
export const CLIENT_SUBSCRIPTION_PLANS = {
  student_basic_monthly: {
    name: 'Student Basic',
    amount: 0, // Changed from 4900 to 0
    currency: 'INR',
    description: 'Free plan for students to get started with resume building',
    features: [
      'Unlimited Fresher Template Downloads',
      'Basic Resume Builder',
      'ATS-Friendly PDF Export',
      'Email Support',
      'No AI Features'
    ]
  },
  student_starter_monthly: {
    name: 'Student Starter',
    amount: 9900, // ₹99
    currency: 'INR',
    description: 'Perfect for getting started with AI-enhanced features',
    features: [
      'Unlimited Fresher Template Downloads',
      '1 AI-Enhanced Resume Download',
      'ATS-Friendly Formats',
      'PDF Export',
      'Email Support',
      'AI Content Enhancement'
    ]
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
    ]
  }
}

export type ClientSubscriptionPlan = keyof typeof CLIENT_SUBSCRIPTION_PLANS

// Razorpay types for client-side usage
declare global {
  interface Window {
    Razorpay: any
  }
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: any) => void
  prefill: {
    email: string
    contact: string
  }
  theme: {
    color: string
  }
}