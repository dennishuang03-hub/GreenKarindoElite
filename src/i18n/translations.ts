// ─────────────────────────────────────────────────────────────
// Central translation dictionary for the whole site.
// Add a key here once, use it everywhere via the useLang() hook.
// Brand names (Green Karindo Elite, place names, project names)
// are intentionally kept identical in both languages.
// ─────────────────────────────────────────────────────────────

export type Lang = "id" | "en";

export interface Translation {
  nav: {
    home: string;
    project: string;
    about: string;
    contact: string;
    profile: string;
    vision: string;
    visit: string;
  };
  logo: {
    tagline: string;
  };
  hero: {
    eyebrow: string;
    subtitle: string;
    taglineLine1: string;
    taglineLine2: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badges: string[];
  };
  aboutHero: {
    eyebrow: string;
    tagline: string;
    bodyBefore: string;
    bodyName: string;
    bodyAfter: string;
    sinceLabel: string;
  };
  vm: {
    eyebrow: string;
    titlePre: string;
    titleEm: string;
    visionLabel: string;
    missionLabel: string;
    vision: string;
    missions: string[];
  };
  location: {
    eyebrow: string;
    titlePre: string;
    titleEm: string;
    subtitle: string;
  };
  contact: {
    eyebrow: string;
    titleLine1: string;
    titleBrand: string;
    titleEm: string;
    desc: string;
    waLabel: string;
    waSub: string;
    officeLabel: string;
    officeSub: string;
    hoursLabel: string;
    hoursValue: string;
  };
  form: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    whatsappLabel: string;
    projectLabel: string;
    schemeLabel: string;
    schemeOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitted: string;
  };
  footer: {
    contactEyebrow: string;
    marketingTeam: string;
    marketingPlace: string;
    desc: string;
    detailEyebrow: string;
    waLabel: string;
    addressLabel: string;
    addressSub: string;
    followEyebrow: string;
    followDesc: string;
    developerLabel: string;
    developerRole: string;
    copyright: string;
    disclaimer: string;
  };
  wa: {
    label: string;
  };
  projects: {
    eyebrow: string;
    titlePre: string;
    titleEm: string;
    intro: string;
    status: {
      "new-launch": string;
      available: string;
      "coming-soon": string;
    };
    detailsTitle: string;
    viewBrochure: string;
    seeLocation: string;
    galleryPrev: string;
    galleryNext: string;
    morning: string;
    night: string;
    loading: string;
    empty: string;
  };
  featured: {
    eyebrow: string;
    titlePre: string;
    titleEm: string;
    learnMore: string;
  };
  why: {
    eyebrow: string;
    titlePre: string;
    titleEm: string;
    items: { title: string; desc: string }[];
  };
  visitCta: {
    eyebrow: string;
    title: string;
    desc: string;
    button: string;
  };
}

