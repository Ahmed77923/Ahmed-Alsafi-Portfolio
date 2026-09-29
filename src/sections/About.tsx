import { Container } from "../components/Container";

const PARAGRAPHS = [
  "I started where most data work starts: spreadsheets, SQL, and cleaning up messy tables until they told a straight story. That's where I learned to be suspicious of a dataset before trusting a conclusion from it.",
  "From there I moved into machine learning — regression and classification, feature engineering, and the slower work of evaluating a model honestly instead of chasing a single good score. Deep learning and computer vision followed, with PyTorch and convolutional networks giving me a way to work with images instead of just tables.",
  "Somewhere in that process I got more interested in what happens after a model trains well. A notebook that ends at 92% accuracy doesn't help anyone — so I started learning the layer above it: serving predictions through an API, packaging that with Docker, and watching it with Prometheus and Grafana once it's running.",
  "That's the focus now: building complete systems — data, model, API, container, monitoring — rather than stopping at the model itself.",
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">About</h2>
        <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-[var(--text)]">
          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
