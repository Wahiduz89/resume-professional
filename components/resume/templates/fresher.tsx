import React from 'react'
import { ResumeData } from '@/types'

interface TemplateProps {
  data: ResumeData
}

export const FresherTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, experience, skills, projects, certifications } = data

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white p-8">
      {/* Header - Compact for freshers */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.city}</span>
        </div>
        {personalInfo.linkedin && (
          <a href={personalInfo.linkedin} className="text-blue-600 text-sm">
            LinkedIn Profile
          </a>
        )}
      </header>

      {/* Career Objective - Important for freshers */}
      {professionalSummary && (
        <section className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">
            CAREER OBJECTIVE
          </h2>
          <p className="text-sm text-gray-700">{professionalSummary}</p>
        </section>
      )}

      {/* Education - Priority for freshers */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">
            EDUCATION
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  {edu.percentage && (
                    <p className="text-sm text-gray-600">
                      CGPA/Percentage: {edu.percentage}
                    </p>
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

      {/* Internships/Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">
            INTERNSHIPS & EXPERIENCE
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="text-sm text-gray-700 italic">{exp.company}</p>
              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Academic Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">
            ACADEMIC PROJECTS
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-700">{project.description}</p>
              {project.technologies && (
                <p className="text-sm text-gray-600 mt-1">
                  Technologies: {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm text-gray-700">
                • {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
          {certifications.map((cert, index) => (
            <p key={index} className="text-sm text-gray-700 mb-1">
              • {cert}
            </p>
          ))}
        </section>
      )}
    </div>
  )
}