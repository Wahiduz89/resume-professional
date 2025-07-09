// app/(auth)/register/page.tsx - Updated with callback URL support for resume flow
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success('Account created successfully!')
        
        // Build login URL with callback
        const loginUrl = callbackUrl.includes('/builder/new') 
          ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
          : '/login'
        
        router.push(loginUrl)
      } else {
        const errorData = await res.json()
        toast.error(errorData.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="mt-2 text-gray-600">
            {callbackUrl.includes('/builder/new') 
              ? 'Create an account to save and download your resume'
              : 'Start building your resume'
            }
          </p>
        </div>

        {/* Resume Builder Context */}
        {callbackUrl.includes('/builder/new') && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">Resume Builder</h3>
            <p className="text-sm text-green-800">
              Your resume progress is saved temporarily. After creating your account, you'll be able to save and download your resume according to your subscription plan.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              href={`/login${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
              className="text-blue-600 hover:underline"
            >
              Sign in here
            </Link>
          </p>

          {/* Resume Builder Alternative */}
          {callbackUrl.includes('/builder/new') && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3">
                Or continue building your resume without an account
              </p>
              <Button
                variant="outline"
                onClick={() => router.push('/builder/new')}
                className="w-full"
              >
                Continue as Guest
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                You can create an account later to save and download your resume
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}