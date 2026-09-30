import { motion, type Variants } from "framer-motion";
import { Container } from "../components/Container";
import { PipelineDiagram } from "../components/PipelineDiagram";
import { skillCategories } from "../data/skills";

const PARAGRAPHS = [
  "I started where most data work starts: spreadsheets, SQL, and cleaning up messy tables until they told a straight story. That's where I learned to be suspicious of a dataset before trusting a conclusion from it.",
  "From there I moved into machine learning — regression and classification, feature engineering, and the slower work of evaluating a model honestly instead of chasing a single good score. Deep learning and computer vision followed, with PyTorch and convolutional networks giving me a way to work with images instead of just tables.",
  "Somewhere in that process I got more interested in what happens after a model trains well. A notebook that ends at 92% accuracy doesn't help anyone — so I started learning the layer above it: serving predictions through an API, packaging that with Docker, and watching it with Prometheus and Grafana once it's running.",
  "That's the focus now: building complete systems — data, model, API, container, monitoring — rather than stopping at the model itself.",
];

// The real skill categories, minus Frontend, read in the order this journey
// actually happened — the same progression the paragraphs narrate.
const PROGRESSION_STEPS = skillCategories.filter((c) => c.id !== "frontend").map((c) => c.label);

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.34fr_0.66fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">About</h2>
          <p className="mt-3 max-w-xs text-sm text-[var(--text-muted)]">
            The path so far, roughly in the order it happened.
          </p>
          <PipelineDiagram steps={PROGRESSION_STEPS} accentIndex={3} className="mt-8" />
        </div>

        <motion.div
          className="max-w-2xl space-y-6 text-[1.05rem] leading-relaxed text-[var(--text)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {PARAGRAPHS.map((paragraph, index) => (
            <motion.p key={paragraph} variants={paragraphVariants} className="relative pl-6">
              <span className="absolute left-0 top-1 font-mono text-xs text-[var(--accent2)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
