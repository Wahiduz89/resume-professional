import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { SUBSCRIPTION_PLANS } from '@/lib/razorpay'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface SubscriptionProps {
  planType?: 'student_starter_monthly' | 'student_pro_monthly'
  onSuccess?: () => void
}

export const SubscriptionComponent: React.FC<SubscriptionProps> = ({ 
  planType = 'student_pro_monthly',
  onSuccess 
}) => {
  const [loading, setLoading] = useState(false)
  const plan = SUBSCRIPTION_PLANS[planType]

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = resolve
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      await loadRazorpayScript()

      // Create order with the specified plan type
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType })
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const orderData = await orderResponse.json()

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ResumeAI Pro',
        description: plan.description,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              planType: planType
            })
          })

          if (verifyResponse.ok) {
            toast.success('Payment successful!')
            onSuccess?.()
          } else {
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          email: '',
          contact: ''
        },
        theme: {
          color: '#2563eb'
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Upgrade to {plan.name}
      </h2>

      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
        <div className="text-3xl font-bold mb-4">
          ₹{plan.amount / 100}
          <span className="text-lg text-gray-600">/month</span>
        </div>

        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </Button>

      <p className="text-sm text-gray-600 text-center mt-4">
        Secure payment powered by Razorpay. Supports UPI, Cards, and Net Banking.
      </p>
    </div>
  )
}