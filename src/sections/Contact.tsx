import { useState } from "react";
import { Container } from "../components/Container";
import { GithubIcon, LinkedInIcon, MailIcon, CopyIcon, CheckIcon } from "../components/icons";
import { site } from "../data/site";

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
    <section id="contact" className="border-t border-[var(--border)] py-24 sm:py-32">
      <Container className="max-w-3xl">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Have a project or opportunity? Let's connect.
        </h2>
        <p className="mt-4 max-w-lg text-[var(--text-muted)]">
          The fastest ways to reach me are below — happy to talk about roles, collaborations, or
          any of the projects on this page.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
        </div>
      </Container>
    </section>
  );
}
