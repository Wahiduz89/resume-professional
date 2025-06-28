import React from 'react'
import { ResumeData } from '@/types'

interface TemplateProps {
  data: ResumeData
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, experience, skills } = data

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white p-8 shadow-lg">
      {/* Header Section */}
      <header className="border-b-2 border-gray-800 pb-4 mb-6">
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
                    <p className="text-sm text-gray-600">Score: {edu.percentage}%</p>
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

      {/* Skills Section */}
      {skills.length > 0 && (
        <section>
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
    </div>
  )
}