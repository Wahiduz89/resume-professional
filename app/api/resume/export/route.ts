// app/api/resume/export/route.ts - Updated with student basic plan support
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import puppeteer from 'puppeteer'
import { generateTemplateHTML } from '@/lib/pdf-templates'
import { getSubscriptionLimits, SUBSCRIPTION_PLANS } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { resumeId, requiresPayment = false } = await req.json()

    // Get user with subscription and resume data
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

    const resume = user.resumes[0]
    const resumeData = resume.content as any

    // Check if user has active subscription (including free plans)
    if (!user.subscription || 
        user.subscription.status !== 'active' ||
        (user.subscription.expiresAt && new Date(user.subscription.expiresAt) < new Date())) {
      return NextResponse.json({
        error: 'Active subscription required',
        redirectToPayment: true,
        suggestedPlan: 'student_basic_monthly' // Suggest free plan first
      }, { status: 403 })
    }

    const planLimits = getSubscriptionLimits(user.subscription.planType)
    
    // Check if template is allowed in current plan
    if (!planLimits.templates.includes(resumeData.template)) {
      // Determine appropriate suggestion based on template and current plan
      let suggestedPlan = 'student_pro_monthly' // Default for general/technical templates
      
      if (resumeData.template === 'fresher') {
        suggestedPlan = 'student_basic_monthly'
      } else if (resumeData.template === 'general') {
        suggestedPlan = 'student_pro_monthly'
      } else if (resumeData.template === 'technical') {
        suggestedPlan = 'student_pro_monthly'
      }

      return NextResponse.json({
        error: 'Template not available in your plan',
        redirectToPayment: true,
        suggestedPlan,
        currentTemplate: resumeData.template,
        message: `${resumeData.template} template requires a higher plan`
      }, { status: 403 })
    }

    // Check if AI enhancement was used
    const aiEnhanced = resumeData.aiEnhanced || false

    // If AI enhanced, check AI download limits
    if (aiEnhanced) {
      if (planLimits.aiEnhancedDownloads === 0) {
        // Student basic plan - no AI features allowed
        return NextResponse.json({
          error: 'AI features not available in your plan',
          redirectToPayment: true,
          currentPlan: user.subscription.planType,
          suggestedPlan: 'student_starter_monthly',
          message: 'AI enhancement requires Student Starter plan or higher'
        }, { status: 403 })
      }
      
      if (user.subscription.aiDownloadsUsed >= planLimits.aiEnhancedDownloads) {
        // Determine upgrade suggestion based on current plan
        let suggestedPlan = null
        if (user.subscription.planType === 'student_starter_monthly') {
          suggestedPlan = 'student_pro_monthly'
        }

        return NextResponse.json({
          error: 'AI download limit exceeded',
          redirectToPayment: suggestedPlan ? true : false,
          currentPlan: user.subscription.planType,
          suggestedPlan,
          message: `You have used all ${planLimits.aiEnhancedDownloads} AI-enhanced downloads for this month`
        }, { status: 403 })
      }
    }

    // If this is the actual download request (not just a check)
    if (!requiresPayment) {
      // Generate PDF using Puppeteer
      const html = generateTemplateHTML(resumeData.template, resumeData)

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

      // Track the download
      await prisma.download.create({
        data: {
          userId: user.id,
          resumeId: resumeId,
          template: resumeData.template,
          aiEnhanced: aiEnhanced,
          planType: user.subscription.planType
        }
      })

      // Update subscription usage if AI enhanced
      if (aiEnhanced) {
        await prisma.subscription.update({
          where: { userId: user.id },
          data: {
            aiDownloadsUsed: {
              increment: 1
            },
            totalDownloads: {
              increment: 1
            }
          }
        })
      } else {
        await prisma.subscription.update({
          where: { userId: user.id },
          data: {
            totalDownloads: {
              increment: 1
            }
          }
        })
      }

      // Return PDF response
      return new NextResponse(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="resume-${resumeId}.pdf"`
        }
      })
    } else {
      // This is a check request - return success
      return NextResponse.json({
        success: true,
        canDownload: true,
        aiEnhanced,
        planType: user.subscription.planType,
        remainingAiDownloads: Math.max(0, planLimits.aiEnhancedDownloads - user.subscription.aiDownloadsUsed)
      })
    }

  } catch (error) {
    console.error('PDF export error:', error)
    return NextResponse.json(
      { error: 'Failed to export PDF' },
      { status: 500 }
    )
  }
}

// Updated endpoint to check download eligibility for all plans including student basic
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const resumeId = searchParams.get('resumeId')
    
    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID required' }, { status: 400 })
    }

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

    const resume = user.resumes[0]
    const resumeData = resume.content as any

    // Check subscription status
    if (!user.subscription || 
        user.subscription.status !== 'active' ||
        new Date(user.subscription.expiresAt!) < new Date()) {
      return NextResponse.json({
        canDownload: false,
        reason: 'No active subscription',
        redirectToPayment: true,
        suggestedPlan: 'student_basic_monthly'
      })
    }

    const planLimits = getSubscriptionLimits(user.subscription.planType)
    const aiEnhanced = resumeData.aiEnhanced || false

    // Check template availability
    if (!planLimits.templates.includes(resumeData.template)) {
      let suggestedPlan = 'student_pro_monthly'
      
      if (resumeData.template === 'fresher') {
        suggestedPlan = 'student_basic_monthly'
      }

      return NextResponse.json({
        canDownload: false,
        reason: 'Template not available in current plan',
        redirectToPayment: true,
        suggestedPlan,
        currentTemplate: resumeData.template
      })
    }

    // Check AI limits
    if (aiEnhanced) {
      if (planLimits.aiEnhancedDownloads === 0) {
        // Student basic plan
        return NextResponse.json({
          canDownload: false,
          reason: 'AI features not available in current plan',
          redirectToPayment: true,
          suggestedPlan: 'student_starter_monthly',
          currentPlan: user.subscription.planType
        })
      }
      
      if (user.subscription.aiDownloadsUsed >= planLimits.aiEnhancedDownloads) {
        return NextResponse.json({
          canDownload: false,
          reason: 'AI download limit exceeded',
          redirectToPayment: user.subscription.planType === 'student_starter_monthly',
          suggestedPlan: user.subscription.planType === 'student_starter_monthly' 
            ? 'student_pro_monthly' 
            : null,
          aiDownloadsUsed: user.subscription.aiDownloadsUsed,
          aiDownloadsLimit: planLimits.aiEnhancedDownloads
        })
      }
    }

    return NextResponse.json({
      canDownload: true,
      planType: user.subscription.planType,
      aiEnhanced,
      remainingAiDownloads: Math.max(0, planLimits.aiEnhancedDownloads - user.subscription.aiDownloadsUsed),
      totalDownloads: user.subscription.totalDownloads
    })

  } catch (error) {
    console.error('Download check error:', error)
    return NextResponse.json(
      { error: 'Failed to check download eligibility' },
      { status: 500 }
    )
  }
}