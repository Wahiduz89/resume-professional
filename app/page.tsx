// app/page.tsx - Updated with technical template mention
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { GraduationCap, Briefcase, CheckCircle, Star, FileText, Upload, ArrowRight, Sparkles, Code } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      title: 'ATS-Optimized Templates',
      description: 'Resume templates designed to pass Applicant Tracking Systems',
      icon: FileText,
    },
    {
      title: 'AI-Powered Enhancement',
      description: 'Let AI improve your content with professional language',
      icon: Sparkles,
    },
    {
      title: 'One-Click Export',
      description: 'Download your resume in PDF format instantly',
      icon: Upload,
    },
  ]

  const studentFeatures = [
    'ATS-friendly templates designed for campus placements',
    'Professional formats for fresher roles',
    'Technical template for engineering students',
    'LinkedIn optimization tips',
    'AI enhancement available in Student Pro plan',
    'Starting at just ₹99/month'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-medium">Built for Students & Fresh Graduates</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your First Professional Resume
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Land your dream internship or first job with AI-powered resumes
            designed specifically for Indian campus placements and entry-level positions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={() => router.push('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              <FileText className="w-5 h-5 mr-2" />
              Create New Resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Resume
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            ✨ Special student pricing: Only ₹99/month • No credit card required
          </p>
        </div>
      </div>

      {/* Quick Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Get Hired
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Student Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Students Choose ResumeAI Pro
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Preview - Updated with Technical Template */}
      <div id="templates" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Templates Designed for Campus Placements
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Choose from templates optimized for Indian recruiters and ATS systems
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Fresher Template</h3>
              <p className="text-sm text-gray-600 mb-4">
                Perfect for students with limited work experience.
                Highlights education, projects, and skills.
              </p>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">Most popular for freshers</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Technical Template</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Designed specifically for engineering and tech students.
                Features code-themed design and technical skill categorization.
              </p>
              <div className="flex items-center gap-1 text-blue-500">
                <Sparkles className="w-4 h-4 fill-current" />
                <span className="text-sm">Perfect for engineers</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">General Template</h3>
              <p className="text-sm text-gray-600 mb-4">
                Professional template for experienced candidates.
                Sophisticated design with advanced features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - Updated with Technical Template mention */}
      <div id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple, Student-Friendly Pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Student Starter Plan */}
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Student Starter</h3>
                <div className="text-4xl font-bold text-blue-600">
                  ₹99
                  <span className="text-lg text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Perfect for getting started</p>
              </div>

              <ul className="space-y-3 mb-8">
                {['Fresher Resume Template', 'ATS-Friendly Formats', '1 AI-Enhanced Download', 'PDF Export', 'Email Support'].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/register')}
              >
                Get Started
              </Button>
            </div>

            {/* Student Pro Plan */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-blue-500">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Student Pro</h3>
                <div className="text-4xl font-bold">
                  ₹299
                  <span className="text-lg text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-gray-600 mt-2">For serious job seekers</p>
              </div>

              <ul className="space-y-3 mb-8">
                {['All Templates (Fresher, Technical, General)', '5 AI-Enhanced Downloads', 'Technical Skills Categorization', 'ATS-Friendly Formats', 'Priority Support'].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/register')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who landed their dream jobs
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => router.push('/register')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Create Your Resume Now
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-semibold">ResumeAI Pro</span>
            </div>
            <p className="text-sm">
              © 2025 ResumeAI Pro. Made with ❤️ for Indian students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}