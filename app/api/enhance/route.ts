import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { section, content, jobTitle, industry } = await request.json()

    let prompt = ""

    switch (section) {
      case "summary":
        prompt = `Create a professional summary for a ${jobTitle} in the ${industry} industry. Make it ATS-friendly, compelling, and 2-3 sentences long. Focus on key achievements, skills, and value proposition. Current content: ${content}`
        break
      case "experience":
        prompt = `Enhance this job experience description for a ${jobTitle} role. Make it ATS-friendly with strong action verbs, quantifiable achievements, and relevant keywords. Format as bullet points: ${content}`
        break
      case "skills":
        prompt = `Suggest relevant technical and soft skills for a ${jobTitle} in ${industry}. Return as a comma-separated list of skills that are commonly sought after by employers and ATS systems.`
        break
      default:
        prompt = `Enhance this resume content to be more ATS-friendly and professional: ${content}`
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are an expert resume writer and career coach. Create ATS-friendly content that will pass through applicant tracking systems while being compelling to human recruiters. Use industry-standard keywords and formatting.",
      prompt,
    })

    return NextResponse.json({ enhancedContent: text })
  } catch (error) {
    console.error("Error enhancing content:", error)
    return NextResponse.json({ error: "Failed to enhance content" }, { status: 500 })
  }
}
