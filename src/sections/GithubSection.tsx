import { motion, type Variants } from "framer-motion";
import { Container } from "../components/Container";
import { Tag } from "../components/Tag";
import { GithubIcon, ArrowRightIcon } from "../components/icons";
import { projects } from "../data/projects";
import { site } from "../data/site";

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const repos = projects.map((p) => ({
  name: p.repo,
  description: p.summary,
  technologies: p.technologies.slice(0, 4),
  url: p.github,
}));

export function GithubSection() {
  return (
    <section className="border-t border-[var(--border)] py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">On GitHub</h2>
            <p className="mt-3 max-w-lg text-[var(--text-muted)]">
              Every project here has real, readable source — the commits, not just the write-up.
            </p>
          </div>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
          >
            <GithubIcon />
            @{site.githubUsername}
          </a>
        </div>

        <motion.div
          className="grid gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {repos.map((repo) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="group flex flex-col gap-3 bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--surface)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-mono text-sm text-[var(--text)]">
                  <GithubIcon className="text-[var(--text-muted)]" />
                  {repo.name}
                </span>
                <ArrowRightIcon className="text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent2)]" />
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{repo.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {repo.technologies.map((tech) => (
                  <Tag key={tech} muted>
                    {tech}
                  </Tag>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
