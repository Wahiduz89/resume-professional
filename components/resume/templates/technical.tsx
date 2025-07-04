// components/resume/templates/technical.tsx - Technical template for engineering students
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

    // Filter out empty categories
    return Object.fromEntries(
      Object.entries(categories).filter(([_, items]) => items.length > 0)
    )
  }

  const skillCategories = categorizeSkills(skills)

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white shadow-2xl overflow-hidden relative print:shadow-none">
      {/* Technical Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10h20M10 0v20M5 5h10v10H5z" stroke="#1e40af" strokeWidth="0.5" fill="none"/>
                <circle cx="5" cy="5" r="1" fill="#1e40af"/>
                <circle cx="15" cy="15" r="1" fill="#1e40af"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>

      {/* Header Section - Tech Focused */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/70 via-indigo-800/50 to-purple-800/30"></div>
        
        {/* Code-like decorative elements */}
        <div className="absolute top-4 right-4 text-green-400 opacity-20 font-mono text-xs">
          <div>&lt;Developer/&gt;</div>
          <div className="mt-1">console.log("Hello World!");</div>
        </div>

        <div className="relative z-20 px-12 py-12">
          <div className="flex items-center justify-between">
            {/* Left: Profile and Developer Info */}
            <div className="flex items-center space-x-8">
              {/* Technical Profile Image */}
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-lg opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"></div>
                
                <ProfileImage
                  src={personalInfo.profileImage || ''}
                  alt={personalInfo.fullName}
                  className="relative w-32 h-32 rounded-lg border-2 border-white/30 object-cover shadow-2xl"
                  fallbackContent={
                    <div className="relative w-32 h-32 rounded-lg border-2 border-white/30 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">
                      <span className="text-white text-3xl font-bold font-mono tracking-wider">
                        &lt;{personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}/&gt;
                      </span>
                    </div>
                  }
                />
                
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-sm">⚡</span>
                </div>
              </div>
              
              {/* Name and Technical Title */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400 font-mono text-sm">&gt;</span>
                    <span className="text-blue-200 font-mono text-sm">const developer = {`{`}</span>
                  </div>
                  <h1 className="text-4xl font-black text-white tracking-wide font-mono ml-6">
                    {personalInfo.fullName.toUpperCase()}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 ml-6">
                    <span className="text-blue-200 font-mono text-sm">role:</span>
                    <span className="text-yellow-300 font-mono text-lg font-semibold">
                      "{experience.length > 0 ? experience[0].jobTitle : 'Software Engineer'}"
                    </span>
                  </div>
                  <div className="text-blue-200 font-mono text-sm mt-1">{`}`}</div>
                </div>
                
                {/* Tech Stack Badge */}
                <div className="flex items-center space-x-3">
                  <div className="h-px w-12 bg-gradient-to-r from-green-400 to-transparent"></div>
                  <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg border border-green-400/30">
                    <span className="text-green-400 text-xs font-mono font-bold tracking-widest">FULL-STACK DEVELOPER</span>
                  </div>
                  <div className="h-px w-12 bg-gradient-to-l from-green-400 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Right: Contact Terminal */}
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-green-400/30 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 text-xs">~/contact</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="text-green-400">$ cat contact.info</div>
                <div className="text-white">
                  <span className="text-blue-300">email:</span> <span className="text-yellow-300">"{personalInfo.email}"</span>
                </div>
                <div className="text-white">
                  <span className="text-blue-300">phone:</span> <span className="text-yellow-300">"{personalInfo.phone}"</span>
                </div>
                <div className="text-white">
                  <span className="text-blue-300">location:</span> <span className="text-yellow-300">"{personalInfo.city}, {personalInfo.state}"</span>
                </div>
                {personalInfo.linkedin && (
                  <div className="text-white">
                    <span className="text-blue-300">linkedin:</span> <span className="text-yellow-300 break-all">"{personalInfo.linkedin}"</span>
                  </div>
                )}
                {personalInfo.portfolio && (
                  <div className="text-white">
                    <span className="text-blue-300">portfolio:</span> <span className="text-yellow-300 break-all">"{personalInfo.portfolio}"</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 flex">
        {/* Left Technical Sidebar */}
        <div className="w-80 bg-gradient-to-b from-gray-50 via-blue-50 to-indigo-50 p-6 space-y-6 border-r-2 border-indigo-200">
          
          {/* Technical Skills by Category */}
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
              
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white text-sm font-mono">
                    {category === 'Programming Languages' ? '</>' : 
                     category === 'Frameworks & Libraries' ? '{}' :
                     category === 'Tools & Technologies' ? '⚙️' :
                     category === 'Databases' ? '🗄️' : '🔧'}
                  </span>
                </div>
                <h3 className="text-sm font-black text-gray-800 tracking-wide font-mono">{category.toUpperCase()}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-indigo-800 px-3 py-2 rounded-lg text-xs font-bold border border-indigo-200 hover:shadow-md transition-all duration-200 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                  <span className="text-white text-sm">🌍</span>
                </div>
                <h3 className="text-sm font-black text-gray-800 tracking-wide font-mono">LANGUAGES</h3>
              </div>
              
              <div className="space-y-3">
                {languages.map((language) => (
                  <div key={language.id} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-green-50 p-3 rounded-lg border border-gray-100">
                    <span className="text-xs font-bold text-gray-800 font-mono">{language.name}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-sm transition-all duration-300 ${
                            level <= (language.proficiency === 'Native' ? 4 : 
                                     language.proficiency === 'Advanced' ? 3 :
                                     language.proficiency === 'Intermediate' ? 2 : 1)
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm' 
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

        {/* Right Main Content */}
        <div className="flex-1 p-8 space-y-8 bg-white">
          
          {/* Professional Summary */}
          {professionalSummary && (
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-lg border-l-4 border-blue-500 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-blue-200 opacity-30 font-mono text-xs">
                // Professional Summary
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4 shadow-xl">
                  <span className="text-white text-lg font-mono">{ }</span>
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-wide font-mono">ABOUT_ME.md</h3>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-gray-700 leading-relaxed text-justify font-medium">
                  {professionalSummary}
                </p>
              </div>
            </div>
          )}

          {/* Projects Section - Highlighted for Technical Roles */}
          {projects && projects.length > 0 && (
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl flex items-center justify-center mr-4 shadow-xl">
                  <span className="text-white text-lg">🚀</span>
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-wide font-mono">PROJECTS_SHOWCASE</h3>
              </div>
              
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2 font-mono">{project.name}</h4>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex} 
                                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-2 py-1 rounded text-xs font-bold border border-purple-200 font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="ml-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-xs font-mono"
                        >
                          VIEW PROJECT →
                        </a>
                      )}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed font-medium">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-8 shadow-lg border-l-4 border-emerald-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center mr-4 shadow-xl">
                  <span className="text-white text-lg">🎓</span>
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-wide font-mono">EDUCATION_LOG</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1 font-mono">{edu.degree}</h4>
                        <p className="text-emerald-600 font-bold mb-1">{edu.institution}</p>
                        <p className="text-gray-600 font-medium text-sm">{edu.location}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-3 py-1 rounded-lg font-bold text-xs font-mono shadow-sm">
                          {edu.startDate} - {edu.endDate}
                        </div>
                        {edu.percentage && (
                          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-lg font-bold text-xs mt-2 font-mono shadow-sm">
                            {edu.percentage}
                          </div>
                        )}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 leading-relaxed mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 font-medium">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {experience.length > 0 && (
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-8 shadow-lg border-l-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-700 rounded-xl flex items-center justify-center mr-4 shadow-xl">
                  <span className="text-white text-lg">💼</span>
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-wide font-mono">WORK_EXPERIENCE</h3>
              </div>
              
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1 font-mono">{exp.jobTitle}</h4>
                        <p className="text-orange-600 font-bold mb-1">{exp.company}</p>
                        <p className="text-gray-600 font-medium text-sm">{exp.location}</p>
                      </div>
                      <div className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-3 py-1 rounded-lg font-bold text-xs ml-4 font-mono shadow-sm">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {exp.description.split('\n').map((line, index) => line.trim() && (
                        <div key={index} className="flex items-start bg-gradient-to-r from-gray-50 to-orange-50 p-3 rounded-lg border border-gray-200 shadow-sm">
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed font-medium flex-1">{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl p-8 shadow-lg border-l-4 border-yellow-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-xl flex items-center justify-center mr-4 shadow-xl">
                  <span className="text-white text-lg">🏆</span>
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-wide font-mono">CERTIFICATIONS</h3>
              </div>
              
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1 font-mono">{cert.name}</h4>
                        <p className="text-yellow-600 font-bold mb-1">{cert.issuer}</p>
                        {cert.credentialId && (
                          <p className="text-gray-600 font-medium text-sm font-mono">ID: {cert.credentialId}</p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-lg text-xs font-bold font-mono shadow-sm">
                          Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          })}
                        </div>
                        {cert.expiryDate && (
                          <div className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-3 py-1 rounded-lg text-xs font-bold mt-2 font-mono shadow-sm">
                            Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    {cert.credentialUrl && (
                      <div className="mt-4">
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm font-mono"
                        >
                          🔗 VERIFY_CERTIFICATE
                        </a>
                      </div>
                    )}
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