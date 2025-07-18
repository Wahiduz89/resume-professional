// components/resume/form-steps/certifications.tsx - Fixed to show form by default
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Certification } from '@/types'
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react'

interface CertificationsStepProps {
  data: { certifications: Certification[] }
  onChange: (data: { certifications: Certification[] }) => void
}

export const CertificationsStep: React.FC<CertificationsStepProps> = ({ 
  data, 
  onChange 
}) => {
  // Initialize with one empty certification entry if none exist
  useEffect(() => {
    if (data.certifications.length === 0) {
      const initialCertification: Certification = {
        id: Date.now().toString(),
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: ''
      }
      onChange({ certifications: [initialCertification] })
    }
  }, [data.certifications.length, onChange])

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: ''
    }
    onChange({ certifications: [...data.certifications, newCertification] })
  }

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    onChange({
      certifications: data.certifications.map(cert =>
        cert.id === id ? { ...cert, ...updates } : cert
      )
    })
  }

  const deleteCertification = (id: string) => {
    // Prevent deleting the last certification entry
    if (data.certifications.length > 1) {
      onChange({
        certifications: data.certifications.filter(cert => cert.id !== id)
      })
    } else {
      // Reset the single entry instead of deleting it
      const resetCertification: Certification = {
        id: Date.now().toString(),
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: ''
      }
      onChange({ certifications: [resetCertification] })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-6 h-6" />
            Certifications
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Add professional certifications, licenses, and training credentials to showcase your expertise.
          </p>
        </div>
        <Button onClick={addCertification} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" /> Add Certification
        </Button>
      </div>

      <div className="space-y-4">
        {data.certifications.map((certification) => (
          <div key={certification.id} className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certification Name *
                </label>
                <Input
                  placeholder="e.g., AWS Solutions Architect, PMP, Google Analytics"
                  value={certification.name || ''}
                  onChange={(e) => updateCertification(certification.id, { name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuing Organization *
                </label>
                <Input
                  placeholder="e.g., Amazon Web Services, PMI, Google"
                  value={certification.issuer || ''}
                  onChange={(e) => updateCertification(certification.id, { issuer: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Date *
                </label>
                <Input
                  type="month"
                  value={certification.issueDate || ''}
                  onChange={(e) => updateCertification(certification.id, { issueDate: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date (Optional)
                </label>
                <Input
                  type="month"
                  value={certification.expiryDate || ''}
                  onChange={(e) => updateCertification(certification.id, { expiryDate: e.target.value })}
                  placeholder="Leave blank if doesn't expire"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credential ID (Optional)
                </label>
                <Input
                  placeholder="e.g., Certificate number or ID"
                  value={certification.credentialId || ''}
                  onChange={(e) => updateCertification(certification.id, { credentialId: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credential URL (Optional)
                </label>
                <div className="relative">
                  <Input
                    placeholder="https://credentials.example.com/verify"
                    value={certification.credentialUrl || ''}
                    onChange={(e) => updateCertification(certification.id, { credentialUrl: e.target.value })}
                  />
                  {certification.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                {certification.expiryDate && (
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                    Expires: {new Date(certification.expiryDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                  </span>
                )}
                {!certification.expiryDate && certification.issueDate && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    No Expiry
                  </span>
                )}
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteCertification(certification.id)}
                className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                disabled={data.certifications.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Certification Tips:</h4>
        <div className="text-sm text-green-800 space-y-1">
          <p>• Include only relevant certifications for your target role</p>
          <p>• List the most recent and valuable certifications first</p>
          <p>• Add credential URLs for verification when available</p>
          <p>• Include certifications that are in progress or expiring soon</p>
          <p>• Consider grouping similar certifications from the same provider</p>
        </div>
      </div>
    </div>
  )
}