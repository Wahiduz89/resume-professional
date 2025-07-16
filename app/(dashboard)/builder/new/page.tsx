// app/(dashboard)/builder/new/page.tsx - Updated with Resume in Progress notification removed
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { PersonalInfoStep } from '@/components/resume/form-steps/personal-info'
import { EducationStep } from '@/components/resume/form-steps/education'
import { ExperienceStep } from '@/components/resume/form-steps/experience'
import { SkillsStep } from '@/components/resume/form-steps/skills'
import { LanguagesStep } from '@/components/resume/form-steps/languages'
import { CertificationsStep } from '@/components/resume/form-steps/certifications'
import { DownloadButton } from '@/components/resume/download-button'
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
  template: 'fresher'
}

const TEMPLATE_OPTIONS = [
  {
    id: 'general',
    name: 'General Professional',
    description: 'Perfect for experienced professionals and mid-level careers',
    preview: GeneralTemplate,
    features: ['Modern curved design', 'Sidebar layout', 'Skills visualization', 'ATS-friendly structure'],
    bestFor: 'Experienced professionals, MBA graduates, management roles',
    requiresAuth: false
  },
  {
    id: 'fresher',
    name: 'Fresh Graduate',
    description: 'Ideal for students and recent graduates',
    preview: FresherTemplate,
    features: ['Clean design', 'Education focus', 'Project highlights', 'Entry-level friendly'],
    bestFor: 'Fresh graduates, internship seekers, first-time job applicants',
    requiresAuth: false
  },
  {
    id: 'technical',
    name: 'Technical Engineering',
    description: 'Designed specifically for engineering and tech students',
    preview: TechnicalTemplate,
    features: ['Code-themed design', 'Technical skills categorization', 'Project showcase', 'GitHub integration'],
    bestFor: 'Engineering students, software developers, technical roles',
    requiresAuth: false
  }
]

// Local Storage Keys
const TEMP_RESUME_KEY = 'temp_resume_data'
const TEMP_TEMPLATE_KEY = 'temp_resume_template'

export default function NewResumePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(-1) // Always start with template selection
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA)
  const [loading, setLoading] = useState(false)
  const [savedResumeId, setSavedResumeId] = useState<string | undefined>(undefined)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [mounted, setMounted] = useState(false)

  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Education', component: EducationStep },
    { title: 'Experience', component: ExperienceStep },
    { title: 'Skills', component: SkillsStep },
    { title: 'Languages', component: LanguagesStep },
    { title: 'Certifications', component: CertificationsStep },
  ]

  // Initialize component
  useEffect(() => {
    setMounted(true)

    // Handle direct template selection from URL
    const templateParam = searchParams?.get('template')
    if (templateParam && TEMPLATE_OPTIONS.find(t => t.id === templateParam)) {
      setResumeData({ ...INITIAL_DATA, template: templateParam as ResumeData['template'] })
      setCurrentStep(0)
    }
  }, [searchParams])

  // Save resume data to localStorage when it changes (only after template selection)
  useEffect(() => {
    if (mounted && currentStep >= 0) {
      try {
        localStorage.setItem(TEMP_RESUME_KEY, JSON.stringify(resumeData))
        localStorage.setItem(TEMP_TEMPLATE_KEY, resumeData.template)
      } catch (error) {
        console.error('Error saving resume data to localStorage:', error)
      }
    }
  }, [resumeData, currentStep, mounted])

  // Handle post-authentication resume creation
  useEffect(() => {
    if (session && showAuthPrompt) {
      setShowAuthPrompt(false)
      handleAuthenticatedSave()
    }
  }, [session, showAuthPrompt])

  const selectTemplate = (templateId: string) => {
    const newResumeData = { ...resumeData, template: templateId as ResumeData['template'] }
    setResumeData(newResumeData)
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
      setCurrentStep(-1)
    }
  }

  const handleAuthenticatedSave = async () => {
    if (!session) return

    setLoading(true)
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      })

      if (response.ok) {
        const { id } = await response.json()
        setSavedResumeId(id)

        // Clear temporary data
        localStorage.removeItem(TEMP_RESUME_KEY)
        localStorage.removeItem(TEMP_TEMPLATE_KEY)

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

  const handleSaveWithAuth = () => {
    if (!session) {
      setShowAuthPrompt(true)
      toast.error('Please sign in to save your resume')
      router.push('/login?callbackUrl=' + encodeURIComponent(window.location.pathname))
      return
    }

    handleAuthenticatedSave()
  }

  const handleDownloadWithAuth = () => {
    if (!session) {
      setShowAuthPrompt(true)
      toast.error('Please sign in to download your resume')
      router.push('/login?callbackUrl=' + encodeURIComponent(window.location.pathname))
      return
    }

    // If user is authenticated but resume not saved, save first
    if (!savedResumeId) {
      handleAuthenticatedSave()
    }
  }

  // Show loading state while mounting
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resume builder...</p>
        </div>
      </div>
    )
  }

  // Template Selection View - Always shows unless user has selected a template
  if (currentStep === -1) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Choose Your Resume Template</h1>
            <p className="text-gray-600">
              Select a template that best fits your career level and industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TEMPLATE_OPTIONS.map((template) => {
              const PreviewComponent = template.preview

              return (
                <div key={template.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-[600px]">
                  <div className="relative flex-1">
                    <div className="w-full h-[540px] relative overflow-hidden bg-white">
                      <img
                        src={`/assets/${template.id}-template.png`}
                        alt={template.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-white hidden items-center justify-center p-2">
                        <div className="w-full h-full border border-gray-200 rounded overflow-hidden">
                          <div className="transform scale-[0.25] origin-top-left w-[400%] h-[400%]">
                            <PreviewComponent data={INITIAL_DATA} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-0 h-[60px] flex items-center">
                    <Button
                      onClick={() => selectTemplate(template.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-none rounded-b-lg h-full"
                    >
                      Choose Template
                    </Button>
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

            {/* Authentication Status */}
            {!session && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">No account required to build your resume.</span>
                  You'll need to sign in when you're ready to save or download.
                </p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-4 text-xs lg:text-sm overflow-x-auto">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`cursor-pointer hover:text-blue-700 px-2 py-1 whitespace-nowrap ${index === currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'
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

              <div className="flex gap-3">
                {currentStep === steps.length - 1 ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveWithAuth}
                      disabled={loading}
                      variant="outline"
                    >
                      {loading ? 'Saving...' : session ? 'Save Resume' : 'Sign in to Save'}
                    </Button>

                    <Button
                      onClick={handleDownloadWithAuth}
                      disabled={loading}
                      className="min-w-[140px]"
                    >
                      {session ? 'Download Resume' : 'Sign in to Download'}
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
            </div>

            <div className="transform scale-75 origin-top">
              <PreviewComponent data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}