// app/(dashboard)/profile/page.tsx - Fixed with correct import for subscription config
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Mail, Phone, Save, Edit, Crown, Download, Sparkles, Calendar, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { CLIENT_SUBSCRIPTION_PLANS } from '@/lib/subscription-config'

interface UserProfile {
  name: string
  email: string
}

interface SubscriptionData {
  status: string
  planType: string
  expiresAt: string | null
  aiDownloadsUsed: number
  totalDownloads: number
  createdAt: string
}

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subscriptionLoading, setSubscriptionLoading] = useState(true)
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: ''
  })
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || ''
      })
    }
    fetchSubscriptionData()
  }, [session])

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch('/api/user/subscription')
      if (response.ok) {
        const data = await response.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Failed to fetch subscription data:', error)
    } finally {
      setSubscriptionLoading(false)
    }
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: formData.name })
      })

      if (response.ok) {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.name
          }
        })
        toast.success('Profile updated successfully!')
        setIsEditing(false)
      } else {
        toast.error('Failed to update profile')
      }
    } catch (error) {
      toast.error('An error occurred while updating profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || ''
      })
    }
    setIsEditing(false)
  }

  const getSubscriptionStatus = () => {
    if (!subscription) return 'No Subscription'
    
    if (subscription.status !== 'active') return 'Inactive'
    
    if (subscription.expiresAt && new Date(subscription.expiresAt) < new Date()) {
      return 'Expired'
    }
    
    return 'Active'
  }

  const getPlanDetails = () => {
    if (!subscription) return null
    
    const planDetails = CLIENT_SUBSCRIPTION_PLANS[subscription.planType as keyof typeof CLIENT_SUBSCRIPTION_PLANS]
    return planDetails
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getUsagePercentage = (used: number, total: number) => {
    if (total === 0) return 0
    return Math.min((used / total) * 100, 100)
  }

  const planDetails = getPlanDetails()
  const status = getSubscriptionStatus()
  const isActive = status === 'Active'

  // Define limits locally since client-side config doesn't include limits
  const getPlanLimits = (planType: string) => {
    if (planType === 'student_starter_monthly') {
      return { aiEnhancedDownloads: 1 }
    } else if (planType === 'student_pro_monthly') {
      return { aiEnhancedDownloads: 5 }
    }
    return { aiEnhancedDownloads: 0 }
  }

  const planLimits = subscription ? getPlanLimits(subscription.planType) : null

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="space-y-8">
        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
            </div>
            
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                      {formData.name || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Account Information
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {formData.email}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Email address cannot be changed. Contact support if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Information Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                Subscription Details
              </h2>
              <p className="text-gray-600 mt-1">Manage your subscription plan and view usage statistics</p>
            </div>
            
            <Button
              onClick={() => router.push('/subscription')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Crown className="w-4 h-4 mr-2" />
              Manage Subscription
            </Button>
          </div>

          {subscriptionLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : subscription ? (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Current Plan</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    <span className="text-xl font-bold text-gray-900">
                      {planDetails?.name || subscription.planType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {status}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-bold text-green-900 mb-2">Plan Details</h3>
                  <div className="space-y-2">
                    {subscription.expiresAt && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span>Expires: {formatDate(subscription.expiresAt)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span>Member since: {formatDate(subscription.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              {isActive && planLimits && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Usage Statistics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* AI Downloads */}
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">AI-Enhanced Downloads</h4>
                        </div>
                        <span className="text-lg font-bold text-purple-600">
                          {subscription.aiDownloadsUsed}/{planLimits.aiEnhancedDownloads}
                        </span>
                      </div>
                      
                      <div className="w-full bg-purple-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${getUsagePercentage(
                              subscription.aiDownloadsUsed, 
                              planLimits.aiEnhancedDownloads
                            )}%` 
                          }}
                        />
                      </div>
                      
                      <p className="text-sm text-purple-700">
                        {planLimits.aiEnhancedDownloads - subscription.aiDownloadsUsed} AI downloads remaining
                      </p>
                    </div>

                    {/* Total Downloads */}
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Download className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Total Downloads</h4>
                        </div>
                        <span className="text-lg font-bold text-blue-600">
                          {subscription.totalDownloads}
                        </span>
                      </div>
                      
                      <p className="text-sm text-blue-700">
                        Total resumes downloaded this month
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Plan Features */}
              {planDetails && (
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Plan Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {planDetails.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Subscription</h3>
              <p className="text-gray-600 mb-6">Subscribe to download resumes and access AI features</p>
              <Button
                onClick={() => router.push('/subscription')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Crown className="w-4 h-4 mr-2" />
                Choose a Plan
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}