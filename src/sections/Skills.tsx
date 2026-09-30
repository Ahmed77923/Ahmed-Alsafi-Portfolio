import { useState } from "react";
import { Container } from "../components/Container";
import { SkillCluster } from "../components/SkillCluster";
import { skillCategories } from "../data/skills";
import { cx } from "../lib/utils";

export function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="skills" className="border-t border-[var(--border)] py-24 sm:py-32">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Skills</h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
            <button
              type="button"
              onClick={() => setActive(null)}
              className={cx(
                "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                active === null
                  ? "border-[var(--accent2)] text-[var(--accent2)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]",
              )}
              aria-pressed={active === null}
            >
              all
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActive(category.id)}
                className={cx(
                  "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                  active === category.id
                    ? "border-[var(--accent2)] text-[var(--accent2)]"
                    : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]",
                )}
                aria-pressed={active === category.id}
              >
                {category.label.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div
          className={cx(
            "grid gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)]",
            active === null ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
          )}
        >
          {skillCategories
            .filter((category) => active === null || category.id === active)
            .map((category) => {
              const originalIndex = skillCategories.findIndex((c) => c.id === category.id);
              return (
                <div key={category.id} className="bg-[var(--bg)]">
                  <SkillCluster
                    category={category}
                    accent={originalIndex % 2 === 0 ? "accent2" : "accent"}
                  />
                </div>
              );
            })}
        </div>
      </Container>
    </section>
  );
}
