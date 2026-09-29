import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/utils";

interface PipelineDiagramProps {
  steps: string[];
  orientation?: "vertical" | "horizontal";
  accentIndex?: number;
  className?: string;
  /** "mount": animate in immediately (use when already in the initial viewport, e.g. the hero).
   *  "view": wait until scrolled into view (use further down the page). */
  revealOn?: "mount" | "view";
}

export function PipelineDiagram({
  steps,
  orientation = "vertical",
  accentIndex,
  className,
  revealOn = "view",
}: PipelineDiagramProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (revealOn === "mount") {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
  }, [revealOn]);

  const revealed = reducedMotion || (revealOn === "mount" ? mounted : inView);
  const highlight = accentIndex ?? Math.floor(steps.length / 2);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Pipeline: ${steps.join(" leading to ")}`}
      className={cx(
        "flex",
        orientation === "vertical" ? "flex-col items-start" : "flex-row flex-wrap items-center",
        className,
      )}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isAccent = index === highlight;
        const delay = reducedMotion ? 0 : index * 140;

        return (
          <div
            key={step}
            className={cx("flex", orientation === "vertical" ? "flex-col items-start" : "flex-row items-center")}
          >
            <div className="flex items-center gap-3">
              <span
                className={cx(
                  "grid h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-500 ease-out",
                  revealed
                    ? isAccent
                      ? "border-[var(--accent)] bg-[var(--accent)] scale-100 opacity-100"
                      : "border-[var(--accent2)] bg-[var(--accent2)] scale-100 opacity-100"
                    : "border-[var(--border)] bg-transparent scale-50 opacity-0",
                )}
                style={{ transitionDelay: `${delay}ms` }}
                aria-hidden="true"
              />
              <span
                className={cx(
                  "font-mono text-xs tracking-wide transition-all duration-500 ease-out",
                  revealed ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                  isAccent ? "text-[var(--accent)]" : "text-[var(--text)]",
                )}
                style={{ transitionDelay: `${delay + 60}ms` }}
              >
                {step}
              </span>
            </div>

            {!isLast &&
              (orientation === "vertical" ? (
                <div className="relative my-1.5 ml-[4.5px] h-6 w-px overflow-hidden bg-[var(--border)]">
                  <div
                    className={cx(
                      "absolute inset-x-0 top-0 bg-[var(--accent2)] transition-all duration-500 ease-out",
                      revealed ? "h-full" : "h-0",
                    )}
                    style={{ transitionDelay: `${delay + 120}ms` }}
                  />
                </div>
              ) : (
                <div className="relative mx-2 h-px w-8 overflow-hidden bg-[var(--border)] sm:w-12">
                  <div
                    className={cx(
                      "absolute inset-y-0 left-0 bg-[var(--accent2)] transition-all duration-500 ease-out",
                      revealed ? "w-full" : "w-0",
                    )}
                    style={{ transitionDelay: `${delay + 120}ms` }}
                  />
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
