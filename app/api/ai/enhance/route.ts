import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { enhanceWorkExperience, generateProfessionalSummary } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, data } = await req.json()

    if (type === 'experience') {
      const enhanced = await enhanceWorkExperience(
        data.jobTitle,
        data.company,
        data.description
      )
      return NextResponse.json({ enhanced })
    }

    if (type === 'summary') {
      const summary = await generateProfessionalSummary(
        data.personalInfo,
        data.experience,
        data.skills
      )
      return NextResponse.json({ summary })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    console.error('AI enhancement error:', error)
    return NextResponse.json(
      { error: 'Enhancement failed' },
      { status: 500 }
    )
  }
}