// app/api/resume/parse/route.ts - Affinda resume parsing API endpoint
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { parseResume } from '@/lib/resume-parser'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload PDF or Word document.' 
      }, { status: 400 })
    }

    // Validate file size (max 10MB for Affinda)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 10MB.' 
      }, { status: 400 })
    }

    // Check if Affinda API key is configured
    if (!process.env.AFFINDA_API_KEY) {
      return NextResponse.json({ 
        error: 'Resume parsing service not configured. Please contact support.' 
      }, { status: 503 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Parse resume using Affinda
    console.log('Starting resume parsing for:', file.name)
    
    const parseResult = await parseResume(buffer, file.name)

    if (!parseResult.success) {
      console.error('Resume parsing failed:', parseResult.error)
      return NextResponse.json({
        error: 'Failed to parse resume. Please check the file format and try again.',
        details: parseResult.error
      }, { status: 400 })
    }

    if (!parseResult.data) {
      return NextResponse.json({
        error: 'No data extracted from resume. Please try a different file.'
      }, { status: 400 })
    }

    // Save parsed resume to database
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        template: parseResult.data.template,
        content: parseResult.data
      }
    })

    console.log('Resume parsed and saved successfully:', resume.id)

    // Return success with parsing confidence and resume ID
    return NextResponse.json({
      success: true,
      message: 'Resume parsed successfully!',
      resumeId: resume.id,
      confidence: parseResult.confidence || 85,
      data: parseResult.data,
      extractedSections: {
        personalInfo: !!parseResult.data.personalInfo.fullName,
        education: parseResult.data.education.length > 0,
        experience: parseResult.data.experience.length > 0,
        skills: parseResult.data.skills.length > 0,
        languages: parseResult.data.languages.length > 0,
        certifications: parseResult.data.certifications.length > 0
      }
    })

  } catch (error) {
    console.error('Resume parsing error:', error)
    
    // Provide specific error messages for common issues
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return NextResponse.json({
          error: 'Parsing service timeout. Please try again with a smaller file.'
        }, { status: 408 })
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json({
          error: 'Too many requests. Please wait a moment and try again.'
        }, { status: 429 })
      }

      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        return NextResponse.json({
          error: 'Service authentication failed. Please contact support.'
        }, { status: 503 })
      }
    }

    return NextResponse.json({
      error: 'An unexpected error occurred while parsing your resume. Please try again.'
    }, { status: 500 })
  }
}

// GET endpoint to check Affinda service status
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if Affinda API key is configured
    const isConfigured = !!process.env.AFFINDA_API_KEY

    return NextResponse.json({
      service: 'affinda',
      configured: isConfigured,
      supportedFormats: ['PDF', 'DOC', 'DOCX'],
      maxFileSize: '10MB',
      features: [
        'Automatic data extraction',
        'High accuracy parsing',
        'Multiple format support',
        'Fast processing'
      ]
    })

  } catch (error) {
    console.error('Service status check error:', error)
    return NextResponse.json({
      error: 'Failed to check service status'
    }, { status: 500 })
  }
}