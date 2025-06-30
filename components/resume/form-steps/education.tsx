import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Education } from '@/types'
import { Plus, Trash2 } from 'lucide-react'

interface EducationStepProps {
  data: { education: Education[] }
  onChange: (data: { education: Education[] }) => void
}

export const EducationStep: React.FC<EducationStepProps> = ({ 
  data, 
  onChange 
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      percentage: '',
      description: ''
    }
    onChange({ education: [...data.education, newEducation] })
  }

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange({
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, ...updates } : edu
      )
    })
  }

  const deleteEducation = (id: string) => {
    onChange({
      education: data.education.filter(edu => edu.id !== id)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add your educational qualifications, starting with the most recent
          </p>
        </div>
        <Button onClick={addEducation} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" /> Add Education
        </Button>
      </div>

      {data.education.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No education added yet</p>
          <Button onClick={addEducation}>Add Your Education</Button>
        </div>
      ) : (
        data.education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Degree/Course *"
                value={edu.degree || ''}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
              />
              <Input
                placeholder="Institution/University *"
                value={edu.institution || ''}
                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
              />
            </div>

            <Input
              placeholder="Location (City, State)"
              value={edu.location || ''}
              onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                type="month"
                placeholder="Start Date"
                value={edu.startDate || ''}
                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
              />
              <Input
                type="month"
                placeholder="End Date"
                value={edu.endDate || ''}
                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
              />
              <Input
                placeholder="CGPA/Percentage"
                value={edu.percentage || ''}
                onChange={(e) => updateEducation(edu.id, { percentage: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <textarea
                placeholder="Additional details (achievements, relevant coursework, etc.)"
                value={edu.description || ''}
                onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                className="w-full p-3 border rounded-lg resize-none h-20"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteEducation(edu.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}