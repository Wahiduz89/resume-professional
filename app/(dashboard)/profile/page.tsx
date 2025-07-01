// app/(dashboard)/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Mail, Phone, Save, Edit } from 'lucide-react'
import toast from 'react-hot-toast'

interface UserProfile {
  name: string
  email: string
}

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: ''
  })

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || ''
      })
    }
  }, [session])

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

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
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
          {/* Personal Information Section */}
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

          {/* Account Information Section */}
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

          {/* Quick Actions */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Subscription Management</h3>
                  <p className="text-sm text-blue-700">
                    View and manage your subscription plan
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/subscription'}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  View Subscription
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}