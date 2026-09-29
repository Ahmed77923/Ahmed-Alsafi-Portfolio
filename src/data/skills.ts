export interface SkillCategory {
  id: string;
  label: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "data-science",
    label: "Data Science",
    items: [
      "Python",
      "Pandas",
      "NumPy",
      "SQL",
      "PostgreSQL",
      "Statistics",
      "Exploratory Data Analysis",
      "Feature Engineering",
      "Excel",
    ],
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    items: [
      "Scikit-learn",
      "LightGBM",
      "Regression",
      "Classification",
      "Model Evaluation",
      "Cross Validation",
      "Hyperparameter Tuning",
      "AutoML concepts",
    ],
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Neural Networks",
      "CNNs",
      "Image Classification",
      "Transfer Learning",
    ],
  },
  {
    id: "computer-vision",
    label: "Computer Vision",
    items: [
      "OpenCV",
      "Image Preprocessing",
      "CNN Architectures",
      "Vision Pipelines",
      "PyTorch Vision Workflows",
    ],
  },
  {
    id: "mlops",
    label: "MLOps / Production ML",
    items: [
      "MLflow",
      "FastAPI",
      "Docker",
      "Docker Compose",
      "Prometheus",
      "Grafana",
      "Model Monitoring",
      "REST APIs",
      "Model Serving",
      "CI/CD concepts",
      "Linux",
      "Git",
      "GitHub",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "React Router",
      "Vite",
      "HTML",
      "CSS",
      "i18next",
    ],
  },
];
