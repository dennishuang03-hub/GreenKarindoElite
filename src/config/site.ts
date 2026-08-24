/**
 * Single place for company facts that used to be re-typed inside the
 * footer, the contact section and the floating WhatsApp button.
 * Change a phone number here and it changes everywhere.
 */

export const site = {
  name: "Green Karindo Elite",
  legalName: "PT Green Karindo Elite",
  tagline: "Your Home Above the Horizon.",
  foundedYear: 1981,

  /** International format, digits only — used to build wa.me links. */
  whatsappNumber: "6281389082292",
  /** Human-readable version shown in the UI. */
  whatsappDisplay: "+62 813-8908-2292",

  address: "Ruko Kamboja no.25, Tanjung Balai Karimun",
  addressRegion: "Kepulauan Riau, Indonesia",
  mapUrl: "https://maps.google.com/?q=PT+Green+Karindo+Elite",

  instagram: "https://instagram.com/greenkarindoelite",
  facebook: "https://facebook.com/greenkarindoelite",
} as const;

/** wa.me deep link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const url = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
