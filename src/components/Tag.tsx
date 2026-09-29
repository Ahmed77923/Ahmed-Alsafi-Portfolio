import { cx } from "../lib/utils";

export function Tag({ children, muted = false }: { children: string; muted?: boolean }) {
  return (
    <span
      className={cx(
        "rounded border px-2 py-0.5 font-mono text-[0.72rem] leading-relaxed",
        muted
          ? "border-[var(--border)] text-[var(--text-muted)]"
          : "border-[var(--border)] text-[var(--text)]",
      )}
    >
      {children}
    </span>
  );
}
