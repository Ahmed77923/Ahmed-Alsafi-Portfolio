import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select';

/** Small spring-follow cursor dot. Disabled on touch/coarse pointers and reduced motion. */
export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches && !reducedMotion);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-[var(--accent2)] bg-[var(--accent2)]"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovering ? 32 : 8,
        height: hovering ? 32 : 8,
        opacity: hovering ? 0.5 : 0.9,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}
