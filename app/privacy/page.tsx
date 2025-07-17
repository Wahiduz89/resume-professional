// app/privacy/page.tsx
'use client'

import { Navbar } from '@/components/layout/navbar'
import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Privacy Policy</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            How we protect your information at ResumeAI Pro
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide when creating resumes and managing your account. This includes your name, email, and phone number for account creation, along with resume content such as work experience, education, and skills. When you upload profile images for resume templates, we store these securely. Payment information is processed through our secure payment processor Razorpay, though we do not store your payment details directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use your information to provide resume building and PDF generation services, process subscription payments, and enhance resume content using AI when you choose this feature. We also store and manage your profile images, send important account and service updates, and provide customer support when needed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="mb-4">
              We protect your information using industry-standard security measures including encrypted data transmission, secure password storage, and protected database access. Your resume content belongs to you and remains private.
            </p>
          </section>



          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="mb-4">You can:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and download your resume data</li>
              <li>Update or correct your information</li>
              <li>Delete your account and all associated data</li>
              <li>Control how your information is used</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p>
              We keep your information while your account is active. When you delete your account, we remove your personal data within 30 days. Some information may be retained longer as required by law or for legitimate business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this privacy policy or how we handle your data, contact us at:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p><strong>Email:</strong> support@resumeaipro.com</p>
              <p><strong>Privacy Questions:</strong> privacy@resumeaipro.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
            <p>
              We may update this privacy policy occasionally. We will notify you of any significant changes by email or through our service. Continued use of our service means you accept any updates to this policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}