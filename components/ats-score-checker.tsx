"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code,
  RefreshCw,
  TrendingUp,
  Target,
} from "lucide-react"
import type { ResumeData } from "@/app/page"

interface ATSScoreCheckerProps {
  data: ResumeData
}

interface ScoreItem {
  category: string
  score: number
  maxScore: number
  status: "excellent" | "good" | "warning" | "poor"
  suggestions: string[]
  icon: React.ReactNode
}

interface ATSAnalysis {
  overallScore: number
  scoreItems: ScoreItem[]
  keywordDensity: { keyword: string; count: number }[]
  readabilityScore: number
  formatScore: number
}

export function ATSScoreChecker({ data }: ATSScoreCheckerProps) {
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeResume = () => {
    setIsAnalyzing(true)

    // Simulate analysis delay
    setTimeout(() => {
      const analysis = performATSAnalysis(data)
      setAnalysis(analysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  useEffect(() => {
    if (data.personalInfo.fullName || data.summary || data.experience.length > 0) {
      analyzeResume()
    }
  }, [data])

  const performATSAnalysis = (resumeData: ResumeData): ATSAnalysis => {
    const scoreItems: ScoreItem[] = []

    // Personal Information Score
    const personalInfoScore = calculatePersonalInfoScore(resumeData.personalInfo)
    scoreItems.push({
      category: "Contact Information",
      score: personalInfoScore.score,
      maxScore: 20,
      status: personalInfoScore.status,
      suggestions: personalInfoScore.suggestions,
      icon: <User className="h-5 w-5" />,
    })

    // Professional Summary Score
    const summaryScore = calculateSummaryScore(resumeData.summary)
    scoreItems.push({
      category: "Professional Summary",
      score: summaryScore.score,
      maxScore: 15,
      status: summaryScore.status,
      suggestions: summaryScore.suggestions,
      icon: <FileText className="h-5 w-5" />,
    })

    // Experience Score
    const experienceScore = calculateExperienceScore(resumeData.experience)
    scoreItems.push({
      category: "Work Experience",
      score: experienceScore.score,
      maxScore: 25,
      status: experienceScore.status,
      suggestions: experienceScore.suggestions,
      icon: <Briefcase className="h-5 w-5" />,
    })

    // Education Score
    const educationScore = calculateEducationScore(resumeData.education)
    scoreItems.push({
      category: "Education",
      score: educationScore.score,
      maxScore: 15,
      status: educationScore.status,
      suggestions: educationScore.suggestions,
      icon: <GraduationCap className="h-5 w-5" />,
    })

    // Skills Score
    const skillsScore = calculateSkillsScore(resumeData.skills)
    scoreItems.push({
      category: "Skills",
      score: skillsScore.score,
      maxScore: 15,
      status: skillsScore.status,
      suggestions: skillsScore.suggestions,
      icon: <Code className="h-5 w-5" />,
    })

    // Format Score
    const formatScore = calculateFormatScore(resumeData)
    scoreItems.push({
      category: "ATS Format",
      score: formatScore.score,
      maxScore: 10,
      status: formatScore.status,
      suggestions: formatScore.suggestions,
      icon: <Target className="h-5 w-5" />,
    })

    const totalScore = scoreItems.reduce((sum, item) => sum + item.score, 0)
    const maxTotalScore = scoreItems.reduce((sum, item) => sum + item.maxScore, 0)
    const overallScore = Math.round((totalScore / maxTotalScore) * 100)

    // Calculate keyword density
    const keywordDensity = calculateKeywordDensity(resumeData)

    return {
      overallScore,
      scoreItems,
      keywordDensity,
      readabilityScore: 85, // Simulated
      formatScore: formatScore.score,
    }
  }

  const calculatePersonalInfoScore = (personalInfo: ResumeData["personalInfo"]) => {
    let score = 0
    const suggestions: string[] = []

    if (personalInfo.fullName) score += 5
    else suggestions.push("Add your full name")

    if (personalInfo.email) score += 5
    else suggestions.push("Add a professional email address")

    if (personalInfo.phone) score += 3
    else suggestions.push("Add your phone number")

    if (personalInfo.location) score += 3
    else suggestions.push("Add your location (city, state)")

    if (personalInfo.linkedin) score += 2
    else suggestions.push("Add your LinkedIn profile URL")

    if (personalInfo.website) score += 2
    else suggestions.push("Consider adding a portfolio website")

    const status = score >= 18 ? "excellent" : score >= 15 ? "good" : score >= 10 ? "warning" : "poor"

    return { score, status: status as ScoreItem["status"], suggestions }
  }

  const calculateSummaryScore = (summary: string) => {
    let score = 0
    const suggestions: string[] = []

    if (!summary) {
      suggestions.push("Add a professional summary")
      return { score: 0, status: "poor" as ScoreItem["status"], suggestions }
    }

    const wordCount = summary.split(" ").length
    if (wordCount >= 30 && wordCount <= 80) {
      score += 8
    } else if (wordCount < 30) {
      score += 4
      suggestions.push("Professional summary is too short (aim for 30-80 words)")
    } else {
      score += 4
      suggestions.push("Professional summary is too long (aim for 30-80 words)")
    }

    // Check for action words
    const actionWords = ["achieved", "developed", "managed", "led", "created", "improved", "increased", "reduced"]
    const hasActionWords = actionWords.some((word) => summary.toLowerCase().includes(word))
    if (hasActionWords) {
      score += 4
    } else {
      suggestions.push("Include strong action verbs in your summary")
    }

    // Check for quantifiable results
    const hasNumbers = /\d+/.test(summary)
    if (hasNumbers) {
      score += 3
    } else {
      suggestions.push("Include quantifiable achievements in your summary")
    }

    const status = score >= 13 ? "excellent" : score >= 10 ? "good" : score >= 6 ? "warning" : "poor"

    return { score, status: status as ScoreItem["status"], suggestions }
  }

  const calculateExperienceScore = (experience: ResumeData["experience"]) => {
    let score = 0
    const suggestions: string[] = []

    if (experience.length === 0) {
      suggestions.push("Add work experience entries")
      return { score: 0, status: "poor" as ScoreItem["status"], suggestions }
    }

    // Score based on number of experiences
    if (experience.length >= 3) score += 8
    else if (experience.length >= 2) score += 6
    else score += 4

    // Check each experience entry
    experience.forEach((exp, index) => {
      if (!exp.company) suggestions.push(`Add company name for experience ${index + 1}`)
      else score += 2

      if (!exp.position) suggestions.push(`Add job title for experience ${index + 1}`)
      else score += 2

      if (!exp.startDate) suggestions.push(`Add start date for experience ${index + 1}`)
      else score += 1

      if (!exp.description) {
        suggestions.push(`Add job description for experience ${index + 1}`)
      } else {
        const bulletPoints = exp.description
          .split("\n")
          .filter((line) => line.trim().startsWith("•") || line.trim().startsWith("-"))
        if (bulletPoints.length >= 2) {
          score += 2
        } else {
          suggestions.push(`Use bullet points in job description for experience ${index + 1}`)
        }

        // Check for quantifiable results
        const hasNumbers = /\d+/.test(exp.description)
        if (hasNumbers) score += 1
        else suggestions.push(`Include quantifiable achievements in experience ${index + 1}`)
      }
    })

    const maxPossibleScore = Math.min(25, 8 + experience.length * 6)
    score = Math.min(score, maxPossibleScore)

    const status = score >= 20 ? "excellent" : score >= 15 ? "good" : score >= 10 ? "warning" : "poor"

    return { score, status: status as ScoreItem["status"], suggestions }
  }

  const calculateEducationScore = (education: ResumeData["education"]) => {
    let score = 0
    const suggestions: string[] = []

    if (education.length === 0) {
      suggestions.push("Add education information")
      return { score: 0, status: "poor" as ScoreItem["status"], suggestions }
    }

    education.forEach((edu, index) => {
      if (edu.institution) score += 4
      else suggestions.push(`Add institution name for education ${index + 1}`)

      if (edu.degree) score += 4
      else suggestions.push(`Add degree type for education ${index + 1}`)

      if (edu.field) score += 3
      else suggestions.push(`Add field of study for education ${index + 1}`)

      if (edu.graduationDate) score += 2
      else suggestions.push(`Add graduation date for education ${index + 1}`)

      if (edu.gpa && Number.parseFloat(edu.gpa) >= 3.5) score += 2
    })

    score = Math.min(score, 15)

    const status = score >= 12 ? "excellent" : score >= 9 ? "good" : score >= 6 ? "warning" : "poor"

    return { score, status: status as ScoreItem["status"], suggestions }
  }

  const calculateSkillsScore = (skills: ResumeData["skills"]) => {
    let score = 0
    const suggestions: string[] = []

    if (skills.length === 0) {
      suggestions.push("Add skills sections")
      return { score: 0, status: "poor" as ScoreItem["status"], suggestions }
    }

    const totalSkills = skills.reduce((sum, category) => sum + category.items.length, 0)

    if (totalSkills >= 15) score += 8
    else if (totalSkills >= 10) score += 6
    else if (totalSkills >= 5) score += 4
    else suggestions.push("Add more skills (aim for 10-20 relevant skills)")

    // Check for skill categories
    if (skills.length >= 2) score += 4
    else suggestions.push("Organize skills into categories (e.g., Technical Skills, Soft Skills)")

    // Check for relevant technical skills
    const technicalKeywords = ["javascript", "python", "react", "node", "sql", "aws", "docker", "git"]
    const hasRelevantSkills = skills.some((category) =>
      category.items.some((skill) => technicalKeywords.some((keyword) => skill.toLowerCase().includes(keyword))),
    )

    if (hasRelevantSkills) score += 3
    else suggestions.push("Include relevant technical skills for your field")

    const status = score >= 12 ? "excellent" : score >= 9 ? "good" : score >= 6 ? "warning" : "poor"

    return { score, status: status as ScoreItem["status"], suggestions }
  }

  const calculateFormatScore = (resumeData: ResumeData) => {
    let score = 0
    const suggestions: string[] = []

    // Check for standard section headers
    const hasStandardSections = resumeData.experience.length > 0 && resumeData.education.length > 0
    if (hasStandardSections) score += 3
    else suggestions.push("Include standard sections: Experience, Education, Skills")

    // Check for consistent date formatting
    const datePattern = /^\d{2}\/\d{4}$/
    const experienceDatesValid = resumeData.experience.every(
      (exp) => datePattern.test(exp.startDate) && (exp.current || datePattern.test(exp.endDate)),
    )
    if (experienceDatesValid && resumeData.experience.length > 0) score += 2
    else if (resumeData.experience.length > 0) suggestions.push("Use consistent date format (MM/YYYY)")

    // Check for bullet points in descriptions
    const hasBulletPoints = resumeData.experience.some(
      (exp) => exp.description.includes("•") || exp.description.includes("-"),
    )
    if (hasBulletPoints) score += 2
    else suggestions.push("Use bullet points for job descriptions")

    // Check for contact information completeness
    const contactComplete =
      resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone
    if (contactComplete) score += 3
    else suggestions.push("Complete all essential contact information")

    const status = score >= 8 ? "excellent" : score >= 6 ? "good" : score >= 4 ? "warning" : "poor"

    return { score, status: status as ScoreItem["status"], suggestions }
  }

  const calculateKeywordDensity = (resumeData: ResumeData): { keyword: string; count: number }[] => {
    const text = [
      resumeData.summary,
      ...resumeData.experience.map((exp) => `${exp.position} ${exp.description}`),
      ...resumeData.skills.flatMap((skill) => skill.items),
    ]
      .join(" ")
      .toLowerCase()

    const commonKeywords = [
      "management",
      "leadership",
      "development",
      "analysis",
      "project",
      "team",
      "communication",
      "problem-solving",
      "strategic",
      "innovative",
      "results",
      "experience",
      "skills",
      "technical",
      "business",
      "customer",
    ]

    return commonKeywords
      .map((keyword) => ({
        keyword,
        count: (text.match(new RegExp(keyword, "g")) || []).length,
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-gray-600"
    return "text-red-600"
  }

  const getStatusIcon = (status: ScoreItem["status"]) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "good":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
      case "poor":
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusColor = (status: ScoreItem["status"]) => {
    switch (status) {
      case "excellent":
        return "border-green-200 bg-green-50"
      case "good":
        return "border-blue-200 bg-blue-50"
      case "warning":
        return "border-gray-200 bg-gray-50"
      case "poor":
        return "border-red-200 bg-red-50"
    }
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            Analyzing Resume...
          </CardTitle>
          <CardDescription>Checking ATS compatibility and generating improvement suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Analyzing your resume for ATS compatibility...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>ATS Compatibility Checker</CardTitle>
          <CardDescription>Get your resume analyzed for Applicant Tracking System compatibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Fill in your resume information to get an ATS compatibility score</p>
            <Button onClick={analyzeResume}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Analyze Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>ATS Compatibility Score</span>
            <Button onClick={analyzeResume} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Re-analyze
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysis.overallScore)}`}>
              {analysis.overallScore}%
            </div>
            <Progress value={analysis.overallScore} className="w-full max-w-md mx-auto mb-4" />
            <div className="flex justify-center">
              {analysis.overallScore >= 80 && (
                <Badge variant="default" className="bg-green-600">
                  Excellent ATS Compatibility
                </Badge>
              )}
              {analysis.overallScore >= 60 && analysis.overallScore < 80 && (
                <Badge variant="default" className="bg-gray-600">
                  Good ATS Compatibility
                </Badge>
              )}
              {analysis.overallScore < 60 && <Badge variant="destructive">Needs Improvement</Badge>}
            </div>
          </div>

          {analysis.overallScore < 70 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Your resume may have difficulty passing through ATS systems. Review the suggestions below to improve
                your score.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid gap-4">
        {analysis.scoreItems.map((item, index) => (
          <Card key={index} className={getStatusColor(item.status)}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.category}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className="font-mono">
                    {item.score}/{item.maxScore}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(item.score / item.maxScore) * 100} className="mb-3" />
              {item.suggestions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Suggestions for improvement:</h4>
                  <ul className="space-y-1">
                    {item.suggestions.map((suggestion, suggestionIndex) => (
                      <li key={suggestionIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 mt-1">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Keyword Analysis */}
      {analysis.keywordDensity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Keyword Analysis</CardTitle>
            <CardDescription>Most frequently used keywords in your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {analysis.keywordDensity.map((item, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium capitalize">{item.keyword}</div>
                  <div className="text-sm text-gray-600">{item.count} times</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>ATS Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">✅ ATS-Friendly Practices:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Use standard section headings</li>
                <li>• Include relevant keywords naturally</li>
                <li>• Use bullet points for descriptions</li>
                <li>• Keep formatting simple and clean</li>
                <li>• Use standard fonts (Arial, Calibri)</li>
                <li>• Include quantifiable achievements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">❌ Avoid These Elements:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Images, graphics, or charts</li>
                <li>• Tables or complex formatting</li>
                <li>• Headers and footers</li>
                <li>• Unusual fonts or colors</li>
                <li>• Text boxes or columns</li>
                <li>• Special characters or symbols</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
