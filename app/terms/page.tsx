// app/terms/page.tsx
'use client'

import { Navbar } from '@/components/layout/navbar'
import { Scale } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
            <Scale className="w-5 h-5" />
            <span className="text-sm font-medium">Terms of Service</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Terms and conditions for using ResumeAI Pro
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p>
              By using ResumeAI Pro, you agree to these terms. If you do not agree with any part of these terms, please do not use our service. These terms apply to all users of our resume building platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Service</h2>
            <p className="mb-4">
              ResumeAI Pro provides online resume building tools including professional templates, AI content enhancement, resume parsing, and PDF export features. We offer three subscription plans designed specifically for students and job seekers.
            </p>
            <p>
              Our Student Basic plan is completely free and includes unlimited access to our fresher template. Paid plans starting at ₹99 per month provide additional templates and AI enhancement features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Responsibilities</h2>
            <p className="mb-4">
              You may use our resume builder without creating an account, but you need an account to save and download your resumes. You are responsible for keeping your account information secure and accurate.
            </p>
            <p className="mb-4">
              You are solely responsible for the accuracy of information in your resumes. You agree to provide truthful information and not use our service for any unlawful purposes or to create misleading content.
            </p>
            <p>
              You may not share your account with others, attempt to access other users' accounts, or use our service in any way that could harm our platform or other users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Plans and Billing</h2>
            <p className="mb-4">
              We offer three subscription plans. The Student Basic plan is free forever and includes unlimited fresher template downloads. The Student Starter plan costs ₹99 per month and includes AI enhancement features. The Student Pro plan costs ₹299 per month and provides access to all templates and advanced features.
            </p>
            <p className="mb-4">
              Subscription fees are charged monthly through Razorpay. You can cancel your subscription at any time, and it will remain active until the end of your billing period.
            </p>
            <p>
              All subscription fees are non-refundable because you receive immediate access to digital services upon payment. Each plan includes specific usage limits for AI-enhanced downloads and template access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Content and Our Service</h2>
            <p className="mb-4">
              You own the content you create using our service. We do not claim ownership of your resume content. However, you grant us permission to store and process your content to provide our services.
            </p>
            <p className="mb-4">
              Our resume templates and platform features are protected by copyright and remain our property. You may use templates for your personal job search but cannot redistribute or sell them.
            </p>
            <p>
              We reserve the right to remove content that violates these terms or applicable laws, though we do not monitor user content as a regular practice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI and Third-Party Services</h2>
            <p className="mb-4">
              Our AI enhancement features use OpenAI technology to improve resume content. AI-generated content should be reviewed and edited as needed. We do not guarantee the accuracy or effectiveness of AI-enhanced content.
            </p>
            <p>
              We use several trusted third-party services including Razorpay for payments, Cloudinary for image storage, and Affinda for resume parsing. These services have their own terms that also apply to your use of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability and Limitations</h2>
            <p className="mb-4">
              We strive to keep our service running smoothly but cannot guarantee it will always be available or error-free. We may need to perform maintenance or updates that temporarily affect service availability.
            </p>
            <p className="mb-4">
              While our templates and features are designed to help create professional resumes, we make no guarantees about employment outcomes. Job search success depends on many factors beyond resume quality.
            </p>
            <p>
              Our total liability for any issues with our service is limited to the amount you paid us in the previous twelve months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
            <p className="mb-4">
              You may delete your account at any time through your account settings or by contacting support. We may terminate accounts that violate these terms or engage in harmful behavior.
            </p>
            <p>
              When an account is terminated, we will delete your personal information within thirty days, though some data may be retained longer as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal and Jurisdiction</h2>
            <p className="mb-4">
              These terms are governed by Indian law. Any disputes will be resolved in Indian courts. We operate this service from India and make no representation that it is appropriate for use in other locations.
            </p>
            <p>
              We may update these terms occasionally. We will notify users of significant changes by email or through our service. Continued use after changes means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have questions about these terms, please contact us:
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p><strong>Email:</strong> support@resumeaipro.com</p>
              <p><strong>Legal Questions:</strong> legal@resumeaipro.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}