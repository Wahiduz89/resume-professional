// components/layout/dashboard-header.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, LogOut, User, Settings } from 'lucide-react'
import { useState } from 'react'

export function DashboardHeader() {
  const { data: session } = useSession()
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
      })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Back to Dashboard Link */}
        <div>
          <button
            onClick={() => router.push(session ? '/dashboard' : '/')}
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{session ? 'Back to Dashboard' : 'Back to Home'}</span>
          </button>
        </div>

        {/* User Menu - Only show for authenticated users */}
        {session ? (
          <div className="flex items-center space-x-4">
            {/* User Info and Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {session?.user?.email}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      setShowDropdown(false)
                      router.push('/profile')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>

                  <hr className="my-1" />

                  <button
                    onClick={() => {
                      setShowDropdown(false)
                      handleLogout()
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="md:hidden text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          // For guest users, show login/register buttons
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
            <Button
              size="sm"
              onClick={() => router.push('/register')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  )
}