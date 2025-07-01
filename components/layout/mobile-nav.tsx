// components/layout/mobile-nav.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Menu, X, Home, FileText, User, CreditCard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

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

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/builder/new', label: 'Create Resume', icon: FileText },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/subscription', label: 'Subscription', icon: CreditCard },
  ]

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)}>
          <nav className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            
            {/* Logout Button */}
            <button
              onClick={() => {
                setIsOpen(false)
                handleLogout()
              }}
              className="flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-red-50 text-red-600 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}