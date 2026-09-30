import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import type { Project } from "../data/projects";
import { Tag } from "./Tag";
import { PipelineDiagram } from "./PipelineDiagram";
import { GithubIcon, ArrowRightIcon, CheckIcon } from "./icons";
import { useReducedMotion } from "../hooks/useReducedMotion";

const textVariants: Variants = {
  hidden: (align: "left" | "right") => ({ opacity: 0, x: align === "left" ? -24 : 24 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const visualVariants: Variants = {
  hidden: (align: "left" | "right") => ({ opacity: 0, x: align === "left" ? 24 : -24, scale: 0.96 }),
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

function TiltPanel({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: reducedMotion ? 0 : springX,
        rotateY: reducedMotion ? 0 : springY,
        transformPerspective: 900,
      }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-6 transition-colors hover:border-[var(--accent2)] sm:p-8"
    >
      {children}
    </motion.div>
  );
}

export function ProjectRow({
  project,
  index,
  align,
}: {
  project: Project;
  index: number;
  align: "left" | "right";
}) {
  const textBlock = (
    <motion.div
      custom={align}
      variants={textVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      <p className="font-mono text-sm text-[var(--accent2)]">{String(index).padStart(2, "0")}</p>
      <h3 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">{project.title}</h3>
      <p className="mt-3 max-w-md leading-relaxed text-[var(--text)]">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <Tag key={tech} muted>
            {tech}
          </Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5">
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
    </motion.div>
  );

  const visualBlock = (
    <motion.div
      custom={align}
      variants={visualVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
    >
      <TiltPanel>
        {project.pipeline ? (
          <>
            <p className="mb-5 font-mono text-xs text-[var(--text-muted)]">architecture</p>
            <PipelineDiagram steps={project.pipeline} accentIndex={4} />
          </>
        ) : (
          <>
            <p className="mb-4 font-mono text-xs text-[var(--text-muted)]">key results</p>
            <ul className="space-y-2.5">
              {project.keyResults.map((result) => (
                <li key={result} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text)]">
                  <CheckIcon className="mt-0.5 shrink-0 text-[var(--accent2)]" />
                  {result}
                </li>
              ))}
            </ul>
          </>
        )}
      </TiltPanel>
    </motion.div>
  );

  return (
    <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
      {align === "left" ? (
        <>
          {textBlock}
          {visualBlock}
        </>
      ) : (
        <>
          <div className="lg:order-2">{textBlock}</div>
          <div className="lg:order-1">{visualBlock}</div>
        </>
      )}
    </div>
  );
}
