// lib/pdf-templates.ts - Updated generateFresherTemplateHTML function
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