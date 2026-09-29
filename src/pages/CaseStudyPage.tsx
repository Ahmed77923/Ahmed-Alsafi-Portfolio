import { Link, Navigate, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { Tag } from "../components/Tag";
import { MetricReadout } from "../components/MetricReadout";
import { PipelineDiagram } from "../components/PipelineDiagram";
import { GithubIcon, ArrowRightIcon } from "../components/icons";
import { getProjectBySlug } from "../data/projects";
import { useSEO } from "../hooks/useSEO";

interface Section {
  heading: string;
  body?: string;
  list?: string[];
  pipeline?: string[];
}

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useSEO({
    title: project ? `${project.title} — Case Study — Ahmed Alsafi` : "Project not found — Ahmed Alsafi",
    description: project?.summary ?? "This project could not be found.",
  });

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const { caseStudy } = project;

  const sections: Section[] = (
    [
      { heading: "Overview", body: caseStudy.overview },
      { heading: "Problem", body: caseStudy.problem },
      { heading: "Dataset", body: caseStudy.dataset },
      { heading: "Approach", body: caseStudy.approach },
      caseStudy.featureEngineering
        ? { heading: "Feature Engineering", body: caseStudy.featureEngineering }
        : null,
      caseStudy.model ? { heading: "Model", body: caseStudy.model } : null,
      caseStudy.evaluation ? { heading: "Evaluation", body: caseStudy.evaluation } : null,
      caseStudy.architecture ? { heading: "Architecture", pipeline: caseStudy.architecture } : null,
      caseStudy.deployment ? { heading: "Deployment", body: caseStudy.deployment } : null,
      caseStudy.monitoring ? { heading: "Monitoring", body: caseStudy.monitoring } : null,
      { heading: "Results", body: caseStudy.results },
      { heading: "Lessons Learned", body: caseStudy.lessons },
    ] as Array<Section | null>
  ).filter((s): s is Section => s !== null);

  return (
    <article className="py-28 sm:py-32">
      <Container>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
        >
          ← back to projects
        </Link>

        <header className="mt-6 max-w-3xl">
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text)]">{project.summary}</p>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.68fr_0.32fr]">
          <div className="max-w-2xl space-y-12">
            {sections.map((section, index) => (
              <section key={section.heading} aria-labelledby={`section-${index}`}>
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[var(--accent2)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`section-${index}`} className="font-display text-xl">
                    {section.heading}
                  </h2>
                </div>
                {section.body && (
                  <p className="leading-relaxed text-[var(--text)]">{section.body}</p>
                )}
                {section.pipeline && (
                  <div className="mt-2 rounded-lg border border-[var(--border)] bg-[var(--surface)]/60 p-5">
                    <PipelineDiagram steps={section.pipeline} accentIndex={Math.floor(section.pipeline.length / 2)} />
                  </div>
                )}
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-8 rounded-lg border border-[var(--border)] bg-[var(--surface)]/60 p-6">
              {project.metrics && (
                <div>
                  <p className="mb-3 font-mono text-xs text-[var(--text-muted)]">test metrics</p>
                  <div className="grid grid-cols-3 gap-3">
                    {project.metrics.map((metric) => (
                      <MetricReadout key={metric.label} label={metric.label} value={metric.value} />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-3 font-mono text-xs text-[var(--text-muted)]">technologies</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Tag key={tech} muted>
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5"
                >
                  <GithubIcon />
                  View Source
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
                  >
                    Live Demo
                    <ArrowRightIcon />
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
