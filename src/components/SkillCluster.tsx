import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import type { SkillCategory } from "../data/skills";

const GOLDEN_ANGLE_DEG = 137.50776;
const MAX_RADIUS = 42;

/** Phyllotaxis spiral: spreads any item count evenly with no manual tuning per category. */
function nodePosition(index: number, total: number) {
  const angle = (index * GOLDEN_ANGLE_DEG * Math.PI) / 180;
  const radius = MAX_RADIUS * Math.sqrt((index + 1) / total);
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

const clusterVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export function SkillCluster({
  category,
  accent,
}: {
  category: SkillCategory;
  accent: "accent" | "accent2";
}) {
  const [active, setActive] = useState<number | null>(null);
  const color = `var(--${accent})`;
  const positions = category.items.map((_, i) => nodePosition(i, category.items.length));

  return (
    <div className="flex flex-col items-center p-6 sm:p-8">
      <h3 className="mb-6 text-center font-display text-lg">{category.label}</h3>

      <motion.div
        className="relative aspect-square w-full max-w-[260px]"
        variants={clusterVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {positions.map((pos, i) => (
            <line
              key={category.items[i]}
              x1={50}
              y1={50}
              x2={pos.x}
              y2={pos.y}
              stroke={color}
              strokeWidth={active === i ? 0.7 : 0.3}
              opacity={active === null || active === i ? 0.55 : 0.15}
            />
          ))}
        </svg>

        <span
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />

        {category.items.map((item, i) => {
          const pos = positions[i];
          const isActive = active === i;
          return (
            <button
              key={item}
              type="button"
              className="absolute h-2.5 w-2.5 rounded-full border transition-transform duration-200"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                borderColor: color,
                backgroundColor: isActive ? color : "transparent",
                transform: `translate(-50%, -50%) scale(${isActive ? 1.9 : 1})`,
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              aria-label={`${item} — ${category.label}`}
            />
          );
        })}
      </motion.div>

      <p
        className="mt-5 h-5 font-mono text-xs text-[var(--text-muted)]"
        role="status"
        aria-live="polite"
      >
        {active !== null ? category.items[active] : " "}
      </p>
    </div>
  );
}
