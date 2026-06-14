# Projects content folder

Everything the Projects page shows is controlled by **`public/projects.json`**
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
      1.svg  2.svg  3.svg ...        <- gallery images (jpg/png/svg)
      brochure.pdf                   <- the "View Brochure" file
```

## To add a new project

1. Make a new folder here named after the project id, e.g. `projects/green-hills/`.
2. Put its photos inside (`1.jpg`, `2.jpg`, …) and `brochure.pdf`.
   - No photos yet? Point `images` at `/projects/placeholder-1.svg` for now.
3. Open `public/projects.json` and copy an existing `{ ... }` block in the
   `projects` list, paste it, and edit the fields. Give it a **unique `id`**.
4. Save and refresh. A new full-width section appears on the Projects page and a
   new link appears in the navbar "Project" dropdown automatically.

## Field reference

- `id` — unique, no spaces (letters, numbers, dashes). Becomes the section
  anchor (`/projects#id`) and the dropdown link.
- `status` — one of `new-launch`, `available`, `coming-soon` (controls the badge).
- `name`, `tagline`, `location`, `description`, and each `specs` label/value have
  an `id` (Indonesian) and `en` (English) value so the site stays bilingual.
- `images` — EITHER a simple list of file paths under `/projects/...`
  (the first shows first), OR a morning/night pair to add a
  **Morning / Night switch** under the gallery:

  ```json
  "images": {
    "morning": ["/projects/my-project/ExteriorPagi.png", "/projects/my-project/InteriorPagi.png"],
    "night":   ["/projects/my-project/ExteriorMalam.png", "/projects/my-project/InteriorMalam.png"]
  }
  ```

  Keep both lists in the **same order** (same scenes) so switching the
  time of day keeps the viewer on the same shot. If you only provide a
  plain list, no switch appears.
- `brochureUrl` — path to the PDF; remove the line to hide the brochure button.
- `mapUrl` — Google Maps link; remove the line to hide the "See Location" button.
