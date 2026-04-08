# 📅 Interactive Calendar Component

> A polished, feature-rich wall-calendar-inspired React component — built as part of the **SWE Summer Intern Challenge**.

---



## ✨ Features

### Core Requirements
| Feature | Description |
|---|---|
| 🖼️ Wall Calendar Aesthetic | Hero image per month with cinematic overlay and animated month badge |
| 📆 Day Range Selector | Click start & end date — clear visual states for start, end, in-between, and hover preview |
| 📝 Integrated Notes | Attach memos to any single date or date range; saved notes persist in session |
| 📱 Fully Responsive | Desktop: side-by-side panel layout · Mobile: stacked layout with swipe support |

### Bonus & Creative Enhancements
| Feature | Description |
|---|---|
| 🎬 Flip Animation | 3D rotateY + slide transition on month navigation via Framer Motion |
| 👆 Swipe Gestures | Drag left/right on mobile to navigate months |
| 🎉 Confetti on Range Complete | Canvas confetti burst when a date range is selected |
| ⌨️ Keyboard Navigation | Arrow keys to move, `Enter` to select, `Esc` to clear |
| 🔘 Today Button | One-click return to current month when navigating away |
| 💬 Tooltip on Hover | Holiday name and note preview shown on day hover |
| 🎨 4 Color Themes | Warm · Cool · Forest · Dusk — seamless CSS variable transitions |
| 🏖️ Monthly Hero Images | Unique Unsplash photo per month with Ken Burns pan effect |
| 🇮🇳 Holiday Markers | Indian & international holidays highlighted with indicators |
| ✎ Note Indicators | Pencil icon appears on days with saved notes |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm or yarn

### Installation

```bash
git clone https://github.com/Yaahrit/interactive-calendar.git
cd interactive-calendar
npm install
npm start
```

Opens at `http://localhost:3000`

### Production Build

```bash
npm run build
```

---

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| React 18 | Component architecture, state management, hooks |
| Framer Motion | Flip animations, swipe gestures, AnimatePresence |
| canvas-confetti | Range selection celebration effect |
| Vanilla CSS | CSS variables, Flexbox, Grid, responsive design |
| Google Fonts | Playfair Display (display) + DM Sans (body) |

> **No external UI libraries** — all components built from scratch.

---

## 📁 Project Structure

```
interactive-calendar/
├── public/
│   └── index.html          # App entry point with Google Fonts
├── src/
│   ├── App.js              # Main calendar component (state, logic, JSX)
│   ├── App.css             # All styles — themes, animations, responsive
│   └── index.js            # React DOM root
├── package.json
└── README.md
```

---

## 🎨 Design Decisions

**Typography** — Playfair Display serif for month names evokes a premium physical calendar feel, paired with DM Sans for clean UI readability.

**Layout** — Image panel on the left mirrors the aesthetic of a physical wall calendar, where a photo anchors the date grid beside it.

**Theming** — CSS custom properties (`--accent`, `--bg`, `--card`, etc.) allow full theme switching with zero JavaScript — just a class swap.

**Animations** — Framer Motion's `AnimatePresence` with `rotateY` variants creates a genuine page-flip illusion on month navigation. Swipe gestures use `drag="x"` with `onDragEnd` threshold detection.

**State** — No `localStorage` used per challenge brief. All state is session-scoped React state (`useState`), keeping the component purely frontend with no persistence side-effects.

**Accessibility** — Full keyboard navigation implemented: Arrow keys for date traversal, `Enter` to select, `Escape` to clear range. Focused day is visually indicated with an accent outline.

---

## 🧠 Key Implementation Highlights

```js
// Framer Motion flip animation on month change
variants={{
  enter:  d => ({ x: d > 0 ? 80 : -80, opacity: 0, rotateY: d > 0 ? 12 : -12 }),
  center: { x: 0, opacity: 1, rotateY: 0 },
  exit:   d => ({ x: d > 0 ? -80 : 80, opacity: 0, rotateY: d > 0 ? -12 : 12 }),
}}

// Mobile swipe gesture
drag="x"
dragConstraints={{ left: 0, right: 0 }}
onDragEnd={(_, { offset }) => {
  if (offset.x < -50) navigate(1);
  else if (offset.x > 50) navigate(-1);
}}
```

---

## 👤 Author

**Yash Raj**  
Department of Computer Applications, GNIOT — Greater Noida  
📧 syashraj903@gmail.com  
🔗 [GitHub](https://github.com/Yaahrit)

---

## 📄 License

This project was built as part of a hiring evaluation challenge. All rights reserved.
