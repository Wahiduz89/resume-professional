// lib/pdf-templates.ts - Updated with technical template support
import { ResumeData } from '@/types'

export function generateTechnicalTemplateHTML(data: ResumeData): string {
  const { personalInfo, professionalSummary, education, experience, skills, projects, languages, certifications } = data

  // Categorize skills for technical display
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
          
          /* A4 Page Setup */
          @page {
            size: A4;
            margin: 10mm;
          }
          
          body { 
            font-family: 'Courier New', monospace;
            line-height: 1.3;
            color: #1f2937;
            background: white;
            font-size: 9px;
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
          }
          
          .container {
            width: 210mm;
            max-width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0;
          }
          
          /* Technical Background Pattern - A4 Optimized */
          .bg-pattern {
            position: absolute;
            inset: 0;
            opacity: 0.01;
            pointer-events: none;
            background-image: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 8px,
              #1e40af 8px,
              #1e40af 9px
            );
          }
          
          /* Header Section - A4 Optimized */
          .header {
            background: linear-gradient(135deg, #111827 0%, #1e40af 50%, #4338ca 100%);
            color: white;
            padding: 15mm 12mm;
            position: relative;
            overflow: hidden;
            max-height: 60mm;
          }
          .header::before {
            content: '&lt;Developer/&gt;';
            position: absolute;
            top: 8px;
            right: 10px;
            color: #22d3ee;
            opacity: 0.3;
            font-size: 7px;
            font-family: 'Courier New', monospace;
          }
          .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 10;
          }
          .profile-section {
            display: flex;
            align-items: center;
            gap: 15mm;
          }
          .profile-image {
            width: 20mm;
            height: 20mm;
            border-radius: 2mm;
            border: 1px solid rgba(255,255,255,0.3);
            object-fit: cover;
            box-shadow: 0 2mm 5mm rgba(0,0,0,0.3);
          }
          .profile-placeholder {
            width: 20mm;
            height: 20mm;
            border-radius: 2mm;
            border: 1px solid rgba(255,255,255,0.3);
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: 900;
            box-shadow: 0 2mm 5mm rgba(0,0,0,0.3);
          }
          .name-section {
            font-family: 'Courier New', monospace;
          }
          .code-comment {
            color: #22d3ee;
            font-size: 7px;
            margin-bottom: 2px;
          }
          .name-section h1 {
            font-size: 16px;
            font-weight: 900;
            letter-spacing: 0.5px;
            margin-bottom: 3px;
            font-family: 'Courier New', monospace;
          }
          .job-title {
            color: #fbbf24;
            font-size: 10px;
            font-weight: 600;
            font-family: 'Courier New', monospace;
          }
          .tech-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 6px;
          }
          .badge-line {
            height: 1px;
            width: 15px;
            background: rgba(34, 211, 238, 0.6);
          }
          .badge-text {
            background: rgba(0,0,0,0.3);
            padding: 3px 6px;
            border-radius: 3px;
            border: 1px solid rgba(34, 211, 238, 0.3);
            color: #22d3ee;
            font-size: 7px;
            font-weight: 700;
            font-family: 'Courier New', monospace;
          }
          .contact-terminal {
            background: rgba(0,0,0,0.4);
            padding: 8mm;
            border-radius: 2mm;
            border: 1px solid rgba(34, 211, 238, 0.3);
            font-family: 'Courier New', monospace;
            font-size: 7px;
            min-width: 45mm;
            max-width: 50mm;
          }
          .terminal-header {
            display: flex;
            align-items: center;
            gap: 2px;
            margin-bottom: 8px;
          }
          .terminal-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }
          .terminal-dot.red { background: #ef4444; }
          .terminal-dot.yellow { background: #eab308; }
          .terminal-dot.green { background: #22c55e; }
          .terminal-path {
            color: #22d3ee;
            font-size: 8px;
            margin-left: 8px;
          }
          .terminal-line {
            margin-bottom: 3px;
          }
          .terminal-prompt {
            color: #22d3ee;
          }
          .terminal-key {
            color: #60a5fa;
          }
          .terminal-value {
            color: #fbbf24;
            word-break: break-all;
          }
          
          /* Main Layout - A4 Optimized */
          .main-layout {
            display: flex;
            gap: 8mm;
            padding: 8mm 10mm;
            max-height: calc(297mm - 80mm); /* Account for header and margins */
          }
          .sidebar {
            width: 60mm;
            background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
            border-radius: 2mm;
            padding: 6mm;
            border: 0.5px solid rgba(226,232,240,0.5);
          }
          .main-content {
            flex: 1;
            background: white;
            max-width: calc(210mm - 80mm); /* Remaining width after sidebar and margins */
          }
          
          /* Card Styles - A4 Optimized */
          .card {
            background: white;
            border-radius: 2mm;
            padding: 4mm;
            margin-bottom: 4mm;
            box-shadow: 0 1mm 3mm rgba(0,0,0,0.05);
            border-left: 1mm solid #3b82f6;
            position: relative;
          }
          .card-header {
            display: flex;
            align-items: center;
            margin-bottom: 3mm;
          }
          .card-icon {
            width: 5mm;
            height: 5mm;
            border-radius: 1mm;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 3mm;
            color: white;
            font-size: 8px;
            font-family: 'Courier New', monospace;
          }
          .card-title {
            font-size: 8px;
            font-weight: 900;
            color: #1f2937;
            font-family: 'Courier New', monospace;
            letter-spacing: 0.3px;
          }
          
          /* Technical Skills - A4 Optimized */
          .skill-category {
            margin-bottom: 4mm;
          }
          .category-title {
            font-size: 7px;
            font-weight: 900;
            color: #374151;
            margin-bottom: 2mm;
            font-family: 'Courier New', monospace;
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
            border-radius: 1.5mm;
            font-size: 6px;
            font-weight: 700;
            border: 0.2mm solid #93c5fd;
            font-family: 'Courier New', monospace;
          }
          
          /* Terminal Styles - A4 Optimized */
          .terminal-header {
            display: flex;
            align-items: center;
            gap: 1mm;
            margin-bottom: 2mm;
          }
          .terminal-dot {
            width: 2mm;
            height: 2mm;
            border-radius: 50%;
          }
          .terminal-dot.red { background: #ef4444; }
          .terminal-dot.yellow { background: #eab308; }
          .terminal-dot.green { background: #22c55e; }
          .terminal-path {
            color: #22d3ee;
            font-size: 6px;
            margin-left: 2mm;
          }
          .terminal-line {
            margin-bottom: 1mm;
          }
          .terminal-prompt {
            color: #22d3ee;
          }
          .terminal-key {
            color: #60a5fa;
          }
          .terminal-value {
            color: #fbbf24;
            word-break: break-all;
          }
          
          /* Language Items - A4 Optimized */
          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2mm;
            margin-bottom: 1.5mm;
            background: white;
            border-radius: 1.5mm;
            border: 0.2mm solid rgba(226,232,240,0.8);
            font-size: 7px;
          }
          .language-name {
            font-weight: 700;
            color: #1f2937;
            font-family: 'Courier New', monospace;
          }
          .language-level {
            display: flex;
            gap: 1mm;
          }
          .level-dot {
            width: 1.5mm;
            height: 1.5mm;
            border-radius: 50%;
            border: 0.2mm solid #e5e7eb;
          }
          .level-active {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            border-color: #22c55e;
          }
          .level-inactive {
            background: #f1f5f9;
          }
          
          /* Main Content Sections - A4 Optimized */
          .section-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 2mm;
            padding: 5mm;
            margin-bottom: 5mm;
            box-shadow: 0 1mm 3mm rgba(0,0,0,0.05);
            border-left: 1.5mm solid #3b82f6;
          }
          .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 4mm;
          }
          .section-icon {
            width: 6mm;
            height: 6mm;
            border-radius: 1.5mm;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 3mm;
            color: white;
            font-size: 10px;
            box-shadow: 0 1mm 2mm rgba(59,130,246,0.3);
          }
          .section-title {
            font-size: 11px;
            font-weight: 900;
            color: #1f2937;
            font-family: 'Courier New', monospace;
            letter-spacing: 0.3px;
          }
          .section-content {
            background: rgba(255,255,255,0.8);
            padding: 4mm;
            border-radius: 1.5mm;
            border: 0.2mm solid rgba(226,232,240,0.8);
          }
          .summary-text {
            font-size: 8px;
            color: #374151;
            line-height: 1.4;
            text-align: justify;
            font-weight: 500;
          }
          
          /* Timeline Items - A4 Optimized */
          .timeline-item {
            margin-bottom: 5mm;
            padding: 4mm;
            background: rgba(255,255,255,0.9);
            border-radius: 1.5mm;
            border: 0.2mm solid rgba(226,232,240,0.8);
            box-shadow: 0 0.5mm 1.5mm rgba(0,0,0,0.05);
          }
          .item-header {
            margin-bottom: 3mm;
          }
          .item-title {
            font-size: 10px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 1mm;
            font-family: 'Courier New', monospace;
          }
          .item-company {
            font-size: 8px;
            font-weight: 700;
            margin-bottom: 1mm;
            color: #3b82f6;
            font-family: 'Courier New', monospace;
          }
          .item-location {
            font-size: 7px;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 2mm;
          }
          .item-date {
            display: inline-block;
            padding: 1mm 2mm;
            border-radius: 2mm;
            font-size: 7px;
            font-weight: 700;
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            float: right;
            margin-top: -3mm;
            font-family: 'Courier New', monospace;
          }
          .item-description {
            font-size: 8px;
            color: #374151;
            line-height: 1.3;
          }
          .description-point {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2mm;
            padding: 2mm;
            background: rgba(248,250,252,0.8);
            border-radius: 1mm;
            border: 0.2mm solid rgba(226,232,240,0.6);
          }
          .point-bullet {
            width: 1mm;
            height: 1mm;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            margin-right: 2mm;
            margin-top: 1.5mm;
            flex-shrink: 0;
          }
          
          /* Project Styles - A4 Optimized */
          .project-item {
            margin-bottom: 4mm;
            padding: 4mm;
            background: rgba(255,255,255,0.9);
            border-radius: 1.5mm;
            border: 0.2mm solid rgba(226,232,240,0.8);
            box-shadow: 0 0.5mm 1.5mm rgba(0,0,0,0.05);
          }
          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 3mm;
          }
          .project-title {
            font-size: 10px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 2mm;
            font-family: 'Courier New', monospace;
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
            padding: 1mm 2mm;
            border-radius: 1mm;
            font-size: 6px;
            font-weight: 700;
            border: 0.2mm solid #c4b5fd;
            font-family: 'Courier New', monospace;
          }
          .project-link {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: white;
            padding: 2mm 3mm;
            border-radius: 1mm;
            font-size: 6px;
            font-weight: 700;
            text-decoration: none;
            font-family: 'Courier New', monospace;
          }
          .project-description {
            font-size: 8px;
            color: #374151;
            line-height: 1.3;
            font-weight: 500;
          }
          
          /* A4 Print Optimization */
          @media print {
            body { 
              margin: 0; 
              font-size: 8px; 
              width: 210mm;
              min-height: 297mm;
            }
            .container { 
              box-shadow: none; 
              width: 210mm;
              min-height: 297mm;
            }
            .bg-pattern { display: none; }
            .card, .timeline-item, .project-item { 
              break-inside: avoid; 
              page-break-inside: avoid; 
            }
            .section-card {
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .header {
              max-height: 55mm;
            }
            .main-layout {
              max-height: calc(297mm - 75mm);
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="bg-pattern"></div>
          
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
                  <div class="code-comment">&gt; const developer = {</div>
                  <h1>${personalInfo.fullName.toUpperCase()}</h1>
                  <div class="job-title">
                    role: "${experience.length > 0 ? experience[0].jobTitle : 'Software Engineer'}"
                  </div>
                  <div class="code-comment">}</div>
                  <div class="tech-badge">
                    <div class="badge-line"></div>
                    <div class="badge-text">FULL-STACK DEVELOPER</div>
                    <div class="badge-line"></div>
                  </div>
                </div>
              </div>
              
              <div class="contact-terminal">
                <div class="terminal-header">
                  <div class="terminal-dot red"></div>
                  <div class="terminal-dot yellow"></div>
                  <div class="terminal-dot green"></div>
                  <span class="terminal-path">~/contact</span>
                </div>
                <div class="terminal-line">
                  <span class="terminal-prompt">$ cat contact.info</span>
                </div>
                <div class="terminal-line">
                  <span class="terminal-key">email:</span> <span class="terminal-value">"${personalInfo.email}"</span>
                </div>
                <div class="terminal-line">
                  <span class="terminal-key">phone:</span> <span class="terminal-value">"${personalInfo.phone}"</span>
                </div>
                <div class="terminal-line">
                  <span class="terminal-key">location:</span> <span class="terminal-value">"${personalInfo.city}, ${personalInfo.state}"</span>
                </div>
                ${personalInfo.linkedin ? `
                  <div class="terminal-line">
                    <span class="terminal-key">linkedin:</span> <span class="terminal-value">"${personalInfo.linkedin}"</span>
                  </div>
                ` : ''}
                ${personalInfo.portfolio ? `
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
              <!-- Technical Skills by Category -->
              ${Object.entries(skillCategories).map(([category, categorySkills]) => `
                <div class="card">
                  <div class="card-header">
                    <div class="card-icon" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                      ${category === 'Programming Languages' ? '</>' : 
                        category === 'Frameworks & Libraries' ? '{}' :
                        category === 'Tools & Technologies' ? '⚙' :
                        category === 'Databases' ? '🗄' : '🔧'}
                    </div>
                    <h3 class="card-title">${category.toUpperCase()}</h3>
                  </div>
                  <div class="skill-tags">
                    ${categorySkills.map(skill => `
                      <span class="skill-tag">${skill}</span>
                    `).join('')}
                  </div>
                </div>
              `).join('')}

              <!-- Languages -->
              ${languages && languages.length > 0 ? `
                <div class="card">
                  <div class="card-header">
                    <div class="card-icon" style="background: linear-gradient(135deg, #10b981, #059669);">🌍</div>
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
              <!-- Professional Summary -->
              ${professionalSummary ? `
                <div class="section-card">
                  <div class="section-header">
                    <div class="section-icon" style="background: linear-gradient(135deg, #6366f1, #4f46e5);">{ }</div>
                    <h3 class="section-title">ABOUT_ME.md</h3>
                  </div>
                  <div class="section-content">
                    <p class="summary-text">${professionalSummary}</p>
                  </div>
                </div>
              ` : ''}

              <!-- Projects Showcase -->
              ${projects && projects.length > 0 ? `
                <div class="section-card" style="border-left-color: #8b5cf6;">
                  <div class="section-header">
                    <div class="section-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">🚀</div>
                    <h3 class="section-title">PROJECTS_SHOWCASE</h3>
                  </div>
                  ${projects.map(project => `
                    <div class="project-item">
                      <div class="project-header">
                        <div>
                          <h4 class="project-title">${project.name}</h4>
                          ${project.technologies && project.technologies.length > 0 ? `
                            <div class="project-tech">
                              ${project.technologies.map(tech => `
                                <span class="tech-tag">${tech}</span>
                              `).join('')}
                            </div>
                          ` : ''}
                        </div>
                        ${project.link ? `
                          <a href="${project.link}" class="project-link">VIEW PROJECT →</a>
                        ` : ''}
                      </div>
                      <p class="project-description">${project.description}</p>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Education -->
              ${education.length > 0 ? `
                <div class="section-card" style="border-left-color: #10b981;">
                  <div class="section-header">
                    <div class="section-icon" style="background: linear-gradient(135deg, #10b981, #059669);">🎓</div>
                    <h3 class="section-title">EDUCATION_LOG</h3>
                  </div>
                  ${education.map(edu => `
                    <div class="timeline-item">
                      <div class="item-header">
                        <h4 class="item-title">${edu.degree}</h4>
                        <p class="item-company">${edu.institution}</p>
                        <p class="item-location">${edu.location}</p>
                        <div class="item-date">
                          ${edu.startDate} - ${edu.endDate}${edu.percentage ? ` • ${edu.percentage}` : ''}
                        </div>
                      </div>
                      ${edu.description ? `<p class="item-description">${edu.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Work Experience -->
              ${experience.length > 0 ? `
                <div class="section-card" style="border-left-color: #f59e0b;">
                  <div class="section-header">
                    <div class="section-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">💼</div>
                    <h3 class="section-title">WORK_EXPERIENCE</h3>
                  </div>
                  ${experience.map(exp => `
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
                        ${exp.description.split('\n').map(line => line.trim() ? `
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

              <!-- Certifications -->
              ${certifications && certifications.length > 0 ? `
                <div class="section-card" style="border-left-color: #ef4444;">
                  <div class="section-header">
                    <div class="section-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626);">🏆</div>
                    <h3 class="section-title">CERTIFICATIONS</h3>
                  </div>
                  ${certifications.map(cert => `
                    <div class="timeline-item">
                      <div class="item-header">
                        <h4 class="item-title">${cert.name}</h4>
                        <p class="item-company">${cert.issuer}</p>
                        ${cert.credentialId ? `<p class="item-location">ID: ${cert.credentialId}</p>` : ''}
                        <div class="item-date">
                          Issued: ${new Date(cert.issueDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          })}
                          ${cert.expiryDate ? ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          })}` : ''}
                        </div>
                      </div>
                      ${cert.credentialUrl ? `
                        <p class="item-description">
                          <a href="${cert.credentialUrl}" style="color: #3b82f6; font-weight: 700;">🔗 VERIFY_CERTIFICATE</a>
                        </p>
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

export function generateFresherTemplateHTML(data: ResumeData): string {
  const { personalInfo, professionalSummary, education, experience, skills, projects, languages, certifications } = data

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
            line-height: 1.4;
            color: #333;
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            position: relative;
          }
          
          /* Background Decorations */
          .bg-decoration-1 {
            position: absolute;
            top: 0;
            right: 0;
            width: 120px;
            height: 120px;
            opacity: 0.1;
            z-index: 1;
          }
          .bg-decoration-2 {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 150px;
            height: 150px;
            opacity: 0.1;
            z-index: 1;
          }
          
          /* Header Section */
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 32px;
            position: relative;
            overflow: hidden;
            z-index: 2;
          }
          .header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            width: 100%;
            height: 40px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: 0 0 50% 50%;
          }
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 3;
          }
          .profile-section {
            display: flex;
            align-items: center;
            gap: 24px;
          }
          .profile-image {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            border: 4px solid white;
            object-fit: cover;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          .profile-placeholder {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            border: 4px solid white;
            background-color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: bold;
            color: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          .name-section h1 {
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 4px;
          }
          .job-title {
            font-size: 18px;
            color: #bfdbfe;
            font-weight: 500;
          }
          .contact-section {
            text-align: right;
            font-size: 13px;
          }
          .contact-label {
            font-weight: 600;
            margin-bottom: 8px;
          }
          .contact-item {
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
          }
          .contact-email {
            color: #bfdbfe;
            margin-top: 4px;
          }
          
          /* Main Content */
          .main-content {
            padding: 32px;
            position: relative;
            z-index: 2;
          }
          .section {
            margin-bottom: 32px;
          }
          .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 4px;
            margin-bottom: 16px;
          }
          .summary-text {
            font-size: 13px;
            color: #374151;
            line-height: 1.6;
            text-align: justify;
          }
          
          /* Skills Grid */
          .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px 32px;
          }
          .skill-item {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            color: #374151;
          }
          .skill-bullet {
            width: 6px;
            height: 6px;
            background-color: #3b82f6;
            border-radius: 50%;
            flex-shrink: 0;
          }
          
          /* Experience Items */
          .experience-item, .project-item, .education-item {
            margin-bottom: 20px;
          }
          .item-header {
            margin-bottom: 8px;
          }
          .item-title {
            font-size: 14px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 4px;
          }
          .item-company {
            font-size: 13px;
            color: #6b7280;
            font-style: italic;
            margin-bottom: 8px;
          }
          .item-description {
            font-size: 13px;
            color: #374151;
            line-height: 1.5;
          }
          .description-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 4px;
          }
          .description-bullet {
            width: 6px;
            height: 6px;
            background-color: #9ca3af;
            border-radius: 50%;
            margin-top: 6px;
            flex-shrink: 0;
          }
          .tech-info {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 8px;
          }
          .tech-label {
            font-weight: 500;
          }
          
          /* Languages and Certifications */
          .language-item, .cert-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
            font-size: 13px;
            color: #374151;
          }
          .cert-text {
            font-size: 13px;
            color: #374151;
            margin-bottom: 4px;
          }
          .cert-details {
            font-size: 11px;
            color: #6b7280;
          }
          
          @media print {
            body { margin: 0; }
            .bg-decoration-1, .bg-decoration-2 { display: none; }
          }
        </style>
      </head>
      <body>
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
                <div style="margin-bottom: 12px;">
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
      </body>
    </html>
  `
}

export function generateGeneralTemplateHTML(data: ResumeData): string {
  const { personalInfo, professionalSummary, education, experience, skills, languages, certifications } = data

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
            margin: 10mm;
          }
          
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.4;
            color: #333;
            background: white;
            font-size: 10px;
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .container {
            display: flex;
            width: 190mm;
            min-height: 277mm;
            margin: 0 auto;
            box-sizing: border-box;
          }
          
          /* Left Sidebar - Dark Blue */
          .sidebar {
            width: 65mm;
            background-color: #2c3e50 !important;
            color: white;
            padding: 15mm 12mm;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Profile Section */
          .profile-section {
            text-align: center;
            margin-bottom: 12mm;
          }
          
          .profile-image {
            width: 25mm;
            height: 25mm;
            border-radius: 50%;
            border: 2px solid white;
            object-fit: cover;
            margin: 0 auto 8mm auto;
            display: block;
            box-shadow: 0 1mm 3mm rgba(0,0,0,0.3);
          }
          
          .profile-placeholder {
            width: 25mm;
            height: 25mm;
            border-radius: 50%;
            border: 2px solid white;
            background-color: #34495e;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 8mm auto;
            font-size: 12px;
            font-weight: bold;
            color: white;
            box-shadow: 0 1mm 3mm rgba(0,0,0,0.3);
          }
          
          .profile-name {
            font-size: 13px;
            font-weight: bold;
            color: white;
            margin-bottom: 2mm;
            line-height: 1.2;
          }
          
          .profile-title {
            font-size: 10px;
            color: #bdc3c7;
            font-weight: 500;
          }
          
          /* Sidebar Sections */
          .sidebar-section {
            margin-bottom: 10mm;
          }
          
          .sidebar-title {
            font-size: 11px;
            font-weight: bold;
            color: white;
            margin-bottom: 5mm;
            border-bottom: 1px solid #7f8c8d;
            padding-bottom: 2mm;
            text-transform: uppercase;
            letter-spacing: 0.3px;
          }
          
          /* Contact Items */
          .contact-item {
            margin-bottom: 4mm;
          }
          
          .contact-label {
            font-size: 8px;
            font-weight: 600;
            color: #bdc3c7;
            margin-bottom: 1mm;
          }
          
          .contact-value {
            font-size: 9px;
            color: white;
            word-break: break-all;
            line-height: 1.3;
          }
          
          /* Skills Section */
          .skill-item {
            margin-bottom: 4mm;
          }
          
          .skill-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5mm;
          }
          
          .skill-name {
            font-size: 8px;
            font-weight: 600;
            color: white;
          }
          
          .skill-percentage {
            font-size: 7px;
            color: #bdc3c7;
          }
          
          .skill-bar {
            width: 100%;
            height: 3mm;
            background-color: #34495e !important;
            border-radius: 1.5mm;
            overflow: hidden;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .skill-progress {
            height: 100%;
            background-color: #3498db !important;
            border-radius: 1.5mm;
            transition: width 0.3s ease;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Language Items */
          .language-item {
            margin-bottom: 3mm;
          }
          
          .language-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5mm;
          }
          
          .language-name {
            font-size: 8px;
            font-weight: 600;
            color: white;
          }
          
          .language-level {
            font-size: 7px;
            color: #bdc3c7;
          }
          
          .language-dots {
            display: flex;
            gap: 1mm;
          }
          
          .language-dot {
            width: 2.5mm;
            height: 1.2mm;
            border-radius: 0.6mm;
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
            background-color: white;
            padding: 15mm 12mm;
            color: #333;
            overflow: hidden;
          }
          
          /* Section Styles */
          .section {
            margin-bottom: 10mm;
          }
          
          .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5mm;
            border-bottom: 2px solid #000;
            padding-bottom: 1.5mm;
            text-transform: uppercase;
          }
          
          /* Profile/Summary */
          .summary-text {
            font-size: 9px;
            color: #333;
            line-height: 1.6;
            text-align: justify;
          }
          
          /* Experience Items */
          .experience-item, .education-item, .certification-item {
            margin-bottom: 7mm;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .item-header {
            margin-bottom: 2mm;
            position: relative;
          }
          
          .item-title {
            font-size: 11px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 1mm;
          }
          
          .item-company {
            font-size: 9px;
            color: #333;
            font-weight: 600;
            margin-bottom: 1mm;
          }
          
          .item-date {
            font-size: 8px;
            color: #666;
            font-weight: 500;
            position: absolute;
            top: 0;
            right: 0;
          }
          
          .item-description {
            font-size: 8.5px;
            color: #333;
            line-height: 1.5;
          }
          
          .description-point {
            display: flex;
            align-items: flex-start;
            margin-bottom: 1.5mm;
          }
          
          .description-bullet {
            width: 1.5mm;
            height: 1.5mm;
            background-color: #7f8c8d !important;
            border-radius: 50%;
            margin-right: 2.5mm;
            margin-top: 1.5mm;
            flex-shrink: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .description-text {
            flex: 1;
          }
          
          /* Print Optimization */
          @media print {
            body { 
              margin: 0; 
              font-size: 9px; 
            }
            .container { 
              box-shadow: none; 
              width: 190mm;
              min-height: 277mm;
            }
            .section { 
              break-inside: avoid; 
              page-break-inside: avoid; 
            }
            .experience-item, .education-item, .certification-item { 
              break-inside: avoid; 
              page-break-inside: avoid; 
            }
            .sidebar {
              width: 65mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
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
                <p class="contact-value">${personalInfo.state}, USA</p>
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