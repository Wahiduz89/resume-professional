// components/resume/templates/fresher.tsx
import React from 'react'
import { ResumeData } from '@/types'

interface TemplateProps {
  data: ResumeData
}

export const FresherTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, experience, skills, projects, languages, certifications } = data

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white shadow-lg overflow-hidden relative">
      {/* Blue Curved Background Decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 Q50,25 100,0 L100,50 Q75,25 50,50 Q25,75 0,50 Z" fill="#3b82f6"/>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-40 h-40 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,100 Q25,75 50,100 Q75,75 100,100 L100,50 Q75,75 50,50 Q25,25 0,50 Z" fill="#3b82f6"/>
        </svg>
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
        {/* Header Background Curve */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,0 L1200,0 L1200,250 Q600,300 0,250 Z" fill="url(#headerGradient)"/>
            <defs>
              <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#1d4ed8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 px-8 py-8">
          <div className="flex items-center justify-between">
            {/* Left Side - Profile Image and Name */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                {personalInfo.profileImage ? (
                  <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-blue-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">
                      {personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                <h1 className="text-3xl font-bold tracking-wide">
                  {personalInfo.fullName.toUpperCase()}
                </h1>
                {experience.length > 0 && (
                  <p className="text-xl text-blue-100 font-medium mt-1">
                    {experience[0].jobTitle.toUpperCase()}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side - Contact Information */}
            <div className="text-right space-y-2">
              <div className="flex items-center justify-end space-x-2">
                <span className="text-sm font-medium">Address:</span>
              </div>
              <div className="text-sm">
                {personalInfo.address && <div>{personalInfo.address}</div>}
                <div>{personalInfo.city}{personalInfo.city && personalInfo.state && ', '}{personalInfo.state}</div>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <span>📞</span>
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center justify-end space-x-1">
                  <span>✉️</span>
                  <span>Email:</span>
                </div>
                <div className="text-blue-100">{personalInfo.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* Summary Section */}
        {professionalSummary && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
              Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {professionalSummary}
            </p>
          </section>
        )}

        {/* Skill Highlights */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
              Skill Highlights
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {exp.jobTitle} - {exp.startDate} to {exp.current ? 'Present' : exp.endDate}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 italic mb-2">{exp.company}, {exp.location}</p>
                <div className="text-sm text-gray-700 space-y-1">
                  {exp.description.split('\n').map((line, index) => line.trim() && (
                    <div key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                  </p>
                )}
                <div className="text-sm text-gray-700">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>{project.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}: {edu.startDate.split('-')[0]}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}, {edu.location}</p>
                    {edu.percentage && (
                      <p className="text-sm text-gray-600">Grade: {edu.percentage}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Languages Section */}
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
              Languages
            </h2>
            <div className="space-y-2">
              {languages.map((language) => (
                <div key={language.id} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  <span className="text-sm text-gray-700">
                    {language.name} - {language.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide border-b-2 border-blue-600 pb-1">
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{cert.name}</span> - {cert.issuer}
                  </p>
                  <p className="text-xs text-gray-600">
                    Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}