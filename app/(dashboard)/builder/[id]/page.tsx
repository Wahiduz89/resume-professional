// app/(dashboard)/builder/[id]/page.tsx - Updated with download functionality
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PersonalInfoStep } from '@/components/resume/form-steps/personal-info'
import { EducationStep } from '@/components/resume/form-steps/education'
import { ExperienceStep } from '@/components/resume/form-steps/experience'
import { SkillsStep } from '@/components/resume/form-steps/skills'
import { LanguagesStep } from '@/components/resume/form-steps/languages'
import { CertificationsStep } from '@/components/resume/form-steps/certifications'
import { DownloadButton } from '@/components/resume/download-button'
import { CorporateTemplate } from '@/components/resume/templates/corporate'
import { FresherTemplate } from '@/components/resume/templates/fresher'
import { GeneralTemplate } from '@/components/resume/templates/general'
import { TechnicalTemplate } from '@/components/resume/templates/technical'
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

const TEMPLATE_COMPONENTS = {
  'corporate': CorporateTemplate,
  'fresher': FresherTemplate,
  'general': GeneralTemplate,
  'technical': TechnicalTemplate,
  'internship': FresherTemplate
}

export default function EditResumePage() {
  const router = useRouter()
  const params = useParams()
  const resumeId = params.id as string
  
  const [currentStep, setCurrentStep] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Education', component: EducationStep },
    { title: 'Experience', component: ExperienceStep },
    { title: 'Skills', component: SkillsStep },
    { title: 'Languages', component: LanguagesStep },
    { title: 'Certifications', component: CertificationsStep },
  ]

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!resumeId) return

      try {
        const response = await fetch(`/api/resume/${resumeId}`)
        if (response.ok) {
          const data = await response.json()
          const content = data.content
          
          const updatedContent = {
            ...content,
            personalInfo: {
              ...INITIAL_DATA.personalInfo,
              ...content.personalInfo,
              profileImage: content.personalInfo?.profileImage || '',
            },
            languages: content.languages || [],
            certifications: content.certifications || [],
            projects: content.projects || [],
          }
          
          setResumeData(updatedContent)
        } else {
          toast.error('Failed to load resume data')
          router.push('/dashboard')
        }
      } catch (error) {
        toast.error('Failed to load resume data')
        router.push('/dashboard')
      } finally {
        setInitialLoading(false)
      }
    }

    fetchResumeData()
  }, [resumeId, router])

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
      const response = await fetch(`/api/resume/${resumeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      })

      if (response.ok) {
        toast.success('Resume updated successfully!')
      } else {
        toast.error('Failed to update resume')
      }
    } catch (error) {
      toast.error('Failed to update resume')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resume...</p>
        </div>
      </div>
    )
  }

  const CurrentStepComponent = steps[currentStep].component
  const TemplateComponent = TEMPLATE_COMPONENTS[resumeData.template as keyof typeof TEMPLATE_COMPONENTS] || GeneralTemplate

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:grid lg:grid-cols-2 min-h-screen">
        <div className="p-4 lg:p-8 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>
            <p className="text-gray-600">
              Make changes to your resume and save when ready.
            </p>
            {resumeData.template && (
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Using: {resumeData.template.charAt(0).toUpperCase() + resumeData.template.slice(1)} Template
              </div>
            )}
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

              <div className="flex gap-3">
                {currentStep === steps.length - 1 ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSave}
                      disabled={loading}
                      variant="outline"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    
                    <DownloadButton
                      resumeData={resumeData}
                      resumeId={resumeId}
                      className="min-w-[140px]"
                    />
                    
                    <Button
                      variant="outline"
                      onClick={handleBackToDashboard}
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block bg-gray-100 p-8 overflow-y-auto">
          <div className="sticky top-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Live Preview</h3>
              
              {/* Quick Download Button for Preview Section */}
              <DownloadButton
                resumeData={resumeData}
                resumeId={resumeId}
                variant="outline"
                className="text-sm"
              />
            </div>
            
            <div className="transform scale-75 origin-top">
              <TemplateComponent data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}