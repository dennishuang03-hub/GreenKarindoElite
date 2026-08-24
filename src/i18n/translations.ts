// ─────────────────────────────────────────────────────────────
// Central translation dictionary for the whole site.
// Add a key here once, use it everywhere via the useLang() hook.
// Brand names (Green Karindo Elite, place names, project names) are
// intentionally identical in both languages.
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
    cta: string;
    openMenu: string;
    closeMenu: string;
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
    scroll: string;
    factSince: string;
    factProjects: string;
    factLegal: string;
    factFinance: string;
  };
  statement: {
    eyebrow: string;
    line1: string;
    lineEm: string;
    line2: string;
    cta: string;
    statYears: string;
    statProjects: string;
    statLegal: string;
  };
  about: {
    titlePre: string;
    titleEm: string;
    lead: string;
  };
  aboutHero: {
    eyebrow: string;
    tagline: string;
    bodyBefore: string;
    bodyName: string;
    bodyAfter: string;
    sinceLabel: string;
    facts: { value: string; label: string }[];
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
    directions: string;
  };
  contact: {
    eyebrow: string;
    titleLine1: string;
    titleBrand: string;
    titleEm: string;
    desc: string;
    waLabel: string;
    waSub: string;
    waPrefill: string;
    officeLabel: string;
    officeSub: string;
    hoursLabel: string;
    hoursValue: string;
    pageTitlePre: string;
    pageTitleEm: string;
    pageLead: string;
  };
  form: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    whatsappLabel: string;
    projectLabel: string;
    projectFallback: string;
    projectOther: string;
    schemeLabel: string;
    schemeOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    successWhatsapp: string;
    sendAnother: string;
    errorName: string;
    errorPhone: string;
    privacy: string;
  };
  footer: {
    contactEyebrow: string;
    marketingTeam: string;
    marketingPlace: string;
    desc: string;
    waLabel: string;
    followEyebrow: string;
    followDesc: string;
    developerRole: string;
    copyright: string;
    disclaimer: string;
  };
  wa: {
    label: string;
    barLabel: string;
    chat: string;
    directions: string;
    visit: string;
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
    galleryTitle: string;
    openImage: string;
    close: string;
    morning: string;
    night: string;
    loading: string;
    empty: string;
    emptyFilter: string;
    filterAll: string;
    viewProject: string;
    backToAll: string;
    tabOverview: string;
    tabGallery: string;
    enquire: string;
    enquiryPrefix: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaPrimary: string;
    ctaWhatsapp: string;
    nextProject: string;
  };
  sitePlan: {
    eyebrow: string;
    title: string;
    tab: string;
    legendLabel: string;
    all: string;
    unitStatus: {
      available: string;
      booked: string;
      sold: string;
    };
    hint: string;
    type: string;
    size: string;
    price: string;
    enquire: string;
    enquiryPrefix: string;
    takenNote: string;
  };
  progress: {
    eyebrow: string;
    title: string;
    tab: string;
    overall: string;
    updated: string;
    status: {
      done: string;
      ongoing: string;
      planned: string;
    };
  };
  featured: {
    eyebrow: string;
    titlePre: string;
    titleEm: string;
    note: string;
    viewAll: string;
  };
  why: {
    eyebrow: string;
    titlePre: string;
    titleEm: string;
    lead: string;
    items: { title: string; desc: string }[];
  };
  visitCta: {
    eyebrow: string;
    title: string;
    desc: string;
    button: string;
  };
  seo: {
    homeTitle: string;
    homeDesc: string;
    projectsTitle: string;
    projectsDesc: string;
    aboutTitle: string;
    aboutDesc: string;
    contactTitle: string;
    contactDesc: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    desc: string;
    home: string;
    projects: string;
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
      cta: "Konsultasi",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
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
      scroll: "Gulir",
      factSince: "Berdiri sejak",
      factProjects: "Proyek terbangun",
      factLegal: "Legalitas",
      factFinance: "Skema KPR",
    },
    statement: {
      eyebrow: "Filosofi Kami",
      line1: "Kami tidak sekadar membangun rumah — kami membangun ",
      lineEm: "kawasan yang bertahan",
      line2: " melewati generasi.",
      cta: "Tentang Perusahaan",
      statYears: "Tahun pengalaman",
      statProjects: "Proyek diselesaikan",
      statLegal: "Sertifikat SHM",
    },
    about: {
      titlePre: "Membangun Karimun ",
      titleEm: "sejak 1981.",
      lead:
        "Empat dekade membangun hunian, kawasan komersial, dan infrastruktur di Tanjung Balai Karimun — dengan standar mutu yang tidak berubah.",
    },
    aboutHero: {
      eyebrow: "Tentang Kami",
      tagline: "Kontraktor & Developer",
      bodyBefore: "Didirikan pada tanggal 22 Oktober 1981 oleh ",
      bodyName: "Christopher Lee",
      bodyAfter:
        " dengan nama PT Green Karindo Elite, PT Green Karindo Elite kini menjadi salah satu pengembang properti terkemuka dan paling terdiversifikasi di Tanjung Balai Karimun, Indonesia.",
      sinceLabel: "Berdiri sejak",
      facts: [
        { value: "1981", label: "Tahun berdiri" },
        { value: "50+", label: "Proyek" },
        { value: "SHM", label: "Legalitas" },
      ],
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
      directions: "Buka di Google Maps",
    },
    contact: {
      eyebrow: "Hubungi Kami",
      titleLine1: "Marketing Team",
      titleBrand: "Green Karindo ",
      titleEm: "Elite.",
      desc: "Tim pemasaran kami siap membantu Anda — dari konsultasi awal, survei lokasi, hingga proses akad.",
      waLabel: "WhatsApp",
      waSub: "Marketing Team Sea View",
      waPrefill:
        "Halo Green Karindo Elite, saya ingin bertanya mengenai proyek Anda.",
      officeLabel: "Kantor Pemasaran",
      officeSub: "Kepulauan Riau, Indonesia",
      hoursLabel: "Jam Operasional",
      hoursValue: "Senin – Sabtu · 08.00 – 17.00 WIB",
      pageTitlePre: "Mari kita ",
      pageTitleEm: "bicara.",
      pageLead:
        "Jadwalkan survei lokasi, tanyakan skema pembayaran, atau minta brosur lengkap — tim kami membalas pada jam kerja.",
    },
    form: {
      title: "Jadwalkan Survei Lokasi",
      subtitle: "Isi formulir berikut, tim kami akan segera menghubungi Anda.",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Nama Anda",
      whatsappLabel: "Nomor WhatsApp",
      projectLabel: "Proyek yang Diminati",
      projectFallback: "Belum ditentukan",
      projectOther: "Proyek lainnya",
      schemeLabel: "Skema Pembayaran",
      schemeOptions: ["DP 0% — Zero Down Payment", "Cash Bertahap", "KPR / Bank"],
      messageLabel: "Pesan",
      messagePlaceholder: "Tuliskan pertanyaan Anda...",
      submit: "Kirim Permintaan Survei",
      sending: "Mengirim…",
      successTitle: "Permintaan Anda terkirim",
      successDesc:
        "Tim pemasaran kami akan menghubungi Anda pada jam kerja. Ingin lebih cepat? Lanjutkan lewat WhatsApp.",
      successWhatsapp: "Lanjut ke WhatsApp",
      sendAnother: "Kirim permintaan lain",
      errorName: "Mohon isi nama Anda.",
      errorPhone: "Masukkan nomor WhatsApp yang valid (contoh 0813xxxxxxx).",
      privacy: "Data Anda hanya digunakan untuk menghubungi Anda kembali.",
    },
    footer: {
      contactEyebrow: "Hubungi Kami",
      marketingTeam: "Marketing Team",
      marketingPlace: "Sea View Karimun.",
      desc: "Tim pemasaran kami siap membantu Anda — dari konsultasi awal, survei lokasi, hingga proses akad.",
      waLabel: "WhatsApp",
      followEyebrow: "Ikuti Kami",
      followDesc:
        "Ikuti perkembangan proyek dan informasi terbaru kami di media sosial.",
      developerRole: "Kontraktor & Developer",
      copyright: "© 2026 Green Karindo Elite. Seluruh hak cipta dilindungi.",
      disclaimer:
        "Spesifikasi, harga, dan ilustrasi bersifat indikatif dan dapat berubah.",
    },
    wa: {
      label: "Chat WhatsApp",
      barLabel: "Aksi cepat",
      chat: "WhatsApp",
      directions: "Lokasi",
      visit: "Survei",
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
      galleryTitle: "Galeri Proyek",
      openImage: "Perbesar gambar",
      close: "Tutup",
      morning: "Pagi",
      night: "Malam",
      loading: "Memuat proyek…",
      empty: "Belum ada proyek untuk ditampilkan.",
      emptyFilter: "Tidak ada proyek dengan status tersebut.",
      filterAll: "Semua",
      viewProject: "Lihat Proyek",
      backToAll: "Semua Proyek",
      tabOverview: "Ringkasan",
      tabGallery: "Galeri",
      enquire: "Tanya Ketersediaan",
      enquiryPrefix: "Halo, saya ingin bertanya mengenai proyek",
      ctaEyebrow: "Langkah Berikutnya",
      ctaTitle: "Lihat langsung sebelum memutuskan.",
      ctaDesc:
        "Tim kami siap mendampingi survei lokasi, menjelaskan skema pembayaran, dan menunjukkan progres pembangunan terkini.",
      ctaPrimary: "Jadwalkan Survei",
      ctaWhatsapp: "Chat WhatsApp",
      nextProject: "Proyek Berikutnya",
    },
    sitePlan: {
      eyebrow: "Denah Kawasan",
      title: "Site Plan Interaktif",
      tab: "Site Plan",
      legendLabel: "Saring berdasarkan status",
      all: "Semua",
      unitStatus: {
        available: "Tersedia",
        booked: "Dipesan",
        sold: "Terjual",
      },
      hint: "Ketuk kavling untuk melihat tipe, luas, dan harga",
      type: "Tipe",
      size: "Luas",
      price: "Harga",
      enquire: "Tanya Kavling Ini",
      enquiryPrefix: "Halo, saya tertarik dengan kavling",
      takenNote: "Kavling ini sudah tidak tersedia. Hubungi kami untuk pilihan lain.",
    },
    progress: {
      eyebrow: "Transparansi",
      title: "Progres Pembangunan",
      tab: "Progres",
      overall: "Progres keseluruhan",
      updated: "Diperbarui",
      status: {
        done: "Selesai",
        ongoing: "Berjalan",
        planned: "Rencana",
      },
    },
    featured: {
      eyebrow: "Portofolio",
      titlePre: "Proyek ",
      titleEm: "Unggulan",
      note:
        "Setiap kawasan dirancang untuk iklim tropis — pencahayaan alami, sirkulasi udara, dan ruang terbuka hijau.",
      viewAll: "Lihat Semua Proyek",
    },
    why: {
      eyebrow: "Mengapa Kami",
      titlePre: "Mengapa Memilih ",
      titleEm: "Kami",
      lead:
        "Empat alasan yang membuat pembeli mempercayakan hunian mereka kepada kami sejak 1981.",
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
    seo: {
      homeTitle: "Kontraktor & Developer Properti Karimun",
      homeDesc:
        "PT Green Karindo Elite — kontraktor dan pengembang properti di Tanjung Balai Karimun sejak 1981. Hunian dan kawasan komersial dengan arsitektur tropis modern.",
      projectsTitle: "Portofolio Proyek",
      projectsDesc:
        "Kawasan residensial dan komersial Green Karindo Elite di Tanjung Balai Karimun — status ketersediaan, spesifikasi, dan brosur.",
      aboutTitle: "Tentang Kami",
      aboutDesc:
        "Sejarah, visi, dan misi PT Green Karindo Elite — pengembang properti di Tanjung Balai Karimun sejak 1981.",
      contactTitle: "Hubungi Kami",
      contactDesc:
        "Jadwalkan survei lokasi atau konsultasi dengan tim pemasaran Green Karindo Elite di Tanjung Balai Karimun.",
    },
    notFound: {
      eyebrow: "Halaman tidak ditemukan",
      title: "Halaman ini tidak tersedia.",
      desc: "Tautan mungkin sudah berubah atau proyek yang Anda cari telah dipindahkan.",
      home: "Kembali ke Beranda",
      projects: "Lihat Proyek",
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
      cta: "Enquire",
      openMenu: "Open menu",
      closeMenu: "Close menu",
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
      scroll: "Scroll",
      factSince: "Established",
      factProjects: "Projects built",
      factLegal: "Freehold title",
      factFinance: "Mortgage ready",
    },
    statement: {
      eyebrow: "Our Philosophy",
      line1: "We do not simply build houses — we build ",
      lineEm: "communities that last",
      line2: " for generations.",
      cta: "About the company",
      statYears: "Years of experience",
      statProjects: "Projects completed",
      statLegal: "Freehold certificates",
    },
    about: {
      titlePre: "Building Karimun ",
      titleEm: "since 1981.",
      lead:
        "Four decades of homes, commercial districts, and infrastructure across Tanjung Balai Karimun — held to a standard that has not changed.",
    },
    aboutHero: {
      eyebrow: "About Us",
      tagline: "Contractor & Developer",
      bodyBefore: "Founded on 22 October 1981 by ",
      bodyName: "Christopher Lee",
      bodyAfter:
        " under the name PT Green Karindo Elite, PT Green Karindo Elite is now one of the leading and most diversified property developers in Tanjung Balai Karimun, Indonesia.",
      sinceLabel: "Established since",
      facts: [
        { value: "1981", label: "Founded" },
        { value: "50+", label: "Projects" },
        { value: "SHM", label: "Freehold title" },
      ],
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
      directions: "Open in Google Maps",
    },
    contact: {
      eyebrow: "Contact Us",
      titleLine1: "Marketing Team",
      titleBrand: "Green Karindo ",
      titleEm: "Elite.",
      desc: "Our marketing team is ready to help you — from the initial consultation and site survey through to the signing process.",
      waLabel: "WhatsApp",
      waSub: "Marketing Team Sea View",
      waPrefill: "Hello Green Karindo Elite, I would like to ask about your projects.",
      officeLabel: "Marketing Office",
      officeSub: "Riau Islands, Indonesia",
      hoursLabel: "Opening Hours",
      hoursValue: "Monday – Saturday · 08.00 – 17.00 WIB",
      pageTitlePre: "Let's ",
      pageTitleEm: "talk.",
      pageLead:
        "Book a site survey, ask about payment schemes, or request the full brochure — our team replies during working hours.",
    },
    form: {
      title: "Schedule a Site Survey",
      subtitle: "Fill in the form below and our team will contact you shortly.",
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      whatsappLabel: "WhatsApp Number",
      projectLabel: "Project of Interest",
      projectFallback: "Not decided yet",
      projectOther: "Another project",
      schemeLabel: "Payment Scheme",
      schemeOptions: ["0% DP — Zero Down Payment", "Instalment Cash", "Mortgage / Bank"],
      messageLabel: "Message",
      messagePlaceholder: "Write your question...",
      submit: "Send Survey Request",
      sending: "Sending…",
      successTitle: "Your request has been sent",
      successDesc:
        "Our marketing team will contact you during working hours. Want a faster reply? Continue on WhatsApp.",
      successWhatsapp: "Continue on WhatsApp",
      sendAnother: "Send another request",
      errorName: "Please enter your name.",
      errorPhone: "Enter a valid WhatsApp number (e.g. 0813xxxxxxx).",
      privacy: "Your details are used only to contact you back.",
    },
    footer: {
      contactEyebrow: "Contact Us",
      marketingTeam: "Marketing Team",
      marketingPlace: "Sea View Karimun.",
      desc: "Our marketing team is ready to help you — from the initial consultation and site survey through to the signing process.",
      waLabel: "WhatsApp",
      followEyebrow: "Follow Us",
      followDesc: "Follow our project updates and latest news on social media.",
      developerRole: "Contractor & Developer",
      copyright: "© 2026 Green Karindo Elite. All rights reserved.",
      disclaimer:
        "Specifications, prices, and illustrations are indicative and subject to change.",
    },
    wa: {
      label: "Chat on WhatsApp",
      barLabel: "Quick actions",
      chat: "WhatsApp",
      directions: "Location",
      visit: "Survey",
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
      galleryTitle: "Project Gallery",
      openImage: "Enlarge image",
      close: "Close",
      morning: "Morning",
      night: "Night",
      loading: "Loading projects…",
      empty: "No projects to show yet.",
      emptyFilter: "No projects with that status.",
      filterAll: "All",
      viewProject: "View Project",
      backToAll: "All Projects",
      tabOverview: "Overview",
      tabGallery: "Gallery",
      enquire: "Check Availability",
      enquiryPrefix: "Hello, I would like to ask about the project",
      ctaEyebrow: "Next Step",
      ctaTitle: "See it in person before you decide.",
      ctaDesc:
        "Our team will guide your site survey, explain the payment schemes, and show you the latest construction progress.",
      ctaPrimary: "Book a Survey",
      ctaWhatsapp: "Chat on WhatsApp",
      nextProject: "Next Project",
    },
    sitePlan: {
      eyebrow: "Master Plan",
      title: "Interactive Site Plan",
      tab: "Site Plan",
      legendLabel: "Filter by status",
      all: "All",
      unitStatus: {
        available: "Available",
        booked: "Reserved",
        sold: "Sold",
      },
      hint: "Tap a plot to see its type, size, and price",
      type: "Type",
      size: "Size",
      price: "Price",
      enquire: "Enquire About This Plot",
      enquiryPrefix: "Hello, I am interested in plot",
      takenNote: "This plot is no longer available. Contact us for other options.",
    },
    progress: {
      eyebrow: "Transparency",
      title: "Construction Progress",
      tab: "Progress",
      overall: "Overall progress",
      updated: "Updated",
      status: {
        done: "Completed",
        ongoing: "In progress",
        planned: "Planned",
      },
    },
    featured: {
      eyebrow: "Our Portfolio",
      titlePre: "Featured ",
      titleEm: "Projects",
      note:
        "Every development is designed for the tropics — natural light, cross ventilation, and green open space.",
      viewAll: "View All Projects",
    },
    why: {
      eyebrow: "Why Us",
      titlePre: "Why Choose ",
      titleEm: "Us",
      lead:
        "Four reasons buyers have trusted us with their homes since 1981.",
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
    seo: {
      homeTitle: "Property Contractor & Developer in Karimun",
      homeDesc:
        "PT Green Karindo Elite — property contractor and developer in Tanjung Balai Karimun since 1981. Homes and commercial districts in modern tropical architecture.",
      projectsTitle: "Project Portfolio",
      projectsDesc:
        "Green Karindo Elite residential and commercial developments in Tanjung Balai Karimun — availability, specifications, and brochures.",
      aboutTitle: "About Us",
      aboutDesc:
        "The history, vision, and mission of PT Green Karindo Elite — a property developer in Tanjung Balai Karimun since 1981.",
      contactTitle: "Contact Us",
      contactDesc:
        "Book a site survey or consult the Green Karindo Elite marketing team in Tanjung Balai Karimun.",
    },
    notFound: {
      eyebrow: "Page not found",
      title: "This page is not available.",
      desc: "The link may have changed, or the project you are looking for has moved.",
      home: "Back to Home",
      projects: "View Projects",
    },
  },
};
