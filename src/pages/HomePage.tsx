import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Projects } from "../sections/Projects";
import { Skills } from "../sections/Skills";
import { Journey } from "../sections/Journey";
import { GithubSection } from "../sections/GithubSection";
import { Contact } from "../sections/Contact";
import { useSEO } from "../hooks/useSEO";

export function HomePage() {
  useSEO({
    title: "Ahmed Alsafi — Data Science & AI",
    description:
      "Data Science and AI portfolio showcasing machine learning, computer vision, MLOps, and production ML systems.",
  });

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Journey />
      <GithubSection />
      <Contact />
    </>
  );
}
