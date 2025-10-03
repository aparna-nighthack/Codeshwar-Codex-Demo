# Codeshwar-Codex-Demo

Simple static landing page demonstrating a product showcase with carousels, a countdown offer, forms, and a modal video.

How to run
- Open `index.html` directly in a modern browser.
- No build or server required.

Notable features
- Smooth in-page navigation and accessible carousels (keyboard left/right).
- Limited-time offer countdown persisted with `localStorage`.
- Contact and newsletter forms with basic client-side validation.
- Modal demo video using the native `<dialog>` element.

Recent improvements
- Added `loading="lazy"` and `decoding="async"` to non-critical images and `loading="lazy"` + `referrerpolicy` to the YouTube iframe for better performance and privacy.
- Set `type="button"` on non-submit buttons (carousel nav, modal close, demo trigger) to avoid accidental form submissions.
- Enhanced modal accessibility: focus returns to the trigger when the dialog closes; dialog receives focus when opened.
