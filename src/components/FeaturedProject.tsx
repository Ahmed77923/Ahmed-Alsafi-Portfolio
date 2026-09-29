import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { Tag } from "./Tag";
import { MetricReadout } from "./MetricReadout";
import { PipelineDiagram } from "./PipelineDiagram";
import { GithubIcon, ArrowRightIcon } from "./icons";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]/60">
      <div className="border-b border-[var(--border)] px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs text-[var(--accent)]">flagship system</span>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            {project.technologies.length} technologies
          </span>
        </div>
      </div>

      <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-[var(--text)]">{project.summary}</p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs text-[var(--text-muted)]">problem</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-[var(--text)]">{project.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-[var(--text-muted)]">solution</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-[var(--text)]">{project.solution}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Tag key={tech} muted>
                {tech}
              </Tag>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5"
            >
              View Case Study
              <ArrowRightIcon />
            </Link>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
            >
              <GithubIcon />
              GitHub
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {project.metrics && (
            <div className="grid grid-cols-3 gap-4 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-5">
              {project.metrics.map((metric) => (
                <MetricReadout key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>
          )}

          {project.featureImportance && (
            <div>
              <p className="font-mono text-xs text-[var(--text-muted)]">top feature importance</p>
              <ol className="mt-2 space-y-1.5">
                {project.featureImportance.map((feature, index) => (
                  <li key={feature} className="flex items-center gap-2 font-mono text-sm text-[var(--text)]">
                    <span className="text-[var(--text-muted)]">{index + 1}</span>
                    {feature}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {project.pipeline && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-5">
              <p className="mb-4 font-mono text-xs text-[var(--text-muted)]">architecture</p>
              <PipelineDiagram steps={project.pipeline} accentIndex={4} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
