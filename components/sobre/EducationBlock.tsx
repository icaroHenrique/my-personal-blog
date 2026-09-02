import { Education } from "@/types/sobre";

interface EducationBlockProps {
  title: string;
  education: Education[];
}

export function EducationBlock({ title, education }: EducationBlockProps) {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold neo-border-thin inline-block px-4 py-2 bg-[#FFD23F] text-black">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {education.map((item, idx) => (
          <div
            key={idx}
            className="neo-card neo-card-hover flex flex-col overflow-hidden bg-[var(--bg-surface)]"
          >
            {/* Header com a cor de tema da seção */}
            <div className="bg-[var(--bg-base)] px-4 py-2 border-b-[3px] border-[var(--stroke-color)] flex justify-between items-center">
               <span className="font-code text-xs font-extrabold uppercase tracking-wider text-[var(--text-main)]">
                 {item.period}
               </span>
            </div>
            
            <div className="p-6 flex flex-col gap-2">
              <h3 className="font-heading text-xl font-bold leading-tight">
                {item.degree}
              </h3>
              <p className="font-body text-sm text-[var(--text-main)] opacity-85 font-medium">
                {item.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
