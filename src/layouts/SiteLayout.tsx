import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BackToTop } from "../components/BackToTop";
import { ScrollProgress } from "../components/ScrollProgress";
import { CustomCursor } from "../components/CustomCursor";

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
