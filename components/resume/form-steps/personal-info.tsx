// components/resume/form-steps/personal-info.tsx - Updated with guest Cloudinary support
import React, { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PersonalInfo } from '@/types'
import { Upload, X, User, Clock, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { nanoid } from 'nanoid'

interface PersonalInfoStepProps {
  data: { personalInfo: PersonalInfo }
  onChange: (data: { personalInfo: PersonalInfo }) => void
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ 
  data, 
  onChange 
}) => {
  const { data: session } = useSession()
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [isGuestImage, setIsGuestImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize session ID for guest users
  useEffect(() => {
    if (!session && !sessionId) {
      const storedSessionId = localStorage.getItem('guest_session_id')
      if (storedSessionId) {
        setSessionId(storedSessionId)
      } else {
        const newSessionId = nanoid()
        setSessionId(newSessionId)
        localStorage.setItem('guest_session_id', newSessionId)
      }
    }
  }, [session, sessionId])

  // Check if current image is a guest image
  useEffect(() => {
    const checkIfGuestImage = () => {
      if (data.personalInfo?.profileImagePublicId) {
        setIsGuestImage(data.personalInfo.profileImagePublicId.includes('guest_'))
      }
    }
    checkIfGuestImage()
  }, [data.personalInfo?.profileImagePublicId])

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ 
      personalInfo: { 
        ...data.personalInfo, 
        [field]: value 
      } 
    })
  }

  const handleMultipleChanges = (updates: Partial<PersonalInfo>) => {
    onChange({ 
      personalInfo: { 
        ...data.personalInfo, 
        ...updates 
      } 
    })
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      let uploadUrl = '/api/upload/profile-image'
      
      // Use guest upload for non-authenticated users
      if (!session) {
        uploadUrl = '/api/upload/guest-image'
        formData.append('sessionId', sessionId)
      }

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        
        handleMultipleChanges({
          profileImage: result.url,
          profileImagePublicId: result.publicId
        })
        
        if (!session) {
          setIsGuestImage(true)
          toast.success('Profile image uploaded! (Sign in to make it permanent)')
        } else {
          setIsGuestImage(false)
          toast.success('Profile image uploaded successfully!')
        }
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = async () => {
    if (data.personalInfo?.profileImagePublicId) {
      setDeleting(true)
      try {
        const deleteUrl = session ? '/api/upload/profile-image' : '/api/upload/guest-image'
        const response = await fetch(
          `${deleteUrl}?publicId=${encodeURIComponent(data.personalInfo.profileImagePublicId)}`,
          {
            method: 'DELETE'
          }
        )

        if (!response.ok) {
          console.error('Failed to delete image from Cloudinary')
        }
      } catch (error) {
        console.error('Error deleting image:', error)
      } finally {
        setDeleting(false)
      }
    }
    
    handleMultipleChanges({
      profileImage: '',
      profileImagePublicId: ''
    })
    
    setIsGuestImage(false)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    toast.success('Profile image removed')
  }

  const transferGuestImage = async () => {
    if (!session || !data.personalInfo?.profileImagePublicId || !isGuestImage) {
      return
    }

    try {
      const response = await fetch('/api/upload/transfer-guest-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestPublicId: data.personalInfo.profileImagePublicId
        })
      })

      if (response.ok) {
        const result = await response.json()
        
        handleMultipleChanges({
          profileImage: result.url,
          profileImagePublicId: result.publicId
        })
        
        setIsGuestImage(false)
        toast.success('Profile image transferred to your account!')
      } else {
        console.error('Failed to transfer guest image')
      }
    } catch (error) {
      console.error('Error transferring guest image:', error)
    }
  }

  // Transfer guest image when user signs in
  useEffect(() => {
    if (session && isGuestImage && data.personalInfo?.profileImagePublicId) {
      transferGuestImage()
    }
  }, [session, isGuestImage])

  // Ensure all values are strings to prevent controlled/uncontrolled switching
  const safeData = {
    fullName: data.personalInfo?.fullName || '',
    email: data.personalInfo?.email || '',
    phone: data.personalInfo?.phone || '',
    address: data.personalInfo?.address || '',
    city: data.personalInfo?.city || '',
    state: data.personalInfo?.state || '',
    pincode: data.personalInfo?.pincode || '',
    linkedin: data.personalInfo?.linkedin || '',
    portfolio: data.personalInfo?.portfolio || '',
    profileImage: data.personalInfo?.profileImage || '',
    profileImagePublicId: data.personalInfo?.profileImagePublicId || '',
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      
      {/* Profile Image Upload Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Profile Photo</h3>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            {safeData.profileImage ? (
              <div className="relative">
                <img
                  src={safeData.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  onError={(e) => {
                    console.error('Image failed to load:', safeData.profileImage)
                    toast.error('Failed to load profile image')
                    handleMultipleChanges({
                      profileImage: '',
                      profileImagePublicId: ''
                    })
                  }}
                />
                
                {/* Guest Image Indicator */}
                {isGuestImage && (
                  <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full p-1" title="Temporary guest image">
                    <Clock className="w-3 h-3" />
                  </div>
                )}
                
                {/* Authenticated Image Indicator */}
                {!isGuestImage && session && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1" title="Saved to your account">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                )}
                
                <button
                  onClick={removeImage}
                  disabled={deleting}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Remove image"
                >
                  {deleting ? (
                    <div className="w-3 h-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <X className="w-3 h-3" />
                  )}
                </button>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || deleting}
              className="mb-2"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </Button>
            
            <p className="text-sm text-gray-600">
              Recommended: Square image, max 5MB (JPG, PNG, WebP)
            </p>
            
            {/* Image Status Messages */}
            {safeData.profileImage && (
              <div className="mt-2">
                {isGuestImage ? (
                  <p className="text-xs text-orange-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Temporary image - Sign in to make it permanent
                  </p>
                ) : session ? (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Image saved to your account
                  </p>
                ) : (
                  <p className="text-xs text-blue-600">
                    Image uploaded successfully
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <Input
          placeholder="Full Name *"
          value={safeData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            placeholder="Email *"
            value={safeData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
          
          <Input
            type="tel"
            placeholder="Phone (e.g., +91 98765 43210) *"
            value={safeData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
        </div>
        
        <Input
          placeholder="Address"
          value={safeData.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="City *"
            value={safeData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            required
          />
          
          <Input
            placeholder="State *"
            value={safeData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            required
          />
          
          <Input
            placeholder="PIN Code"
            value={safeData.pincode}
            onChange={(e) => handleChange('pincode', e.target.value)}
            pattern="[0-9]{6}"
            maxLength={6}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="LinkedIn URL (Optional)"
            value={safeData.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
          
          <Input
            placeholder="Portfolio URL (Optional)"
            value={safeData.portfolio}
            onChange={(e) => handleChange('portfolio', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}