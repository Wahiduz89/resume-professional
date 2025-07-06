// components/resume/templates/technical.tsx - Fixed technical template for proper A4 display
import React from 'react'
import { ResumeData } from '@/types'
import { ProfileImage } from '../profile-image'

interface TemplateProps {
  data: ResumeData
}

export const TechnicalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, experience, skills, projects, languages, certifications } = data

  // Group skills into categories for better technical display
  const categorizeSkills = (skillsList: string[]) => {
    const categories = {
      'Programming Languages': [] as string[],
      'Frameworks & Libraries': [] as string[],
      'Tools & Technologies': [] as string[],
      'Databases': [] as string[],
      'Other': [] as string[]
    }

    const programmingKeywords = ['javascript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'kotlin', 'swift', 'typescript', 'php', 'ruby', 'scala', 'r', 'matlab', 'c', 'dart', 'perl', 'shell', 'bash']
    const frameworkKeywords = ['react', 'vue', 'angular', 'node', 'express', 'django', 'flask', 'spring', 'laravel', 'fastapi', 'next', 'nuxt', 'svelte', 'bootstrap', 'tailwind', 'mui', 'ant design']
    const toolKeywords = ['git', 'docker', 'kubernetes', 'jenkins', 'terraform', 'aws', 'azure', 'gcp', 'linux', 'nginx', 'apache', 'redis', 'elasticsearch', 'grafana', 'prometheus', 'webpack', 'vite', 'babel']
    const databaseKeywords = ['mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle', 'cassandra', 'dynamodb', 'firebase', 'supabase']

    skillsList.forEach(skill => {
      const lowerSkill = skill.toLowerCase()
      if (programmingKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories['Programming Languages'].push(skill)
      } else if (frameworkKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories['Frameworks & Libraries'].push(skill)
      } else if (toolKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories['Tools & Technologies'].push(skill)
      } else if (databaseKeywords.some(keyword => lowerSkill.includes(keyword))) {
        categories['Databases'].push(skill)
      } else {
        categories['Other'].push(skill)
      }
    })

    return Object.fromEntries(
      Object.entries(categories).filter(([_, items]) => items.length > 0)
    )
  }

  const skillCategories = categorizeSkills(skills)

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white shadow-lg overflow-hidden relative print:shadow-none" style={{ width: '210mm', height: '297mm' }}>
    {/* Technical Header - Simplified */}
    <div className="relative">
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white p-6" style={{ height: '50mm' }}>
          <div className="flex items-center justify-between h-full">
            {/* Profile Section */}
            <div className="flex items-center gap-6">
              <ProfileImage
                src={personalInfo.profileImage || ''}
                alt={personalInfo.fullName}
                className="w-16 h-16 rounded-lg border-2 border-white object-cover"
                fallbackContent={
                  <div className="w-16 h-16 rounded-lg border-2 border-white bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      &lt;{personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}/&gt;
                    </span>
                  </div>
                }
              />
              
              <div>
                <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName.toUpperCase()}</h1>
                <p className="text-yellow-300 text-lg font-semibold">
                  {experience.length > 0 ? experience[0].jobTitle : 'Software Engineer'}
                </p>
                <div className="text-green-400 text-xs mt-1">&gt; Full-Stack Developer</div>
              </div>
            </div>

            {/* Contact Terminal */}
            <div className="bg-black bg-opacity-40 p-4 rounded border border-green-400 border-opacity-30 text-xs">
              <div className="text-green-400 mb-2">&gt; contact.info</div>
              <div className="space-y-1">
                <div><span className="text-blue-300">email:</span> <span className="text-yellow-300">"{personalInfo.email}"</span></div>
                <div><span className="text-blue-300">phone:</span> <span className="text-yellow-300">"{personalInfo.phone}"</span></div>
                <div><span className="text-blue-300">location:</span> <span className="text-yellow-300">"{personalInfo.city}, {personalInfo.state}"</span></div>
                {personalInfo.linkedin && personalInfo.linkedin.trim() !== '' && (
                  <div><span className="text-blue-300">linkedin:</span> <span className="text-yellow-300 break-all">"{personalInfo.linkedin}"</span></div>
                )}
                {personalInfo.portfolio && personalInfo.portfolio.trim() !== '' && (
                  <div><span className="text-blue-300">portfolio:</span> <span className="text-yellow-300 break-all">"{personalInfo.portfolio}"</span></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex" style={{ height: '247mm' }}>
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-gray-50 to-blue-50 p-4 border-r-2 border-indigo-200">
          
          {/* Technical Skills Categories */}
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <div key={category} className="mb-4">
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded flex items-center justify-center mr-2">
                    <span className="text-white text-xs">
                      {category === 'Programming Languages' ? '</>' : 
                       category === 'Frameworks & Libraries' ? '{}' :
                       category === 'Tools & Technologies' ? '⚙' :
                       category === 'Databases' ? '🗄' : '🔧'}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-800">{category.replace(' & ', ' &\n')}</h3>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {categorySkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-bold border border-indigo-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="mb-4">
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                <h3 className="text-xs font-bold text-gray-800 mb-2 flex items-center">
                  <span className="w-6 h-6 bg-green-600 rounded flex items-center justify-center mr-2 text-white text-xs">🌍</span>
                  LANGUAGES
                </h3>
                
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded border">
                    <span className="text-xs font-bold text-gray-800">{language.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-sm ${
                            level <= (language.proficiency === 'Native' ? 4 : 
                                     language.proficiency === 'Advanced' ? 3 :
                                     language.proficiency === 'Intermediate' ? 2 : 1)
                              ? 'bg-green-500' 
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-hidden">
          
          {/* Professional Summary */}
          {professionalSummary && (
            <div className="mb-4">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <span className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-2 text-white">{}</span>
                  ABOUT_ME.md
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{professionalSummary}</p>
              </div>
            </div>
          )}

          {/* Projects Showcase */}
          {projects && projects.length > 0 && (
            <div className="mb-4">
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center mr-2 text-white">🚀</span>
                  PROJECTS
                </h3>
                
                {projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="mb-3 p-3 bg-white rounded border">
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{project.name}</h4>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-700 text-xs leading-relaxed">{project.description.substring(0, 120)}...</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-4">
              <div className="bg-gradient-to-br from-white to-emerald-50 rounded-lg p-4 border-l-4 border-emerald-500">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center mr-2 text-white">🎓</span>
                  EDUCATION
                </h3>
                
                {education.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="mb-3 p-3 bg-white rounded border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{edu.degree}</h4>
                        <p className="text-emerald-600 font-bold text-xs">{edu.institution}</p>
                        <p className="text-gray-600 text-xs">{edu.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-bold">
                          {edu.startDate} - {edu.endDate}
                        </div>
                        {edu.percentage && (
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mt-1 font-bold">
                            {edu.percentage}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div className="mb-4">
              <div className="bg-gradient-to-br from-white to-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center mr-2 text-white">💼</span>
                  EXPERIENCE
                </h3>
                
                {experience.slice(0, 2).map((exp) => (
                  <div key={exp.id} className="mb-3 p-3 bg-white rounded border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{exp.jobTitle}</h4>
                        <p className="text-orange-600 font-bold text-xs">{exp.company}</p>
                        <p className="text-gray-600 text-xs">{exp.location}</p>
                      </div>
                      <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-700 leading-relaxed">
                      {exp.description.split('\n').slice(0, 2).map((line, index) => line.trim() && (
                        <div key={index} className="flex items-start mb-1">
                          <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                          <span>{line.substring(0, 80)}...</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <div className="bg-gradient-to-br from-white to-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center mr-2 text-white">🏆</span>
                  CERTIFICATIONS
                </h3>
                
                {certifications.slice(0, 2).map((cert) => (
                  <div key={cert.id} className="mb-2 p-3 bg-white rounded border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{cert.name}</h4>
                        <p className="text-yellow-600 font-bold text-xs">{cert.issuer}</p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                        {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}