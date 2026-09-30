import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Container } from "../components/Container";
import { Tag } from "../components/Tag";
import { timeline, currentlyBuilding } from "../data/timeline";

export function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="journey" className="border-t border-[var(--border)] py-24 sm:py-32">
      <Container>
        <div className="mb-16 grid gap-3">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Journey</h2>
          <p className="max-w-lg text-[var(--text-muted)]">
            No employer history to show yet — this is the order I actually learned things in, each
            stage building on the last.
          </p>
        </div>

        <div ref={railRef} className="relative max-w-2xl pl-10 sm:pl-12">
          <div
            className="absolute top-2 bottom-2 left-[3px] w-px bg-[var(--border)] sm:left-[5px]"
            aria-hidden="true"
          />
          <motion.div
            className="absolute top-2 left-[3px] w-px origin-top bg-[var(--accent2)] sm:left-[5px]"
            style={{ scaleY: scrollYProgress, height: "calc(100% - 1rem)" }}
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-14">
            {timeline.map((stage, index) => (
              <motion.li
                key={stage.id}
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
              >
                <span
                  className="absolute -left-10 top-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--accent2)] bg-[var(--bg)] sm:-left-12"
                  aria-hidden="true"
                />
                <p className="font-mono text-xs text-[var(--accent2)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-xl">{stage.label}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {stage.items.map((item) => (
                    <Tag key={item} muted>
                      {item}
                    </Tag>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          className="relative mt-16 overflow-hidden rounded-lg border border-[var(--accent)]/40 bg-[var(--surface)]/60 p-8 sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full opacity-[0.12] blur-[90px]"
            style={{ background: "var(--accent)" }}
            aria-hidden="true"
          />
          <div className="relative flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl">{currentlyBuilding.heading}</h3>
            <span className="font-mono text-sm text-[var(--accent)]">{currentlyBuilding.focus}</span>
          </div>
          <p className="relative mt-4 max-w-2xl text-[var(--text-muted)]">
            {currentlyBuilding.description}
          </p>
          <div className="relative mt-6 flex flex-wrap gap-2">
            {currentlyBuilding.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
