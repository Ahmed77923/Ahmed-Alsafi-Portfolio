import { Container } from "./Container";
import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container className="flex flex-col items-start justify-between gap-3 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs">Built with React, TypeScript &amp; Tailwind CSS</p>
      </Container>
    </footer>
  );
}
