// types/index.ts - Updated with current field for ongoing education
export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  linkedin: string
  portfolio: string
  profileImage?: string
  profileImagePublicId?: string // Added for Cloudinary deletion
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  current?: boolean // Added for ongoing education
  percentage?: string
  description?: string
}

export interface Experience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Project {
  name: string
  description: string
  technologies?: string[]
  link?: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native'
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  professionalSummary: string
  education: Education[]
  experience: Experience[]
  skills: string[]
  projects?: Project[]
  certifications: Certification[]
  achievements?: string[]
  coursework?: string[]
  languages: Language[]
  template: 'corporate' | 'technical' | 'general' | 'fresher' | 'internship'
}

export interface Resume {
  id: string
  userId: string
  template: string
  content: ResumeData
  createdAt: Date
  updatedAt: Date
}