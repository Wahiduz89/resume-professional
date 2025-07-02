// Update for app/(dashboard)/builder/new/page.tsx - Add template selection
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
import { FresherTemplate } from '@/components/resume/templates/fresher'
import { GeneralTemplate } from '@/components/resume/templates/general'
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
  template: 'fresher' // Default to fresher template for students
}

const TEMPLATE_OPTIONS = [
  {
    id: 'general',
    name: 'General Professional',
    description: 'Perfect for experienced professionals and mid-level careers',
    preview: GeneralTemplate,
    features: ['Modern curved design', 'Sidebar layout', 'Skills visualization', 'ATS-friendly structure']
  },
  {
    id: 'fresher',
    name: 'Fresh Graduate',
    description: 'Ideal for students and recent graduates',
    preview: FresherTemplate,
    features: ['Clean design', 'Education focus', 'Project highlights', 'Entry-level friendly']
  }
]

export default function NewResumePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(-1) // Start with template selection
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

  const selectTemplate = (templateId: string) => {
    setResumeData({ ...resumeData, template: templateId as ResumeData['template'] })
    setCurrentStep(0)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else if (currentStep === 0) {
      setCurrentStep(-1) // Go back to template selection
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

  // Template Selection View
  if (currentStep === -1) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Choose Your Resume Template</h1>
            <p className="text-gray-600">
              Select a template that best fits your career level and industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TEMPLATE_OPTIONS.map((template) => {
              const PreviewComponent = template.preview
              return (
                <div key={template.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={() => selectTemplate(template.id)}
                      className="w-full mb-4"
                    >
                      Select This Template
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 p-4">
                    <p className="text-sm text-gray-600 mb-3">Preview:</p>
                    <div className="transform scale-[0.15] origin-top-left h-48 overflow-hidden border rounded">
                      <PreviewComponent data={INITIAL_DATA} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Form Steps View
  const CurrentStepComponent = steps[currentStep].component
  const selectedTemplate = TEMPLATE_OPTIONS.find(t => t.id === resumeData.template)
  const PreviewComponent = selectedTemplate?.preview || GeneralTemplate

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:grid lg:grid-cols-2 min-h-screen">
        <div className="p-4 lg:p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Create Your Resume</h1>
            <p className="text-gray-600">
              Using {selectedTemplate?.name} template - Fill out each section to build your professional resume.
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
              >
                {currentStep === 0 ? 'Change Template' : 'Previous'}
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
              <PreviewComponent data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}