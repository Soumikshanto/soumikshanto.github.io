# Soumik Shanto Mondol — Academic Portfolio

**Website:** https://soumikshanto.github.io/

A responsive academic portfolio for GitHub Pages with Forest Green + Sage colors, a working light/dark toggle, a profile photo and public academic CV. No framework, npm, Python or build step is needed for publishing or routine updates.

## Publish on GitHub Pages

1. Download the ZIP file provided with this website and **extract it** on your computer.
2. Open your GitHub repository: https://github.com/Soumikshanto/soumikshanto.github.io
3. Use **Add file → Upload files** to upload the **contents** of the extracted folder (not the ZIP itself). GitHub should show `index.html`, `css/`, `js/`, `assets/`, etc. at the repository root. Alternatively, copy the files into a local Git checkout and commit/push them.
4. Commit the changes to the repository's `main` branch.
5. In the repository's **Settings → Pages**, select **Deploy from a branch → main → /(root)** if this is not already configured.
6. Visit https://soumikshanto.github.io/ after GitHub Pages has deployed the changes. A hard refresh can help if your browser has cached the old version.

The ZIP includes all necessary files. No third-party hosting, fonts or JavaScript libraries are required. The old root-level `style.css` and `script.js` files, if still present from your previous website, can be deleted; this version uses `css/style.css` and `js/main.js`.

## Simple future updates

**For a new paper, conference presentation, news item or award:**

1. Open [`js/content.js`](js/content.js).
2. Find the appropriate array (`publications`, `updates`, `awards`).
3. Copy an existing `{ ... }` entry, change its text and URLs and insert it at the desired position. **Remember the comma between array entries.**
4. Commit the changed file on GitHub. The website updates automatically when GitHub Pages deploys it.

For a publication, use:

```js
{
  year: "2027",
  type: "Journal article", // Journal article / Conference paper / Conference presentation · Poster
  category: "paper", // "paper" or "presentation"
  featured: false,
  title: "Your publicly available publication title",
  authors: "Names as listed on the published paper",
  venue: "Journal or conference details",
  summary: "A concise public description.",
  links: [{ label: "Read paper", url: "https://doi.org/your-doi" }]
},
```

**For a new CV:** Replace `assets/Soumik_Shanto_Mondol_CV.pdf` with your latest **public-facing** PDF, keeping the same filename. All CV links will continue to work.

**For a new portrait:** Replace `assets/profile.jpg` (JPEG) with the new photograph, keeping the same filename; update the `width` and `height` on its `<img>` element in `index.html` if needed. The CSS automatically crops it in the page.

**To change your bio, experience, education, office or email:** Edit the relevant text directly in `index.html`.

**To adjust the palette:** Change the CSS variables at the top of `css/style.css` for both `:root` (light) and `[data-theme="dark"]` (dark).

## Privacy choices

This site intentionally does **not** publish your phone number or details of ongoing/unpublished research. Please check the content of future uploads (especially CVs and posters) before adding them to a public repository. Research interests are described at a general level; the research-output section is limited to published or publicly presented work.

## Files

```text
index.html                     Home, about, education, experience, contact, SEO metadata
css/style.css                  Layout, responsive styles, light/dark colors
js/content.js                  Publications, news and awards: easy-to-edit data
js/main.js                     Theme toggle, mobile menu and content rendering
assets/profile.jpg             User-provided profile photograph
assets/Soumik_Shanto_Mondol_CV.pdf  Public academic CV
assets/favicon.svg             Favicon
robots.txt, sitemap.xml        Basic search indexing files
.nojekyll                      Tells GitHub Pages to serve the static site as is
```

## Local preview

For a quick preview, double-click `index.html`. The site works as local files without installing anything. (Or start a static web server with `python -m http.server` from the project folder.)

© Soumik Shanto Mondol.
