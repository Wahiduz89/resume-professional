// components/resume/form-steps/languages.tsx - Fixed to show form by default
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Language } from '@/types'
import { Plus, Trash2, Globe } from 'lucide-react'

interface LanguagesStepProps {
  data: { languages: Language[] }
  onChange: (data: { languages: Language[] }) => void
}

const PROFICIENCY_LEVELS = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Native'
] as const

export const LanguagesStep: React.FC<LanguagesStepProps> = ({ 
  data, 
  onChange 
}) => {
  // Initialize with one empty language entry if none exist
  useEffect(() => {
    if (data.languages.length === 0) {
      const initialLanguage: Language = {
        id: Date.now().toString(),
        name: '',
        proficiency: 'Intermediate'
      }
      onChange({ languages: [initialLanguage] })
    }
  }, [data.languages.length, onChange])

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediate'
    }
    onChange({ languages: [...data.languages, newLanguage] })
  }

  const updateLanguage = (id: string, updates: Partial<Language>) => {
    onChange({
      languages: data.languages.map(lang =>
        lang.id === id ? { ...lang, ...updates } : lang
      )
    })
  }

  const deleteLanguage = (id: string) => {
    // Prevent deleting the last language entry
    if (data.languages.length > 1) {
      onChange({
        languages: data.languages.filter(lang => lang.id !== id)
      })
    } else {
      // Reset the single entry instead of deleting it
      const resetLanguage: Language = {
        id: Date.now().toString(),
        name: '',
        proficiency: 'Intermediate'
      }
      onChange({ languages: [resetLanguage] })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Languages
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Add languages you can speak, read, or write. Include your proficiency level.
          </p>
        </div>
        <Button onClick={addLanguage} size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" /> Add Language
        </Button>
      </div>

      <div className="space-y-4">
        {data.languages.map((language) => (
          <div key={language.id} className="border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language *
                </label>
                <Input
                  placeholder="e.g., English, Hindi, Tamil, Bengali"
                  value={language.name || ''}
                  onChange={(e) => updateLanguage(language.id, { name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proficiency Level *
                </label>
                <select
                  value={language.proficiency}
                  onChange={(e) => updateLanguage(language.id, { 
                    proficiency: e.target.value as Language['proficiency']
                  })}
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {PROFICIENCY_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Proficiency Guide:</span>
                <div className="mt-1">
                  <span className="text-xs">
                    Beginner: Basic phrases • Intermediate: Conversational • 
                    Advanced: Professional fluency • Native: Mother tongue
                  </span>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteLanguage(language.id)}
                className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                disabled={data.languages.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Tips for Language Section:</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• List languages in order of proficiency (strongest first)</p>
          <p>• Include both spoken and written proficiency if different</p>
          <p>• Be honest about your level - employers may test language skills</p>
          <p>• Consider adding certifications (IELTS, TOEFL, etc.) in the Certifications section</p>
          <p>• Include regional languages that are valuable in your target job market</p>
        </div>
      </div>
    </div>
  )
}