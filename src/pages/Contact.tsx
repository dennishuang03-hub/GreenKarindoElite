import ContactSection from "../sections/Contact/ContactSection";
import PageHeader from "../components/ui/PageHeader";
import { useLang } from "../i18n/LanguageContext";
import { useSeo } from "../lib/useSeo";

const Contact = () => {
  const { t } = useLang();

  useSeo({
    title: t.seo.contactTitle,
    description: t.seo.contactDesc,
    path: "/contact",
  });

  return (
    <main id="main">
      <PageHeader
        eyebrow={t.contact.eyebrow}
        titlePre={t.contact.pageTitlePre}
        titleEm={t.contact.pageTitleEm}
        lead={t.contact.pageLead}
      />
      <ContactSection />
    </main>
  );
};

export default Contact;
