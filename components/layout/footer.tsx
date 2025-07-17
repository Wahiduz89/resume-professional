// components/layout/footer.tsx
'use client'

import Link from 'next/link'
import { FileText, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
            </div>
            <p className="text-sm text-gray-400">
              Professional resume builder for students and job seekers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/builder/new" className="hover:text-white transition-colors">Create Resume</Link></li>
              <li><Link href="/subscription" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@resumeaipro.com" className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </a>
              </li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 ResumeAI Pro. All rights reserved. Made for students and professionals.
          </p>
        </div>
      </div>
    </footer>
  )
}