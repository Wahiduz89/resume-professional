import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Experience } from '@/types'
import { Sparkles, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface ExperienceStepProps {
  data: { experience: Experience[] }
  onChange: (data: { experience: Experience[] }) => void
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({ 
  data, 
  onChange 
}) => {
  const [enhancing, setEnhancing] = useState<string | null>(null)

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    onChange({ experience: [...data.experience, newExp] })
  }

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange({
      experience: data.experience.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      )
    })
  }

  const deleteExperience = (id: string) => {
    onChange({
      experience: data.experience.filter(exp => exp.id !== id)
    })
  }

  const enhanceDescription = async (exp: Experience) => {
    if (!exp.description || !exp.jobTitle || !exp.company) {
      toast.error('Please fill in all fields before enhancing')
      return
    }

    setEnhancing(exp.id)
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'experience',
          data: {
            jobTitle: exp.jobTitle,
            company: exp.company,
            description: exp.description
          }
        })
      })

      if (response.ok) {
        const { enhanced } = await response.json()
        updateExperience(exp.id, { description: enhanced })
        toast.success('Description enhanced!')
      }
    } catch (error) {
      toast.error('Enhancement failed')
    } finally {
      setEnhancing(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <Button onClick={addExperience} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" /> Add Experience
        </Button>
      </div>

      {data.experience.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No experience added yet</p>
          <Button onClick={addExperience}>Add Your First Experience</Button>
        </div>
      ) : (
        data.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Job Title *"
                value={exp.jobTitle}
                onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
              />
              <Input
                placeholder="Company *"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
              />
            </div>

            <Input
              placeholder="Location"
              value={exp.location}
              onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                type="month"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
              />
              <div className="space-y-2">
                <Input
                  type="month"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  disabled={exp.current}
                />
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, { 
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : exp.endDate
                    })}
                    className="mr-2"
                  />
                  Currently working here
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <textarea
                placeholder="Describe your responsibilities and achievements..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                className="w-full p-3 border rounded-lg resize-none h-24"
              />
              <div className="flex justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => enhanceDescription(exp)}
                  disabled={enhancing === exp.id}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  {enhancing === exp.id ? 'Enhancing...' : 'AI Enhance'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteExperience(exp.id)}
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