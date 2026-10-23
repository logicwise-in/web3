# Logic Wise website

A static, responsive website using your approved black-and-gold branding.

## Files

- `index.html` — page content, navigation, social links and Google Form links.
- `assets/css/style.css` — all styles and responsive layouts.
- `assets/js/main.js` — mobile menu, section highlighting and optional YouTube cards.
- `assets/img/logo.webp` — optimized brand logo, also used as the favicon.
- `assets/img/banner.webp` — optimized brand banner.

## Make the website live

1. Back up your current website files.
2. Extract this ZIP on your computer.
3. Upload `index.html` and the entire `assets` folder together into your domain's document root (often called `public_html`, `www` or `htdocs`; use the folder assigned to your domain by your host).
4. Keep the folder structure and filenames exactly as supplied. Upload the contents of the package, not the ZIP file itself, unless your host can extract it.
5. Enable HTTPS through your hosting provider and visit your domain.
6. If you see an old version, reload with the browser cache cleared.

No installation, npm command, build process, PHP, database or API key is required. If your static host asks for settings, leave the build command empty and select the directory containing `index.html` as the publish directory. README.md is documentation and need not be uploaded.

## Preview locally

Open `index.html` in a modern browser. For an HTTP preview, if Python is installed, open a terminal in this folder and run:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. Stop the server with Ctrl+C.

## Add specific YouTube videos

Open `assets/js/main.js`. Replace `const featuredVideos = [];` with your real video URLs and titles, newest first:

```js
const featuredVideos = [
  { url: "PASTE_YOUR_YOUTUBE_VIDEO_URL_HERE", title: "Your video title" },
  { url: "PASTE_ANOTHER_YOUTUBE_VIDEO_URL_HERE", title: "Another video title" }
];
```

Up to six valid videos appear as thumbnail cards linking to YouTube. Standard watch URLs, youtu.be links and Shorts links are supported. Use quotes around each value. These example placeholders will not produce cards until replaced with valid URLs.

Individual video links have not yet been supplied or verified. Until they are added, the page displays a link to your channel's recent uploads. The site does not automatically fetch videos or claim that manual cards are the latest uploads. Thumbnail images require internet access to YouTube.

## Edit content and links

- Social accounts appear twice in `index.html`, near the top and in the footer. Update both places when changing an account.
- Search for `docs.google.com/forms` in `index.html` to change the requirement form. All buttons point to your existing Google Form; submissions are handled there.
- Search for `logicwise.in@gmail.com` to change the email address.
- Replace images in `assets/img` using the same filenames. Preserve their aspect ratios to avoid layout shifts.
- Edit the `:root` colour variables and responsive rules in `assets/css/style.css` to adjust branding.
- Before sharing widely, you may add `og:url` and an absolute `og:image` meta tag using your actual public domain and the hosted banner URL. No domain has been guessed in this package.

## Responsive and accessibility details

The layout uses breakpoints for narrow phones, larger phones, tablets and desktops. Navigation collapses below 1200px to leave enough room for the larger text. Cards stack on small screens. Social buttons have generous tap targets. The banner retains its full aspect ratio. Yellow buttons retain solid black labels across hover, focus and visited states.

Keyboard focus indicators, a skip link, Escape-to-close navigation, reduced-motion preferences and a navigation fallback without JavaScript are included.

## Design and dependencies

This is a custom Logic Wise design built from your supplied website, logo and banner. It is not an official BootstrapMade template and does not include copied BootstrapMade template files. Some familiar Bootstrap-style class names remain from your original HTML, but all required styling and interactions are included locally. There are no required third-party CSS libraries, icon fonts, JavaScript packages or font downloads.

The supplied brand assets and business content remain yours. SVG interface icons are inline in the HTML. External services are used only when visitors follow your social, email or form links, or when configured video thumbnails load.

## Before launch

- Open the site at phone, tablet and desktop widths.
- Test the mobile menu, all five social links and the requirement form.
- Confirm the Google Form accepts responses and has the access settings you want.
- Confirm the email address, ownership line and business copy.
- Verify HTTPS and image loading on your actual hosting domain.

## Validation in this delivery

Local asset paths, internal anchors, social links, image dimensions, JavaScript syntax and ZIP integrity were checked. A browser executable was not available in the preparation environment, so live browser rendering and external destination behaviour still need a final check on your host.
