import type { Metadata } from "next";
import { SobreHero } from "@/components/sobre/SobreHero";
import { SkillGrid } from "@/components/sobre/SkillGrid";
import { ExperienceTimeline } from "@/components/sobre/ExperienceTimeline";
import { EducationBlock } from "@/components/sobre/EducationBlock";
import { sobreData } from "@/data/sobre";

export const metadata: Metadata = {
  title: "Sobre mim | Ícaro Henrique",
  description:
    "Engenheiro SRE, DevOps, Cloud e Platform Engineering. Conheça a minha trajetória profissional, competências técnicas e projetos que participei",
};

export default function AboutPage() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-6 lg:py-12 max-w-5xl mx-auto flex flex-col gap-12 md:gap-16">
      {/* 1. Hero Section */}
      <SobreHero resume={sobreData} />

      {/* 2. Technical Skills Section */}
      <SkillGrid title={sobreData.sectionTitles.skills} categories={sobreData.skillCategories} />

      {/* 3. Work Experience & Projects Timeline */}
      <ExperienceTimeline title={sobreData.sectionTitles.experience} labels={sobreData.labels} experiences={sobreData.experiences} />

      {/* 4. Academic Background */}
      <EducationBlock title={sobreData.sectionTitles.education} education={sobreData.education} />

      {/* 5. Contact CTA Banner */}
      <section className="neo-card p-6 sm:p-8 bg-[#FFD23F] text-black flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            {sobreData.contactCTA.title}
          </h2>
          <p className="font-body text-sm sm:text-base font-medium opacity-90">
            {sobreData.contactCTA.description}
          </p>
        </div>
        <a
          href={`mailto:${sobreData.contacts.email}`}
          className="neo-btn bg-black text-white hover:bg-white hover:text-black font-code text-sm font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          {sobreData.contactCTA.buttonText}
        </a>
      </section>
    </div>
  );
}
