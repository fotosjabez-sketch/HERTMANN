import { SectionLabel } from "@/components/ui/Label";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ============================================================================
   Abertura de página — o mesmo gesto em todo o site: rótulo, título que se
   levanta, e uma coluna estreita de texto à direita.
   ========================================================================== */

export function PageHeader({
  label,
  title,
  lead,
  aside,
  className,
}: {
  label: string;
  title: string[];
  lead?: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn("shell pb-[clamp(3rem,7vw,6rem)]", className)}
      style={{ paddingTop: "calc(var(--header-h) + clamp(3.5rem, 9vw, 8rem))" }}
    >
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>

      <div className="grid12 mt-[clamp(1.5rem,3vw,2.5rem)] items-end">
        <RevealLines
          as="h1"
          lines={title}
          className="t-h1 col-span-6 md:col-span-7"
          delay={0.06}
        />

        {(lead || aside) && (
          <Reveal delay={0.25} className="col-span-6 mt-8 md:col-span-4 md:col-start-9 md:mt-0">
            {lead && <p className="t-lead max-w-[42ch]">{lead}</p>}
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
}
