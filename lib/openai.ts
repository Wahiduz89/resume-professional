import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function enhanceWorkExperience(
  jobTitle: string,
  company: string,
  description: string
): Promise<string> {
  try {
    const prompt = `Enhance this work experience description for a resume. Make it more professional and impactful while keeping it concise (2-3 bullet points).

Job Title: ${jobTitle}
Company: ${company}
Current Description: ${description}

Provide enhanced bullet points that highlight achievements and use action verbs. Keep it ATS-friendly.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume writer specializing in creating impactful, ATS-friendly content for Indian job market.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || description
  } catch (error) {
    console.error('OpenAI enhancement error:', error)
    return description
  }
}

export async function generateProfessionalSummary(
  personalInfo: any,
  experience: any[],
  skills: string[]
): Promise<string> {
  try {
    const experienceText = experience
      .map(exp => `${exp.jobTitle} at ${exp.company}`)
      .join(', ')

    const prompt = `Create a professional summary for a resume with the following details:
    
Name: ${personalInfo.fullName}
Experience: ${experienceText || 'Fresher/Entry-level'}
Key Skills: ${skills.join(', ')}

Generate a 2-3 line professional summary that is compelling and ATS-friendly. Focus on strengths and career objectives.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume writer. Create concise, impactful professional summaries.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Summary generation error:', error)
    return ''
  }
}