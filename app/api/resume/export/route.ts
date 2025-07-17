// app/api/resume/export/route.ts - Updated with improved template validation and messaging
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import puppeteer from 'puppeteer'
import { generateTemplateHTML } from '@/lib/pdf-templates'
import { getSubscriptionLimits, SUBSCRIPTION_PLANS } from '@/lib/razorpay'

// Template to plan mapping for clear messaging
const TEMPLATE_PLAN_REQUIREMENTS = {
  'fresher': 'student_basic_monthly',
  'general': 'student_pro_monthly',
  'technical': 'student_pro_monthly',
  'corporate': 'student_pro_monthly',
  'internship': 'student_basic_monthly'
}

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

    // Check if user has active subscription
    if (!user.subscription || 
        user.subscription.status !== 'active' ||
        (user.subscription.expiresAt && new Date(user.subscription.expiresAt) <= new Date())) {
      const requiredPlan = TEMPLATE_PLAN_REQUIREMENTS[resumeData.template as keyof typeof TEMPLATE_PLAN_REQUIREMENTS] || 'student_starter_monthly'
      
      return NextResponse.json({
        error: 'Active subscription required',
        redirectToPayment: true,
        suggestedPlan: requiredPlan,
        message: `Please subscribe to download ${resumeData.template} template resumes`
      }, { status: 403 })
    }

    // At this point, TypeScript knows user.subscription is not null
    const planLimits = getSubscriptionLimits(user.subscription.planType)
    
    // Check if template is allowed in current plan
    if (!planLimits.templates.includes(resumeData.template)) {
      const requiredPlan = TEMPLATE_PLAN_REQUIREMENTS[resumeData.template as keyof typeof TEMPLATE_PLAN_REQUIREMENTS]
      const requiredPlanName = SUBSCRIPTION_PLANS[requiredPlan as keyof typeof SUBSCRIPTION_PLANS]?.name || 'Higher Plan'
      
      return NextResponse.json({
        error: `${resumeData.template.charAt(0).toUpperCase() + resumeData.template.slice(1)} template requires ${requiredPlanName}`,
        redirectToPayment: true,
        suggestedPlan: requiredPlan,
        currentTemplate: resumeData.template,
        message: `Please upgrade to ${requiredPlanName} to download ${resumeData.template} template resumes`
      }, { status: 403 })
    }

    // Check if AI enhancement was used
    const aiEnhanced = resumeData.aiEnhanced || false

    // If AI enhanced, check AI download limits
    if (aiEnhanced) {
      if (planLimits.aiEnhancedDownloads === 0) {
        return NextResponse.json({
          error: 'AI features not available in your current plan',
          redirectToPayment: true,
          suggestedPlan: 'student_starter_monthly',
          message: 'AI enhancement requires Student Starter plan or higher'
        }, { status: 403 })
      }
      
      if (user.subscription.aiDownloadsUsed >= planLimits.aiEnhancedDownloads) {
        const nextPlan = user.subscription.planType === 'student_starter_monthly' ? 'student_pro_monthly' : null
        
        return NextResponse.json({
          error: `AI download limit exceeded (${planLimits.aiEnhancedDownloads} per month)`,
          redirectToPayment: !!nextPlan,
          suggestedPlan: nextPlan,
          message: nextPlan 
            ? `Upgrade to Student Pro for more AI downloads (${SUBSCRIPTION_PLANS.student_pro_monthly.limits.aiEnhancedDownloads} per month)`
            : 'You have reached your AI download limit for this month'
        }, { status: 403 })
      }
    }

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

    // Update subscription usage
    const updateData: any = {
      totalDownloads: { increment: 1 }
    }

    if (aiEnhanced) {
      updateData.aiDownloadsUsed = { increment: 1 }
    }

    await prisma.subscription.update({
      where: { userId: user.id },
      data: updateData
    })

    // Return PDF response
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeData.personalInfo.fullName.replace(/\s+/g, '-')}-resume.pdf"`
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

// GET endpoint to check download eligibility
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
        (user.subscription.expiresAt && new Date(user.subscription.expiresAt) <= new Date())) {
      const requiredPlan = TEMPLATE_PLAN_REQUIREMENTS[resumeData.template as keyof typeof TEMPLATE_PLAN_REQUIREMENTS] || 'student_starter_monthly'
      
      return NextResponse.json({
        canDownload: false,
        reason: 'No active subscription',
        redirectToPayment: true,
        suggestedPlan: requiredPlan,
        currentTemplate: resumeData.template
      })
    }

    // At this point, TypeScript knows user.subscription is not null
    const planLimits = getSubscriptionLimits(user.subscription.planType)
    const aiEnhanced = resumeData.aiEnhanced || false

    // Check template availability
    if (!planLimits.templates.includes(resumeData.template)) {
      const requiredPlan = TEMPLATE_PLAN_REQUIREMENTS[resumeData.template as keyof typeof TEMPLATE_PLAN_REQUIREMENTS]
      const requiredPlanName = SUBSCRIPTION_PLANS[requiredPlan as keyof typeof SUBSCRIPTION_PLANS]?.name || 'Higher Plan'
      
      return NextResponse.json({
        canDownload: false,
        reason: `${resumeData.template.charAt(0).toUpperCase() + resumeData.template.slice(1)} template requires ${requiredPlanName}`,
        redirectToPayment: true,
        suggestedPlan: requiredPlan,
        currentTemplate: resumeData.template
      })
    }

    // Check AI limits
    if (aiEnhanced) {
      if (planLimits.aiEnhancedDownloads === 0) {
        return NextResponse.json({
          canDownload: false,
          reason: 'AI features not available in your current plan',
          redirectToPayment: true,
          suggestedPlan: 'student_starter_monthly'
        })
      }
      
      if (user.subscription.aiDownloadsUsed >= planLimits.aiEnhancedDownloads) {
        const nextPlan = user.subscription.planType === 'student_starter_monthly' ? 'student_pro_monthly' : null
        
        return NextResponse.json({
          canDownload: false,
          reason: `AI download limit exceeded (${user.subscription.aiDownloadsUsed}/${planLimits.aiEnhancedDownloads} used)`,
          redirectToPayment: !!nextPlan,
          suggestedPlan: nextPlan
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