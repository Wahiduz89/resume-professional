// app/(dashboard)/dashboard/page.tsx - Updated with delete resume functionality
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UploadResume } from '@/components/resume/upload-resume'
import { Plus, Download, Edit, FileText, AlertCircle, Crown, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

interface Resume {
  id: string
  template: string
  content: any
  createdAt: string
  updatedAt: string
}

interface DownloadCheck {
  canDownload: boolean
  reason?: string
  redirectToPayment?: boolean
  suggestedPlan?: string
  currentTemplate?: string
  aiEnhanced?: boolean
  remainingAiDownloads?: number
  planType?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [downloadChecks, setDownloadChecks] = useState<Record<string, DownloadCheck>>({})

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resume')
      if (response.ok) {
        const data = await response.json()
        setResumes(data.resumes)
        
        // Check download eligibility for each resume
        data.resumes.forEach((resume: Resume) => {
          checkDownloadEligibility(resume.id)
        })
      }
    } catch (error) {
      toast.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  const checkDownloadEligibility = async (resumeId: string) => {
    try {
      const response = await fetch(`/api/resume/export?resumeId=${resumeId}`)
      if (response.ok) {
        const data = await response.json()
        setDownloadChecks(prev => ({
          ...prev,
          [resumeId]: data
        }))
      }
    } catch (error) {
      console.error('Failed to check download eligibility:', error)
    }
  }

  const handleDownloadClick = async (resume: Resume) => {
    const check = downloadChecks[resume.id]
    
    if (!check?.canDownload) {
      if (check?.redirectToPayment) {
        // Redirect to subscription page with specific plan
        const planType = check.suggestedPlan || 'student_starter_monthly'
        router.push(`/subscription?plan=${planType}&resumeId=${resume.id}`)
        return
      } else {
        toast.error(check?.reason || 'Cannot download this resume')
        return
      }
    }

    // Proceed with download
    exportPDF(resume.id)
  }

  const exportPDF = async (resumeId: string) => {
    setExporting(resumeId)
    try {
      const response = await fetch('/api/resume/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, requiresPayment: false })
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `resume-${resumeId}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        toast.success('Resume downloaded successfully!')
        
        // Refresh download checks
        checkDownloadEligibility(resumeId)
      } else {
        const error = await response.json()
        if (error.redirectToPayment) {
          const planType = error.suggestedPlan || 'student_starter_monthly'
          router.push(`/subscription?plan=${planType}&resumeId=${resumeId}`)
        } else {
          toast.error(error.error || 'Download failed')
        }
      }
    } catch (error) {
      toast.error('Download failed')
    } finally {
      setExporting(null)
    }
  }

  const handleDeleteResume = async (resumeId: string, resumeName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${resumeName}"? This action cannot be undone.`
    )
    
    if (!confirmed) return

    setDeleting(resumeId)
    try {
      const response = await fetch(`/api/resume/${resumeId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Resume deleted successfully!')
        // Remove the deleted resume from the state
        setResumes(prevResumes => prevResumes.filter(resume => resume.id !== resumeId))
        // Remove download check data for deleted resume
        setDownloadChecks(prevChecks => {
          const updatedChecks = { ...prevChecks }
          delete updatedChecks[resumeId]
          return updatedChecks
        })
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Failed to delete resume')
      }
    } catch (error) {
      toast.error('Failed to delete resume')
    } finally {
      setDeleting(null)
    }
  }

  const handleUploadComplete = (parsedData: any) => {
    setShowUpload(false)
    fetchResumes()
  }

  const getDownloadButtonText = (resume: Resume) => {
    const check = downloadChecks[resume.id]
    
    if (!check) return 'Checking...'
    
    if (!check.canDownload) {
      if (check.redirectToPayment) {
        return 'Upgrade to Download'
      }
      return 'Cannot Download'
    }
    
    return exporting === resume.id ? 'Downloading...' : 'Download'
  }

  const getDownloadButtonVariant = (resume: Resume) => {
    const check = downloadChecks[resume.id]
    
    if (!check?.canDownload && check?.redirectToPayment) {
      return 'primary' // Highlight upgrade option
    }
    
    return 'outline'
  }

  const getResumeStatus = (resume: Resume) => {
    const check = downloadChecks[resume.id]
    
    if (!check) return null
    
    if (check.aiEnhanced) {
      return (
        <div className="flex items-center gap-1 text-xs">
          <Crown className="w-3 h-3 text-yellow-500" />
          <span className="text-yellow-600 font-medium">AI Enhanced</span>
        </div>
      )
    }
    
    return null
  }

  const getSubscriptionWarning = (resume: Resume) => {
    const check = downloadChecks[resume.id]
    
    if (!check?.canDownload) {
      if (check?.reason === 'Template not available in current plan') {
        return (
          <div className="flex items-center gap-2 p-2 bg-amber-50 text-amber-800 rounded text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>{check.currentTemplate} template requires Student Pro plan</span>
          </div>
        )
      }
      
      if (check?.reason === 'AI download limit exceeded') {
        return (
          <div className="flex items-center gap-2 p-2 bg-red-50 text-red-800 rounded text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>AI download limit reached</span>
          </div>
        )
      }
      
      if (check?.reason === 'No active subscription') {
        return (
          <div className="flex items-center gap-2 p-2 bg-blue-50 text-blue-800 rounded text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>Subscription required</span>
          </div>
        )
      }
    }
    
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your resumes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage your professional resumes</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => setShowUpload(!showUpload)}
          >
            <FileText className="w-4 h-4 mr-2" /> Upload Resume
          </Button>
          <Button onClick={() => router.push('/builder/new')}>
            <Plus className="w-4 h-4 mr-2" /> Create New Resume
          </Button>
        </div>
      </div>

      {/* Subscription Status Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-900">Subscription Status</h3>
            <p className="text-sm text-blue-700">
              Manage your subscription to download resumes and access AI features
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/subscription')}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <Crown className="w-4 h-4 mr-2" />
            View Plans
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="mb-8">
          <UploadResume onUploadComplete={handleUploadComplete} />
        </div>
      )}

      {resumes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
          <p className="text-gray-600 mb-6">Create your first professional resume or upload an existing one</p>
          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline"
              onClick={() => setShowUpload(true)}
            >
              Upload Resume
            </Button>
            <Button onClick={() => router.push('/builder/new')}>
              Create New Resume
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {resume.content.personalInfo?.fullName || 'Untitled Resume'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Template: {resume.template}
                  </p>
                  {getResumeStatus(resume)}
                </div>
                {resume.content.personalInfo?.profileImage && (
                  <img
                    src={resume.content.personalInfo.profileImage}
                    alt={resume.content.personalInfo.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                Updated: {formatDate(resume.updatedAt)}
              </p>
              
              {/* Subscription Warning */}
              {getSubscriptionWarning(resume)}
              
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/builder/${resume.id}`)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant={getDownloadButtonVariant(resume)}
                  size="sm"
                  onClick={() => handleDownloadClick(resume)}
                  disabled={exporting === resume.id || !downloadChecks[resume.id]}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {getDownloadButtonText(resume)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteResume(resume.id, resume.content.personalInfo?.fullName || 'Untitled Resume')}
                  disabled={deleting === resume.id}
                  className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                >
                  {deleting === resume.id ? (
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}