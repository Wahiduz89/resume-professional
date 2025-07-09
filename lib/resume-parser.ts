// lib/resume-parser.ts - Affinda resume parsing service integration
import { ResumeData, PersonalInfo, Education, Experience, Language, Certification } from '@/types'

// Affinda API configuration
const AFFINDA_CONFIG = {
  baseUrl: 'https://api.affinda.com/v3/resumes',
  headers: {
    'Authorization': `Bearer ${process.env.AFFINDA_API_KEY}`,
    'Content-Type': 'multipart/form-data'
  }
}

export interface ParsedResumeResponse {
  success: boolean
  data?: ResumeData
  error?: string
  confidence?: number
}

// Affinda parsing implementation
async function parseWithAffinda(fileBuffer: Buffer, fileName: string): Promise<ParsedResumeResponse> {
  try {
    // Validate API key
    if (!process.env.AFFINDA_API_KEY) {
      throw new Error('Affinda API key not configured')
    }

    const formData = new FormData()
    const blob = new Blob([fileBuffer], { 
      type: fileName.endsWith('.pdf') ? 'application/pdf' : 
           fileName.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
           'application/msword'
    })
    formData.append('file', blob, fileName)

    const response = await fetch(AFFINDA_CONFIG.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AFFINDA_API_KEY}`
      },
      body: formData
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Affinda API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    
    if (!result.data) {
      throw new Error('No data returned from Affinda API')
    }

    const parsedData = transformAffindaData(result.data)
    
    return {
      success: true,
      data: parsedData,
      confidence: result.meta?.confidence || 85
    }
  } catch (error) {
    console.error('Affinda parsing error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown parsing error'
    }
  }
}

// Transform Affinda response to our ResumeData format
function transformAffindaData(data: any): ResumeData {
  const personalInfo: PersonalInfo = {
    fullName: data.name ? `${data.name.first || ''} ${data.name.last || ''}`.trim() : '',
    email: data.emails?.[0] || '',
    phone: data.phoneNumbers?.[0] || '',
    address: data.location?.formatted || '',
    city: data.location?.city || '',
    state: data.location?.state || '',
    pincode: data.location?.postalCode || '',
    linkedin: data.urls?.find((url: string) => url.includes('linkedin')) || '',
    portfolio: data.urls?.find((url: string) => !url.includes('linkedin') && !url.includes('github')) || '',
    profileImage: ''
  }

  const education: Education[] = (data.education || []).map((edu: any, index: number) => ({
    id: `edu_${index}`,
    degree: edu.degree || '',
    institution: edu.institution || '',
    location: edu.location ? `${edu.location.city || ''}, ${edu.location.state || ''}`.trim() : '',
    startDate: formatDate(edu.startDate),
    endDate: formatDate(edu.endDate),
    percentage: edu.grade || '',
    description: edu.description || ''
  }))

  const experience: Experience[] = (data.workExperience || []).map((exp: any, index: number) => ({
    id: `exp_${index}`,
    jobTitle: exp.jobTitle || '',
    company: exp.organization || '',
    location: exp.location ? `${exp.location.city || ''}, ${exp.location.state || ''}`.trim() : '',
    startDate: formatDate(exp.startDate),
    endDate: formatDate(exp.endDate),
    current: exp.isCurrent || false,
    description: exp.jobDescription || ''
  }))

  const skills: string[] = (data.skills || []).map((skill: any) => 
    typeof skill === 'string' ? skill : skill.name || skill
  ).filter(Boolean)

  const languages: Language[] = (data.languages || []).map((lang: any, index: number) => ({
    id: `lang_${index}`,
    name: typeof lang === 'string' ? lang : lang.name || lang,
    proficiency: 'Intermediate' as const
  }))

  const certifications: Certification[] = (data.certifications || []).map((cert: any, index: number) => ({
    id: `cert_${index}`,
    name: cert.name || cert.title || '',
    issuer: cert.institution || cert.issuer || '',
    issueDate: formatDate(cert.date),
    expiryDate: '',
    credentialId: '',
    credentialUrl: ''
  }))

  return {
    personalInfo,
    professionalSummary: data.summary || '',
    education,
    experience,
    skills,
    projects: [],
    certifications,
    achievements: [],
    coursework: [],
    languages,
    template: 'fresher'
  }
}

// Utility functions
function formatDate(dateString: string): string {
  if (!dateString || dateString === 'Present' || dateString === 'Current') return ''
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    
    return date.toISOString().substr(0, 7) // Returns YYYY-MM format
  } catch {
    return ''
  }
}

// Main parsing function using Affinda
export async function parseResume(
  fileBuffer: Buffer, 
  fileName: string
): Promise<ParsedResumeResponse> {
  console.log(`Parsing resume with Affinda: ${fileName}`)
  
  return parseWithAffinda(fileBuffer, fileName)
}