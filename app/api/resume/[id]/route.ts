import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Fetch a specific resume
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const resume = await prisma.resume.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Resume fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

// PUT - Update a specific resume
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Verify the resume belongs to the user
    const existingResume = await prisma.resume.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // Update the resume
    const updatedResume = await prisma.resume.update({
      where: { id: params.id },
      data: {
        template: data.template,
        content: data
      }
    })

    return NextResponse.json({ 
      message: 'Resume updated successfully',
      resume: updatedResume
    })
  } catch (error) {
    console.error('Resume update error:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a specific resume
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Verify the resume belongs to the user
    const existingResume = await prisma.resume.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // Delete the resume
    await prisma.resume.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ 
      message: 'Resume deleted successfully'
    })
  } catch (error) {
    console.error('Resume deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}