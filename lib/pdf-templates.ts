// lib/pdf-templates.ts - Complete updated file with A4-optimized general template
import { ResumeData } from '@/types'

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
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.4;
            color: #1f2937;
            background: white;
            font-size: 10px;
          }
          
          .container {
            max-width: 210mm;
            max-height: 297mm;
            margin: 0 auto;
            position: relative;
            background: white;
            overflow: hidden;
          }
          
          /* Minimized Background Pattern */
          .bg-pattern {
            position: absolute;
            inset: 0;
            opacity: 0.01;
            pointer-events: none;
          }
          .bg-decoration-1 {
            position: absolute;
            top: 0;
            right: 0;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(50%, -50%);
            filter: blur(30px);
          }
          
          /* Compact Header */
          .header {
            position: relative;
            background: linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #3730a3 100%);
            color: white;
            overflow: hidden;
            padding: 20px 30px;
            margin-bottom: 15px;
          }
          .header::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 0;
            width: 100%;
            height: 30px;
            background: linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #3730a3 100%);
            border-radius: 0 0 50% 50%;
            opacity: 0.8;
          }
          .header-content {
            position: relative;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .profile-section {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .profile-image {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid rgba(255,255,255,0.3);
            object-fit: cover;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          }
          .profile-placeholder {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid rgba(255,255,255,0.3);
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
            font-weight: 900;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          }
          .name-section h1 {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 1px;
            margin-bottom: 4px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
          .job-title {
            font-size: 14px;
            color: #bfdbfe;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .professional-badge {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .badge-line {
            height: 1px;
            width: 30px;
            background: rgba(255,255,255,0.6);
          }
          .badge-text {
            background: rgba(255,255,255,0.1);
            padding: 4px 12px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.2);
            color: #bfdbfe;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .contact-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 12px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.2);
            font-size: 9px;
          }
          .contact-item-header {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            margin-bottom: 4px;
          }
          .contact-icon-header {
            width: 16px;
            height: 16px;
            background: rgba(255,255,255,0.2);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
          }
          .contact-label {
            color: #bfdbfe;
            font-size: 8px;
            font-weight: 600;
          }
          .contact-value {
            color: white;
            font-weight: 600;
            text-align: right;
            word-break: break-all;
            font-size: 9px;
          }
          
          /* Compact Main Layout */
          .main-layout {
            display: flex;
            gap: 20px;
            padding: 0 30px 20px;
          }
          .sidebar {
            width: 200px;
            background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
            border-radius: 12px;
            padding: 15px;
            border: 1px solid rgba(226,232,240,0.5);
          }
          .main-content {
            flex: 1;
            background: white;
          }
          
          /* Compact Card Styles */
          .card {
            background: white;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border: 1px solid rgba(226,232,240,0.5);
            position: relative;
            overflow: hidden;
          }
          .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
            background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          }
          .card-header {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            position: relative;
            z-index: 10;
          }
          .card-icon {
            width: 24px;
            height: 24px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            color: white;
            font-size: 12px;
            box-shadow: 0 4px 8px rgba(59,130,246,0.2);
          }
          .card-title {
            font-size: 12px;
            font-weight: 900;
            color: #1f2937;
            letter-spacing: 0.5px;
          }
          
          /* Compact Contact Items */
          .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            padding: 8px;
            background: white;
            border-radius: 8px;
            border: 1px solid rgba(226,232,240,0.8);
            box-shadow: 0 2px 4px rgba(0,0,0,0.03);
          }
          .contact-icon-wrapper {
            width: 20px;
            height: 20px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            color: white;
            font-size: 10px;
            box-shadow: 0 2px 4px rgba(59,130,246,0.2);
          }
          .contact-text {
            font-size: 8px;
            color: #374151;
            font-weight: 600;
            word-break: break-all;
            flex: 1;
          }
          
          /* Compact Skills */
          .skill-item {
            margin-bottom: 12px;
          }
          .skill-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
          }
          .skill-name {
            font-size: 9px;
            font-weight: 800;
            color: #1f2937;
          }
          .skill-percentage {
            font-size: 8px;
            font-weight: 900;
            color: #3b82f6;
            background: #dbeafe;
            padding: 2px 6px;
            border-radius: 6px;
          }
          .skill-bar {
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
          }
          .skill-progress {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(59,130,246,0.3);
          }
          
          /* Compact Languages */
          .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            margin-bottom: 6px;
            background: white;
            border-radius: 8px;
            border: 1px solid rgba(226,232,240,0.8);
            font-size: 9px;
          }
          .language-name {
            font-weight: 700;
            color: #1f2937;
          }
          .language-level {
            display: flex;
            gap: 3px;
          }
          .level-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1px solid #e5e7eb;
          }
          .level-active {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-color: #3b82f6;
          }
          .level-inactive {
            background: #f1f5f9;
          }
          
          /* Compact Timeline Items */
          .timeline-item {
            position: relative;
            padding-left: 20px;
            margin-bottom: 20px;
            border-left: 2px solid #bfdbfe;
          }
          .timeline-item::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(59,130,246,0.3);
          }
          .timeline-content {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 8px;
            padding: 12px;
            border: 1px solid rgba(226,232,240,0.8);
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          }
          .item-header {
            margin-bottom: 8px;
          }
          .item-title {
            font-size: 12px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 3px;
          }
          .item-company {
            font-size: 10px;
            font-weight: 700;
            margin-bottom: 2px;
          }
          .item-location {
            font-size: 8px;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 6px;
          }
          .item-date {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 8px;
            font-weight: 700;
            float: right;
            margin-top: -10px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          }
          .item-description {
            font-size: 9px;
            color: #374151;
            line-height: 1.5;
          }
          .description-point {
            display: flex;
            align-items: flex-start;
            margin-bottom: 6px;
            padding: 6px;
            background: white;
            border-radius: 6px;
            border: 1px solid rgba(226,232,240,0.8);
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          }
          .point-bullet {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin-right: 8px;
            margin-top: 4px;
            flex-shrink: 0;
            box-shadow: 0 1px 2px rgba(59,130,246,0.2);
          }
          
          /* Compact Summary Section */
          .summary-card {
            background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
            border-radius: 12px;
            padding: 15px;
            border: 1px solid rgba(226,232,240,0.5);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .summary-text {
            font-size: 10px;
            color: #374151;
            line-height: 1.6;
            text-align: justify;
            background: rgba(255,255,255,0.8);
            padding: 12px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            font-weight: 500;
            box-shadow: 0 2px 6px rgba(0,0,0,0.03);
          }
          
          /* Compact Additional Skills Tags */
          .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }
          .skill-tag {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe);
            color: #1e40af;
            padding: 4px 8px;
            border-radius: 10px;
            font-size: 8px;
            font-weight: 700;
            border: 1px solid #93c5fd;
            box-shadow: 0 1px 2px rgba(59,130,246,0.1);
          }
          
          /* Color Variations for Different Sections */
          .education-timeline .timeline-item::before { background: linear-gradient(135deg, #10b981, #059669); }
          .education-timeline .item-company { color: #10b981; }
          .education-timeline .item-date { background: linear-gradient(135deg, #d1fae5, #a7f3d0); color: #065f46; }
          
          .experience-timeline .timeline-item::before { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
          .experience-timeline .item-company { color: #8b5cf6; }
          .experience-timeline .item-date { background: linear-gradient(135deg, #ede9fe, #ddd6fe); color: #581c87; }
          .experience-timeline .point-bullet { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
          
          .certifications-timeline .timeline-item::before { background: linear-gradient(135deg, #f59e0b, #d97706); }
          .certifications-timeline .item-company { color: #f59e0b; }
          .certifications-timeline .item-date { background: linear-gradient(135deg, #fef3c7, #fde68a); color: #92400e; }
          
          @media print {
            body { margin: 0; font-size: 9px; }
            .container { 
              max-height: 297mm; 
              box-shadow: none; 
              page-break-inside: avoid;
            }
            .card { 
              break-inside: avoid; 
              page-break-inside: avoid; 
            }
            .timeline-item { 
              break-inside: avoid; 
              page-break-inside: avoid; 
            }
            .bg-pattern { display: none; }
            .header { margin-bottom: 10px; }
            .main-layout { padding-bottom: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Minimized Background Pattern -->
          <div class="bg-pattern">
            <div class="bg-decoration-1"></div>
          </div>
          
          <!-- Compact Header Section -->
          <div class="header">
            <div class="header-content">
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
                  ${experience.length > 0 ? `<p class="job-title">${experience[0].jobTitle}</p>` : ''}
                  <div class="professional-badge">
                    <div class="badge-line"></div>
                    <div class="badge-text">PROFESSIONAL</div>
                    <div class="badge-line"></div>
                  </div>
                </div>
              </div>
              
              <div class="contact-card">
                <div class="contact-item-header">
                  <span class="contact-label">Email</span>
                  <div class="contact-icon-header">📧</div>
                </div>
                <div class="contact-value">${personalInfo.email}</div>
                
                <div class="contact-item-header" style="margin-top: 8px;">
                  <span class="contact-label">Phone</span>
                  <div class="contact-icon-header">📞</div>
                </div>
                <div class="contact-value">${personalInfo.phone}</div>
              </div>
            </div>
          </div>

          <!-- Compact Main Layout -->
          <div class="main-layout">
            <!-- Compact Left Sidebar -->
            <div class="sidebar">
              <!-- Contact Information -->
              <div class="card">
                <div class="card-header">
                  <div class="card-icon" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">📧</div>
                  <h3 class="card-title">CONTACT</h3>
                </div>
                <div class="contact-item">
                  <div class="contact-icon-wrapper" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">📧</div>
                  <span class="contact-text">${personalInfo.email}</span>
                </div>
                <div class="contact-item">
                  <div class="contact-icon-wrapper" style="background: linear-gradient(135deg, #10b981, #059669);">📞</div>
                  <span class="contact-text">${personalInfo.phone}</span>
                </div>
                <div class="contact-item">
                  <div class="contact-icon-wrapper" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">📍</div>
                  <div class="contact-text">
                    ${personalInfo.address ? `<div>${personalInfo.address}</div>` : ''}
                    <div>${personalInfo.city}, ${personalInfo.state} ${personalInfo.pincode}</div>
                  </div>
                </div>
                ${personalInfo.linkedin ? `
                  <div class="contact-item">
                    <div class="contact-icon-wrapper" style="background: linear-gradient(135deg, #3b82f6, #1e40af);">🔗</div>
                    <span class="contact-text">${personalInfo.linkedin}</span>
                  </div>
                ` : ''}
                ${personalInfo.portfolio ? `
                  <div class="contact-item">
                    <div class="contact-icon-wrapper" style="background: linear-gradient(135deg, #06b6d4, #0891b2);">🌐</div>
                    <span class="contact-text">${personalInfo.portfolio}</span>
                  </div>
                ` : ''}
              </div>

              <!-- Skills Section -->
              ${skills.length > 0 ? `
                <div class="card">
                  <div class="card-header">
                    <div class="card-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">⚡</div>
                    <h3 class="card-title">SKILLS</h3>
                  </div>
                  ${skills.slice(0, 6).map((skill, index) => `
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

              <!-- Additional Skills -->
              ${skills.length > 6 ? `
                <div class="card">
                  <div class="card-header">
                    <div class="card-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">🎯</div>
                    <h3 class="card-title">MORE</h3>
                  </div>
                  <div class="skill-tags">
                    ${skills.slice(6).map(skill => `
                      <span class="skill-tag">${skill}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Compact Right Main Content -->
            <div class="main-content">
              <!-- Professional Summary -->
              ${professionalSummary ? `
                <div class="summary-card">
                  <div class="card-header">
                    <div class="card-icon" style="background: linear-gradient(135deg, #6366f1, #4f46e5);">📄</div>
                    <h3 class="card-title">PROFESSIONAL SUMMARY</h3>
                  </div>
                  <p class="summary-text">${professionalSummary}</p>
                </div>
              ` : ''}

              <!-- Education Section -->
              ${education.length > 0 ? `
                <div class="card">
                  <div class="card-header">
                    <div class="card-icon" style="background: linear-gradient(135deg, #10b981, #059669);">🎓</div>
                    <h3 class="card-title">EDUCATION</h3>
                  </div>
                  <div class="education-timeline">
                    ${education.map(edu => `
                      <div class="timeline-item">
                        <div class="timeline-content">
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
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Work Experience Section -->
              ${experience.length > 0 ? `
                <div class="card">
                  <div class="card-header">
                    <div class="card-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">💼</div>
                    <h3 class="card-title">WORK EXPERIENCE</h3>
                  </div>
                  <div class="experience-timeline">
                    ${experience.map(exp => `
                      <div class="timeline-item">
                        <div class="timeline-content">
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
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Certifications Section -->
              ${certifications && certifications.length > 0 ? `
                <div class="card">
                  <div class="card-header">
                    <div class="card-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">🏆</div>
                    <h3 class="card-title">CERTIFICATIONS</h3>
                  </div>
                  <div class="certifications-timeline">
                    ${certifications.map(cert => `
                      <div class="timeline-item">
                        <div class="timeline-content">
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
                              <a href="${cert.credentialUrl}" target="_blank" style="color: #f59e0b; font-weight: 700;">🔗 Verify Certificate</a>
                            </p>
                          ` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateTemplateHTML(templateType: string, data: ResumeData): string {
  switch (templateType) {
    case 'fresher':
      return generateFresherTemplateHTML(data);
    case 'general':
      return generateGeneralTemplateHTML(data);
    case 'corporate':
      return generateFresherTemplateHTML(data); // fallback to fresher template
    case 'technical':
      return generateGeneralTemplateHTML(data); // fallback to general template
    default:
      return generateFresherTemplateHTML(data); // default fallback
  }
}