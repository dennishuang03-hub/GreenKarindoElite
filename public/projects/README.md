# Projects content folder

Everything the Projects pages show is controlled by **`public/projects.json`**
plus the image / PDF files in this folder. **No coding or rebuild is required**
to add or change a project — edit the JSON, drop in the files, refresh the site.

## Folder layout

```
public/
  projects.json                      <- the project database (edit this)
  projects/
    placeholder-1.svg                <- reusable placeholder images
    placeholder-2.svg
    <project-id>/                    <- one folder per project
      1.jpg  2.jpg  3.jpg ...        <- gallery images (jpg/png)
      siteplan.jpg                   <- optional master plan drawing
      progress/                      <- optional construction photos
      brochure.pdf                   <- the "View Brochure" file
```

## To add a new project

1. Make a new folder here named after the project id, e.g. `projects/green-hills/`.
2. Put its photos inside (`1.jpg`, `2.jpg`, …) and `brochure.pdf`.
   - No photos yet? Point `images` at `/projects/placeholder-1.svg` for now.
3. Open `public/projects.json`, copy an existing `{ ... }` block in the
   `projects` list, paste it, and edit the fields. Give it a **unique `id`**.
4. Save and refresh. The project gets its own page at `/projects/<id>`, a card on
   the portfolio page, and a link in the navbar "Project" dropdown automatically.
5. Run `npm run images` once after adding photos. It writes a smaller WebP copy
   next to each JPG/PNG, which is what visitors on mobile data actually download.
   The originals stay where they are as a fallback.

## Field reference

### Required

- `id` — unique, no spaces (letters, numbers, dashes). Becomes the page URL
  (`/projects/<id>`) and the dropdown link.
- `status` — one of `new-launch`, `available`, `coming-soon` (controls the badge).
- `name`, `tagline`, `location`, `description`, and each `specs` label/value have
  an `id` (Indonesian) and `en` (English) value so the site stays bilingual.
- `images` — EITHER a simple list of file paths under `/projects/...`
  (the first one leads), OR a morning/night pair, which adds a
  **Morning / Night switch** over the gallery:

  ```json
  "images": {
    "morning": ["/projects/my-project/ExteriorPagi.jpg", "/projects/my-project/InteriorPagi.jpg"],
    "night":   ["/projects/my-project/ExteriorMalam.jpg", "/projects/my-project/InteriorMalam.jpg"]
  }
  ```

  Keep both lists in the **same order** (same scenes) so switching the time of
  day keeps the viewer on the same shot. A plain list shows no switch.

### Optional

- `heroImage` — wide image for the page header and for WhatsApp/Facebook link
  previews. Falls back to the first gallery image.
- `priceFrom` — free text, bilingual: `{ "id": "Mulai Rp 450 Jt", "en": "From Rp 450 M" }`.
- `highlights` — list of bilingual selling points shown as a ticked list.
- `brochureUrl` — path to the PDF; remove the line to hide the brochure button.
- `mapUrl` — Google Maps link; remove the line to hide the "See Location" button.

### Interactive site plan (optional)

Adds a **Site Plan** section where each plot can be clicked for its type, size,
price, and a WhatsApp enquiry pre-filled with that plot number.

```json
"sitePlan": {
  "image": "/projects/my-project/siteplan.jpg",
  "title": { "id": "Denah Kawasan", "en": "Master Plan" },
  "units": [
    {
      "id": "a-12",
      "label": "A-12",
      "status": "available",
      "type":  { "id": "Tipe 36/72", "en": "Type 36/72" },
      "size":  "72 m²",
      "price": "Rp 450 Jt",
      "x": 24.5, "y": 38.0, "w": 6.0, "h": 4.5
    }
  ]
}
```

- `status` — `available`, `booked`, or `sold`. The legend counts each group and
  can filter the drawing.
- `x`, `y`, `w`, `h` — **percentages of the plan image**, not pixels. `x`/`y` is
  the top-left corner. Percentages mean the plots stay aligned at every screen
  size. To find them: open the plan image, measure the plot's left edge as a
  share of the full image width (e.g. 245 px into a 1000 px-wide image = `24.5`),
  and do the same vertically.
- Leave `sitePlan` out entirely and the section does not appear.

### Construction progress (optional)

Adds a **Progress** section: an overall completion meter and a dated timeline.

```json
"progress": {
  "overall": 65,
  "updated": "2026-08",
  "milestones": [
    {
      "date": "2026-03",
      "status": "done",
      "percent": 100,
      "title": { "id": "Pondasi", "en": "Foundation" },
      "description": { "id": "Seluruh pondasi selesai.", "en": "All foundations completed." },
      "images": ["/projects/my-project/progress/foundation-1.jpg"]
    }
  ]
}
```

- `status` — `done`, `ongoing`, or `planned`. The `ongoing` marker pulses.
- `date` — `"2026"`, `"2026-03"` or `"2026-03-18"`; it is formatted in the
  visitor's language automatically.
- `overall` — a number from 0 to 100 for the big meter at the top.
- Update this section as the build advances; it is the page buyers return to.
