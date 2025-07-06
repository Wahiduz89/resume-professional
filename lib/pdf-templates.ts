// lib/pdf-templates.ts - Updated with technical template support
import { ResumeData } from '@/types'

export function generateTechnicalTemplateHTML(data: ResumeData): string {
  const { personalInfo, professionalSummary, education, experience, skills, projects, languages, certifications } = data

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
          
          @page {
            size: A4;
            margin: 0;
          }
          
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.4;
            color: #1f2937;
            background: white;
            font-size: 11px;
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            overflow: hidden;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .container {
            width: 210mm;
            height: 297mm;
            display: flex;
            flex-direction: column;
          }
          
          /* Header Section - Exact match to React component */
          .header {
            background: linear-gradient(135deg, #111827 0%, #1e40af 50%, #4338ca 100%);
            color: white;
            padding: 15mm 10mm;
            height: 50mm;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
          }
          
          .profile-section {
            display: flex;
            align-items: center;
            gap: 10mm;
          }
          
          .profile-image {
            width: 16mm;
            height: 16mm;
            border-radius: 2mm;
            border: 1mm solid white;
            object-fit: cover;
          }
          
          .profile-placeholder {
            width: 16mm;
            height: 16mm;
            border-radius: 2mm;
            border: 1mm solid white;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 8px;
            font-weight: bold;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .name-section h1 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 2mm;
            color: white;
          }
          
          .job-title {
            color: #fbbf24;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 1mm;
          }
          
          .tech-subtitle {
            color: #22d3ee;
            font-size: 8px;
          }
          
          .contact-terminal {
            background: rgba(0,0,0,0.4);
            padding: 4mm;
            border-radius: 2mm;
            border: 1px solid rgba(34, 211, 238, 0.3);
            font-size: 8px;
            min-width: 40mm;
          }
          
          .terminal-prompt {
            color: #22d3ee;
            margin-bottom: 2mm;
            font-weight: bold;
          }
          
          .terminal-line {
            margin-bottom: 1mm;
            line-height: 1.3;
            word-break: break-word;
          }
          
          .terminal-key {
            color: #60a5fa;
            font-weight: 600;
          }
          
          .terminal-value {
            color: #fbbf24;
          }
          
          /* Main Layout - Two Column */
          .main-layout {
            display: flex;
            flex: 1;
            height: 247mm;
          }
          
          .sidebar {
            width: 80mm;
            background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
            padding: 5mm;
            border-right: 2px solid #e2e8f0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .main-content {
            flex: 1;
            width: 130mm;
            padding: 5mm;
            background: white;
          }
          
          /* Skill Cards */
          .skill-card {
            background: white;
            border-radius: 3mm;
            padding: 4mm;
            margin-bottom: 4mm;
            box-shadow: 0 1mm 3mm rgba(0,0,0,0.1);
            border-left: 2mm solid #3b82f6;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .card-header {
            display: flex;
            align-items: center;
            margin-bottom: 3mm;
          }
          
          .card-icon {
            width: 6mm;
            height: 6mm;
            border-radius: 2mm;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 3mm;
            color: white;
            font-size: 7px;
            font-weight: bold;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .card-title {
            font-size: 7px;
            font-weight: bold;
            color: #1f2937;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 1mm;
          }
          
          .skill-tag {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            padding: 1mm 2mm;
            border-radius: 2mm;
            font-size: 6px;
            font-weight: bold;
            border: 0.5px solid #93c5fd;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Language Section */
          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2mm;
            margin-bottom: 2mm;
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-radius: 2mm;
            border: 0.5px solid #e2e8f0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .language-name {
            font-weight: bold;
            color: #1f2937;
            font-size: 7px;
          }
          
          .language-level {
            display: flex;
            gap: 1mm;
          }
          
          .level-dot {
            width: 2mm;
            height: 2mm;
            border-radius: 1mm;
            border: 0.5px solid #e5e7eb;
          }
          
          .level-active {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-color: #22c55e;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .level-inactive {
            background: #f1f5f9;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Main Content Sections */
          .section-card {
            background: linear-gradient(135deg, #ffffff, #f8fafc);
            border-radius: 3mm;
            padding: 5mm;
            margin-bottom: 5mm;
            border-left: 3mm solid #3b82f6;
            box-shadow: 0 1mm 3mm rgba(0,0,0,0.05);
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 4mm;
          }
          
          .section-icon {
            width: 8mm;
            height: 8mm;
            border-radius: 2mm;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 3mm;
            color: white;
            font-size: 10px;
            font-weight: bold;
            box-shadow: 0 1mm 2mm rgba(59,130,246,0.3);
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .section-title {
            font-size: 10px;
            font-weight: bold;
            color: #1f2937;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .summary-text {
            font-size: 9px;
            color: #374151;
            line-height: 1.5;
            text-align: justify;
          }
          
          /* Timeline Items */
          .timeline-item {
            margin-bottom: 4mm;
            padding: 4mm;
            background: rgba(255,255,255,0.9);
            border-radius: 2mm;
            border: 0.5px solid #e5e7eb;
            box-shadow: 0 0.5mm 1mm rgba(0,0,0,0.05);
          }
          
          .item-header {
            margin-bottom: 3mm;
            position: relative;
          }
          
          .item-title {
            font-size: 9px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 1mm;
          }
          
          .item-company {
            font-size: 8px;
            font-weight: bold;
            margin-bottom: 1mm;
            color: #3b82f6;
          }
          
          .item-location {
            font-size: 7px;
            color: #6b7280;
            margin-bottom: 1mm;
          }
          
          .item-date {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 6px;
            font-weight: bold;
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            padding: 1mm 2mm;
            border-radius: 2mm;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .item-description {
            font-size: 8px;
            color: #374151;
            line-height: 1.4;
          }
          
          .description-point {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2mm;
            padding: 1mm;
            background: rgba(248,250,252,0.8);
            border-radius: 1mm;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .point-bullet {
            width: 1mm;
            height: 1mm;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            margin-right: 2mm;
            margin-top: 1.5mm;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Project Styles */
          .project-item {
            margin-bottom: 3mm;
            padding: 3mm;
            background: rgba(255,255,255,0.9);
            border-radius: 2mm;
            border: 0.5px solid #e5e7eb;
          }
          
          .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 1mm;
            margin-bottom: 2mm;
          }
          
          .tech-tag {
            background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
            color: #7c3aed;
            padding: 0.5mm 1.5mm;
            border-radius: 1mm;
            font-size: 6px;
            font-weight: bold;
            border: 0.5px solid #c4b5fd;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .project-description {
            font-size: 8px;
            color: #374151;
            line-height: 1.4;
          }
          
          /* Color-coded sections */
          .purple-section { border-left-color: #8b5cf6 !important; }
          .green-section { border-left-color: #10b981 !important; }
          .orange-section { border-left-color: #f59e0b !important; }
          .red-section { border-left-color: #ef4444 !important; }
          
          .purple-icon { background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important; }
          .green-icon { background: linear-gradient(135deg, #10b981, #059669) !important; }
          .orange-icon { background: linear-gradient(135deg, #f59e0b, #d97706) !important; }
          .red-icon { background: linear-gradient(135deg, #ef4444, #dc2626) !important; }
          
          /* Print Optimization */
          @media print {
            body { 
              margin: 0; 
              padding: 0;
              width: 210mm;
              height: 297mm;
            }
            .container { 
              width: 210mm;
              height: 297mm;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Technical Header -->
          <div class="header">
            <div class="header-content">
              <div class="profile-section">
                ${personalInfo.profileImage ? `
                  <img src="${personalInfo.profileImage}" alt="${personalInfo.fullName}" class="profile-image">
                ` : `
                  <div class="profile-placeholder">
                    &lt;${personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}/&gt;
                  </div>
                `}
                
                <div class="name-section">
                  <h1>${personalInfo.fullName.toUpperCase()}</h1>
                  <p class="job-title">
                    ${experience.length > 0 ? experience[0].jobTitle : 'Software Engineer'}
                  </p>
                  <div class="tech-subtitle">&gt; Full-Stack Developer</div>
                </div>
              </div>
              
              <div class="contact-terminal">
                <div class="terminal-prompt">&gt; contact.info</div>
                <div class="terminal-line">
                  <span class="terminal-key">email:</span> <span class="terminal-value">"${personalInfo.email}"</span>
                </div>
                <div class="terminal-line">
                  <span class="terminal-key">phone:</span> <span class="terminal-value">"${personalInfo.phone}"</span>
                </div>
                <div class="terminal-line">
                  <span class="terminal-key">location:</span> <span class="terminal-value">"${personalInfo.city}, ${personalInfo.state}"</span>
                </div>
                ${personalInfo.linkedin && personalInfo.linkedin.trim() !== '' ? `
                  <div class="terminal-line">
                    <span class="terminal-key">linkedin:</span> <span class="terminal-value">"${personalInfo.linkedin}"</span>
                  </div>
                ` : ''}
                ${personalInfo.portfolio && personalInfo.portfolio.trim() !== '' ? `
                  <div class="terminal-line">
                    <span class="terminal-key">portfolio:</span> <span class="terminal-value">"${personalInfo.portfolio}"</span>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- Main Content Layout -->
          <div class="main-layout">
            <!-- Technical Sidebar -->
            <div class="sidebar">
              ${Object.entries(skillCategories).map(([category, categorySkills]) => `
                <div class="skill-card">
                  <div class="card-header">
                    <div class="card-icon">
                      ${category === 'Programming Languages' ? '</>' : 
                        category === 'Frameworks & Libraries' ? '{}' :
                        category === 'Tools & Technologies' ? '⚙' :
                        category === 'Databases' ? '🗄' : '🔧'}
                    </div>
                    <h3 class="card-title">${category.replace(' & ', ' &\n')}</h3>
                  </div>
                  <div class="skill-tags">
                    ${categorySkills.map(skill => `
                      <span class="skill-tag">${skill}</span>
                    `).join('')}
                  </div>
                </div>
              `).join('')}

              ${languages && languages.length > 0 ? `
                <div class="skill-card">
                  <div class="card-header">
                    <div class="card-icon green-icon">🌍</div>
                    <h3 class="card-title">LANGUAGES</h3>
                  </div>
                  ${languages.map(language => {
                    const level = language.proficiency === 'Native' ? 4 : 
                                 language.proficiency === 'Advanced' ? 3 :
                                 language.proficiency === 'Intermediate' ? 2 : 1;
                    return `
                      <div class="language-item">
                        <span class="language-name">${language.name}</span>
                        <div class="language-level">
                          ${[1, 2, 3, 4].map(l => `
                            <div class="level-dot ${l <= level ? 'level-active' : 'level-inactive'}"></div>
                          `).join('')}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : ''}
            </div>

            <!-- Main Content -->
            <div class="main-content">
              ${professionalSummary ? `
                <div class="section-card">
                  <div class="section-header">
                    <div class="section-icon" style="background: linear-gradient(135deg, #6366f1, #4f46e5);">{ }</div>
                    <h3 class="section-title">ABOUT_ME.md</h3>
                  </div>
                  <p class="summary-text">${professionalSummary}</p>
                </div>
              ` : ''}

              ${projects && projects.length > 0 ? `
                <div class="section-card purple-section">
                  <div class="section-header">
                    <div class="section-icon purple-icon">🚀</div>
                    <h3 class="section-title">PROJECTS_SHOWCASE</h3>
                  </div>
                  ${projects.slice(0, 2).map(project => `
                    <div class="project-item">
                      <h4 class="item-title">${project.name}</h4>
                      ${project.technologies && project.technologies.length > 0 ? `
                        <div class="project-tech">
                          ${project.technologies.slice(0, 4).map(tech => `
                            <span class="tech-tag">${tech}</span>
                          `).join('')}
                        </div>
                      ` : ''}
                      <p class="project-description">${project.description}</p>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${education.length > 0 ? `
                <div class="section-card green-section">
                  <div class="section-header">
                    <div class="section-icon green-icon">🎓</div>
                    <h3 class="section-title">EDUCATION_LOG</h3>
                  </div>
                  ${education.slice(0, 2).map(edu => `
                    <div class="timeline-item">
                      <div class="item-header">
                        <h4 class="item-title">${edu.degree}</h4>
                        <p class="item-company">${edu.institution}</p>
                        <p class="item-location">${edu.location}</p>
                        <div class="item-date">
                          ${edu.startDate} - ${edu.endDate}
                        </div>
                      </div>
                      ${edu.percentage ? `
                        <p class="item-description">Grade: ${edu.percentage}</p>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${experience.length > 0 ? `
                <div class="section-card orange-section">
                  <div class="section-header">
                    <div class="section-icon orange-icon">💼</div>
                    <h3 class="section-title">WORK_EXPERIENCE</h3>
                  </div>
                  ${experience.slice(0, 2).map(exp => `
                    <div class="timeline-item">
                      <div class="item-header">
                        <h4 class="item-title">${exp.jobTitle}</h4>
                        <p class="item-company">${exp.company}</p>
                        <p class="item-location">${exp.location}</p>
                        <div class="item-date">
                          ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <div class="item-description">
                        ${exp.description.split('\n').slice(0, 3).map(line => line.trim() ? `
                          <div class="description-point">
                            <span class="point-bullet"></span>
                            <span>${line}</span>
                          </div>
                        ` : '').join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${certifications && certifications.length > 0 ? `
                <div class="section-card red-section">
                  <div class="section-header">
                    <div class="section-icon red-icon">🏆</div>
                    <h3 class="section-title">CERTIFICATIONS</h3>
                  </div>
                  ${certifications.slice(0, 2).map(cert => `
                    <div class="timeline-item">
                      <div class="item-header">
                        <h4 class="item-title">${cert.name}</h4>
                        <p class="item-company">${cert.issuer}</p>
                        <div class="item-date">
                          Issued: ${new Date(cert.issueDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          })}
                        </div>
                      </div>
                      ${cert.credentialId ? `
                        <p class="item-description">Credential ID: ${cert.credentialId}</p>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

// lib/pdf-templates.ts - Fixed generateFresherTemplateHTML and generateTechnicalTemplateHTML functions

export function generateFresherTemplateHTML(data: ResumeData): string {
  const { personalInfo, professionalSummary, education, experience, skills, projects, languages, certifications } = data

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.4;
            color: #333;
            background: white;
            font-size: 11px;
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            overflow: hidden;
            position: relative;
          }
          
          .page-container {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow: hidden;
            position: relative;
          }
          
          /* Background Decorations */
          .bg-decoration-1 {
            position: absolute;
            top: 0;
            right: 0;
            width: 30mm;
            height: 30mm;
            opacity: 0.05;
            z-index: 1;
          }
          .bg-decoration-2 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40mm;
            height: 40mm;
            opacity: 0.05;
            z-index: 1;
          }
          
          /* Header Section */
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 25mm 20mm;
            position: relative;
            overflow: hidden;
            z-index: 2;
            height: 80mm;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .header::after {
            content: '';
            position: absolute;
            bottom: -5mm;
            left: 0;
            width: 100%;
            height: 10mm;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: 0 0 50% 50%;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 3;
            height: 100%;
          }
          
          .profile-section {
            display: flex;
            align-items: center;
            gap: 15mm;
            flex: 1;
          }
          
          .profile-image {
            width: 25mm;
            height: 25mm;
            border-radius: 50%;
            border: 2mm solid white;
            object-fit: cover;
            box-shadow: 0 2mm 4mm rgba(0,0,0,0.2);
          }
          
          .profile-placeholder {
            width: 25mm;
            height: 25mm;
            border-radius: 50%;
            border: 2mm solid white;
            background-color: #2563eb !important;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            color: white;
            box-shadow: 0 2mm 4mm rgba(0,0,0,0.2);
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .name-section h1 {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 2mm;
            line-height: 1.2;
          }
          
          .job-title {
            font-size: 14px;
            color: #bfdbfe;
            font-weight: 500;
            line-height: 1.3;
          }
          
          .contact-section {
            text-align: right;
            font-size: 10px;
            max-width: 60mm;
          }
          
          .contact-label {
            font-weight: 600;
            margin-bottom: 3mm;
          }
          
          .contact-item {
            margin-bottom: 2mm;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 3mm;
            line-height: 1.3;
          }
          
          .contact-email {
            color: #bfdbfe;
            margin-top: 2mm;
            word-break: break-all;
          }
          
          /* Main Content */
          .main-content {
            padding: 20mm;
            position: relative;
            z-index: 2;
            height: calc(297mm - 80mm);
            overflow: hidden;
          }
          
          .section {
            margin-bottom: 12mm;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #1f2937;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 2mm;
            margin-bottom: 6mm;
          }
          
          .summary-text {
            font-size: 10px;
            color: #374151;
            line-height: 1.6;
            text-align: justify;
          }
          
          /* Skills Grid */
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4mm 8mm;
          }
          
          .skill-item {
            display: flex;
            align-items: center;
            gap: 3mm;
            font-size: 10px;
            color: #374151;
          }
          
          .skill-bullet {
            width: 2mm;
            height: 2mm;
            background-color: #3b82f6 !important;
            border-radius: 50%;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Experience Items */
          .experience-item, .project-item, .education-item {
            margin-bottom: 8mm;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .item-header {
            margin-bottom: 3mm;
          }
          
          .item-title {
            font-size: 12px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 2mm;
            line-height: 1.3;
          }
          
          .item-company {
            font-size: 10px;
            color: #6b7280;
            font-style: italic;
            margin-bottom: 3mm;
          }
          
          .item-description {
            font-size: 10px;
            color: #374151;
            line-height: 1.5;
          }
          
          .description-item {
            display: flex;
            align-items: flex-start;
            gap: 3mm;
            margin-bottom: 2mm;
          }
          
          .description-bullet {
            width: 2mm;
            height: 2mm;
            background-color: #9ca3af !important;
            border-radius: 50%;
            margin-top: 2mm;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .tech-info {
            font-size: 9px;
            color: #6b7280;
            margin-bottom: 3mm;
          }
          
          .tech-label {
            font-weight: 500;
          }
          
          /* Languages and Certifications */
          .language-item, .cert-item {
            display: flex;
            align-items: center;
            gap: 3mm;
            margin-bottom: 3mm;
            font-size: 10px;
            color: #374151;
          }
          
          .cert-text {
            font-size: 10px;
            color: #374151;
            margin-bottom: 2mm;
          }
          
          .cert-details {
            font-size: 9px;
            color: #6b7280;
          }
          
          /* Print Optimization */
          @media print {
            body { 
              margin: 0; 
              padding: 0;
              font-size: 10px;
              width: 210mm;
              height: 297mm;
            }
            .page-container { 
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
            }
            .bg-decoration-1, .bg-decoration-2 { 
              display: none; 
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="page-container">
          <!-- Background Decorations -->
          <div class="bg-decoration-1">
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
              <path d="M0,0 Q50,25 100,0 L100,50 Q75,25 50,50 Q25,75 0,50 Z" fill="#3b82f6"/>
            </svg>
          </div>
          <div class="bg-decoration-2">
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
              <path d="M0,100 Q25,75 50,100 Q75,75 100,100 L100,50 Q75,75 50,50 Q25,25 0,50 Z" fill="#3b82f6"/>
            </svg>
          </div>

          <!-- Header Section -->
          <div class="header">
            <div class="header-content">
              <!-- Left Side - Profile and Name -->
              <div class="profile-section">
                ${personalInfo.profileImage ? `
                  <img src="${personalInfo.profileImage}" alt="${personalInfo.fullName}" class="profile-image">
                ` : `
                  <div class="profile-placeholder">
                    ${personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                `}
                
                <div class="name-section">
                  <h1>${personalInfo.fullName.toUpperCase()}</h1>
                  ${experience.length > 0 ? `<p class="job-title">${experience[0].jobTitle.toUpperCase()}</p>` : ''}
                </div>
              </div>

              <!-- Right Side - Contact Information -->
              <div class="contact-section">
                <div class="contact-label">Address:</div>
                ${personalInfo.address ? `<div>${personalInfo.address}</div>` : ''}
                <div>${personalInfo.city}${personalInfo.city && personalInfo.state ? ', ' : ''}${personalInfo.state}</div>
                <div class="contact-item">
                  <span>📞 ${personalInfo.phone}</span>
                </div>
                <div class="contact-item">
                  <span>✉️ Email:</span>
                </div>
                <div class="contact-email">${personalInfo.email}</div>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="main-content">
            <!-- Summary Section -->
            ${professionalSummary ? `
              <div class="section">
                <h2 class="section-title">Summary</h2>
                <p class="summary-text">${professionalSummary}</p>
              </div>
            ` : ''}

            <!-- Skill Highlights -->
            ${skills.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Skill Highlights</h2>
                <div class="skills-grid">
                  ${skills.map(skill => `
                    <div class="skill-item">
                      <span class="skill-bullet"></span>
                      <span>${skill}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Experience Section -->
            ${experience.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Experience</h2>
                ${experience.map(exp => `
                  <div class="experience-item">
                    <div class="item-header">
                      <h3 class="item-title">${exp.jobTitle} - ${exp.startDate} to ${exp.current ? 'Present' : exp.endDate}</h3>
                      <p class="item-company">${exp.company}, ${exp.location}</p>
                    </div>
                    <div class="item-description">
                      ${exp.description.split('\n').map(line => line.trim() ? `
                        <div class="description-item">
                          <span class="description-bullet"></span>
                          <span>${line}</span>
                        </div>
                      ` : '').join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Projects Section -->
            ${projects && projects.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Projects</h2>
                ${projects.map(project => `
                  <div class="project-item">
                    <div class="item-header">
                      <h3 class="item-title">${project.name}</h3>
                      ${project.technologies && project.technologies.length > 0 ? `
                        <p class="tech-info">
                          <span class="tech-label">Technologies:</span> ${project.technologies.join(', ')}
                        </p>
                      ` : ''}
                    </div>
                    <div class="item-description">
                      <div class="description-item">
                        <span class="description-bullet"></span>
                        <span>${project.description}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Education Section -->
            ${education.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Education</h2>
                ${education.map(edu => `
                  <div class="education-item">
                    <h3 class="item-title">${edu.degree}: ${edu.startDate.split('-')[0]}</h3>
                    <p class="item-company">${edu.institution}, ${edu.location}</p>
                    ${edu.percentage ? `<p class="tech-info">Grade: ${edu.percentage}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Languages Section -->
            ${languages && languages.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Languages</h2>
                ${languages.map(language => `
                  <div class="language-item">
                    <span class="skill-bullet"></span>
                    <span>${language.name} - ${language.proficiency}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Certifications Section -->
            ${certifications && certifications.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Certifications</h2>
                ${certifications.map(cert => `
                  <div style="margin-bottom: 4mm;">
                    <p class="cert-text">
                      <strong>${cert.name}</strong> - ${cert.issuer}
                    </p>
                    <p class="cert-details">
                      Issued: ${new Date(cert.issueDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                    </p>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `
}

// lib/pdf-templates.ts - Fixed generateGeneralTemplateHTML function
export function generateGeneralTemplateHTML(data: ResumeData): string {
  const { personalInfo, professionalSummary, education, experience, skills, languages, certifications } = data

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.4;
            color: #333;
            background: white;
            font-size: 11px;
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow: hidden;
          }
          
          .page-container {
            display: flex;
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow: hidden;
          }
          
          /* Left Sidebar - Dark Blue */
          .sidebar {
            width: 70mm;
            height: 297mm;
            background-color: #2c3e50 !important;
            color: white;
            padding: 20mm 15mm;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow: hidden;
          }
          
          /* Profile Section */
          .profile-section {
            text-align: center;
            margin-bottom: 15mm;
          }
          
          .profile-image {
            width: 30mm;
            height: 30mm;
            border-radius: 50%;
            border: 2mm solid white;
            object-fit: cover;
            margin: 0 auto 10mm auto;
            display: block;
            box-shadow: 0 2mm 5mm rgba(0,0,0,0.3);
          }
          
          .profile-placeholder {
            width: 30mm;
            height: 30mm;
            border-radius: 50%;
            border: 2mm solid white;
            background-color: #34495e !important;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10mm auto;
            font-size: 14px;
            font-weight: bold;
            color: white;
            box-shadow: 0 2mm 5mm rgba(0,0,0,0.3);
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .profile-name {
            font-size: 16px;
            font-weight: bold;
            color: white;
            margin-bottom: 3mm;
            line-height: 1.2;
            word-wrap: break-word;
          }
          
          .profile-title {
            font-size: 12px;
            color: #bdc3c7;
            font-weight: 500;
            line-height: 1.3;
          }
          
          /* Sidebar Sections */
          .sidebar-section {
            margin-bottom: 12mm;
          }
          
          .sidebar-title {
            font-size: 13px;
            font-weight: bold;
            color: white;
            margin-bottom: 6mm;
            border-bottom: 1px solid #7f8c8d;
            padding-bottom: 2mm;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          /* Contact Items */
          .contact-item {
            margin-bottom: 5mm;
          }
          
          .contact-label {
            font-size: 10px;
            font-weight: 600;
            color: #bdc3c7;
            margin-bottom: 1mm;
          }
          
          .contact-value {
            font-size: 10px;
            color: white;
            word-break: break-all;
            line-height: 1.3;
          }
          
          /* Skills Section */
          .skill-item {
            margin-bottom: 5mm;
          }
          
          .skill-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2mm;
          }
          
          .skill-name {
            font-size: 10px;
            font-weight: 600;
            color: white;
          }
          
          .skill-percentage {
            font-size: 9px;
            color: #bdc3c7;
          }
          
          .skill-bar {
            width: 100%;
            height: 4mm;
            background-color: #34495e !important;
            border-radius: 2mm;
            overflow: hidden;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .skill-progress {
            height: 100%;
            background-color: #3498db !important;
            border-radius: 2mm;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Language Items */
          .language-item {
            margin-bottom: 4mm;
          }
          
          .language-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2mm;
          }
          
          .language-name {
            font-size: 10px;
            font-weight: 600;
            color: white;
          }
          
          .language-level {
            font-size: 9px;
            color: #bdc3c7;
          }
          
          .language-dots {
            display: flex;
            gap: 1mm;
          }
          
          .language-dot {
            width: 3mm;
            height: 1.5mm;
            border-radius: 1mm;
            background-color: #34495e !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .language-dot.active {
            background-color: #3498db !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Main Content Area */
          .main-content {
            flex: 1;
            width: 140mm;
            height: 297mm;
            background-color: white;
            padding: 20mm 15mm;
            color: #333;
            overflow: hidden;
          }
          
          /* Section Styles */
          .section {
            margin-bottom: 12mm;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 6mm;
            border-bottom: 2px solid #000;
            padding-bottom: 2mm;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          /* Profile/Summary */
          .summary-text {
            font-size: 11px;
            color: #333;
            line-height: 1.6;
            text-align: justify;
          }
          
          /* Experience Items */
          .experience-item, .education-item, .certification-item {
            margin-bottom: 8mm;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .item-header {
            margin-bottom: 3mm;
            position: relative;
          }
          
          .item-title {
            font-size: 13px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 2mm;
            line-height: 1.3;
          }
          
          .item-company {
            font-size: 11px;
            color: #333;
            font-weight: 600;
            margin-bottom: 2mm;
          }
          
          .item-date {
            font-size: 10px;
            color: #666;
            font-weight: 500;
            position: absolute;
            top: 0;
            right: 0;
            background: white;
            padding-left: 5mm;
          }
          
          .item-description {
            font-size: 10px;
            color: #333;
            line-height: 1.5;
          }
          
          .description-point {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2mm;
          }
          
          .description-bullet {
            width: 2mm;
            height: 2mm;
            background-color: #7f8c8d !important;
            border-radius: 50%;
            margin-right: 3mm;
            margin-top: 2mm;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .description-text {
            flex: 1;
            line-height: 1.4;
          }
          
          /* Print Optimization */
          @media print {
            body { 
              margin: 0; 
              padding: 0;
              font-size: 11px; 
              width: 210mm;
              height: 297mm;
            }
            .page-container { 
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
            }
            .sidebar {
              width: 70mm;
              height: 297mm;
            }
            .main-content {
              width: 140mm;
              height: 297mm;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="page-container">
          <!-- Left Sidebar -->
          <div class="sidebar">
            <!-- Profile Section -->
            <div class="profile-section">
              ${personalInfo.profileImage ? `
                <img src="${personalInfo.profileImage}" alt="${personalInfo.fullName}" class="profile-image">
              ` : `
                <div class="profile-placeholder">
                  ${personalInfo.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              `}
              
              <h1 class="profile-name">${personalInfo.fullName}</h1>
              ${experience.length > 0 ? `
                <p class="profile-title">${experience[0].jobTitle}</p>
              ` : ''}
            </div>

            <!-- Contact Section -->
            <div class="sidebar-section">
              <h2 class="sidebar-title">Contact</h2>
              
              <div class="contact-item">
                <p class="contact-label">Address</p>
                <p class="contact-value">${personalInfo.city}</p>
                <p class="contact-value">${personalInfo.state}</p>
              </div>
              
              <div class="contact-item">
                <p class="contact-label">Phone</p>
                <p class="contact-value">${personalInfo.phone}</p>
              </div>
              
              <div class="contact-item">
                <p class="contact-label">Email</p>
                <p class="contact-value">${personalInfo.email}</p>
              </div>
              
              ${personalInfo.linkedin ? `
                <div class="contact-item">
                  <p class="contact-label">LinkedIn</p>
                  <p class="contact-value">${personalInfo.linkedin}</p>
                </div>
              ` : ''}
              
              ${personalInfo.portfolio ? `
                <div class="contact-item">
                  <p class="contact-label">Portfolio</p>
                  <p class="contact-value">${personalInfo.portfolio}</p>
                </div>
              ` : ''}
            </div>

            <!-- Skills Section -->
            ${skills.length > 0 ? `
              <div class="sidebar-section">
                <h2 class="sidebar-title">Skills</h2>
                ${skills.map((skill, index) => `
                  <div class="skill-item">
                    <div class="skill-header">
                      <span class="skill-name">${skill}</span>
                      <span class="skill-percentage">${85 + (index % 3) * 5}%</span>
                    </div>
                    <div class="skill-bar">
                      <div class="skill-progress" style="width: ${85 + (index % 3) * 5}%;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Languages Section -->
            ${languages && languages.length > 0 ? `
              <div class="sidebar-section">
                <h2 class="sidebar-title">Languages</h2>
                ${languages.map(language => {
                  const level = language.proficiency === 'Native' ? 4 : 
                               language.proficiency === 'Advanced' ? 3 :
                               language.proficiency === 'Intermediate' ? 2 : 1;
                  return `
                    <div class="language-item">
                      <div class="language-header">
                        <span class="language-name">${language.name}</span>
                        <span class="language-level">${language.proficiency}</span>
                      </div>
                      <div class="language-dots">
                        ${[1, 2, 3, 4].map(l => `
                          <div class="language-dot ${l <= level ? 'active' : ''}"></div>
                        `).join('')}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Main Content Area -->
          <div class="main-content">
            <!-- Profile/Summary Section -->
            ${professionalSummary ? `
              <div class="section">
                <h2 class="section-title">Profile</h2>
                <p class="summary-text">${professionalSummary}</p>
              </div>
            ` : ''}

            <!-- Work Experience Section -->
            ${experience.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Work Experience</h2>
                ${experience.map(exp => `
                  <div class="experience-item">
                    <div class="item-header">
                      <h3 class="item-title">${exp.jobTitle}</h3>
                      <p class="item-company">${exp.company}, ${exp.location}</p>
                      <span class="item-date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div class="item-description">
                      ${exp.description.split('\n').map(line => line.trim() ? `
                        <div class="description-point">
                          <span class="description-bullet"></span>
                          <span class="description-text">${line}</span>
                        </div>
                      ` : '').join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Education Section -->
            ${education.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Education</h2>
                ${education.map(edu => `
                  <div class="education-item">
                    <div class="item-header">
                      <h3 class="item-title">${edu.degree}</h3>
                      <p class="item-company">${edu.institution}, ${edu.location}</p>
                      <span class="item-date">${edu.startDate} - ${edu.endDate}</span>
                    </div>
                    ${edu.percentage ? `
                      <p class="item-description">Grade: ${edu.percentage}</p>
                    ` : ''}
                    ${edu.description ? `
                      <p class="item-description">${edu.description}</p>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Certifications Section -->
            ${certifications && certifications.length > 0 ? `
              <div class="section">
                <h2 class="section-title">Certifications</h2>
                ${certifications.map(cert => `
                  <div class="certification-item">
                    <div class="item-header">
                      <h3 class="item-title">${cert.name}</h3>
                      <p class="item-company">${cert.issuer}</p>
                      <span class="item-date">
                        Issued: ${new Date(cert.issueDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}
                        ${cert.expiryDate ? ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}` : ''}
                      </span>
                    </div>
                    ${cert.credentialId ? `
                      <p class="item-description">Credential ID: ${cert.credentialId}</p>
                    ` : ''}
                    ${cert.credentialUrl ? `
                      <p class="item-description">
                        <a href="${cert.credentialUrl}" target="_blank" style="color: #3498db; text-decoration: none;">Verify Certificate</a>
                      </p>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
}
export function generateTemplateHTML(templateType: string, data: ResumeData): string {
  switch (templateType) {
    case 'technical':
      return generateTechnicalTemplateHTML(data);
    case 'fresher':
      return generateFresherTemplateHTML(data);
    case 'general':
      return generateGeneralTemplateHTML(data);
    case 'corporate':
      return generateFresherTemplateHTML(data); // fallback to fresher template
    case 'internship':
      return generateFresherTemplateHTML(data); // fallback to fresher template
    default:
      return generateFresherTemplateHTML(data); // default fallback
  }
}