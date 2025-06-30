// lib/pdf-templates.ts
import { ResumeData } from '@/types'

export function generateCorporateTemplateHTML(data: ResumeData): string {
  const { personalInfo, professionalSummary, education, experience, skills } = data

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
          }
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6;
            color: #333;
            max-width: 210mm;
            margin: 0 auto;
            padding: 32px;
          }
          .header {
            border-bottom: 2px solid #1f2937;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .name {
            font-size: 24px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 8px;
          }
          .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            font-size: 14px;
            color: #4b5563;
            margin-bottom: 8px;
          }
          .links {
            display: flex;
            gap: 16px;
            margin-top: 8px;
            font-size: 14px;
          }
          .links a {
            color: #2563eb;
            text-decoration: none;
          }
          .section {
            margin-bottom: 24px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .experience-item, .education-item {
            margin-bottom: 16px;
          }
          .job-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 4px;
          }
          .job-title {
            font-weight: 600;
            color: #111827;
          }
          .job-date {
            font-size: 14px;
            color: #4b5563;
          }
          .company {
            color: #374151;
            font-style: italic;
            margin-bottom: 8px;
          }
          .description {
            color: #374151;
            font-size: 14px;
            line-height: 1.5;
          }
          .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .skill-tag {
            background-color: #e5e7eb;
            color: #374151;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 14px;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <header class="header">
          <h1 class="name">${personalInfo.fullName}</h1>
          <div class="contact-info">
            <span>${personalInfo.email}</span>
            <span>${personalInfo.phone}</span>
            <span>${personalInfo.city}, ${personalInfo.state}</span>
          </div>
          ${(personalInfo.linkedin || personalInfo.portfolio) ? `
            <div class="links">
              ${personalInfo.linkedin ? `<a href="${personalInfo.linkedin}">LinkedIn</a>` : ''}
              ${personalInfo.portfolio ? `<a href="${personalInfo.portfolio}">Portfolio</a>` : ''}
            </div>
          ` : ''}
        </header>

        ${professionalSummary ? `
          <section class="section">
            <h2 class="section-title">Professional Summary</h2>
            <p class="description">${professionalSummary}</p>
          </section>
        ` : ''}

        ${experience.length > 0 ? `
          <section class="section">
            <h2 class="section-title">Professional Experience</h2>
            ${experience.map(exp => `
              <div class="experience-item">
                <div class="job-header">
                  <h3 class="job-title">${exp.jobTitle}</h3>
                  <span class="job-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p class="company">${exp.company}${exp.location ? `, ${exp.location}` : ''}</p>
                <p class="description">${exp.description}</p>
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${education.length > 0 ? `
          <section class="section">
            <h2 class="section-title">Education</h2>
            ${education.map(edu => `
              <div class="education-item">
                <div class="job-header">
                  <div>
                    <h3 class="job-title">${edu.degree}</h3>
                    <p class="company">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</p>
                    ${edu.percentage ? `<p style="font-size: 14px; color: #4b5563;">Score: ${edu.percentage}${edu.percentage.includes('%') ? '' : '%'}</p>` : ''}
                  </div>
                  <span class="job-date">${edu.startDate} - ${edu.endDate}</span>
                </div>
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${skills.length > 0 ? `
          <section class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills-container">
              ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
          </section>
        ` : ''}
      </body>
    </html>
  `
}

export function generateFresherTemplateHTML(data: ResumeData): string {
  const { personalInfo, professionalSummary, education, experience, skills, projects, certifications } = data

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
          }
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6;
            color: #333;
            max-width: 210mm;
            margin: 0 auto;
            padding: 32px;
          }
          .header {
            text-align: center;
            margin-bottom: 24px;
          }
          .name {
            font-size: 20px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 8px;
          }
          .contact-info {
            display: flex;
            justify-content: center;
            gap: 12px;
            font-size: 14px;
            color: #4b5563;
            margin-bottom: 8px;
          }
          .linkedin-link {
            color: #2563eb;
            text-decoration: none;
            font-size: 14px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
            border-bottom: 1px solid #d1d5db;
            padding-bottom: 4px;
            margin-bottom: 12px;
          }
          .item {
            margin-bottom: 12px;
          }
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 4px;
          }
          .item-title {
            font-weight: 600;
            color: #111827;
          }
          .item-date {
            font-size: 14px;
            color: #4b5563;
          }
          .item-subtitle {
            font-size: 14px;
            color: #374151;
            font-style: italic;
          }
          .item-description {
            font-size: 14px;
            color: #374151;
            margin-top: 4px;
          }
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .skill-item {
            font-size: 14px;
            color: #374151;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <header class="header">
          <h1 class="name">${personalInfo.fullName}</h1>
          <div class="contact-info">
            <span>${personalInfo.email}</span>
            <span>•</span>
            <span>${personalInfo.phone}</span>
            <span>•</span>
            <span>${personalInfo.city}</span>
          </div>
          ${personalInfo.linkedin ? `
            <a href="${personalInfo.linkedin}" class="linkedin-link">LinkedIn Profile</a>
          ` : ''}
        </header>

        ${professionalSummary ? `
          <section class="section">
            <h2 class="section-title">CAREER OBJECTIVE</h2>
            <p class="item-description">${professionalSummary}</p>
          </section>
        ` : ''}

        ${education.length > 0 ? `
          <section class="section">
            <h2 class="section-title">EDUCATION</h2>
            ${education.map(edu => `
              <div class="item">
                <div class="item-header">
                  <div>
                    <h3 class="item-title">${edu.degree}</h3>
                    <p class="item-subtitle">${edu.institution}</p>
                    ${edu.percentage ? `<p style="font-size: 14px; color: #4b5563;">CGPA/Percentage: ${edu.percentage}</p>` : ''}
                  </div>
                  <span class="item-date">${edu.startDate} - ${edu.endDate}</span>
                </div>
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${experience.length > 0 ? `
          <section class="section">
            <h2 class="section-title">INTERNSHIPS & EXPERIENCE</h2>
            ${experience.map(exp => `
              <div class="item">
                <div class="item-header">
                  <h3 class="item-title">${exp.jobTitle}</h3>
                  <span class="item-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p class="item-subtitle">${exp.company}</p>
                <p class="item-description">${exp.description}</p>
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${projects && projects.length > 0 ? `
          <section class="section">
            <h2 class="section-title">ACADEMIC PROJECTS</h2>
            ${projects.map(project => `
              <div class="item">
                <h3 class="item-title">${project.name}</h3>
                <p class="item-description">${project.description}</p>
                ${project.technologies ? `
                  <p style="font-size: 14px; color: #4b5563; margin-top: 4px;">
                    Technologies: ${project.technologies.join(', ')}
                  </p>
                ` : ''}
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${skills.length > 0 ? `
          <section class="section">
            <h2 class="section-title">TECHNICAL SKILLS</h2>
            <div class="skills-grid">
              ${skills.map(skill => `<span class="skill-item">• ${skill}</span>`).join('')}
            </div>
          </section>
        ` : ''}

        ${certifications && certifications.length > 0 ? `
          <section class="section">
            <h2 class="section-title">CERTIFICATIONS & ACHIEVEMENTS</h2>
            ${certifications.map(cert => `
              <p class="skill-item">• ${cert}</p>
            `).join('')}
          </section>
        ` : ''}
      </body>
    </html>
  `
}

export function generateTemplateHTML(template: string, data: ResumeData): string {
  switch (template) {
    case 'fresher':
      return generateFresherTemplateHTML(data)
    case 'technical':
    case 'general':
    default:
      return generateCorporateTemplateHTML(data)
  }
}