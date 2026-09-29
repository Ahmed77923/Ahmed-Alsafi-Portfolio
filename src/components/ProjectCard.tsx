import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { Tag } from "./Tag";
import { PipelineDiagram } from "./PipelineDiagram";
import { GithubIcon, ArrowRightIcon } from "./icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-6">
      <h3 className="font-display text-xl tracking-tight">{project.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-[var(--text)]">{project.summary}</p>

      {project.pipeline && (
        <div className="mt-4 overflow-x-auto">
          <PipelineDiagram steps={project.pipeline} orientation="horizontal" accentIndex={3} />
        </div>
      )}

      <details className="group mt-4">
        <summary className="cursor-pointer list-none font-mono text-xs text-[var(--accent2)] transition-colors hover:text-[var(--text)]">
          <span className="group-open:hidden">show problem &amp; solution</span>
          <span className="hidden group-open:inline">hide problem &amp; solution</span>
        </summary>
        <div className="mt-3 space-y-3 border-t border-[var(--border)] pt-3">
          <div>
            <p className="font-mono text-xs text-[var(--text-muted)]">problem</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-[var(--text-muted)]">solution</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">{project.solution}</p>
          </div>
        </div>
      </details>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 6).map((tech) => (
          <Tag key={tech} muted>
            {tech}
          </Tag>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-6">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)]"
        >
          Case Study
          <ArrowRightIcon />
        </Link>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
        >
          <GithubIcon />
          Code
        </a>
      </div>
    </article>
  );
}
