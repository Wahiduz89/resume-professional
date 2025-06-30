import React from 'react'
import { Input } from '@/components/ui/input'
import { PersonalInfo } from '@/types'

interface PersonalInfoStepProps {
  data: PersonalInfo
  onChange: (data: PersonalInfo) => void
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ 
  data, 
  onChange 
}) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value })
  }

  // Ensure all values are strings to prevent controlled/uncontrolled switching
  const safeData = {
    fullName: data.fullName || '',
    email: data.email || '',
    phone: data.phone || '',
    address: data.address || '',
    city: data.city || '',
    state: data.state || '',
    pincode: data.pincode || '',
    linkedin: data.linkedin || '',
    portfolio: data.portfolio || '',
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      
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
  )
}