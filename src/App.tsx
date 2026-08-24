import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ActionBar from "./components/ActionBar";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// The home page ships in the main bundle — it is what most visitors
// land on. Everything else is fetched when it is first opened.
import Home from "./pages/Home";

const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Sends each new page to the top. Routes carrying a hash are left
 * alone — those pages scroll themselves to the anchored section.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

/** Cross-fades page content on navigation. */
const RoutedPages = () => {
  const { pathname } = useLocation();

  return (
    <div className="page-shell" key={pathname}>
      {/* The fallback holds the page height so the footer does not jump
          up while a lazily loaded page arrives. */}
      <ErrorBoundary resetKey={pathname}>
        <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            {/* The old navigation linked to /About with a capital A. */}
            <Route path="/About" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <RoutedPages />
      <Footer />
      <ActionBar />
    </BrowserRouter>
  );
}

export default App;
