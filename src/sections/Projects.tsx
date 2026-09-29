import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { FeaturedProject } from "../components/FeaturedProject";
import { ProjectCard } from "../components/ProjectCard";
import { GithubIcon, ArrowRightIcon } from "../components/icons";
import {
  featuredProject,
  primaryProjects,
  secondaryProjects,
  otherProjects,
  type ProjectDomain,
} from "../data/projects";
import { cx } from "../lib/utils";

const FILTERS: { id: ProjectDomain | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "computer-vision", label: "Computer Vision" },
  { id: "frontend", label: "Frontend" },
];

const gridProjects = [...primaryProjects, ...secondaryProjects];

export function Projects() {
  const [filter, setFilter] = useState<ProjectDomain | "all">("all");
  const visible = gridProjects.filter((p) => filter === "all" || p.domain === filter);
  const showFeatured = filter === "all" || filter === "production-ml";
  const showOther = filter === "all" || filter === "frontend";

  return (
    <section id="projects" className="border-t border-[var(--border)] py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Projects</h2>
            <p className="mt-3 max-w-lg text-[var(--text-muted)]">
              Systems I've built end to end — from a raw dataset to something that could be run,
              queried, and watched in production.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cx(
                  "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                  filter === f.id
                    ? "border-[var(--accent2)] text-[var(--accent2)]"
                    : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {showFeatured && (
          <div className="mb-8">
            <FeaturedProject project={featuredProject} />
          </div>
        )}

        {visible.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}

        {!showFeatured && visible.length === 0 && !showOther && (
          <p className="py-12 text-center text-[var(--text-muted)]">No projects in this category yet.</p>
        )}

        {showOther && otherProjects.length > 0 && (
          <div className="mt-14">
            <p className="mb-4 font-mono text-xs text-[var(--text-muted)]">other work</p>
            <div className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)]">
              {otherProjects.map((project) => (
                <div
                  key={project.slug}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div>
                    <h3 className="font-display text-lg">{project.title}</h3>
                    <p className="mt-1 max-w-md text-sm text-[var(--text-muted)]">{project.summary}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
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
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
