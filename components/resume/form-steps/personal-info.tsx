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

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      
      <Input
        placeholder="Full Name *"
        value={data.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="email"
          placeholder="Email *"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
        
        <Input
          type="tel"
          placeholder="Phone (e.g., +91 98765 43210) *"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          required
        />
      </div>
      
      <Input
        placeholder="Address"
        value={data.address}
        onChange={(e) => handleChange('address', e.target.value)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="City *"
          value={data.city}
          onChange={(e) => handleChange('city', e.target.value)}
          required
        />
        
        <Input
          placeholder="State *"
          value={data.state}
          onChange={(e) => handleChange('state', e.target.value)}
          required
        />
        
        <Input
          placeholder="PIN Code"
          value={data.pincode}
          onChange={(e) => handleChange('pincode', e.target.value)}
          pattern="[0-9]{6}"
          maxLength={6}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="LinkedIn URL (Optional)"
          value={data.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
        />
        
        <Input
          placeholder="Portfolio URL (Optional)"
          value={data.portfolio || ''}
          onChange={(e) => handleChange('portfolio', e.target.value)}
        />
      </div>
    </div>
  )
}