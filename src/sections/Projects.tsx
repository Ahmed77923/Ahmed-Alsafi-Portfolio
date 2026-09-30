import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Container } from "../components/Container";
import { FeaturedProject } from "../components/FeaturedProject";
import { ProjectRow } from "../components/ProjectRow";
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

  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });

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
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <FeaturedProject project={featuredProject} />
          </motion.div>
        )}

        <div ref={railRef} className="relative">
          {/* Scroll-progress rail tracking position through the project rows. */}
          {visible.length > 0 && (
            <div
              className="absolute -left-6 top-0 hidden h-full w-px bg-[var(--border)] lg:block"
              aria-hidden="true"
            >
              <motion.div
                className="w-px origin-top bg-[var(--accent2)]"
                style={{ scaleY: scrollYProgress, height: "100%" }}
              />
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {visible.length > 0 && (
              <div className="flex flex-col gap-16 sm:gap-20">
                {visible.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectRow project={project} index={i + 1} align={i % 2 === 0 ? "left" : "right"} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

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
