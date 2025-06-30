// app/(dashboard)/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UploadResume } from '@/components/resume/upload-resume'
import { Plus, Download, Edit, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

interface Resume {
  id: string
  template: string
  content: any
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState<string | null>(null)
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resume')
      if (response.ok) {
        const data = await response.json()
        setResumes(data.resumes)
      }
    } catch (error) {
      toast.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  const exportPDF = async (resumeId: string) => {
    setExporting(resumeId)
    try {
      const response = await fetch('/api/resume/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId })
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
        toast.success('Resume exported successfully!')
      } else {
        const error = await response.json()
        if (error.error === 'Active subscription required') {
          router.push('/subscription')
        } else {
          toast.error('Export failed')
        }
      }
    } catch (error) {
      toast.error('Export failed')
    } finally {
      setExporting(null)
    }
  }

  const handleUploadComplete = (parsedData: any) => {
    // Handle the parsed resume data
    // You might want to create a new resume with the parsed data
    setShowUpload(false)
    fetchResumes()
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
                  <p className="text-sm text-gray-600">
                    Template: {resume.template}
                  </p>
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
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/builder/${resume.id}`)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportPDF(resume.id)}
                  disabled={exporting === resume.id}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {exporting === resume.id ? 'Exporting...' : 'Export'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}