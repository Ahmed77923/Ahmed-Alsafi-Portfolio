import { motion, useScroll } from "framer-motion";

/** Thin fixed progress bar reflecting scroll position across the whole page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(to right, var(--accent2), var(--accent))",
      }}
      aria-hidden="true"
    />
  );
}
