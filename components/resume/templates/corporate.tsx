// components/resume/templates/corporate.tsx - Updated with ProfileImage
import React from 'react'
import { ResumeData } from '@/types'
import { ProfileImage } from '../profile-image'

interface TemplateProps {
  data: ResumeData
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, experience, skills, languages, certifications } = data

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white p-8 shadow-lg">
      {/* Header Section with Profile Image */}
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
        <div className="flex items-start gap-6">
          {/* Profile Image with Error Handling */}
          <div className="flex-shrink-0">
            <ProfileImage
              src={personalInfo.profileImage || ''}
              alt={personalInfo.fullName}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              fallbackContent={
                <div className="w-24 h-24 rounded-full border-2 border-gray-300 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg font-bold">
                    {personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
              }
            />
          </div>
          
          {/* Personal Information */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.fullName}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
              <span>{personalInfo.city}, {personalInfo.state}</span>
            </div>
            {(personalInfo.linkedin || personalInfo.portfolio) && (
              <div className="flex gap-4 mt-2 text-sm">
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} className="text-blue-600">
                    LinkedIn
                  </a>
                )}
                {personalInfo.portfolio && (
                  <a href={personalInfo.portfolio} className="text-blue-600">
                    Portfolio
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {professionalSummary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{professionalSummary}</p>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">
            Professional Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="text-gray-700 italic mb-2">
                {exp.company}, {exp.location}
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}, {edu.location}</p>
                  {edu.percentage && (
                    <p className="text-sm text-gray-600">Score: {edu.percentage}</p>
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">
            Certifications
          </h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-700">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                  )}
                </div>
                <div className="text-sm text-gray-600 text-right">
                  <p>Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                  })}</p>
                  {cert.expiryDate && (
                    <p>Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}</p>
                  )}
                </div>
              </div>
              {cert.credentialUrl && (
                <p className="text-sm text-blue-600 mt-1">
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    Verify Certificate
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Languages Section */}
      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase">
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((language) => (
              <div key={language.id} className="flex justify-between">
                <span className="font-medium text-gray-900">{language.name}</span>
                <span className="text-gray-600 text-sm">{language.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}