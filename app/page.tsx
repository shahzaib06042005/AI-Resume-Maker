"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { FileText, Sparkles, Download, Eye } from "lucide-react"
import { ATSScoreChecker } from "@/components/ats-score-checker"

export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
  }
  summary: string
  experience: Array<{
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    graduationDate: string
    gpa?: string
  }>
  skills: Array<{
    id: string
    category: string
    items: string[]
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    link?: string
  }>
  extraCurricular?: Array<{
    id: string
    title: string
    organization: string
    description: string
    startDate: string
    endDate: string
    current: boolean
  }>
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  extraCurricular: [],
}

export default function HomePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [activeTab, setActiveTab] = useState("form")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData)
  }

  const handleAIEnhance = async () => {
    setIsGenerating(true)
    // Simulate AI enhancement
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  const handleDownload = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    // Generate contact info line
    const contactParts = []
    if (resumeData.personalInfo.phone) contactParts.push(resumeData.personalInfo.phone)
    if (resumeData.personalInfo.email) contactParts.push(resumeData.personalInfo.email)
    if (resumeData.personalInfo.linkedin) contactParts.push(resumeData.personalInfo.linkedin)
    if (resumeData.personalInfo.website) contactParts.push(resumeData.personalInfo.website)
    const contactLine = contactParts.join(" • ")

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${resumeData.personalInfo.fullName || "Resume"}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #000;
            background: white;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.75in;
          }
          
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          
          .name {
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 8px;
          }
          
          .contact-line {
            font-size: 10pt;
            color: #0066cc;
            margin-bottom: 4px;
          }
          
          .location {
            font-size: 10pt;
            color: #000;
          }
          
          .section {
            margin-bottom: 18px;
          }
          
          .section-title {
            font-size: 11pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            border-bottom: 1px solid #000;
            padding-bottom: 2px;
          }
          
          .education-item, .experience-item, .activity-item {
            margin-bottom: 12px;
          }
          
          .education-header, .experience-header, .activity-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4px;
          }
          
          .degree, .position, .activity-title {
            font-weight: bold;
          }
          
          .institution, .company, .organization {
            font-style: italic;
          }
          
          .date {
            font-size: 10pt;
            text-align: right;
          }
          
          .description {
            margin-left: 0;
            margin-top: 4px;
          }
          
          .description ul {
            margin: 0;
            padding-left: 20px;
          }
          
          .description li {
            margin-bottom: 2px;
          }
          
          .skills-section {
            margin-bottom: 4px;
          }
          
          .skills-category {
            font-weight: bold;
            display: inline;
          }
          
          .skills-list {
            display: inline;
            margin-left: 8px;
          }
          
          .project-item {
            margin-bottom: 10px;
          }
          
          .project-title {
            font-weight: bold;
            display: inline;
          }
          
          .project-description {
            display: inline;
            margin-left: 4px;
          }
          
          .project-link {
            color: #0066cc;
            text-decoration: none;
          }
          
          .objective {
            text-align: justify;
            margin-bottom: 4px;
          }
          
          @page {
            margin: 0.75in;
            size: letter;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <div class="name">${resumeData.personalInfo.fullName || "FIRSTNAME LASTNAME"}</div>
          ${contactLine ? `<div class="contact-line">${contactLine}</div>` : ""}
          ${resumeData.personalInfo.location ? `<div class="location">${resumeData.personalInfo.location}</div>` : ""}
        </div>

        <!-- Objective/Summary -->
        ${
          resumeData.summary
            ? `
        <div class="section">
          <div class="section-title">OBJECTIVE</div>
          <div class="objective">${resumeData.summary}</div>
        </div>`
            : ""
        }

        <!-- Education -->
        ${
          resumeData.education.length > 0
            ? `
        <div class="section">
          <div class="section-title">EDUCATION</div>
          ${resumeData.education
            .map(
              (edu) => `
            <div class="education-item">
              <div class="education-header">
                <div>
                  <span class="degree">${edu.degree}${edu.field ? ` of ${edu.field}` : ""}</span>, 
                  <span class="institution">${edu.institution}</span>
                  ${edu.gpa ? `<br>GPA: ${edu.gpa}` : ""}
                </div>
                <div class="date">${edu.graduationDate || "Expected YYYY"}</div>
              </div>
            </div>`,
            )
            .join("")}
        </div>`
            : ""
        }

        <!-- Skills -->
        ${
          resumeData.skills.length > 0
            ? `
        <div class="section">
          <div class="section-title">SKILLS</div>
          ${resumeData.skills
            .map(
              (skillCat) => `
            <div class="skills-section">
              <span class="skills-category">${skillCat.category}</span>
              <span class="skills-list">${skillCat.items.join(", ")}</span>
            </div>`,
            )
            .join("")}
        </div>`
            : ""
        }

        <!-- Experience -->
        ${
          resumeData.experience.length > 0
            ? `
        <div class="section">
          <div class="section-title">EXPERIENCE</div>
          ${resumeData.experience
            .map(
              (exp) => `
            <div class="experience-item">
              <div class="experience-header">
                <div>
                  <div class="position">${exp.position}</div>
                  <div class="company">${exp.company}</div>
                </div>
                <div class="date">
                  ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}<br>
                  <em>${exp.location}</em>
                </div>
              </div>
              ${
                exp.description
                  ? `
                <div class="description">
                  <ul>
                    ${exp.description
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line) => `<li>${line.replace(/^[•\-*]\s*/, "")}</li>`)
                      .join("")}
                  </ul>
                </div>`
                  : ""
              }
            </div>`,
            )
            .join("")}
        </div>`
            : ""
        }

        <!-- Projects -->
        ${
          resumeData.projects.length > 0
            ? `
        <div class="section">
          <div class="section-title">PROJECTS</div>
          ${resumeData.projects
            .map(
              (project) => `
            <div class="project-item">
              <span class="project-title">${project.name}.</span>
              <span class="project-description">${project.description}</span>
              ${project.technologies.length > 0 ? ` Technologies: ${project.technologies.join(", ")}.` : ""}
              ${project.link ? ` <a href="${project.link}" class="project-link">(View Project)</a>` : ""}
            </div>`,
            )
            .join("")}
        </div>`
            : ""
        }

        <!-- Extra-Curricular Activities -->
        ${
          resumeData.extraCurricular && resumeData.extraCurricular.length > 0
            ? `
        <div class="section">
          <div class="section-title">EXTRA-CURRICULAR ACTIVITIES</div>
          ${resumeData.extraCurricular
            .map(
              (activity) => `
            <div class="activity-item">
              <div class="activity-header">
                <div>
                  <span class="activity-title">${activity.title}</span> - 
                  <span class="organization">${activity.organization}</span>
                </div>
                <div class="date">
                  ${activity.startDate} - ${activity.current ? "Present" : activity.endDate}
                </div>
              </div>
              ${
                activity.description
                  ? `
                <div class="description">
                  <ul>
                    ${activity.description
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line) => `<li>${line.replace(/^[•\-*]\s*/, "")}</li>`)
                      .join("")}
                  </ul>
                </div>`
                  : ""
              }
            </div>`,
            )
            .join("")}
        </div>`
            : ""
        }

        <!-- Certifications -->
        ${
          resumeData.certifications.length > 0
            ? `
        <div class="section">
          <div class="section-title">CERTIFICATIONS</div>
          ${resumeData.certifications
            .map(
              (cert) => `
            <div class="education-item">
              <div class="education-header">
                <div>
                  <span class="degree">${cert.name}</span>, 
                  <span class="institution">${cert.issuer}</span>
                </div>
                <div class="date">${cert.date}</div>
              </div>
            </div>`,
            )
            .join("")}
        </div>`
            : ""
        }
      </body>
    </html>
  `)

    printWindow.document.close()

    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight">AI Resume Maker</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Create professional, ATS-optimized resumes with intelligent AI assistance. Stand out to recruiters and
            seamlessly pass through applicant tracking systems.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>ATS-Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Professional Format</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Resume Builder?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional tools designed to help you create the perfect resume
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-xl">AI-Powered Enhancement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Intelligent content suggestions and optimization powered by advanced AI to maximize your resume's
                  impact
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-xl">ATS-Friendly Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Professionally formatted templates optimized to pass through applicant tracking systems seamlessly
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-900 text-xl">Export Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Download as high-quality PDF or print directly with perfect formatting preservation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-7xl mx-auto bg-white border-gray-200 shadow-xl">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 text-2xl">Professional Resume Builder</CardTitle>
                  <CardDescription className="text-gray-600 text-base mt-2">
                    Complete your information below and preview your ATS-optimized resume in real-time
                  </CardDescription>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleAIEnhance}
                    disabled={isGenerating}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-white shadow-sm"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isGenerating ? "Enhancing..." : "AI Enhance"}
                  </Button>
                  <Button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger
                    value="form"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium"
                  >
                    Edit Resume
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium"
                  >
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value="ats-score"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium"
                  >
                    ATS Score
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="form" className="mt-8">
                  <ResumeForm data={resumeData} onChange={handleDataChange} isGenerating={isGenerating} />
                </TabsContent>

                <TabsContent value="preview" className="mt-8">
                  <ResumePreview data={resumeData} />
                </TabsContent>

                <TabsContent value="ats-score" className="mt-8">
                  <ATSScoreChecker data={resumeData} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
