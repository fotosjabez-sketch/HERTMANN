import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

/** Página institucional de texto corrido — a mesma composição para termos e privacidade. */
export function LegalPage({
  label,
  title,
  lead,
  sections,
}: {
  label: string;
  title: string[];
  lead: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHeader label={label} title={title} lead={lead} />

      <div className="shell pb-[var(--spacing-section)]">
        <div className="grid12">
          <div className="col-span-6 md:col-span-7 md:col-start-5">
            {sections.map((section, i) => (
              <Reveal
                key={section.heading}
                delay={i * 0.05}
                className="border-t border-[var(--color-rule)] py-[clamp(2rem,4vw,3rem)]"
              >
                <h2 className="t-h3">{section.heading}</h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="t-body max-w-[62ch]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
