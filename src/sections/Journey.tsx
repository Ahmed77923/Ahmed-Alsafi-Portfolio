import { Container } from "../components/Container";
import { Tag } from "../components/Tag";
import { timeline, currentlyBuilding } from "../data/timeline";

export function Journey() {
  return (
    <section id="journey" className="border-t border-[var(--border)] py-24 sm:py-32">
      <Container>
        <div className="mb-14 grid gap-3">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Journey</h2>
          <p className="max-w-lg text-[var(--text-muted)]">
            No employer history to show yet — this is the order I actually learned things in, each
            stage building on the last.
          </p>
        </div>

        <ol className="grid gap-0 lg:grid-cols-5 lg:gap-6">
          {timeline.map((stage, index) => (
            <li key={stage.id} className="relative border-t border-[var(--border)] pt-5 lg:border-t-0">
              <div className="mb-3 flex items-center gap-3 lg:block">
                <span className="font-mono text-xs text-[var(--accent2)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg lg:mt-1">{stage.label}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 pb-6 lg:pb-0">
                {stage.items.map((item) => (
                  <Tag key={item} muted>
                    {item}
                  </Tag>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-lg border border-[var(--border)] bg-[var(--surface)]/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl">{currentlyBuilding.heading}</h3>
            <span className="font-mono text-sm text-[var(--accent)]">{currentlyBuilding.focus}</span>
          </div>
          <p className="mt-3 max-w-2xl text-[var(--text-muted)]">{currentlyBuilding.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {currentlyBuilding.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
