// app/(dashboard)/builder/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PersonalInfoStep } from '@/components/resume/form-steps/personal-info'
import { EducationStep } from '@/components/resume/form-steps/education'
import { ExperienceStep } from '@/components/resume/form-steps/experience'
import { SkillsStep } from '@/components/resume/form-steps/skills'
import { LanguagesStep } from '@/components/resume/form-steps/languages'
import { CertificationsStep } from '@/components/resume/form-steps/certifications'
import { CorporateTemplate } from '@/components/resume/templates/corporate'
import { ResumeData } from '@/types'
import toast from 'react-hot-toast'

const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    linkedin: '',
    portfolio: '',
    profileImage: '',
  },
  professionalSummary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  coursework: [],
  languages: [],
  template: 'corporate'
}

export default function NewResumePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA)
  const [loading, setLoading] = useState(false)

  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Education', component: EducationStep },
    { title: 'Experience', component: ExperienceStep },
    { title: 'Skills', component: SkillsStep },
    { title: 'Languages', component: LanguagesStep },
    { title: 'Certifications', component: CertificationsStep },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      })

      if (response.ok) {
        const { id } = await response.json()
        toast.success('Resume saved successfully!')
        router.push(`/builder/${id}`)
      } else {
        toast.error('Failed to save resume')
      }
    } catch (error) {
      toast.error('Failed to save resume')
    } finally {
      setLoading(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:grid lg:grid-cols-2 min-h-screen">
        <div className="p-4 lg:p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Create Your Resume</h1>
            <p className="text-gray-600">
              Fill out each section to build your professional resume.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-4 text-xs lg:text-sm overflow-x-auto">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`cursor-pointer hover:text-blue-700 px-2 py-1 whitespace-nowrap ${
                    index === currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <CurrentStepComponent
              data={resumeData}
              onChange={(data) => setResumeData({ ...resumeData, ...data })}
            />

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Resume'}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:block bg-gray-100 p-8 overflow-y-auto">
          <div className="sticky top-0">
            <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
            <div className="transform scale-75 origin-top">
              <CorporateTemplate data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}