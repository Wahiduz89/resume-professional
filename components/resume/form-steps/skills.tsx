import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

interface SkillsStepProps {
  data: { 
    skills: string[]
    professionalSummary: string
    personalInfo?: any
    experience?: any[]
  }
  onChange: (data: any) => void
}

export const SkillsStep: React.FC<SkillsStepProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('')
  const [generating, setGenerating] = useState(false)

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      onChange({ 
        ...data, 
        skills: [...data.skills, newSkill.trim()] 
      })
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange({ 
      ...data, 
      skills: data.skills.filter(skill => skill !== skillToRemove) 
    })
  }

  const generateSummary = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'summary',
          data: {
            personalInfo: data.personalInfo || {},
            experience: data.experience || [],
            skills: data.skills
          }
        })
      })

      if (response.ok) {
        const { summary } = await response.json()
        onChange({ ...data, professionalSummary: summary })
        toast.success('Professional summary generated!')
      }
    } catch (error) {
      toast.error('Failed to generate summary')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a skill (e.g., React, Project Management)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          />
          <Button onClick={addSkill}>Add</Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {data.skills.length === 0 && (
          <p className="text-gray-500 text-sm">
            Add skills relevant to your target job
          </p>
        )}
      </div>

      {/* Professional Summary Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Professional Summary</h2>
          <Button
            variant="outline"
            onClick={generateSummary}
            disabled={generating || data.skills.length === 0}
          >
            <Sparkles className="w-4 h-4 mr-1" />
            {generating ? 'Generating...' : 'AI Generate'}
          </Button>
        </div>

        <textarea
          placeholder="Write a brief professional summary or use AI to generate one..."
          value={data.professionalSummary || ''}
          onChange={(e) => onChange({ ...data, professionalSummary: e.target.value })}
          className="w-full p-3 border rounded-lg resize-none h-32"
        />

        <p className="text-sm text-gray-600 mt-2">
          This summary will appear at the top of your resume. Keep it concise and impactful.
        </p>
      </div>
    </div>
  )
}