// components/layout/navbar.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileText, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo and Company Name */}
          <div className="flex items-center justify-start flex-1">
            <Link href="/" className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ResumeAI Pro</span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center justify-end flex-1">
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button
                onClick={() => router.push('/register')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg relative z-50">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 space-y-2 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  router.push('/login')
                  setMobileMenuOpen(false)
                }}
              >
                Login
              </Button>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  router.push('/register')
                  setMobileMenuOpen(false)
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}