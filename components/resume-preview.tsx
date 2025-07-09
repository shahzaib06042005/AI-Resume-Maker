"use client"
import type { ResumeData } from "@/app/page"

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  // Generate contact info line
  const contactParts = []
  if (data.personalInfo.phone) contactParts.push(data.personalInfo.phone)
  if (data.personalInfo.email) contactParts.push(data.personalInfo.email)
  if (data.personalInfo.linkedin) contactParts.push(data.personalInfo.linkedin)
  if (data.personalInfo.website) contactParts.push(data.personalInfo.website)
  const contactLine = contactParts.join(" • ")

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
      <div className="p-4 sm:p-6 lg:p-8 print:p-6" data-resume-content>
        <div
          className="resume-container w-full"
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "11pt",
            lineHeight: "1.4",
            color: "#000",
            maxWidth: "8.5in",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div className="text-center mb-4 sm:mb-5" style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 break-words"
              style={{
                fontSize: "16pt",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "8px",
                wordBreak: "break-word",
              }}
            >
              {data.personalInfo.fullName || "FIRSTNAME LASTNAME"}
            </h1>
            {contactLine && (
              <div
                className="text-blue-600 text-xs sm:text-sm mb-1 break-all"
                style={{
                  fontSize: "10pt",
                  color: "#0066cc",
                  marginBottom: "4px",
                  wordBreak: "break-all",
                }}
              >
                <span className="hidden sm:inline">{contactLine}</span>
                {/* Mobile: Stack contact info vertically */}
                <div className="sm:hidden space-y-1">
                  {contactParts.map((part, index) => (
                    <div key={index}>{part}</div>
                  ))}
                </div>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="text-xs sm:text-sm" style={{ fontSize: "10pt", color: "#000" }}>
                {data.personalInfo.location}
              </div>
            )}
          </div>

          {/* Objective/Summary */}
          {data.summary && (
            <div className="mb-4 sm:mb-5" style={{ marginBottom: "18px" }}>
              <h2
                className="text-sm font-bold mb-2 border-b border-black pb-1"
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "2px",
                }}
              >
                OBJECTIVE
              </h2>
              <p
                className="text-justify text-sm sm:text-base leading-relaxed"
                style={{
                  textAlign: "justify",
                  marginBottom: "4px",
                  fontSize: "11pt",
                  lineHeight: "1.4",
                }}
              >
                {data.summary}
              </p>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-4 sm:mb-5" style={{ marginBottom: "18px" }}>
              <h2
                className="text-sm font-bold mb-2 border-b border-black pb-1"
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "2px",
                }}
              >
                EDUCATION
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3" style={{ marginBottom: "12px" }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1 sm:gap-0">
                    <div className="flex-1">
                      <span className="font-bold text-sm sm:text-base" style={{ fontWeight: "bold" }}>
                        {edu.degree}
                        {edu.field ? ` of ${edu.field}` : ""}
                      </span>
                      <span className="hidden sm:inline">, </span>
                      <span className="italic text-sm sm:text-base block sm:inline" style={{ fontStyle: "italic" }}>
                        {edu.institution}
                      </span>
                      {edu.gpa && (
                        <div className="text-xs sm:text-sm" style={{ fontSize: "10pt" }}>
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                    <div
                      className="text-left sm:text-right text-xs flex-shrink-0"
                      style={{ fontSize: "10pt", textAlign: "right" }}
                    >
                      {edu.graduationDate || "Expected YYYY"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-4 sm:mb-5" style={{ marginBottom: "18px" }}>
              <h2
                className="text-sm font-bold mb-2 border-b border-black pb-1"
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "2px",
                }}
              >
                SKILLS
              </h2>
              {data.skills.map((skillCategory) => (
                <div key={skillCategory.id} className="mb-1 break-words" style={{ marginBottom: "4px" }}>
                  <span className="font-bold text-sm sm:text-base" style={{ fontWeight: "bold" }}>
                    {skillCategory.category}
                  </span>
                  <span className="text-sm sm:text-base block sm:inline sm:ml-2" style={{ marginLeft: "8px" }}>
                    {skillCategory.items.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-4 sm:mb-5" style={{ marginBottom: "18px" }}>
              <h2
                className="text-sm font-bold mb-2 border-b border-black pb-1"
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "2px",
                }}
              >
                EXPERIENCE
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-3 sm:mb-4" style={{ marginBottom: "12px" }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1 sm:gap-0">
                    <div className="flex-1">
                      <div className="font-bold text-sm sm:text-base" style={{ fontWeight: "bold" }}>
                        {exp.position}
                      </div>
                      <div className="italic text-sm sm:text-base" style={{ fontStyle: "italic" }}>
                        {exp.company}
                      </div>
                    </div>
                    <div
                      className="text-left sm:text-right text-xs flex-shrink-0"
                      style={{ fontSize: "10pt", textAlign: "right" }}
                    >
                      <div>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                      <div className="italic" style={{ fontStyle: "italic" }}>
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="mt-1 pl-0 sm:pl-0" style={{ marginLeft: "0", marginTop: "4px" }}>
                      <ul className="list-disc ml-4 sm:ml-5 space-y-1" style={{ margin: "0", paddingLeft: "20px" }}>
                        {exp.description
                          .split("\n")
                          .filter((line) => line.trim())
                          .map((line, index) => (
                            <li
                              key={index}
                              className="text-sm sm:text-base leading-relaxed"
                              style={{ marginBottom: "2px", fontSize: "11pt", lineHeight: "1.4" }}
                            >
                              {line.replace(/^[•\-*]\s*/, "")}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-4 sm:mb-5" style={{ marginBottom: "18px" }}>
              <h2
                className="text-sm font-bold mb-2 border-b border-black pb-1"
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "2px",
                }}
              >
                PROJECTS
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-2.5 break-words" style={{ marginBottom: "10px" }}>
                  <span className="font-bold text-sm sm:text-base" style={{ fontWeight: "bold" }}>
                    {project.name}.
                  </span>
                  <span className="text-sm sm:text-base" style={{ marginLeft: "4px" }}>
                    {project.description}
                  </span>
                  {project.technologies.length > 0 && (
                    <span className="text-sm sm:text-base block sm:inline">
                      {" "}
                      Technologies: {project.technologies.join(", ")}.
                    </span>
                  )}
                  {project.link && (
                    <span className="block sm:inline">
                      {" "}
                      <a
                        href={project.link}
                        className="text-blue-600 no-underline break-all text-sm sm:text-base"
                        style={{ color: "#0066cc", textDecoration: "none", wordBreak: "break-all" }}
                      >
                        (View Project)
                      </a>
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Extra-Curricular Activities */}
          {data.extraCurricular && data.extraCurricular.length > 0 && (
            <div className="mb-4 sm:mb-5" style={{ marginBottom: "18px" }}>
              <h2
                className="text-sm font-bold mb-2 border-b border-black pb-1"
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "2px",
                }}
              >
                EXTRA-CURRICULAR ACTIVITIES
              </h2>
              {data.extraCurricular.map((activity) => (
                <div key={activity.id} className="mb-3 sm:mb-4" style={{ marginBottom: "12px" }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1 sm:gap-0">
                    <div className="flex-1">
                      <span className="font-bold text-sm sm:text-base" style={{ fontWeight: "bold" }}>
                        {activity.title}
                      </span>
                      <span className="hidden sm:inline"> - </span>
                      <span className="italic text-sm sm:text-base block sm:inline" style={{ fontStyle: "italic" }}>
                        {activity.organization}
                      </span>
                    </div>
                    <div
                      className="text-left sm:text-right text-xs flex-shrink-0"
                      style={{ fontSize: "10pt", textAlign: "right" }}
                    >
                      {activity.startDate} - {activity.current ? "Present" : activity.endDate}
                    </div>
                  </div>
                  {activity.description && (
                    <div className="mt-1 pl-0 sm:pl-0" style={{ marginLeft: "0", marginTop: "4px" }}>
                      <ul className="list-disc ml-4 sm:ml-5 space-y-1" style={{ margin: "0", paddingLeft: "20px" }}>
                        {activity.description
                          .split("\n")
                          .filter((line) => line.trim())
                          .map((line, index) => (
                            <li
                              key={index}
                              className="text-sm sm:text-base leading-relaxed"
                              style={{ marginBottom: "2px", fontSize: "11pt", lineHeight: "1.4" }}
                            >
                              {line.replace(/^[•\-*]\s*/, "")}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="mb-4 sm:mb-5" style={{ marginBottom: "18px" }}>
              <h2
                className="text-sm font-bold mb-2 border-b border-black pb-1"
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "2px",
                }}
              >
                CERTIFICATIONS
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-3" style={{ marginBottom: "12px" }}>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1 sm:gap-0">
                    <div className="flex-1">
                      <span className="font-bold text-sm sm:text-base" style={{ fontWeight: "bold" }}>
                        {cert.name}
                      </span>
                      <span className="hidden sm:inline">, </span>
                      <span className="italic text-sm sm:text-base block sm:inline" style={{ fontStyle: "italic" }}>
                        {cert.issuer}
                      </span>
                    </div>
                    <div
                      className="text-left sm:text-right text-xs flex-shrink-0"
                      style={{ fontSize: "10pt", textAlign: "right" }}
                    >
                      {cert.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
