'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus, Download, Edit } from 'lucide-react'
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
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Button onClick={() => router.push('/builder/new')}>
          <Plus className="w-4 h-4 mr-2" /> Create New Resume
        </Button>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
          <p className="text-gray-600 mb-6">Create your first professional resume</p>
          <Button onClick={() => router.push('/builder/new')}>
            Get Started
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2">
                {resume.content.personalInfo?.fullName || 'Untitled Resume'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Template: {resume.template}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Updated: {formatDate(resume.updatedAt)}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/builder/${resume.id}`)}
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportPDF(resume.id)}
                  disabled={exporting === resume.id}
                >
                  <Download className="w-4 h-4 mr-1" />
                  {exporting === resume.id ? 'Exporting...' : 'Export PDF'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}