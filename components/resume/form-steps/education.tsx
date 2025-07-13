import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Education } from '@/types'
import { Plus, Trash2 } from 'lucide-react'

interface EducationStepProps {
  data: { education: Education[] }
  onChange: (data: { education: Education[] }) => void
}

const DEGREE_OPTIONS = [
  // High School
  'High School Diploma',
  'Higher Secondary Certificate (HSC)',
  'Senior Secondary Certificate',
  
  // Undergraduate Degrees
  'Bachelor of Arts (BA)',
  'Bachelor of Science (BSc)',
  'Bachelor of Commerce (BCom)',
  'Bachelor of Engineering (BE)',
  'Bachelor of Technology (BTech)',
  'Bachelor of Computer Applications (BCA)',
  'Bachelor of Business Administration (BBA)',
  'Bachelor of Fine Arts (BFA)',
  'Bachelor of Architecture (BArch)',
  'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
  'Bachelor of Dental Surgery (BDS)',
  'Bachelor of Pharmacy (BPharm)',
  'Bachelor of Education (BEd)',
  'Bachelor of Law (LLB)',
  'Bachelor of Design (BDes)',
  'Bachelor of Social Work (BSW)',
  'Bachelor of Journalism and Mass Communication (BJMC)',
  'Bachelor of Hotel Management (BHM)',
  
  // Postgraduate Degrees
  'Master of Arts (MA)',
  'Master of Science (MSc)',
  'Master of Commerce (MCom)',
  'Master of Engineering (ME)',
  'Master of Technology (MTech)',
  'Master of Computer Applications (MCA)',
  'Master of Business Administration (MBA)',
  'Master of Fine Arts (MFA)',
  'Master of Architecture (MArch)',
  'Master of Medicine (MD)',
  'Master of Surgery (MS)',
  'Master of Dental Surgery (MDS)',
  'Master of Pharmacy (MPharm)',
  'Master of Education (MEd)',
  'Master of Law (LLM)',
  'Master of Design (MDes)',
  'Master of Social Work (MSW)',
  'Master of Journalism and Mass Communication (MJMC)',
  'Master of Hotel Management (MHM)',
  'Master of Public Health (MPH)',
  'Master of Library and Information Science (MLISc)',
  
  // Doctoral Degrees
  'Doctor of Philosophy (PhD)',
  'Doctor of Medicine (DM)',
  'Master of Chirurgiae (MCh)',
  'Doctor of Science (DSc)',
  'Doctor of Literature (DLitt)',
  
  // Diploma and Certificate Programs
  'Diploma in Engineering',
  'Diploma in Computer Applications',
  'Diploma in Business Management',
  'Diploma in Hotel Management',
  'Diploma in Pharmacy',
  'Diploma in Education',
  'Post Graduate Diploma (PGD)',
  'Advanced Diploma',
  'Certificate Course',
  
  // Professional Degrees
  'Chartered Accountancy (CA)',
  'Company Secretary (CS)',
  'Cost and Management Accountancy (CMA)',
  'Certified Financial Planner (CFP)',
  'Fellow of Institute of Chartered Accountants (FCA)',
  
  // Other
  'Other'
] as const

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
      current: false,
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree/Course *
                </label>
                <select
                  value={edu.degree || ''}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Degree/Course</option>
                  {DEGREE_OPTIONS.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution/University *
                </label>
                <Input
                  placeholder="Institution/University"
                  value={edu.institution || ''}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location (City, State)
              </label>
              <Input
                placeholder="Location (City, State)"
                value={edu.location || ''}
                onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <Input
                  type="month"
                  placeholder="Start Date"
                  value={edu.startDate || ''}
                  onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
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
                    value={edu.endDate || ''}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    disabled={edu.current}
                  />
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={edu.current || false}
                      onChange={(e) => updateEducation(edu.id, { 
                        current: e.target.checked,
                        endDate: e.target.checked ? '' : edu.endDate
                      })}
                      className="mr-2"
                    />
                    Currently studying here
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CGPA/Percentage
                </label>
                <Input
                  placeholder="CGPA/Percentage"
                  value={edu.percentage || ''}
                  onChange={(e) => updateEducation(edu.id, { percentage: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Additional Details (Optional)
              </label>
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

      {data.education.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Education Tips:</h4>
          <div className="text-sm text-green-800 space-y-1">
            <p>• List your most recent education first</p>
            <p>• Include your CGPA or percentage if it strengthens your application</p>
            <p>• Mention relevant coursework, projects, or achievements in additional details</p>
            <p>• For ongoing education, check "Currently studying here" and leave end date empty</p>
            <p>• Use "Expected [Year]" in additional details for anticipated graduation dates</p>
          </div>
        </div>
      )}
    </div>
  )
}