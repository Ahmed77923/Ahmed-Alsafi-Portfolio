import { Routes, Route } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ScrollToHash } from "./components/ScrollToHash";

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
