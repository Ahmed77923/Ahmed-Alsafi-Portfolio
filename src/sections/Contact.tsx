import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Container } from "../components/Container";
import { GithubIcon, LinkedInIcon, MailIcon, CopyIcon, CheckIcon } from "../components/icons";
import { site } from "../data/site";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!site.email) return;
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the email is still visible to select and copy manually.
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--border)] py-28 sm:py-36">
      <div
        className="pointer-events-none absolute right-[10%] top-1/2 z-0 h-[320px] w-[320px] -translate-y-1/2 rounded-full opacity-[0.12] blur-[110px]"
        style={{ background: "var(--accent2)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[20%] bottom-0 z-0 h-[220px] w-[220px] rounded-full opacity-[0.1] blur-[100px]"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      />

      <Container className="relative z-10 max-w-3xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl"
          >
            Have a project or opportunity? Let's connect.
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-5 max-w-lg text-lg text-[var(--text-muted)]">
            The fastest ways to reach me are below — happy to talk about roles, collaborations, or
            any of the projects on this page.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {site.email ? (
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
            >
              <MailIcon />
              {site.email}
              {copied ? <CheckIcon className="text-[var(--accent)]" /> : <CopyIcon className="text-[var(--text-muted)]" />}
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-muted)]">
              <MailIcon />
              Email coming soon
            </span>
          )}

          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
          >
            <GithubIcon />
            GitHub
          </a>

          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text)]"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
