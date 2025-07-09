// app/(auth)/login/page.tsx - Updated with callback URL support for resume flow
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error('Invalid email or password')
      } else {
        toast.success('Login successful!')
        
        // Check if user was redirected from resume builder
        if (callbackUrl.includes('/builder/new')) {
          // Redirect back to resume builder
          router.push(callbackUrl)
        } else {
          // Regular dashboard redirect
          router.push(callbackUrl)
        }
      }
    } catch (error) {
      toast.error('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-gray-600">
            {callbackUrl.includes('/builder/new') 
              ? 'Sign in to save and download your resume'
              : 'Login to your account'
            }
          </p>
        </div>

        {/* Resume Builder Context */}
        {callbackUrl.includes('/builder/new') && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Resume Builder</h3>
            <p className="text-sm text-blue-800">
              Your resume progress is saved temporarily. After signing in, you'll be able to save and download your resume according to your subscription plan.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
              className="text-blue-600 hover:underline"
            >
              Register here
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
                You can sign in later to save and download your resume
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}