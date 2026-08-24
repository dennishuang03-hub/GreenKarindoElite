import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AboutStory from "../sections/AboutUs/AboutStory";
import VisionMissionSection from "../sections/AboutUs/VisionMissionSection";
import AboutLocationSection from "../sections/AboutUs/AboutLocationSection";
import PageHeader from "../components/ui/PageHeader";
import { useLang } from "../i18n/LanguageContext";
import { useSeo } from "../lib/useSeo";
import "./About.css";

const About = () => {
  const { t } = useLang();

  useSeo({
    title: t.seo.aboutTitle,
    description: t.seo.aboutDesc,
    path: "/about",
  });

  // Jump to the section named in the URL hash (e.g. /about#vision-mission).
  // The hash is read from the router, not from window: React Router
  // navigates with pushState, which never fires a hashchange event, so
  // a listener would miss every in-app link.
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // A short delay lets the sections mount before we measure them.
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <main className="about" id="main">
      <PageHeader
        eyebrow={t.aboutHero.eyebrow}
        titlePre={t.about.titlePre}
        titleEm={t.about.titleEm}
        lead={t.about.lead}
      />
      <AboutStory />
      <VisionMissionSection />
      <AboutLocationSection />
    </main>
  );
};

export default About;