export const translations: Record<Lang, Translation> = {
  id: {
    nav: {
      home: "Beranda",
      project: "Project",
      about: "Tentang Kami",
      contact: "Kontak",
      profile: "Profil Perusahaan",
      vision: "Visi & Misi",
      visit: "Kunjungi Kami",
    },
    logo: {
      tagline: "Property Development",
    },
    hero: {
      eyebrow: "Kontraktor & Developer",
      subtitle: "Kepulauan Riau · Indonesia",
      taglineLine1: "Membangun hunian, kawasan, dan infrastruktur",
      taglineLine2: "dengan standar arsitektur tropis modern.",
      ctaPrimary: "Lihat Portofolio",
      ctaSecondary: "Konsultasi Gratis",
      badges: [
        "Kontraktor Profesional",
        "Kepulauan Riau",
        "Desain Tropis Modern",
        "KPR Ready",
      ],
    },
    aboutHero: {
      eyebrow: "Tentang Kami",
      tagline: "Kontraktor & Developer",
      bodyBefore: "Didirikan pada tanggal 22 Oktober 1981 oleh ",
      bodyName: "Christopher Lee",
      bodyAfter:
        " dengan nama PT Green Karindo Elite, PT Green Karindo Elite kini menjadi salah satu pengembang properti terkemuka dan paling terdiversifikasi di Tanjung Balai Karimun, Indonesia.",
      sinceLabel: "Berdiri sejak",
    },
    vm: {
      eyebrow: "Visi & Misi",
      titlePre: "Visi & ",
      titleEm: "Misi",
      visionLabel: "Visi",
      missionLabel: "Misi",
      vision:
        "Menjadi leading luxury property group di Indonesia, yang dikenal lewat exceptional developments yang merepresentasikan elegance, exclusivity, dan lasting value.",
      missions: [
        "Menghadirkan properti residensial dan komersial premium dengan uncompromising standards untuk kualitas dan craftsmanship-nya.",
        "Menciptakan development berkelas yang meningkatkan kualitas gaya hidup serta memberikan nilai yang abadi bagi Client dan Stakeholder.",
        "Membangun kepercayaan melalui profesionalisme, integritas, and long-term partnerships.",
        "Mendorong sustainable and responsible development demi masa depan generasi berikutnya.",
        "Terus mengejar inovasi dan keunggulan untuk mendefinisikan kembali gaya hidup mewah modern.",
      ],
    },
    location: {
      eyebrow: "Lokasi Kami",
      titlePre: "Kantor ",
      titleEm: "Pemasaran",
      subtitle:
        "Kunjungi kantor pemasaran kami untuk konsultasi langsung, atau hubungi tim kami untuk mengatur jadwal survei lokasi.",
    },
    contact: {
      eyebrow: "Hubungi Kami",
      titleLine1: "Marketing Team",
      titleBrand: "Green karindo ",
      titleEm: "Elite.",
      desc: "Tim pemasaran kami siap membantu Anda — dari konsultasi awal, survei lokasi, hingga proses akad.",
      waLabel: "WhatsApp",
      waSub: "Marketing Team Sea View",
      officeLabel: "Kantor Pemasaran",
      officeSub: "Kepulauan Riau, Indonesia",
      hoursLabel: "Jam Operasional",
      hoursValue: "Senin – Sabtu · 08.00 – 17.00 WIB",
    },
    form: {
      title: "Jadwalkan Survei Lokasi",
      subtitle: "Isi formulir berikut, tim kami akan segera menghubungi Anda.",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Nama Anda",
      whatsappLabel: "Nomor WhatsApp",
      projectLabel: "Proyek yang Diminati",
      schemeLabel: "Skema Pembayaran",
      schemeOptions: [
        "DP 0% — Zero Down Payment",
        "Cash Bertahap",
        "KPR / Bank",
      ],
      messageLabel: "Pesan",
      messagePlaceholder: "Tuliskan pertanyaan Anda...",
      submit: "Kirim Permintaan Survei",
      submitted: "Pesan Terkirim ✓",
    },
    footer: {
      contactEyebrow: "Hubungi Kami",
      marketingTeam: "Marketing Team",
      marketingPlace: "Sea View Karimun.",
      desc: "Tim pemasaran kami siap membantu Anda — dari konsultasi awal, survei lokasi, hingga proses akad.",
      detailEyebrow: "Detail Kontak",
      waLabel: "WhatsApp",
      addressLabel: "Alamat",
      addressSub: "Kepulauan Riau, Indonesia",
      followEyebrow: "Ikuti Kami",
      followDesc:
        "Ikuti perkembangan proyek dan informasi terbaru kami di media sosial.",
      developerLabel: "Developer",
      developerRole: "Kontraktor & Developer",
      copyright: "© 2026 Green Karindo Elite. Seluruh hak cipta dilindungi.",
      disclaimer:
        "Spesifikasi, harga, dan ilustrasi bersifat indikatif dan dapat berubah.",
    },
    wa: {
      label: "Chat WhatsApp",
    },
    projects: {
      eyebrow: "Proyek Kami",
      titlePre: "Portofolio ",
      titleEm: "Proyek",
      intro:
        "Jelajahi pengembangan residensial dan komersial kami di Tanjung Balai Karimun.",
      status: {
        "new-launch": "Peluncuran Baru",
        available: "Tersedia",
        "coming-soon": "Segera Hadir",
      },
      detailsTitle: "Detail Proyek",
      viewBrochure: "Lihat Brosur",
      seeLocation: "Lihat Lokasi",
      galleryPrev: "Gambar sebelumnya",
      galleryNext: "Gambar berikutnya",
      morning: "Pagi",
      night: "Malam",
      loading: "Memuat proyek…",
      empty: "Belum ada proyek untuk ditampilkan.",
    },
    featured: {
      eyebrow: "Portofolio",
      titlePre: "Proyek ",
      titleEm: "Unggulan",
      learnMore: "Pelajari Lebih Lanjut",
    },
    why: {
      eyebrow: "Mengapa Kami",
      titlePre: "Mengapa Memilih ",
      titleEm: "Kami",
      items: [
        { title: "Berpengalaman Sejak 1981", desc: "Puluhan tahun membangun hunian dan kawasan yang terpercaya." },
        { title: "Kualitas & Desain", desc: "Arsitektur tropis modern dengan material dan pengerjaan terbaik." },
        { title: "Legalitas Terjamin", desc: "Sertifikat SHM dengan proses kepemilikan yang jelas dan aman." },
        { title: "Pembayaran Fleksibel", desc: "Pilihan skema KPR dan cash bertahap sesuai kebutuhan Anda." },
      ],
    },
    visitCta: {
      eyebrow: "Kunjungi Lokasi",
      title: "Ingin menyaksikan langsung? Kami tunggu kunjungan Anda.",
      desc: "Datang ke lokasi dan saksikan sendiri kualitas pengerjaannya. Tim kami siap mendampingi survei Anda kapan saja, tanpa keharusan apa pun.",
      button: "Jadwalkan Kunjungan",
    },
  },

  en: {
    nav: {
      home: "Home",
      project: "Projects",
      about: "About Us",
      contact: "Contact",
      profile: "Company Profile",
      vision: "Vision & Mission",
      visit: "Visit Us",
    },
    logo: {
      tagline: "Property Development",
    },
    hero: {
      eyebrow: "Contractor & Developer",
      subtitle: "Riau Islands · Indonesia",
      taglineLine1: "Building homes, communities, and infrastructure",
      taglineLine2: "to modern tropical architecture standards.",
      ctaPrimary: "View Portfolio",
      ctaSecondary: "Free Consultation",
      badges: [
        "Professional Contractor",
        "Riau Islands",
        "Modern Tropical Design",
        "Mortgage Ready",
      ],
    },
    aboutHero: {
      eyebrow: "About Us",
      tagline: "Contractor & Developer",
      bodyBefore: "Founded on 22 October 1981 by ",
      bodyName: "Christopher Lee",
      bodyAfter:
        " under the name PT Green Karindo Elite, PT Green Karindo Elite is now one of the leading and most diversified property developers in Tanjung Balai Karimun, Indonesia.",
      sinceLabel: "Established since",
    },
    vm: {
      eyebrow: "Vision & Mission",
      titlePre: "Vision & ",
      titleEm: "Mission",
      visionLabel: "Vision",
      missionLabel: "Mission",
      vision:
        "To become a leading luxury property group in Indonesia, recognised for exceptional developments that represent elegance, exclusivity, and lasting value.",
      missions: [
        "Deliver premium residential and commercial properties with uncompromising standards of quality and craftsmanship.",
        "Create distinguished developments that elevate lifestyle quality and deliver lasting value for clients and stakeholders.",
        "Build trust through professionalism, integrity, and long-term partnerships.",
        "Champion sustainable and responsible development for the future of generations to come.",
        "Continuously pursue innovation and excellence to redefine modern luxury living.",
      ],
    },
    location: {
      eyebrow: "Our Location",
      titlePre: "Marketing ",
      titleEm: "Office",
      subtitle:
        "Visit our marketing office for an in-person consultation, or contact our team to arrange a site survey.",
    },
    contact: {
      eyebrow: "Contact Us",
      titleLine1: "Marketing Team",
      titleBrand: "Green Karindo ",
      titleEm: "Elite.",
      desc: "Our marketing team is ready to help you — from the initial consultation and site survey through to the signing process.",
      waLabel: "WhatsApp",
      waSub: "Marketing Team Sea View",
      officeLabel: "Marketing Office",
      officeSub: "Riau Islands, Indonesia",
      hoursLabel: "Opening Hours",
      hoursValue: "Monday – Saturday · 08.00 – 17.00 WIB",
    },
    form: {
      title: "Schedule a Site Survey",
      subtitle: "Fill in the form below and our team will contact you shortly.",
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      whatsappLabel: "WhatsApp Number",
      projectLabel: "Project of Interest",
      schemeLabel: "Payment Scheme",
      schemeOptions: [
        "0% DP — Zero Down Payment",
        "Instalment Cash",
        "Mortgage / Bank",
      ],
      messageLabel: "Message",
      messagePlaceholder: "Write your question...",
      submit: "Send Survey Request",
      submitted: "Message Sent ✓",
    },
    footer: {
      contactEyebrow: "Contact Us",
      marketingTeam: "Marketing Team",
      marketingPlace: "Sea View Karimun.",
      desc: "Our marketing team is ready to help you — from the initial consultation and site survey through to the signing process.",
      detailEyebrow: "Contact Details",
      waLabel: "WhatsApp",
      addressLabel: "Address",
      addressSub: "Riau Islands, Indonesia",
      followEyebrow: "Follow Us",
      followDesc:
        "Follow our project updates and latest news on social media.",
      developerLabel: "Developer",
      developerRole: "Contractor & Developer",
      copyright: "© 2026 Green Karindo Elite. All rights reserved.",
      disclaimer:
        "Specifications, prices, and illustrations are indicative and subject to change.",
    },
    wa: {
      label: "Chat on WhatsApp",
    },
    projects: {
      eyebrow: "Our Projects",
      titlePre: "Project ",
      titleEm: "Portfolio",
      intro:
        "Explore our residential and commercial developments in Tanjung Balai Karimun.",
      status: {
        "new-launch": "New Launch",
        available: "Available",
        "coming-soon": "Coming Soon",
      },
      detailsTitle: "Project Details",
      viewBrochure: "View Brochure",
      seeLocation: "See Location",
      galleryPrev: "Previous image",
      galleryNext: "Next image",
      morning: "Morning",
      night: "Night",
      loading: "Loading projects…",
      empty: "No projects to show yet.",
    },
    featured: {
      eyebrow: "Our Portfolio",
      titlePre: "Featured ",
      titleEm: "Projects",
      learnMore: "Learn More",
    },
    why: {
      eyebrow: "Why Us",
      titlePre: "Why Choose ",
      titleEm: "Us",
      items: [
        { title: "Established Since 1981", desc: "Decades of building trusted homes and communities." },
        { title: "Quality & Design", desc: "Modern tropical architecture with premium materials and craftsmanship." },
        { title: "Secure Legal Certainty", desc: "Freehold (SHM) certificates with a clear, safe ownership process." },
        { title: "Flexible Payment", desc: "Mortgage and instalment schemes to suit your needs." },
      ],
    },
    visitCta: {
      eyebrow: "Visit the Location",
      title: "Want to see it in person? We'd love to welcome you.",
      desc: "Come to the site and see the build quality for yourself. Our team is ready to guide your visit anytime, with no obligation.",
      button: "Schedule a Visit",
    },
  },
};
