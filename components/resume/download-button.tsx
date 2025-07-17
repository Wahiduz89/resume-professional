// components/resume/download-button.tsx - Cleaned up UI and improved UX
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Download, Crown, LogIn, Loader2 } from 'lucide-react'
import { ResumeData } from '@/types'
import toast from 'react-hot-toast'

interface DownloadButtonProps {
  resumeData: ResumeData
  resumeId?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

interface DownloadEligibility {
  canDownload: boolean
  reason?: string
  redirectToPayment?: boolean
  suggestedPlan?: string
  currentTemplate?: string
  aiEnhanced?: boolean
  remainingAiDownloads?: number
  planType?: string
}

export function DownloadButton({ 
  resumeData, 
  resumeId, 
  className = '',
  variant = 'primary' 
}: DownloadButtonProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [downloading, setDownloading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [eligibility, setEligibility] = useState<DownloadEligibility | null>(null)
  const [savingFirst, setSavingFirst] = useState(false)

  // Check download eligibility when component mounts or resumeId changes
  useEffect(() => {
    if (resumeId && session) {
      checkDownloadEligibility()
    }
  }, [resumeId, session])

  const checkDownloadEligibility = async () => {
    if (!resumeId || !session) return

    setChecking(true)
    try {
      const response = await fetch(`/api/resume/export?resumeId=${resumeId}`)
      if (response.ok) {
        const data = await response.json()
        setEligibility(data)
      } else {
        const errorData = await response.json()
        setEligibility({
          canDownload: false,
          reason: errorData.error || 'Unable to check download eligibility'
        })
      }
    } catch (error) {
      console.error('Failed to check download eligibility:', error)
      setEligibility({
        canDownload: false,
        reason: 'Network error. Please try again.'
      })
    } finally {
      setChecking(false)
    }
  }

  const handleAuthenticationRequired = () => {
    // Save current resume data to localStorage for post-auth restoration
    try {
      localStorage.setItem('temp_resume_data', JSON.stringify(resumeData))
      localStorage.setItem('temp_resume_template', resumeData.template)
    } catch (error) {
      console.error('Error saving temporary data:', error)
    }

    toast.error('Please sign in to download your resume')
    router.push('/login?callbackUrl=' + encodeURIComponent(window.location.pathname))
  }

  const saveResumeFirst = async (): Promise<string | null> => {
    if (!session) {
      handleAuthenticationRequired()
      return null
    }

    setSavingFirst(true)
    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      })

      if (response.ok) {
        const { id } = await response.json()
        
        // Clear temporary data since we've saved it
        try {
          localStorage.removeItem('temp_resume_data')
          localStorage.removeItem('temp_resume_template')
        } catch (error) {
          console.error('Error clearing temporary data:', error)
        }
        
        return id
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to save resume')
        return null
      }
    } catch (error) {
      toast.error('Failed to save resume')
      return null
    } finally {
      setSavingFirst(false)
    }
  }

  const handleDownload = async () => {
    // Check authentication first
    if (!session) {
      handleAuthenticationRequired()
      return
    }

    let currentResumeId = resumeId

    // If no resume ID, save the resume first
    if (!currentResumeId) {
      currentResumeId = await saveResumeFirst()
      if (!currentResumeId) {
        return // Save failed
      }
      // After saving, we need to check eligibility
      setChecking(true)
      try {
        const response = await fetch(`/api/resume/export?resumeId=${currentResumeId}`)
        if (response.ok) {
          const data = await response.json()
          setEligibility(data)
        }
      } catch (error) {
        console.error('Failed to check download eligibility:', error)
      } finally {
        setChecking(false)
      }
    }

    // Check eligibility if not already checked
    if (!eligibility && currentResumeId) {
      await checkDownloadEligibility()
      return
    }

    // Handle payment redirect if needed
    if (eligibility && !eligibility.canDownload && eligibility.redirectToPayment) {
      const planType = eligibility.suggestedPlan || 'student_starter_monthly'
      
      // Show specific message based on template and current plan
      if (eligibility.currentTemplate === 'general') {
        toast.error('General template requires Student Pro plan. Redirecting to upgrade...')
      } else if (eligibility.currentTemplate === 'technical') {
        toast.error('Technical template requires Student Pro plan. Redirecting to upgrade...')
      } else if (eligibility.reason?.includes('AI')) {
        toast.error('AI enhancement requires a paid plan. Redirecting to upgrade...')
      } else {
        toast.error('This template requires a subscription. Redirecting to plans...')
      }
      
      router.push(`/subscription?plan=${planType}&resumeId=${currentResumeId}`)
      return
    }

    // Show error if cannot download for other reasons
    if (eligibility && !eligibility.canDownload) {
      toast.error(eligibility.reason || 'Cannot download this resume')
      return
    }

    // Proceed with automatic download
    if (currentResumeId) {
      await downloadPDF(currentResumeId)
    }
  }

  const downloadPDF = async (downloadResumeId: string) => {
    setDownloading(true)
    try {
      const response = await fetch('/api/resume/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: downloadResumeId, requiresPayment: false })
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.redirectToPayment) {
          const planType = errorData.suggestedPlan || 'student_starter_monthly'
          router.push(`/subscription?plan=${planType}&resumeId=${downloadResumeId}`)
          return
        }
        throw new Error(errorData.error || 'Download failed')
      }

      // Handle successful download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '-')}-resume.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      toast.success('Resume downloaded successfully!')
      
      // Refresh eligibility after download
      await checkDownloadEligibility()
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const getButtonText = () => {
    if (savingFirst) return 'Saving...'
    if (downloading) return 'Downloading...'
    if (checking) return 'Checking...'
    
    if (!session) return 'Sign in to Download'
    if (!resumeId) return 'Download'
    
    if (!eligibility) return 'Download'
    
    if (!eligibility.canDownload) {
      if (eligibility.redirectToPayment) {
        return 'Upgrade to Download'
      }
      return 'Cannot Download'
    }
    
    return 'Download'
  }

  const getButtonVariant = () => {
    if (!session) return 'outline'
    if (!eligibility || eligibility.canDownload) return variant
    if (eligibility.redirectToPayment) return 'primary'
    return 'outline'
  }

  const getButtonIcon = () => {
    if (savingFirst || downloading || checking) {
      return <Loader2 className="w-4 h-4 mr-2 animate-spin" />
    }
    
    if (!session) {
      return <LogIn className="w-4 h-4 mr-2" />
    }
    
    if (eligibility?.redirectToPayment) {
      return <Crown className="w-4 h-4 mr-2" />
    }
    
    return <Download className="w-4 h-4 mr-2" />
  }

  const isDisabled = savingFirst || downloading || checking || 
    (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email)

  return (
    <Button
      onClick={handleDownload}
      disabled={isDisabled}
      variant={getButtonVariant()}
      className={`${className} ${
        eligibility?.redirectToPayment ? 'bg-purple-600 hover:bg-purple-700' : ''
      }`}
    >
      {getButtonIcon()}
      {getButtonText()}
    </Button>
  )
}