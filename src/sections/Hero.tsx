import { Container } from "../components/Container";
import { PipelineDiagram } from "../components/PipelineDiagram";
import { GithubIcon, ArrowRightIcon } from "../components/icons";
import { site } from "../data/site";

const PIPELINE_STEPS = ["DATA", "FEATURES", "MODEL", "API", "DEPLOY", "MONITOR"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <Container className="relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl">
            {site.name}
            <span className="mt-2 block text-[var(--accent)]">{site.role.replace(" Student", "")}</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text)] sm:text-xl">
            {site.statement}
          </p>

          <p className="mt-3 max-w-lg font-mono text-sm text-[var(--text-muted)]">{site.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRightIcon />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/60 p-6 sm:p-8">
          <p className="mb-6 font-mono text-xs text-[var(--text-muted)]">
            what a project looks like, end to end
          </p>
          <PipelineDiagram steps={PIPELINE_STEPS} accentIndex={4} revealOn="mount" />
        </div>
      </Container>
    </section>
  );
}
