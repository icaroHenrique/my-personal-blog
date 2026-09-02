import { SobreData } from "@/types/sobre";

interface SobreHeroProps {
  resume: Pick<SobreData, "summary" | "contacts" | "hero">;
}

export function SobreHero({ resume }: SobreHeroProps) {
  return (
    <section className="w-full flex flex-col gap-6">


      {/* Main Hero Card */}
      <div className="neo-card p-6 sm:p-8 md:p-10 flex flex-col gap-6 bg-[var(--bg-surface)]">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--text-main)] self-start">
            {resume.hero.title}
          </h1>
          <p className="font-heading text-lg sm:text-xl md:text-2xl text-[var(--text-main)] opacity-90 border-l-4 border-[#FFD23F] pl-4">
            {resume.hero.subtitle}
          </p>
        </div>

        {/* Professional Summary Paragraphs */}
        <div className="flex flex-col gap-4 font-body text-base md:text-lg leading-relaxed opacity-90 border-t-2 border-[var(--stroke-color)] pt-6">
          {resume.summary.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Quick Contact & Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-[var(--stroke-color)]">
          <a
            href={`mailto:${resume.contacts.email}`}
            className="neo-btn bg-[var(--bg-base)] text-[var(--text-main)] text-xs sm:text-sm font-code uppercase font-bold tracking-wider hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Email
          </a>
          <a
            href={resume.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn bg-[var(--bg-base)] text-[var(--text-main)] text-xs sm:text-sm font-code uppercase font-bold tracking-wider hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            GitHub
          </a>
          <a
            href={resume.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn bg-[var(--bg-base)] text-[var(--text-main)] text-xs sm:text-sm font-code uppercase font-bold tracking-wider hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
