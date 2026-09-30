import { lazy, Suspense } from "react";
import { motion, type Variants } from "framer-motion";
import { Container } from "../components/Container";
import { GithubIcon, ArrowRightIcon } from "../components/icons";
import { site } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";

const NeuralNetworkBackground = lazy(() =>
  import("../components/NeuralNetworkBackground").then((mod) => ({
    default: mod.NeuralNetworkBackground,
  })),
);

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div className="grid-fade pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      {/* Ambient glow ties the 3D field's color into the content instead of
          leaving it feeling like a separate layer. */}
      <div
        className="pointer-events-none absolute left-[8%] top-[22%] z-[1] h-[280px] w-[280px] rounded-full opacity-[0.14] blur-[100px] sm:h-[420px] sm:w-[420px]"
        style={{ background: "var(--accent2)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[15%] top-[10%] z-[1] h-[220px] w-[220px] rounded-full opacity-[0.1] blur-[90px] sm:h-[320px] sm:w-[320px]"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      />

      <Suspense fallback={null}>
        <NeuralNetworkBackground className="absolute inset-0 z-[2]" />
      </Suspense>
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/40 to-[var(--bg)]/5"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial={reducedMotion ? "show" : "hidden"}
          animate="show"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-3.5 py-1.5 font-mono text-xs tracking-wide text-[var(--text-muted)] backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            {site.tagline}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-mono text-sm tracking-wide text-[var(--accent2)]"
          >
            {site.name}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-2 font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl"
          >
            {site.role.replace(" Student", "")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text)] sm:text-xl"
          >
            {site.statement}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRightIcon />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
            >
              Contact Me
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              <GithubIcon />
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
