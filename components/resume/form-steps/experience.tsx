// components/resume/form-steps/experience.tsx - Fixed to show form by default
import React, { useState, useEffect } from 'react'
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

  // Initialize with one empty experience entry if none exist
  useEffect(() => {
    if (data.experience.length === 0) {
      const initialExperience: Experience = {
        id: Date.now().toString(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
      onChange({ experience: [initialExperience] })
    }
  }, [data.experience.length, onChange])

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
    // Prevent deleting the last experience entry
    if (data.experience.length > 1) {
      onChange({
        experience: data.experience.filter(exp => exp.id !== id)
      })
    } else {
      // Reset the single entry instead of deleting it
      const resetExperience: Experience = {
        id: Date.now().toString(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
      onChange({ experience: [resetExperience] })
    }
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
        <div>
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add your work experience, internships, and relevant projects
          </p>
        </div>
        <Button onClick={addExperience} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {data.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <Input
                  placeholder="e.g., Software Engineer, Marketing Intern"
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <Input
                  placeholder="e.g., Google, Microsoft, Startup Inc"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <Input
                placeholder="City, State/Country"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <Input
                  type="month"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
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
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Job Description *
              </label>
              <textarea
                placeholder="Describe your responsibilities, achievements, and impact. Use bullet points for better readability..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                className="w-full p-3 border rounded-lg resize-none h-24"
                required
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
                  disabled={data.experience.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Experience Tips:</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• Use action verbs to start each bullet point (Led, Developed, Managed, Created)</p>
          <p>• Quantify achievements with numbers, percentages, or timeframes</p>
          <p>• Focus on results and impact rather than just duties</p>
          <p>• Include internships, part-time jobs, and volunteer work</p>
          <p>• Use the AI Enhance feature to improve your descriptions professionally</p>
        </div>
      </div>
    </div>
  )
}