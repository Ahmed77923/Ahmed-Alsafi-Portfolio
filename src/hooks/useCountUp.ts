import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useCountUp(target: number, active: boolean, durationMs = 900) {
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [active, target, durationMs, reducedMotion]);

  return value;
}
