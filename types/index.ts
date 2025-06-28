export interface PersonalInfo {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
    linkedin?: string
    portfolio?: string
  }
  
  export interface Education {
    id: string
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
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

export interface ResumeData {
  personalInfo: PersonalInfo
  professionalSummary: string
  education: Education[]
  experience: Experience[]
  skills: string[]
  projects?: Project[]
  certifications?: string[]
  achievements?: string[]
  coursework?: string[]
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