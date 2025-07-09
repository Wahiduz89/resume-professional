// components/resume/download-button.tsx - Resume download functionality
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Download, Crown, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
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
  const [downloading, setDownloading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [eligibility, setEligibility] = useState<DownloadEligibility | null>(null)

  // Check download eligibility when component mounts or resumeId changes
  useEffect(() => {
    if (resumeId) {
      checkDownloadEligibility()
    }
  }, [resumeId])

  const checkDownloadEligibility = async () => {
    if (!resumeId) return

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

  const handleDownload = async () => {
    // For new resumes without ID, save first then download
    if (!resumeId) {
      await saveAndDownload()
      return
    }

    // Check eligibility if not already checked
    if (!eligibility) {
      await checkDownloadEligibility()
      return
    }

    // Handle payment redirect if needed
    if (!eligibility.canDownload && eligibility.redirectToPayment) {
      const planType = eligibility.suggestedPlan || 'student_starter_monthly'
      router.push(`/subscription?plan=${planType}&resumeId=${resumeId}`)
      return
    }

    // Show error if cannot download
    if (!eligibility.canDownload) {
      toast.error(eligibility.reason || 'Cannot download this resume')
      return
    }

    // Proceed with download
    await downloadPDF()
  }

  const saveAndDownload = async () => {
    setDownloading(true)
    try {
      // Create resume and initiate download through subscription system
      const response = await fetch('/api/resume/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          resumeData: resumeData,
          requiresPayment: false 
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.redirectToPayment) {
          const planType = errorData.suggestedPlan || 'student_starter_monthly'
          router.push(`/subscription?plan=${planType}`)
          return
        }
        throw new Error(errorData.error || 'Download failed')
      }

      // Handle successful download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `resume-${resumeData.personalInfo.fullName.replace(/\s+/g, '-')}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      toast.success('Resume downloaded successfully!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const downloadPDF = async () => {
    if (!resumeId) return

    setDownloading(true)
    try {
      await downloadResumeById(resumeId)
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

  const downloadResumeById = async (id: string) => {
    const response = await fetch('/api/resume/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeId: id, requiresPayment: false })
    })

    if (!response.ok) {
      const errorData = await response.json()
      if (errorData.redirectToPayment) {
        const planType = errorData.suggestedPlan || 'student_starter_monthly'
        router.push(`/subscription?plan=${planType}&resumeId=${id}`)
        return
      }
      throw new Error(errorData.error || 'Download failed')
    }

    // Handle file download
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resume-${resumeData.personalInfo.fullName.replace(/\s+/g, '-')}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const getButtonText = () => {
    if (downloading) return 'Downloading...'
    if (checking) return 'Checking...'
    
    if (!resumeId) return 'Save & Download'
    
    if (!eligibility) return 'Download Resume'
    
    if (!eligibility.canDownload) {
      if (eligibility.redirectToPayment) {
        return 'Upgrade to Download'
      }
      return 'Cannot Download'
    }
    
    return 'Download Resume'
  }

  const getButtonVariant = () => {
    if (!eligibility || eligibility.canDownload) return variant
    if (eligibility.redirectToPayment) return 'primary'
    return 'outline'
  }

  const isDisabled = downloading || checking || 
    (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email)

  return (
    <div className="space-y-2">
      <Button
        onClick={handleDownload}
        disabled={isDisabled}
        variant={getButtonVariant()}
        className={`${className} ${
          eligibility?.redirectToPayment ? 'bg-purple-600 hover:bg-purple-700' : ''
        }`}
      >
        {downloading || checking ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : eligibility?.redirectToPayment ? (
          <Crown className="w-4 h-4 mr-2" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        {getButtonText()}
      </Button>

      {/* Status Information */}
      {eligibility && (
        <div className="text-xs">
          {eligibility.canDownload ? (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-3 h-3" />
              <span>Ready to download</span>
              {eligibility.aiEnhanced && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  AI Enhanced
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-amber-600">
              <AlertCircle className="w-3 h-3" />
              <span>{eligibility.reason}</span>
            </div>
          )}
          
          {eligibility.remainingAiDownloads !== undefined && eligibility.canDownload && (
            <div className="text-gray-500 mt-1">
              AI downloads remaining: {eligibility.remainingAiDownloads}
            </div>
          )}
        </div>
      )}

      {/* Requirements Notice */}
      {(!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) && (
        <div className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>Please fill in your name and email to download</span>
        </div>
      )}
    </div>
  )
}