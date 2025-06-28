import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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

    const data = await req.json()
    
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        template: data.template,
        content: data
      }
    })

    return NextResponse.json({ id: resume.id })
  } catch (error) {
    console.error('Resume creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create resume' }, 
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { resumes: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ resumes: user.resumes })
  } catch (error) {
    console.error('Resume fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' }, 
      { status: 500 }
    )
  }
}