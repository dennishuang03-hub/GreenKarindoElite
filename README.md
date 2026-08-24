# Green Karindo Elite — company website

Marketing site for PT Green Karindo Elite: portfolio of residential and
commercial developments in Tanjung Balai Karimun, in Indonesian and English.

React 19 + TypeScript + Vite, client-side routed, deployed on Vercel.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, bundle, write dist/sitemap.xml
npm run preview    # serve the production build locally
npm run lint
npm run images     # regenerate WebP copies of images (see below)
```

Copy `.env.example` to `.env.local` before running if you want the
contact form to store leads.

## Content: everything lives in projects.json

The office edits **`public/projects.json`** and drops files into
`public/projects/<project-id>/`. No code changes, no rebuild.

That one file drives the portfolio page, every project page, the navbar
dropdown, the footer links, and the contact form's project selector.

Optional per project: an interactive **site plan** (clickable plots with
type, size, price, availability) and a **construction progress**
timeline (dated milestones with photos and a completion meter).

- Field-by-field reference: [`public/projects/README.md`](public/projects/README.md)
- A filled-in example of every field: `public/projects.example.json`

After adding photos, run `npm run images`. It writes a smaller `.webp`
beside each JPG/PNG; the site serves the WebP and falls back to the
original. The originals stay untouched.

## Lead capture

The contact form writes to a Supabase `leads` table and then offers the
visitor a pre-filled WhatsApp message.

1. Create a Supabase project.
2. Run [`supabase/migrations/0001_leads.sql`](supabase/migrations/0001_leads.sql)
   in the SQL editor. It creates the table **and** the row-level security
   policies — anonymous visitors may only insert, and reading requires a
   signed-in staff account.
3. Put the project URL and the *publishable* (anon) key in `.env.local`.

If those variables are missing the form still works end to end: nothing
is stored, and the visitor is handed the WhatsApp message instead. The
Supabase client is loaded on demand, so it costs nothing on page load.

## Structure

```
src/
  styles/tokens.css      design tokens — colours, type, spacing, motion
  styles/base.css        reset, layout primitives, buttons, scroll reveal
  config/site.ts         company facts (phone, address, socials)
  data/projects.ts       projects.json types + shared loader
  i18n/                  ID/EN dictionary and language context
  lib/                   reveal, SEO head, media paths, leads, formatting
  components/ui/         Reveal, Picture, Lightbox, PageHeader, SectionHeading
  components/            Navbar, Footer, Hero, ActionBar, ContactForm
  sections/              page sections (Home, Projects, AboutUs, Contact)
  pages/                 route components
```

Nothing outside `styles/tokens.css` hard-codes a colour, font, spacing
step, or easing curve — change a token and it propagates everywhere.

## Deployment notes

- `vercel.json` rewrites every path to `index.html` so deep links such as
  `/projects/sea-view-karimun` work on refresh.
- Set `SITE_URL=https://your-domain.com` in the hosting environment to
  get `sitemap.xml` and `robots.txt` written at build time.
- Per-page titles, descriptions, canonical URLs, Open Graph tags and
  JSON-LD are set at runtime by `src/lib/useSeo.ts`.
- The share image is `public/og-default.jpg`; project pages use their own
  cover image instead.
