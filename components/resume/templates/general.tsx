// components/resume/templates/general.tsx - Complete updated version
import React from 'react'
import { ResumeData } from '@/types'
import { ProfileImage } from '../profile-image'

interface TemplateProps {
  data: ResumeData
}

export const GeneralTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, experience, skills, languages, certifications } = data

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white shadow-2xl overflow-hidden relative print:shadow-none">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 transform rotate-45">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-80 h-80 transform -rotate-45">
          <div className="w-full h-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>

      {/* Sophisticated Header Section */}
      <div className="relative">
        {/* Multi-layer Header Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/80 via-indigo-800/60 to-purple-800/40"></div>
        <div className="absolute inset-0">
          <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="headerPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(30, 58, 138, 0.95)" />
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.9)" />
                <stop offset="100%" stopColor="rgba(79, 70, 229, 0.95)" />
              </linearGradient>
              <linearGradient id="headerSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
              </linearGradient>
            </defs>
            <path d="M0,0 L1200,0 L1200,300 Q900,380 600,300 Q300,220 0,300 Z" fill="url(#headerPrimary)" />
            <path d="M0,20 L1200,20 L1200,320 Q900,400 600,320 Q300,240 0,320 Z" fill="url(#headerSecondary)" />
          </svg>
        </div>

        {/* Header Content */}
        <div className="relative z-20 px-12 py-16">
          <div className="flex items-center justify-between">
            {/* Left: Profile and Name */}
            <div className="flex items-center space-x-10">
              {/* Enhanced Profile Image with Error Handling */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute -inset-2 bg-white/10 rounded-full backdrop-blur-sm"></div>
                
                <ProfileImage
                  src={personalInfo.profileImage || ''}
                  alt={personalInfo.fullName}
                  className="relative w-40 h-40 rounded-full border-4 border-white/30 object-cover shadow-2xl backdrop-blur-sm"
                  fallbackContent={
                    <div className="relative w-40 h-40 rounded-full border-4 border-white/30 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">
                      <span className="text-white text-4xl font-bold tracking-wider drop-shadow-lg">
                        {personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  }
                />
                
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Name and Title Section */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-6xl font-black text-white tracking-wide drop-shadow-2xl leading-none">
                    {personalInfo.fullName.toUpperCase()}
                  </h1>
                  {experience.length > 0 && (
                    <h2 className="text-2xl text-blue-100 font-semibold tracking-wide mt-3 drop-shadow-lg">
                      {experience[0].jobTitle}
                    </h2>
                  )}
                </div>
                
                {/* Professional Badge */}
                <div className="flex items-center space-x-4">
                  <div className="h-px w-16 bg-gradient-to-r from-white via-blue-200 to-transparent"></div>
                  <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                    <span className="text-blue-100 text-sm font-bold tracking-widest">PROFESSIONAL</span>
                  </div>
                  <div className="h-px w-16 bg-gradient-to-l from-white via-blue-200 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Right: Key Contact */}
            <div className="text-right space-y-3">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-end space-x-3">
                    <span className="text-blue-100 text-sm font-medium">Email</span>
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📧</span>
                    </div>
                  </div>
                  <div className="text-white font-medium text-right break-all">{personalInfo.email}</div>
                  
                  <div className="flex items-center justify-end space-x-3 mt-4">
                    <span className="text-blue-100 text-sm font-medium">Phone</span>
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">📞</span>
                    </div>
                  </div>
                  <div className="text-white font-medium text-right">{personalInfo.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative z-10 flex">
        {/* Left Sidebar */}
        <div className="w-96 bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100 p-8 space-y-8 border-r border-gray-200/50">
          
          {/* Contact Information Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mr-5 shadow-lg transform rotate-3">
                  <span className="text-white text-xl">📧</span>
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-wide">CONTACT</h3>
              </div>
              
              <div className="space-y-5">
                <div className="group bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white">📧</span>
                    </div>
                    <span className="text-gray-700 font-semibold break-all flex-1">{personalInfo.email}</span>
                  </div>
                </div>
                
                <div className="group bg-gradient-to-r from-gray-50 to-green-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white">📞</span>
                    </div>
                    <span className="text-gray-700 font-semibold">{personalInfo.phone}</span>
                  </div>
                </div>
                
                <div className="group bg-gradient-to-r from-gray-50 to-purple-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md mt-1">
                      <span className="text-white">📍</span>
                    </div>
                    <div className="text-gray-700 font-semibold flex-1">
                      {personalInfo.address && <div>{personalInfo.address}</div>}
                      <div>{personalInfo.city}, {personalInfo.state} {personalInfo.pincode}</div>
                    </div>
                  </div>
                </div>
                
                {personalInfo.linkedin && (
                  <div className="group bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white">🔗</span>
                      </div>
                      <span className="text-gray-700 font-semibold break-all flex-1">{personalInfo.linkedin}</span>
                    </div>
                  </div>
                )}
                
                {personalInfo.portfolio && (
                  <div className="group bg-gradient-to-r from-gray-50 to-cyan-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white">🌐</span>
                      </div>
                      <span className="text-gray-700 font-semibold break-all flex-1">{personalInfo.portfolio}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl flex items-center justify-center mr-5 shadow-lg transform -rotate-3">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-wide">SKILLS</h3>
                </div>
                
                <div className="space-y-6">
                  {skills.slice(0, 6).map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-gray-800">{skill}</span>
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {85 + (index % 3) * 5}%
                        </span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
                          <div 
                            className="h-4 rounded-full shadow-sm relative overflow-hidden transition-all duration-1000 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                            style={{ width: `${85 + (index % 3) * 5}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"></div>
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mr-5 shadow-lg transform rotate-2">
                    <span className="text-white text-xl">🌍</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-wide">LANGUAGES</h3>
                </div>
                
                <div className="space-y-5">
                  {languages.map((language) => (
                    <div key={language.id} className="bg-gradient-to-r from-gray-50 to-green-50 p-5 rounded-2xl border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-800">{language.name}</span>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`w-4 h-4 rounded-full transition-all duration-300 shadow-sm ${
                                level <= (language.proficiency === 'Native' ? 4 : 
                                         language.proficiency === 'Advanced' ? 3 :
                                         language.proficiency === 'Intermediate' ? 2 : 1)
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-md scale-110' 
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Additional Skills */}
          {skills.length > 6 && (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-red-50 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl flex items-center justify-center mr-5 shadow-lg transform -rotate-2">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-wide">MORE</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {skills.slice(6).map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-indigo-800 px-4 py-3 rounded-2xl text-xs font-bold border border-indigo-200 hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="flex-1 p-8 space-y-8 bg-white">
          
          {/* Professional Summary */}
          {professionalSummary && (
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-lg border border-gray-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="relative">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center mr-6 shadow-xl transform rotate-1">
                    <span className="text-white text-2xl">📄</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-800 tracking-wide">PROFESSIONAL SUMMARY</h3>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-l-8 border-gradient-to-b from-blue-500 to-indigo-600 shadow-md">
                  <p className="text-gray-700 leading-relaxed text-justify text-lg font-medium">
                    {professionalSummary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-10 shadow-lg border border-gray-100/50">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl flex items-center justify-center mr-6 shadow-xl transform -rotate-1">
                  <span className="text-white text-2xl">🎓</span>
                </div>
                <h3 className="text-3xl font-black text-gray-800 tracking-wide">EDUCATION</h3>
              </div>
              
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-10 pb-8 border-l-4 border-emerald-200 last:border-l-0 last:pb-0">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-lg border-4 border-white"></div>
                    
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{edu.degree}</h4>
                          <p className="text-xl text-emerald-600 font-bold mb-2">{edu.institution}</p>
                          <p className="text-gray-600 font-medium">{edu.location}</p>
                        </div>
                        <div className="text-right ml-6">
                          <div className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm">
                            {edu.startDate} - {edu.endDate}
                          </div>
                          {edu.percentage && (
                            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-2 rounded-2xl font-black text-sm mt-3 shadow-sm">
                              {edu.percentage}
                            </div>
                          )}
                        </div>
                      </div>
                      {edu.description && (
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200 font-medium">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {experience.length > 0 && (
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-10 shadow-lg border border-gray-100/50">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center mr-6 shadow-xl transform rotate-2">
                  <span className="text-white text-2xl">💼</span>
                </div>
                <h3 className="text-3xl font-black text-gray-800 tracking-wide">WORK EXPERIENCE</h3>
              </div>
              
              <div className="space-y-10">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-10 pb-8 border-l-4 border-purple-200 last:border-l-0 last:pb-0">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg border-4 border-white"></div>
                    
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{exp.jobTitle}</h4>
                          <p className="text-xl text-purple-600 font-bold mb-2">{exp.company}</p>
                          <p className="text-gray-600 font-medium">{exp.location}</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-6 py-3 rounded-2xl font-bold text-sm ml-6 shadow-sm">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {exp.description.split('\n').map((line, index) => line.trim() && (
                          <div key={index} className="flex items-start bg-gradient-to-r from-gray-50 to-purple-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-5 mt-2 flex-shrink-0 shadow-sm"></div>
                            <span className="text-gray-700 leading-relaxed font-medium flex-1">{line}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-10 shadow-lg border border-gray-100/50">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-3xl flex items-center justify-center mr-6 shadow-xl transform -rotate-2">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <h3 className="text-3xl font-black text-gray-800 tracking-wide">CERTIFICATIONS</h3>
              </div>
              
              <div className="space-y-8">
                {certifications.map((cert) => (
                  <div key={cert.id} className="relative pl-10 pb-8 border-l-4 border-amber-200 last:border-l-0 last:pb-0">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg border-4 border-white"></div>
                    
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{cert.name}</h4>
                          <p className="text-xl text-amber-600 font-bold mb-2">{cert.issuer}</p>
                          {cert.credentialId && (
                            <p className="text-gray-600 font-medium">ID: {cert.credentialId}</p>
                          )}
                        </div>
                        <div className="text-right ml-6">
                          <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                            Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            })}
                          </div>
                          {cert.expiryDate && (
                            <div className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-xl text-xs font-bold mt-2 shadow-sm">
                              Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short' 
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                      {cert.credentialUrl && (
                        <div className="mt-6">
                          <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            🔗 Verify Certificate
                          </a>
                        </div>
                      )}
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