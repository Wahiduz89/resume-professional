'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SubscriptionComponent } from '@/components/payment/subscription'
import { Check, Crown, Sparkles, Download, FileText, Shield, Zap, ArrowRight, Code, Star } from 'lucide-react'
import { CLIENT_SUBSCRIPTION_PLANS } from '@/lib/subscription-config'
import toast from 'react-hot-toast'

interface CurrentSubscription {
  status: string
  planType: string
  expiresAt: string | null
  aiDownloadsUsed: number
  totalDownloads: number
}

export default function SubscriptionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSubscription, setCurrentSubscription] = useState<CurrentSubscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [showPayment, setShowPayment] = useState(false)

  const suggestedPlan = searchParams?.get('plan') || ''
  const resumeId = searchParams?.get('resumeId') || ''

  useEffect(() => {
    fetchCurrentSubscription()
    if (suggestedPlan) {
      setSelectedPlan(suggestedPlan)
    }
  }, [suggestedPlan])

  const fetchCurrentSubscription = async () => {
    try {
      const response = await fetch('/api/user/subscription')
      if (response.ok) {
        const data = await response.json()
        setCurrentSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlanSelect = async (planType: string) => {
    // Handle free plan activation directly
    if (planType === 'student_basic_monthly') {
      await activateFreePlan()
      return
    }

    // Handle paid plans through payment flow
    setSelectedPlan(planType)
    setShowPayment(true)
  }

  const activateFreePlan = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/subscription/activate-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType: 'student_basic_monthly' })
      })

      if (response.ok) {
        toast.success('Free plan activated successfully!')
        fetchCurrentSubscription()
        router.push('/dashboard')
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to activate free plan')
      }
    } catch (error) {
      toast.error('Failed to activate free plan')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    setShowPayment(false)
    fetchCurrentSubscription()

    if (resumeId) {
      router.push(`/dashboard?downloadReady=${resumeId}`)
    } else {
      router.push('/dashboard')
    }
  }

  const isCurrentPlan = (planType: string) => {
    return currentSubscription?.planType === planType &&
      currentSubscription?.status === 'active' &&
      currentSubscription?.expiresAt &&
      new Date(currentSubscription.expiresAt) > new Date()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    )
  }

  if (showPayment && selectedPlan) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => setShowPayment(false)}
            className="mb-4"
          >
            ← Back to Plans
          </Button>
          <h1 className="text-3xl font-bold mb-2">Complete Your Subscription</h1>
          <p className="text-gray-600">Secure payment powered by Razorpay</p>
        </div>

        <SubscriptionComponent
          planType={selectedPlan as any}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
          <Crown className="w-5 h-5" />
          <span className="text-sm font-medium">Choose Your Plan</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Unlock Professional Resume Downloads
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your career journey. Download ATS-friendly resumes and enhance them with AI-powered features.
        </p>

        {suggestedPlan && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-amber-800">
              <strong>Recommended:</strong> {CLIENT_SUBSCRIPTION_PLANS[suggestedPlan as keyof typeof CLIENT_SUBSCRIPTION_PLANS]?.name} plan for your resume requirements
            </p>
          </div>
        )}
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && currentSubscription.status === 'active' && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Current Subscription</h3>
              <p className="text-green-700">
                <strong>{CLIENT_SUBSCRIPTION_PLANS[currentSubscription.planType as keyof typeof CLIENT_SUBSCRIPTION_PLANS]?.name}</strong>
                {currentSubscription.expiresAt && (
                  <span> • Expires {formatDate(currentSubscription.expiresAt)}</span>
                )}
              </p>
              <div className="mt-2 text-sm text-green-600">
                AI Downloads Used: {currentSubscription.aiDownloadsUsed} | Total Downloads: {currentSubscription.totalDownloads}
              </div>
            </div>
            <Shield className="w-12 h-12 text-green-500" />
          </div>
        </div>
      )}

      {/* Pricing Plans - Three Column Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Student Basic Plan */}
        <div className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 ${suggestedPlan === 'student_basic_monthly'
            ? 'border-green-500 ring-4 ring-green-100'
            : 'border-gray-200'
          }`}>
          {suggestedPlan === 'student_basic_monthly' && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Recommended for You
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full mb-4">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Perfect for Beginners</span>
            </div>

            <h3 className="text-2xl font-bold mb-2">Student Basic</h3>
            {/* REPLACE THIS ENTIRE DIV BELOW */}
            <div className="text-4xl font-bold text-green-600 mb-2">
              Free
              <span className="text-lg text-gray-600 font-normal"> Forever</span>
            </div>
            <p className="text-gray-600">Essential resume building for students</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Unlimited Fresher Template Downloads</span>
                <p className="text-sm text-gray-600">Create as many resumes as you need with our student-friendly template</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>ATS-Friendly PDF Export</span>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Email Support</span>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Basic Resume Builder</span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> No AI enhancement features included
              </p>
            </div>
          </div>

          {isCurrentPlan('student_basic_monthly') ? (
            <Button disabled className="w-full" variant="outline">
              Current Plan
            </Button>
          ) : (
            <Button
              onClick={() => handlePlanSelect('student_basic_monthly')}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Activating...' : 'Get Started Free'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Student Starter Plan */}
        <div className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 ${suggestedPlan === 'student_starter_monthly'
            ? 'border-blue-500 ring-4 ring-blue-100'
            : 'border-gray-200'
          }`}>
          {suggestedPlan === 'student_starter_monthly' && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Recommended for You
              </div>
            </div>
          )}

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI Enhanced</span>
            </div>

            <h3 className="text-2xl font-bold mb-2">Student Starter</h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              ₹99
              <span className="text-lg text-gray-600 font-normal">/month</span>
            </div>
            <p className="text-gray-600">Ideal for fresh graduates with AI features</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Unlimited Fresher Template Downloads</span>
                <p className="text-sm text-gray-600">Download as many resumes as you need with the fresher template</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">1 AI-Enhanced Resume Download</span>
                <p className="text-sm text-gray-600">Get one professionally enhanced resume per month</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>ATS-Friendly PDF Export</span>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Email Support</span>
            </div>
          </div>

          {isCurrentPlan('student_starter_monthly') ? (
            <Button disabled className="w-full" variant="outline">
              Current Plan
            </Button>
          ) : (
            <Button
              onClick={() => handlePlanSelect('student_starter_monthly')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Choose Starter Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Student Pro Plan */}
        <div className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 ${suggestedPlan === 'student_pro_monthly'
            ? 'border-purple-500 ring-4 ring-purple-100'
            : 'border-purple-200'
          }`}>
          {suggestedPlan === 'student_pro_monthly' && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Recommended for You
              </div>
            </div>
          )}

          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            Most Popular
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full mb-4">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">For Serious Job Seekers</span>
            </div>

            <h3 className="text-2xl font-bold mb-2">Student Pro</h3>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              ₹299
              <span className="text-lg text-gray-600 font-normal">/month</span>
            </div>
            <p className="text-gray-600">Advanced features for career success</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Unlimited General, Fresher & Technical Template Downloads</span>
                <p className="text-sm text-gray-600">Access to all premium templates including the new Technical template for engineers</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Technical Template with Skills Categorization</span>
                <p className="text-sm text-gray-600">Perfect for engineering students with code-themed design and technical skill grouping</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">5 AI-Enhanced Resume Downloads</span>
                <p className="text-sm text-gray-600">Get five professionally enhanced resumes per month</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <span>Advanced ATS Optimization</span>
            </div>

            <div className="flex items-start gap-3">
              <Crown className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <span>Priority Support & LinkedIn Tips</span>
            </div>
          </div>

          {isCurrentPlan('student_pro_monthly') ? (
            <Button disabled className="w-full" variant="outline">
              Current Plan
            </Button>
          ) : (
            <Button
              onClick={() => handlePlanSelect('student_pro_monthly')}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Choose Pro Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-center mb-8">Plan Comparison</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4">Features</th>
                <th className="text-center p-4">Student Basic</th>
                <th className="text-center p-4">Student Starter</th>
                <th className="text-center p-4">Student Pro</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-t">
                <td className="p-4 font-medium">Fresher Template Access</td>
                <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">General Template Access</td>
                <td className="p-4 text-center text-gray-400">—</td>
                <td className="p-4 text-center text-gray-400">—</td>
                <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Technical Template Access</td>
                <td className="p-4 text-center text-gray-400">—</td>
                <td className="p-4 text-center text-gray-400">—</td>
                <td className="p-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Unlimited Basic Downloads</td>
                <td className="p-4 text-center">Fresher Only</td>
                <td className="p-4 text-center">Fresher Only</td>
                <td className="p-4 text-center">All Templates</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">AI-Enhanced Downloads</td>
                <td className="p-4 text-center">None</td>
                <td className="p-4 text-center">1 per month</td>
                <td className="p-4 text-center">5 per month</td>
              </tr>
              <tr className="border-t">
                <td className="p-4 font-medium">Support Level</td>
                <td className="p-4 text-center">Email</td>
                <td className="p-4 text-center">Email</td>
                <td className="p-4 text-center">Priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">What is the difference between Basic and Starter plans?</h4>
            <p className="text-gray-600">Student Basic provides unlimited access to our fresher template without AI enhancement features. Student Starter includes the same template access plus 1 AI-enhanced download per month for professional content improvement.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">Can I upgrade my plan anytime?</h4>
            <p className="text-gray-600">Yes, you can upgrade from any plan to a higher tier anytime. The new benefits take effect immediately, including access to additional templates and AI features.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">What is the Technical Template?</h4>
            <p className="text-gray-600">The Technical Template is specifically designed for engineering and computer science students. It features a code-themed design, automatic categorization of technical skills, and enhanced project showcase sections perfect for GitHub portfolios.</p>
          </div>
        </div>
      </div>
    </div>
  )
}