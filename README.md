# Interactive Calendar Component 📅

A polished, interactive wall-calendar-inspired React component built for the ** SWE Summer Intern Challenge**.

## ✨ Features

### Core
- **Wall Calendar Aesthetic** — Hero image per month with overlay and month badge
- **Day Range Selector** — Click start & end dates; clear visual states for start, end, in-between, and hover preview
- **Integrated Notes** — Attach notes to any single date or date range; saved notes listed below
- **Fully Responsive** — Desktop: side-by-side layout. Mobile: stacked layout with horizontal image strip

### Bonus / Creative
- 🎨 **4 Color Themes** — Warm, Cool, Forest, Dusk — switchable via theme dots
- 🏖️ **Monthly Hero Images** — Different Unsplash photo per month (slow Ken Burns pan effect)
- 🎉 **Holiday Markers** — Indian & international holidays highlighted in red
- ✎ **Note Indicators** — Pencil icon on days that have saved notes
- ↔️ **Slide Animation** — Calendar grid slides left/right on month navigation
- 🌗 **CSS Variables Theming** — Full theme transitions with smooth color changes

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm or yarn

### Installation

```bash
git clone https://github.com/yaahrit/interactive-calendar.git
cd interactive-calendar
npm install
npm start
```

Opens at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🛠 Tech Stack

- **React 18** (Create React App)
- **Vanilla CSS** — CSS variables, Flexbox, Grid, animations
- **No external UI libraries** — built from scratch
- **Google Fonts** — Playfair Display + DM Sans

## 📁 Project Structure

```
src/
  App.js      # Main calendar component (state, logic, JSX)
  App.css     # All styles (responsive, themes, animations)
```

## 🎨 Design Decisions

- **Playfair Display** serif for month names gives a premium wall-calendar feel
- **Image panel on left** mirrors physical wall calendar layout (image above dates)
- **Color-mix()** CSS function used for hover states — no extra variables needed
- **localStorage NOT used** per challenge brief (frontend only, session-scoped state)

## 👤 Author

Yash Raj 
