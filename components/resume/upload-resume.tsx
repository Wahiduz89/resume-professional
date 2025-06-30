// components/resume/upload-resume.tsx
'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, FileText, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface UploadResumeProps {
  onUploadComplete?: (data: any) => void
}

export function UploadResume({ onUploadComplete }: UploadResumeProps) {
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a PDF or Word document')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB')
      return
    }

    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      // This is a placeholder for the actual upload logic
      // You would need to implement an API endpoint to parse the resume
      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const parsedData = await response.json()
        toast.success('Resume uploaded and parsed successfully!')
        onUploadComplete?.(parsedData)
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        toast.error('Failed to parse resume. Please try creating a new one.')
      }
    } catch (error) {
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!selectedFile ? (
          <>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
            <p className="text-gray-600 mb-4">
              Upload your existing resume to enhance it with AI
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Select File
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={removeFile}
                className="ml-4 text-red-600 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {uploading ? 'Processing...' : 'Upload & Enhance'}
              </Button>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                Change File
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Pro Tip:</h4>
        <p className="text-sm text-blue-800">
          Our AI will analyze your uploaded resume and suggest improvements for better ATS compatibility 
          and professional appeal. You can then edit and enhance it further.
        </p>
      </div>
    </div>
  )
}