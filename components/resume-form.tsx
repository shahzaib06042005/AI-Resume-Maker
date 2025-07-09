"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Sparkles } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
  isGenerating: boolean
}

export function ResumeForm({ data, onChange, isGenerating }: ResumeFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [newTechnology, setNewTechnology] = useState("")

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    })
  }

  const updateSummary = (summary: string) => {
    onChange({
      ...data,
      summary,
    })
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    onChange({
      ...data,
      experience: [...data.experience, newExp],
    })
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: "",
    }
    onChange({
      ...data,
      education: [...data.education, newEdu],
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    })
  }

  const addSkillCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      category: "Technical Skills",
      items: [],
    }
    onChange({
      ...data,
      skills: [...data.skills, newCategory],
    })
  }

  const updateSkillCategory = (id: string, category: string) => {
    onChange({
      ...data,
      skills: data.skills.map((skill) => (skill.id === id ? { ...skill, category } : skill)),
    })
  }

  const addSkillToCategory = (categoryId: string, skill: string) => {
    if (!skill.trim()) return

    onChange({
      ...data,
      skills: data.skills.map((skillCat) =>
        skillCat.id === categoryId ? { ...skillCat, items: [...skillCat.items, skill.trim()] } : skillCat,
      ),
    })
  }

  const removeSkillFromCategory = (categoryId: string, skillIndex: number) => {
    onChange({
      ...data,
      skills: data.skills.map((skillCat) =>
        skillCat.id === categoryId
          ? { ...skillCat, items: skillCat.items.filter((_, index) => index !== skillIndex) }
          : skillCat,
      ),
    })
  }

  const removeSkillCategory = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    })
  }

  // Projects functions
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
    }
    onChange({
      ...data,
      projects: [...data.projects, newProject],
    })
  }

  const updateProject = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    })
  }

  const addTechnologyToProject = (projectId: string, technology: string) => {
    if (!technology.trim()) return

    onChange({
      ...data,
      projects: data.projects.map((project) =>
        project.id === projectId ? { ...project, technologies: [...project.technologies, technology.trim()] } : project,
      ),
    })
  }

  const removeTechnologyFromProject = (projectId: string, techIndex: number) => {
    onChange({
      ...data,
      projects: data.projects.map((project) =>
        project.id === projectId
          ? { ...project, technologies: project.technologies.filter((_, index) => index !== techIndex) }
          : project,
      ),
    })
  }

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    })
  }

  // Extra-curricular activities functions
  const addExtraCurricular = () => {
    const newActivity = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    onChange({
      ...data,
      extraCurricular: [...(data.extraCurricular || []), newActivity],
    })
  }

  const updateExtraCurricular = (id: string, field: string, value: string | boolean) => {
    onChange({
      ...data,
      extraCurricular: (data.extraCurricular || []).map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity,
      ),
    })
  }

  const removeExtraCurricular = (id: string) => {
    onChange({
      ...data,
      extraCurricular: (data.extraCurricular || []).filter((activity) => activity.id !== id),
    })
  }

  const generateAISummary = async () => {
    // Simulate AI generation
    const aiSummary =
      "Results-driven software engineer with 5+ years of experience developing scalable web applications and leading cross-functional teams. Proven track record of delivering high-quality solutions using modern technologies including React, Node.js, and cloud platforms. Strong problem-solving skills with expertise in agile methodologies and continuous integration practices."

    updateSummary(aiSummary)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        {/* Responsive Tab Navigation */}
        <div className="w-full overflow-hidden">
          <TabsList className="w-full h-auto p-1 bg-gray-100 rounded-lg">
            {/* Desktop: Grid layout */}
            <div className="hidden lg:grid lg:grid-cols-7 lg:gap-1 lg:w-full">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-3 py-2 text-sm"
              >
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-3 py-2 text-sm"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-3 py-2 text-sm"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-3 py-2 text-sm"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-3 py-2 text-sm"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-3 py-2 text-sm"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="activities"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-3 py-2 text-sm"
              >
                Activities
              </TabsTrigger>
            </div>

            {/* Mobile & Tablet: Horizontal scroll */}
            <div className="flex lg:hidden overflow-x-auto scrollbar-hide gap-1 pb-1">
              <div className="flex gap-1 min-w-max px-1">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="summary"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="activities"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600 font-medium px-4 py-2 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Activities
                </TabsTrigger>
              </div>
            </div>
          </TabsList>
        </div>

        <TabsContent value="personal" className="space-y-4">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your contact details and basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={data.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="john.doe@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={data.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website/Portfolio</Label>
                  <Input
                    id="website"
                    value={data.personalInfo.website}
                    onChange={(e) => updatePersonalInfo("website", e.target.value)}
                    placeholder="johndoe.dev"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Professional Summary</CardTitle>
                  <CardDescription>A brief overview of your professional background</CardDescription>
                </div>
                <Button
                  onClick={generateAISummary}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto bg-transparent"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Generate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={data.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Write a compelling professional summary that highlights your key achievements and skills..."
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Your professional work history</CardDescription>
                </div>
                <Button onClick={addExperience} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Experience Entry</h4>
                    <Button onClick={() => removeExperience(exp.id)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={exp.current}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                    />
                    <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              ))}

              {data.experience.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No work experience added yet. Click "Add Experience" to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Your educational background</CardDescription>
                </div>
                <Button onClick={addEducation} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Education Entry</h4>
                    <Button onClick={() => removeEducation(edu.id)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <Label>Graduation Date</Label>
                      <Input
                        value={edu.graduationDate}
                        onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <Label>GPA (Optional)</Label>
                      <Input
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {data.education.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No education added yet. Click "Add Education" to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Your technical and professional skills</CardDescription>
                </div>
                <Button onClick={addSkillCategory} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.skills.map((skillCategory) => (
                <div key={skillCategory.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Input
                      value={skillCategory.category}
                      onChange={(e) => updateSkillCategory(skillCategory.id, e.target.value)}
                      placeholder="Skill Category"
                      className="font-medium max-w-full sm:max-w-xs"
                    />
                    <Button onClick={() => removeSkillCategory(skillCategory.id)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          onClick={() => removeSkillFromCategory(skillCategory.id, index)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addSkillToCategory(skillCategory.id, newSkill)
                          setNewSkill("")
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        addSkillToCategory(skillCategory.id, newSkill)
                        setNewSkill("")
                      }}
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))}

              {data.skills.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No skill categories added yet. Click "Add Category" to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Your personal and professional projects</CardDescription>
                </div>
                <Button onClick={addProject} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Project Entry</h4>
                    <Button onClick={() => removeProject(project.id)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => updateProject(project.id, "name", e.target.value)}
                        placeholder="Project Title"
                      />
                    </div>
                    <div>
                      <Label>Project Link (Optional)</Label>
                      <Input
                        value={project.link}
                        onChange={(e) => updateProject(project.id, "link", e.target.value)}
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, "description", e.target.value)}
                      placeholder="Describe your project, its purpose, and key achievements..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label>Technologies Used</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tech}
                          <button
                            onClick={() => removeTechnologyFromProject(project.id, index)}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        placeholder="Add a technology"
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addTechnologyToProject(project.id, newTechnology)
                            setNewTechnology("")
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          addTechnologyToProject(project.id, newTechnology)
                          setNewTechnology("")
                        }}
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {data.projects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No projects added yet. Click "Add Project" to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Extra-Curricular Activities</CardTitle>
                  <CardDescription>Leadership roles, volunteer work, and other activities (Optional)</CardDescription>
                </div>
                <Button onClick={addExtraCurricular} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {(data.extraCurricular || []).map((activity) => (
                <div key={activity.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Activity Entry</h4>
                    <Button onClick={() => removeExtraCurricular(activity.id)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Activity/Role Title</Label>
                      <Input
                        value={activity.title}
                        onChange={(e) => updateExtraCurricular(activity.id, "title", e.target.value)}
                        placeholder="President, Volunteer, Member"
                      />
                    </div>
                    <div>
                      <Label>Organization</Label>
                      <Input
                        value={activity.organization}
                        onChange={(e) => updateExtraCurricular(activity.id, "organization", e.target.value)}
                        placeholder="Organization Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        value={activity.startDate}
                        onChange={(e) => updateExtraCurricular(activity.id, "startDate", e.target.value)}
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        value={activity.endDate}
                        onChange={(e) => updateExtraCurricular(activity.id, "endDate", e.target.value)}
                        placeholder="MM/YYYY"
                        disabled={activity.current}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`current-activity-${activity.id}`}
                          checked={activity.current}
                          onCheckedChange={(checked) => updateExtraCurricular(activity.id, "current", checked)}
                        />
                        <Label htmlFor={`current-activity-${activity.id}`}>Currently active</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={activity.description}
                      onChange={(e) => updateExtraCurricular(activity.id, "description", e.target.value)}
                      placeholder="• Describe your role and achievements&#10;• Include leadership experience and impact&#10;• Mention any awards or recognition"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              ))}

              {(!data.extraCurricular || data.extraCurricular.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  No extra-curricular activities added yet. This section is optional - click "Add Activity" if you want
                  to include leadership roles, volunteer work, or other activities.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
