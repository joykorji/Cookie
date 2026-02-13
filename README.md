# Hi Carla 👋

A playful single-page “human check” (fake CAPTCHA) that leads to a gift question. Built with React, Vite, TypeScript, and Tailwind CSS. All client-side; no backend.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Images (optional)

For the 3×3 CAPTCHA grid, place images in `public/images/`:

| File       | Purpose                          |
|-----------|-----------------------------------|
| `me.jpg`  | Your photo (the only “correct” tile) |
| `decoy1.jpg` … `decoy8.jpg` | Generic placeholders        |

If a file is missing, the app shows a colored block with a label instead.

## Project structure

- `src/App.tsx` – Main flow (captcha → modal → success)
- `src/components/CaptchaGrid.tsx` – 3×3 grid, single-select, image fallbacks
- `src/components/GiftModal.tsx` – Modal with runaway NO button and growing YES
- `src/components/SuccessScreen.tsx` – “Yay!!” screen with optional confetti and Replay
- `src/config/images.ts` – Image paths and grid shuffle
- `src/utils/noButtonPosition.ts` – Random position helper for the NO button (keeps it inside the modal)
- `src/types.ts` – Shared types

## Acceptance checklist

- [x] Shows “Hi Carla 👋”
- [x] 3×3 grid with single selection
- [x] “Check if human ✅” disabled until one tile is selected
- [x] Wrong pick: error message + shake + clear after 700ms
- [x] Correct pick opens modal
- [x] NO button moves on hover/click and cannot be used to decline
- [x] YES grows after each NO attempt
- [x] YES shows success screen; Replay restarts the experience
- [x] Mobile-first, captcha-style card, smooth animations
- [x] `prefers-reduced-motion` respected; focus trap in modal; NO stays in bounds
