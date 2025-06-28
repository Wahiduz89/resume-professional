'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GraduationCap, Briefcase, CheckCircle, Star } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const studentFeatures = [
    'ATS-friendly templates designed for campus placements',
    'AI helps highlight academic projects and internships',
    'Special formats for fresher roles',
    'Cover letter templates included',
    'LinkedIn optimization tips',
    'Starting at just ₹99/month'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Start Free - Student Plan
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push('/login')}
            >
              Already have an account? Login
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            ✨ Special student pricing: Only ₹99/month
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Students Choose Our Resume Maker
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
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Templates Designed for Campus Placements
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Choose from templates optimized for Indian recruiters and ATS systems
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
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
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Internship Template</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ideal for internship applications. 
                Emphasizes academic achievements and relevant coursework.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold mb-2">Technical Template</h3>
              <p className="text-sm text-gray-600 mb-4">
                For engineering and tech students. 
                Showcases technical skills and projects prominently.
              </p>
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
          <Button 
            size="lg" 
            onClick={() => router.push('/register')}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Create Your Resume Now - ₹99/month
          </Button>
        </div>
      </div>
    </div>
  )
}