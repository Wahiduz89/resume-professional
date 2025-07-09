// components/layout/footer.tsx
'use client'

import Link from 'next/link'
import { FileText, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">ResumeAI Pro</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering Indian students and fresh graduates with AI-powered resume 
              building tools designed for campus placements and career success.
            </p>
          </div>

          {/* Essential Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/builder/new" className="hover:text-blue-400 transition-colors">Create Resume</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">My Dashboard</Link></li>
              <li><Link href="/subscription" className="hover:text-blue-400 transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:support@resumeaipro.com" className="hover:text-blue-400 transition-colors">Contact Support</a></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm">
              <p>&copy; 2025 ResumeAI Pro. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for Indian students and professionals</p>
            </div>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="text-sm">
                <span className="text-gray-400">Trusted by</span>
                <span className="text-white font-semibold ml-1">10,000+ students</span>
              </div>
              
              <a href="mailto:support@resumeaipro.com" 
                 className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
              <div className="flex items-center space-x-4 mb-2 md:mb-0">
                <span>🔒 Secure & Private</span>
                <span>⚡ ATS-Optimized</span>
                <span>🇮🇳 Made in India</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span>Powered by AI</span>
                <span>•</span>
                <span>Student-Friendly Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}