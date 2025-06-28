import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import puppeteer from 'puppeteer'
import { renderToString } from 'react-dom/server'
import { CorporateTemplate } from '@/components/resume/templates/corporate'
import { TechnicalTemplate } from '@/components/resume/templates/technical'
import { GeneralTemplate } from '@/components/resume/templates/general'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { resumeId } = await req.json()

    // Check user subscription
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { 
        subscription: true,
        resumes: {
          where: { id: resumeId }
        }
      }
    })

    if (!user || user.resumes.length === 0) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // Check if subscription is active
    if (!user.subscription || 
        user.subscription.status !== 'active' ||
        new Date(user.subscription.expiresAt!) < new Date()) {
      return NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      )
    }

    const resume = user.resumes[0]
    const resumeData = resume.content as any

    // Select template component
    let TemplateComponent
    switch (resumeData.template) {
      case 'technical':
        TemplateComponent = TechnicalTemplate
        break
      case 'general':
        TemplateComponent = GeneralTemplate
        break
      default:
        TemplateComponent = CorporateTemplate
    }

    // Generate HTML
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6;
              color: #333;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${renderToString(TemplateComponent({ data: resumeData }))}
        </body>
      </html>
    `

    // Generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      }
    })
    
    await browser.close()

    // Return PDF
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume-${resumeId}.pdf"`
      }
    })
  } catch (error) {
    console.error('PDF export error:', error)
    return NextResponse.json(
      { error: 'Failed to export PDF' },
      { status: 500 }
    )
  }
}