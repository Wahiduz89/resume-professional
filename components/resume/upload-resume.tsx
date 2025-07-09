// components/resume/upload-resume.tsx - Updated production-ready upload component
'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Upload, FileText, X, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

interface UploadResumeProps {
  onUploadComplete?: (resumeId: string, data: any) => void
}

interface ParseResult {
  success: boolean
  resumeId?: string
  confidence?: number
  extractedSections?: {
    personalInfo: boolean
    education: boolean
    experience: boolean
    skills: boolean
    languages: boolean
    certifications: boolean
  }
  data?: any
  error?: string
}

export function UploadResume({ onUploadComplete }: UploadResumeProps) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Reset previous results
    setParseResult(null)

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a PDF or Word document')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB')
      return
    }

    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result = await response.json()

      if (response.ok && result.success) {
        setParseResult({
          success: true,
          resumeId: result.resumeId,
          confidence: result.confidence,
          extractedSections: result.extractedSections,
          data: result.data
        })

        toast.success(`Resume parsed successfully! Confidence: ${Math.round(result.confidence || 85)}%`)
        
        // Call onUploadComplete if provided
        if (onUploadComplete) {
          onUploadComplete(result.resumeId, result.data)
        }
      } else {
        setParseResult({
          success: false,
          error: result.error || 'Failed to parse resume'
        })
        toast.error(result.error || 'Failed to parse resume')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setParseResult({
        success: false,
        error: 'Network error. Please check your connection and try again.'
      })
      toast.error('Network error. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleEditResume = () => {
    if (parseResult?.resumeId) {
      router.push(`/builder/${parseResult.resumeId}`)
    }
  }

  const handleStartOver = () => {
    setSelectedFile(null)
    setParseResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return '📄'
    }
    return '📝'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Show success state
  if (parseResult?.success) {
    return (
      <div className="w-full">
        <div className="border-2 border-green-300 bg-green-50 rounded-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">
            Resume Parsed Successfully!
          </h3>
          <p className="text-green-700 mb-6">
            We've extracted information from your resume. Review and edit it to make it perfect.
          </p>

          {/* Parsing Results Summary */}
          {parseResult.extractedSections && (
            <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
              <h4 className="font-medium text-gray-900 mb-3">Extracted Information:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {Object.entries(parseResult.extractedSections).map(([section, extracted]) => (
                  <div key={section} className="flex items-center gap-2">
                    {extracted ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={extracted ? 'text-green-700' : 'text-gray-500'}>
                      {section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {parseResult.confidence && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Parsing Confidence: {Math.round(parseResult.confidence)}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${parseResult.confidence}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleEditResume}
              className="bg-green-600 hover:bg-green-700"
            >
              Edit & Customize Resume
            </Button>
            <Button
              variant="outline"
              onClick={handleStartOver}
            >
              Upload Different Resume
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (parseResult?.success === false) {
    return (
      <div className="w-full">
        <div className="border-2 border-red-300 bg-red-50 rounded-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-900 mb-2">
            Parsing Failed
          </h3>
          <p className="text-red-700 mb-6">
            {parseResult.error || 'We couldn\'t extract information from your resume.'}
          </p>

          <div className="bg-white rounded-lg p-4 mb-6 border border-red-200">
            <h4 className="font-medium text-gray-900 mb-2">Troubleshooting Tips:</h4>
            <ul className="text-sm text-gray-700 text-left space-y-1">
              <li>• Ensure your resume is in PDF or Word format</li>
              <li>• Check that the text is selectable (not just an image)</li>
              <li>• Try a different file format (PDF usually works best)</li>
              <li>• Make sure the file isn't password protected</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleStartOver}
              className="bg-red-600 hover:bg-red-700"
            >
              Try Different File
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/builder/new')}
            >
              Create From Scratch
            </Button>
          </div>
        </div>
      </div>
    )
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
          disabled={uploading}
        />

        {!selectedFile ? (
          <>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Your Existing Resume</h3>
            <p className="text-gray-600 mb-4">
              Our AI will extract information and help you create an improved version
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Resume File
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: PDF, DOC, DOCX (Max 10MB)
            </p>
          </>
        ) : (
          <div className="space-y-4">
            {/* File Info */}
            <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">{getFileIcon(selectedFile.name)}</span>
              <div className="text-left flex-1">
                <p className="font-medium truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                onClick={handleStartOver}
                disabled={uploading}
                className="text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">
                    Parsing your resume... {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  This usually takes 10-30 seconds depending on file size
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            {!uploading && (
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleUpload}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Parse Resume
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change File
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Information Box */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>1. Upload your existing resume in PDF or Word format</p>
          <p>2. Our AI will extract and organize your information</p>
          <p>3. Review and edit the extracted data</p>
          <p>4. Choose from our professional templates</p>
          <p>5. Download your improved, ATS-friendly resume</p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mt-4 p-3 bg-gray-50 rounded border-l-4 border-green-400">
        <p className="text-sm text-gray-700">
          <span className="font-medium text-green-700">🔒 Privacy Protected:</span> Your resume data is processed securely and never stored by third-party services.
        </p>
      </div>
    </div>
  )
}