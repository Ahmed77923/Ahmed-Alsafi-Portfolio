export interface TimelineStage {
  id: string;
  label: string;
  items: string[];
}

export const timeline: TimelineStage[] = [
  {
    id: "data-analysis",
    label: "Data Analysis",
    items: ["Excel", "SQL", "PostgreSQL"],
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    items: ["Scikit-learn", "Feature Engineering", "Model Evaluation"],
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    items: ["PyTorch", "CNNs", "Computer Vision"],
  },
  {
    id: "production-ml",
    label: "Production ML",
    items: ["FastAPI", "MLflow", "Docker"],
  },
  {
    id: "mlops",
    label: "MLOps",
    items: ["Prometheus", "Grafana", "CI/CD"],
  },
];

export const currentlyBuilding = {
  heading: "Currently building",
  focus: "Computer vision + production AI",
  description:
    "Working through CNN architectures and image classification in PyTorch, and closing the gap between a trained model and something that can actually be deployed and watched in production.",
  items: [
    "Deep Learning",
    "CNN Architectures",
    "Image Classification",
    "Computer Vision",
    "PyTorch",
    "Model Deployment",
    "MLOps",
  ],
};
