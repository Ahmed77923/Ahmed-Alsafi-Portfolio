import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";

export function MetricReadout({ label, value }: { label: string; value: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const numeric = Number.parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const animated = useCountUp(Number.isFinite(numeric) ? numeric : 0, inView);

  return (
    <div ref={ref} className="flex min-w-0 flex-col gap-1 border-l border-[var(--border)] pl-3">
      <span className="whitespace-nowrap font-mono text-base font-medium tabular-nums text-[var(--text)] sm:text-lg">
        {Number.isFinite(numeric) ? animated.toFixed(decimals) : value}
      </span>
      <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
    </div>
  );
}
