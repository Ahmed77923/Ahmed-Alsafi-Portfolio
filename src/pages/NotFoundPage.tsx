import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { useSEO } from "../hooks/useSEO";

export function NotFoundPage() {
  useSEO({
    title: "Page not found — Ahmed Alsafi",
    description: "The page you're looking for doesn't exist.",
  });

  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-[var(--accent)]">404</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
        This page doesn't exist.
      </h1>
      <p className="mt-3 max-w-md text-[var(--text-muted)]">
        The project or page you're looking for may have moved. Head back to the homepage to find
        your way.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg)]"
      >
        Back to home
      </Link>
    </Container>
  );
}
