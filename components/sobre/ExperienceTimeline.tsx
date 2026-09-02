"use client";

import { useState } from "react";
import { SobreExperience } from "@/types/sobre";

interface ExperienceTimelineProps {
  title: string;
  labels: {
    projectsAndAllocations: string;
    expand: string;
    collapse: string;
  };
  experiences: SobreExperience[];
}

export function ExperienceTimeline({ title, labels, experiences }: ExperienceTimelineProps) {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold neo-border-thin inline-block px-4 py-2 bg-[#FFD23F] text-black">
          {title}
        </h2>
      </div>

      <div className="relative md:border-l-[3px] md:border-[var(--stroke-color)] md:ml-4 md:pl-8 flex flex-col gap-8">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} labels={labels} />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  labels,
}: {
  experience: SobreExperience;
  labels: { projectsAndAllocations: string; expand: string; collapse: string };
}) {
  const [showProjects, setShowProjects] = useState(false); // Mobile first: start closed

  return (
    <div className="relative group">
      {/* Node Dot on the timeline line - Only visible on md+ */}
      <div className="hidden md:flex absolute -left-[45px] top-6 w-6 h-6 border-[3px] border-[var(--stroke-color)] items-center justify-center shrink-0 z-10 bg-[#FFD23F]">
        <div className="w-2 h-2 bg-black" />
      </div>

      {/* Main Experience Card */}
      <div className="neo-card flex flex-col overflow-hidden bg-[var(--bg-surface)]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b-[3px] border-[var(--stroke-color)] bg-[var(--bg-base)] text-[var(--text-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-code text-xs font-extrabold uppercase tracking-widest block opacity-75">
              {experience.company}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">
              {experience.role}
            </h3>
          </div>
          <span className="font-code text-xs font-bold uppercase tracking-wider bg-[var(--text-main)] text-[var(--bg-base)] px-3 py-1 neo-border-thin shrink-0 self-start sm:self-center">
            {experience.period}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          {experience.description && (
            <p className="font-body text-base font-medium opacity-90">
              {experience.description}
            </p>
          )}

          {/* Highlights List */}
          {experience.highlights && (
            <ul className="flex flex-col gap-2 font-body text-sm md:text-base opacity-90 pl-4 list-disc">
              {experience.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}

          {/* Sub-projects section (e.g. CWI projects) */}
          {experience.projects && experience.projects.length > 0 && (
            <div className="mt-2 flex flex-col gap-4 border-t-2 border-[var(--stroke-color)] pt-4">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-base uppercase tracking-wide">
                  {labels.projectsAndAllocations}
                </span>
                <button
                  onClick={() => setShowProjects(!showProjects)}
                  className="font-code text-xs font-bold uppercase tracking-wider neo-btn py-1 px-3 bg-[var(--bg-base)] text-[var(--text-main)]"
                >
                  {showProjects ? labels.collapse : labels.expand}
                </button>
              </div>

              {showProjects && (
                <div className="flex flex-col gap-3">
                  {experience.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 bg-[var(--bg-base)] text-[var(--text-main)] neo-border-thin flex flex-col gap-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-heading text-lg font-bold text-[var(--text-main)]">
                          {proj.name}
                        </h4>
                        <span className="font-code text-xs font-bold text-[var(--text-muted)]">
                          {proj.period}
                        </span>
                      </div>
                      
                      <ul className="flex flex-col gap-1 font-body text-xs sm:text-sm pl-4 list-disc opacity-90">
                        {proj.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
