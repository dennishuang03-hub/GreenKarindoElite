import Hero from "../components/Hero";
import Statement from "../sections/Home/Statement";
import FeaturedProjects from "../sections/Home/FeaturedProjects";
import WhyChooseUs from "../sections/Home/WhyChooseUs";
import { useLang } from "../i18n/LanguageContext";
import { useSeo } from "../lib/useSeo";
import { site } from "../config/site";

function Home() {
  const { t, lang } = useLang();

  useSeo({
    title: `${site.name} — ${t.seo.homeTitle}`,
    description: t.seo.homeDesc,
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: site.legalName,
      description: t.seo.homeDesc,
      foundingDate: String(site.foundedYear),
      telephone: `+${site.whatsappNumber}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address,
        addressRegion: "Kepulauan Riau",
        addressCountry: "ID",
      },
      inLanguage: lang,
      sameAs: [site.instagram, site.facebook],
    },
  });

  return (
    <>
      <Hero />
      <Statement />
      <FeaturedProjects />
      <WhyChooseUs />
    </>
  );
}

export default Home;
