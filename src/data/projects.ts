import { site } from "./site";

export type ProjectTier = "featured" | "primary" | "secondary" | "other";
export type ProjectDomain = "production-ml" | "machine-learning" | "computer-vision" | "frontend";

export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  dataset: string;
  approach: string;
  featureEngineering?: string;
  model?: string;
  evaluation?: string;
  architecture?: string[];
  deployment?: string;
  monitoring?: string;
  results: string;
  lessons: string;
}

export interface Project {
  slug: string;
  title: string;
  tier: ProjectTier;
  domain: ProjectDomain;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  keyResults: string[];
  metrics?: Metric[];
  featureImportance?: string[];
  pipeline?: string[];
  repo: string;
  github: string;
  demo?: string;
  caseStudy: CaseStudy;
}

const repoUrl = (name: string) => `https://github.com/${site.githubUsername}/${name}`;

export const projects: Project[] = [
  {
    slug: "flight-delay-prediction",
    title: "Flight Delay Prediction",
    tier: "featured",
    domain: "production-ml",
    summary:
      "An end-to-end machine learning system for predicting flight arrival delays — from raw schedule data to a monitored inference API.",
    problem:
      "Airlines and passengers plan around scheduled arrival times, but delays are common and hard to anticipate. A useful prediction has to be available before departure, not just accurate in a notebook.",
    solution:
      "A LightGBM regression model trained on route, carrier, and schedule features, wrapped in a FastAPI inference service with a Streamlit front end, tracked through MLflow, containerized with Docker Compose, and observed with Prometheus and Grafana.",
    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "LightGBM",
      "MLflow",
      "FastAPI",
      "Docker",
      "Docker Compose",
      "Streamlit",
      "Prometheus",
      "Grafana",
    ],
    keyResults: [
      "Full pipeline from raw data to a served, monitored model — not a notebook artifact",
      "Experiment tracking and a model registry via MLflow instead of manually managed pickle files",
      "Load-tested FastAPI inference endpoint with Prometheus metrics and Grafana dashboards",
    ],
    metrics: [
      { label: "RMSE", value: "15.6667" },
      { label: "MAE", value: "11.8833" },
      { label: "R²", value: "0.2393" },
    ],
    featureImportance: ["route", "carrier_origin", "DEST", "CRS_ELAPSED_TIME"],
    pipeline: [
      "Dataset",
      "Feature Engineering",
      "ML Pipeline",
      "LightGBM",
      "MLflow",
      "FastAPI",
      "Docker",
      "Prometheus + Grafana",
    ],
    repo: "Flight-Delay-Prediction",
    github: repoUrl("Flight-Delay-Prediction"),
    caseStudy: {
      overview:
        "Flight Delay Prediction is a production-shaped ML system: a LightGBM regressor for arrival delay in minutes, served behind a FastAPI endpoint, tracked with MLflow, containerized, and monitored — the full path from dataset to something that could run unattended.",
      problem:
        "Predicting arrival delay in minutes is a noisy regression problem — weather, air traffic, and operational cascades all contribute, and most of that signal isn't in a schedule dataset. The goal wasn't a perfect predictor; it was a system that produces a calibrated, monitored estimate and can be safely iterated on.",
      dataset:
        "Historical flight schedule and performance records, including scheduled and actual times, carrier, origin/destination airports, and elapsed time — the kind of data available before a flight departs.",
      approach:
        "Built a reusable feature engineering module rather than one-off notebook transforms, so the exact same code path prepares data for training and for live inference — eliminating train/serve skew.",
      featureEngineering:
        "Derived route as an origin–destination pair, encoded carrier and origin jointly as carrier_origin, and kept scheduled elapsed time (CRS_ELAPSED_TIME) as a proxy for route distance and congestion. Categorical fields were encoded for LightGBM's native categorical support rather than blanket one-hot encoding.",
      model:
        "LightGBM gradient-boosted trees, chosen over a linear baseline for its native handling of categorical features and non-linear interactions between route and carrier, with materially lower training cost than a deep learning approach for tabular data of this size.",
      evaluation:
        "Held out a test split evaluated with RMSE, MAE, and R². Feature importance was inspected per run in MLflow to confirm the model was leaning on route- and schedule-level signal (route, carrier_origin, DEST, CRS_ELAPSED_TIME) rather than spurious columns.",
      architecture: [
        "Dataset",
        "Feature Engineering",
        "ML Pipeline",
        "LightGBM",
        "MLflow",
        "FastAPI",
        "Docker",
        "Prometheus + Grafana",
      ],
      deployment:
        "The trained model is loaded from the MLflow model registry by a FastAPI service exposing a prediction endpoint, with a Streamlit app on top for interactive, human-readable input. Both services and the tracking server run as Docker Compose services so the whole stack starts with one command.",
      monitoring:
        "The FastAPI service exposes Prometheus metrics (request volume, latency, prediction distribution), scraped and visualized in Grafana dashboards, so degraded latency or a drifting prediction range is visible without reading logs. The API was load-tested to check behavior under concurrent requests.",
      results:
        "On the held-out test set, the model reaches an RMSE of 15.6667 minutes and MAE of 11.8833 minutes, with an R² of 0.2393 — a realistic result given how much delay variance depends on information (weather, live air traffic) that isn't present in schedule data alone.",
      lessons:
        "The R² makes it obvious that schedule data has a ceiling on predictive power for this target — the more valuable outcome was the reusable pipeline and monitoring setup, which would carry over directly if richer features (weather, live ATC data) were added later.",
    },
  },
  {
    slug: "fraud-detection-ml-system",
    title: "Fraud Detection ML System",
    tier: "primary",
    domain: "machine-learning",
    summary:
      "A fraud classification project built around reproducible experiments — every cross-validation fold logged as its own MLflow run.",
    problem:
      "Fraud detection models are easy to overstate: a single train/test split can look strong while hiding fold-to-fold variance that matters in practice.",
    solution:
      "Structured evaluation around scikit-learn cross-validation with MLflow nested runs, so each fold is logged individually under a parent experiment — making performance variance visible instead of averaged away.",
    technologies: ["Python", "Pandas", "Scikit-learn", "MLflow", "Cross Validation"],
    keyResults: [
      "Nested MLflow runs: one parent experiment, one child run per CV fold",
      "Reproducible metrics per fold, not just a single averaged score",
      "Clear separation between experiment tracking and model code",
    ],
    repo: "Fraud-Detection-ML-System",
    github: repoUrl("Fraud-Detection-ML-System"),
    caseStudy: {
      overview:
        "A transaction fraud classifier built to demonstrate reproducible experimentation as much as raw model performance — the emphasis is on how the evaluation is tracked, not just what score it produces.",
      problem:
        "Fraudulent transactions are rare relative to legitimate ones, and a single accuracy figure can be misleading. The project needed an evaluation setup that surfaces fold-level variance and stays reproducible across re-runs.",
      dataset:
        "A labeled transaction dataset with a strong class imbalance between fraudulent and legitimate transactions, typical of real-world fraud detection problems.",
      approach:
        "Cross-validation was wrapped in MLflow's nested run support: a parent run represents the overall experiment configuration, and each fold spawns a child run with its own logged parameters and metrics.",
      model:
        "Scikit-learn classifiers evaluated under stratified cross-validation, keeping the class imbalance consistent across folds.",
      evaluation:
        "Per-fold metrics are logged as individual MLflow child runs, then reviewed together under the parent run — making it possible to see variance across folds instead of a single averaged number that can hide weak folds.",
      results:
        "The nested-run structure makes every fold's metrics inspectable in the MLflow UI, turning a black-box average into an auditable set of results tied to a single reproducible parent experiment.",
      lessons:
        "Logging structure is part of model quality: a well-organized set of MLflow runs makes it far easier to trust — and later reproduce — a reported score than a single printed metric ever does.",
    },
  },
  {
    slug: "fruits-360-image-classification",
    title: "Fruits-360 Image Classification",
    tier: "primary",
    domain: "computer-vision",
    summary:
      "A computer vision project classifying fruit images with a CNN, built on a custom PyTorch dataset pipeline instead of a default ImageFolder loader.",
    problem:
      "Standard image folder loaders work for simple cases, but don't leave much room for custom preprocessing, labeling logic, or dataset-specific handling.",
    solution:
      "A custom PyTorch Dataset class handling image loading and preprocessing explicitly, feeding a CNN trained for multi-class fruit classification.",
    technologies: ["Python", "PyTorch", "CNN", "Computer Vision", "Image Preprocessing", "Deep Learning"],
    keyResults: [
      "Custom PyTorch Dataset implementation, not just torchvision.datasets.ImageFolder",
      "Full pipeline from raw images to trained CNN to prediction",
      "Explicit preprocessing and augmentation stage ahead of training",
    ],
    pipeline: ["Images", "Preprocessing", "Custom Dataset", "CNN", "Training", "Evaluation", "Prediction"],
    repo: "Fruits-360",
    github: repoUrl("Fruits-360"),
    caseStudy: {
      overview:
        "An image classification project on the Fruits-360 dataset, built to practice the full deep learning workflow — including writing the data loading layer by hand rather than relying entirely on built-in utilities.",
      problem:
        "Classify images of fruit into their correct category from a large multi-class image dataset, while keeping control over exactly how images are loaded, labeled, and preprocessed.",
      dataset:
        "The Fruits-360 dataset: thousands of labeled fruit images across many classes, organized by category.",
      approach:
        "Rather than pointing torchvision's ImageFolder at the directory structure, a custom PyTorch Dataset class was implemented to control image loading and label assignment directly, then paired with a preprocessing and augmentation stage before training.",
      featureEngineering:
        "Images are resized and normalized in the custom dataset's __getitem__, with augmentation applied during training to reduce overfitting on visually similar fruit classes.",
      model:
        "A convolutional neural network trained from this custom pipeline for multi-class image classification, using PyTorch's standard training loop with cross-entropy loss.",
      evaluation:
        "Accuracy and loss were tracked across training and validation splits to check generalization across the many fruit classes, followed by qualitative checks on individual predictions.",
      architecture: ["Images", "Preprocessing", "Custom Dataset", "CNN", "Training", "Evaluation", "Prediction"],
      results:
        "The trained CNN reliably classifies fruit images across the dataset's categories, with the custom dataset pipeline giving direct control over preprocessing that a default loader would have abstracted away.",
      lessons:
        "Writing the Dataset class by hand made the training pipeline more transparent and easier to debug when something in preprocessing looked wrong — a habit that carries directly into more complex vision projects.",
    },
  },
  {
    slug: "spaceship-titanic",
    title: "Spaceship Titanic",
    tier: "secondary",
    domain: "machine-learning",
    summary:
      "A Kaggle-style machine learning workflow — cleaning, exploring, and modeling the Spaceship Titanic dataset end to end.",
    problem:
      "The raw competition data includes missing values, mixed types, and features that only become useful after deliberate cleaning and transformation.",
    solution:
      "A structured workflow moving from data cleaning through exploratory analysis, feature engineering, and model training to a validated evaluation.",
    technologies: ["Python", "Pandas", "Scikit-learn", "EDA", "Feature Engineering"],
    keyResults: [
      "Systematic handling of missing values and mixed-type features",
      "EDA-driven feature engineering rather than blind transformation",
      "Clear train/validation workflow matching Kaggle competition structure",
    ],
    repo: "spaceship_titanic",
    github: repoUrl("spaceship_titanic"),
    caseStudy: {
      overview:
        "A classification project on Kaggle's Spaceship Titanic dataset, predicting which passengers were transported to an alternate dimension — used here as a structured exercise in the full tabular ML workflow.",
      problem:
        "Predict a binary outcome per passenger from a dataset with missing values, correlated features, and categorical fields that need deliberate handling before modeling.",
      dataset:
        "The Kaggle Spaceship Titanic dataset: passenger records including cabin, spending, and demographic fields, with a binary transported/not-transported label.",
      approach:
        "Started with data cleaning and missing-value handling, followed by exploratory analysis to understand which fields correlated with the target before engineering features and training models.",
      featureEngineering:
        "Cabin fields were decomposed into their component parts, spending columns were aggregated, and missing values were imputed based on patterns found during EDA rather than filled uniformly.",
      evaluation:
        "Models were compared using a held-out validation split, with accuracy as the primary metric in line with the competition's evaluation criteria.",
      results:
        "The workflow produced a clean, reproducible notebook-to-submission pipeline, with feature engineering choices grounded in exploratory analysis rather than applied blindly.",
      lessons:
        "Most of the performance gain came from careful cleaning and feature engineering rather than model choice — a pattern that shows up repeatedly in tabular ML problems.",
    },
  },
  {
    slug: "little-lemon",
    title: "Little Lemon",
    tier: "other",
    domain: "frontend",
    summary: "A React web application built to practice component architecture, routing, and localization.",
    problem: "N/A — a frontend practice project, included to show breadth outside of ML tooling.",
    solution:
      "A restaurant-site React application with client-side routing and internationalization support.",
    technologies: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "React Router", "i18next"],
    keyResults: [
      "Component-based architecture with React Router for navigation",
      "Internationalization via i18next",
    ],
    repo: "Little-Lemon",
    github: repoUrl("Little-Lemon"),
    caseStudy: {
      overview:
        "Little Lemon is a React front-end project — the supporting evidence for frontend skills used to build the tools (like the Streamlit and API layers) around the ML projects, not the main focus of this portfolio.",
      problem:
        "Build a multi-page restaurant web application with client-side routing and support for multiple languages.",
      dataset: "Not applicable — this is a front-end application project, not a data project.",
      approach:
        "Structured as reusable React components with React Router handling navigation between pages, and i18next providing translated content.",
      deployment: "Built and bundled with Vite, styled with Tailwind CSS.",
      results:
        "A working multi-page, multi-language React application demonstrating component design and client-side routing.",
      lessons:
        "Frontend fundamentals — component boundaries, routing, and state — turned out to be directly useful later when building the Streamlit and API interfaces for the ML projects above.",
    },
  },
];

export const featuredProject = projects.find((p) => p.tier === "featured")!;
export const primaryProjects = projects.filter((p) => p.tier === "primary");
export const secondaryProjects = projects.filter((p) => p.tier === "secondary");
export const otherProjects = projects.filter((p) => p.tier === "other");

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
