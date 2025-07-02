// lib/subscription-config.ts - Client-side subscription configuration
export const CLIENT_SUBSCRIPTION_PLANS = {
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
      ]
    },
    student_pro_monthly: {
      name: 'Student Pro',
      amount: 29900, // ₹299
      currency: 'INR',
      description: 'For serious job seekers with advanced features',
      features: [
        'Unlimited General & Fresher Template Downloads',
        '5 AI-Enhanced Resume Downloads',
        'All Premium Templates',
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