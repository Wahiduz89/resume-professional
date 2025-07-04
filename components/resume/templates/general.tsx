// components/resume/templates/general.tsx - Updated to match exact design
import React from 'react'
import { ResumeData } from '@/types'
import { ProfileImage } from '../profile-image'

interface TemplateProps {
  data: ResumeData
}

export const GeneralTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, professionalSummary, education, experience, skills, languages, certifications } = data

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white shadow-lg overflow-hidden relative print:shadow-none">
      <div className="flex min-h-[297mm]">
        {/* Left Sidebar - Dark Blue */}
        <div className="w-80 bg-[#2c3e50] text-white p-8 flex flex-col">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <ProfileImage
                src={personalInfo.profileImage || ''}
                alt={personalInfo.fullName}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white object-cover shadow-lg"
                fallbackContent={
                  <div className="w-32 h-32 rounded-full mx-auto border-4 border-white bg-[#34495e] flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">
                      {personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                }
              />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white">
              {personalInfo.fullName}
            </h1>
            {experience.length > 0 && (
              <p className="text-lg text-blue-200 font-medium">
                {experience[0].jobTitle}
              </p>
            )}
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-white border-b border-gray-400 pb-2">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-300">Address</p>
                <p className="text-white">{personalInfo.city}</p>
                <p className="text-white">{personalInfo.state}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300">Phone</p>
                <p className="text-white">{personalInfo.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300">Email</p>
                <p className="text-white break-all">{personalInfo.email}</p>
              </div>
              {personalInfo.linkedin && (
                <div>
                  <p className="font-semibold text-gray-300">LinkedIn</p>
                  <p className="text-white break-all">{personalInfo.linkedin}</p>
                </div>
              )}
              {personalInfo.portfolio && (
                <div>
                  <p className="font-semibold text-gray-300">Portfolio</p>
                  <p className="text-white break-all">{personalInfo.portfolio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-white border-b border-gray-400 pb-2">
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">{skill}</span>
                      <span className="text-xs text-gray-300">{85 + (index % 3) * 5}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${85 + (index % 3) * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 text-white border-b border-gray-400 pb-2">
                Languages
              </h2>
              <div className="space-y-3">
                {languages.map((language) => (
                  <div key={language.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">{language.name}</span>
                      <span className="text-xs text-gray-300">{language.proficiency}</span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-4 h-2 rounded ${
                            level <= (language.proficiency === 'Native' ? 4 : 
                                     language.proficiency === 'Advanced' ? 3 :
                                     language.proficiency === 'Intermediate' ? 2 : 1)
                              ? 'bg-blue-400' 
                              : 'bg-gray-600'
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
        <div className="flex-1 bg-white p-8">
          {/* Profile/Summary Section */}
          {professionalSummary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-black pb-1">
                Profile
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {professionalSummary}
              </p>
            </section>
          )}

          {/* Work Experience Section */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-black pb-1">
                Work Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}, {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {exp.description.split('\n').map((line, index) => line.trim() && (
                      <div key={index} className="flex items-start mb-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-black pb-1">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700 font-medium">{edu.institution}, {edu.location}</p>
                      {edu.percentage && (
                        <p className="text-sm text-gray-600">Grade: {edu.percentage}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications Section */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-black pb-1">
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-700 font-medium">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-medium">
                        Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}
                      </p>
                      {cert.expiryDate && (
                        <p className="text-sm text-gray-600">
                          Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          })}
                        </p>
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
        </div>
      </div>
    </div>
  )
}