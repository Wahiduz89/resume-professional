// app/page.tsx - Updated homepage with duplicate footer removed
'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { GraduationCap, Briefcase, CheckCircle, Star, FileText, ArrowRight, Sparkles, Code } from 'lucide-react'
import { CLIENT_SUBSCRIPTION_PLANS } from '@/lib/subscription-config'

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
      icon: FileText,
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
              onClick={() => router.push('/builder/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              <FileText className="w-5 h-5 mr-2" />
              Create New Resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            ✨ Try it free • No account required to start • Save when ready
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

      {/* Templates Preview */}
      <div id="templates" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Templates Designed for Campus Placements
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Choose from templates optimized for Indian recruiters and ATS systems
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* General Template */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-[600px]">
              <div
                className="relative flex-1 cursor-pointer"
                onClick={() => router.push('/builder/new?template=general')}
              >
                <div className="w-full h-[540px] relative overflow-hidden bg-white">
                  <img
                    src="/assets/general-template.png"
                    alt="General Professional Template"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-gray-100 hidden items-center justify-center p-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">General Professional</h3>
                      <p className="text-gray-600 text-sm mb-4">Perfect for experienced candidates with sophisticated design and advanced features.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-0 h-[60px] flex items-center">
                <button
                  onClick={() => router.push('/builder/new?template=general')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-none rounded-b-lg h-full transition-colors"
                >
                  Choose General Template
                </button>
              </div>
            </div>

            {/* Fresher Template */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-[600px]">
              <div
                className="relative flex-1 cursor-pointer"
                onClick={() => router.push('/builder/new?template=fresher')}
              >
                <div className="w-full h-[540px] relative overflow-hidden bg-white">
                  <img
                    src="/assets/fresher-template.png"
                    alt="Fresher Template"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-gray-100 hidden items-center justify-center p-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Fresher Template</h3>
                      <p className="text-gray-600 text-sm mb-4">Perfect for students with limited work experience. Highlights education, projects, and skills.</p>
                      <div className="flex items-center justify-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">Most popular for freshers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-0 h-[60px] flex items-center">
                <button
                  onClick={() => router.push('/builder/new?template=fresher')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-none rounded-b-lg h-full transition-colors"
                >
                  Choose Fresher Template
                </button>
              </div>
            </div>

            {/* Technical Template */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-[600px]">
              <div
                className="relative flex-1 cursor-pointer"
                onClick={() => router.push('/builder/new?template=technical')}
              >
                <div className="w-full h-[540px] relative overflow-hidden bg-white">
                  <img
                    src="/assets/technical-template.png"
                    alt="Technical Engineering Template"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-gray-100 hidden items-center justify-center p-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Code className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Technical Template</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">Designed specifically for engineering and tech students. Features code-themed design and technical skill categorization.</p>
                      <div className="flex items-center justify-center gap-1 text-blue-500">
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span className="text-sm">Perfect for engineers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-0 h-[60px] flex items-center">
                <button
                  onClick={() => router.push('/builder/new?template=technical')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-none rounded-b-lg h-full transition-colors"
                >
                  Choose Technical Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple, Student-Friendly Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Student Basic Plan */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Student Basic</h3>
                <div className="text-4xl font-bold text-green-600">
                  {CLIENT_SUBSCRIPTION_PLANS.student_basic_monthly.amount === 0 ? (
                    <>
                      Free
                      <span className="text-lg text-gray-600 font-normal"> Forever</span>
                    </>
                  ) : (
                    <>
                      ₹{CLIENT_SUBSCRIPTION_PLANS.student_basic_monthly.amount / 100}
                      <span className="text-lg text-gray-600 font-normal">/month</span>
                    </>
                  )}
                </div>
                <p className="text-gray-600 mt-2">Essential resume building</p>
              </div>

              <ul className="space-y-3 mb-8">
                {['Unlimited Fresher Template Downloads', 'ATS-Friendly PDF Export', 'Basic Resume Builder', 'Email Support', 'No AI Features'].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => router.push('/builder/new')}
              >
                Get Started
              </Button>
            </div>

            {/* Student Starter Plan */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Popular Choice
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Student Starter</h3>
                <div className="text-4xl font-bold text-blue-600">
                  ₹99
                  <span className="text-lg text-gray-600 font-normal">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Perfect for getting started</p>
              </div>

              <ul className="space-y-3 mb-8">
                {['Unlimited Fresher Template Downloads', '1 AI-Enhanced Download', 'ATS-Friendly Formats', 'PDF Export', 'Email Support'].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/builder/new')}
              >
                Get Started
              </Button>
            </div>

            {/* Student Pro Plan */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
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
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                onClick={() => router.push('/builder/new')}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              All plans include ATS-friendly formats and secure payment processing. Cancel anytime.
            </p>
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
              onClick={() => router.push('/builder/new')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Create Your Resume Now
            </Button>
          </div>
        </div>
      </div>

      {/* Footer is now handled by the global Footer component in layout.tsx */}
    </div>
  )
}