import { SkillCategory } from "@/types/sobre";

interface SkillGridProps {
  title: string;
  categories: SkillCategory[];
}

export function SkillGrid({ title, categories }: SkillGridProps) {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold neo-border-thin inline-block px-4 py-2 bg-[#FFD23F] text-black">
          {title}
        </h2>
      </div>

      <div className="neo-card flex flex-col gap-6 p-6 sm:p-8 bg-[var(--bg-surface)]">
        {categories.map((category, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-4 border-b-2 border-[var(--stroke-color)] pb-4 last:border-b-0 last:pb-0">
            {/* Category Title */}
            <div className="sm:w-1/3 md:w-1/4 shrink-0 flex items-center gap-2">
              <span className="font-heading font-bold text-lg text-[var(--text-main)]">
                {category.title}
              </span>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap gap-2 flex-1 items-start">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="neo-badge bg-[var(--bg-base)] text-[var(--text-main)] border-[var(--stroke-color)] text-sm font-code font-bold tracking-tight hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
