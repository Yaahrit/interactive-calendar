# 📅 Interactive Calendar Component

A production-quality, interactive calendar application built using React, designed to demonstrate frontend engineering excellence, UI/UX sensitivity, and clean state management.

Developed as part of the SWE Summer Intern Challenge, this project emphasizes performance, usability, and scalable design systems—without relying on external UI libraries.
🔍 Project Highlights (For Recruiters)
⚡ Zero UI Libraries — 100% custom-built components and styling
🎯 Complex State Management — Handles date-range selection, hover states, and notes seamlessly
📱 Fully Responsive — Optimized for mobile and desktop with adaptive layouts
🎨 Dynamic Theming System — Built using CSS variables for scalability
🚀 Performance-Conscious — Minimal dependencies, lightweight bundle
🧠 Thoughtful UX — Real-world interactions (range selection, annotations, visual feedback)
📊 Impact & Engineering Metrics
📦 ~0 external UI dependencies → Reduced bundle size & improved load performance
🎯 4 fully implemented themes using scalable design tokens (CSS variables)
🗓️ 100% dynamic calendar rendering (no hardcoded layouts)
⚡ O(1) date selection updates with efficient state handling
📱 Responsive across all breakpoints (mobile-first approach)
🎨 Smooth UI transitions using pure CSS animations (no JS animation libs)
✨ Features
Core Functionality
Wall Calendar UI
Clean, modern layout inspired by physical calendars with a monthly hero image.
Date Range Selection System
Start & end date selection
In-range highlighting
Hover preview feedback
Edge-case handling (reverse selection, same-day selection)
Notes System
Add notes to single or multiple dates
Persistent within session
Visual indicators on selected dates
Responsive Layout Engine
Desktop: Split layout (image + calendar grid)
Mobile: Stacked layout with scrollable visuals
Advanced UI/UX Enhancements
🎨 Theme Engine (4 Modes) — Warm, Cool, Forest, Dusk
🖼️ Dynamic Monthly Hero Images with subtle animation
🎉 Holiday Highlighting (Indian + global)
✎ Visual Note Indicators for enhanced usability
↔️ Animated Month Navigation (smooth slide transitions)
🛠 Tech Stack
React 18
Vanilla CSS
Flexbox & Grid
CSS Variables (Design Tokens)
Animations & transitions
No external component libraries
🧱 Architecture & Design Decisions
Single Source of Truth
Centralized state management ensures predictable UI behavior.
Component Simplicity
Entire app structured to remain readable and extensible despite being in a compact format.
Design System Approach
CSS variables act as reusable tokens, enabling easy theme scaling.
Performance First
Avoided heavy libraries to maintain fast load times and minimal overhead.
Constraint-Driven Engineering
No localStorage used (per challenge requirement), demonstrating clean session-based state handling.
📁 Project Structure
src/
  App.js      # Core logic, state management, UI rendering
  App.css     # Styling system, themes, animations, responsiveness
🚀 Getting Started
Prerequisites
Node.js >= 16
npm or yarn
Installation
git clone https://github.com/yaahrit/interactive-calendar.git
cd interactive-calendar
npm install
npm start

App runs on:
👉 http://localhost:3000

🧪 Potential Improvements (Next Iterations)
Persistent storage (localStorage / backend integration)
Drag-to-select date ranges
Calendar event API integration (Google Calendar, etc.)
Accessibility improvements (ARIA roles, keyboard navigation)
Unit & integration testing (Jest / React Testing Library)
👤 Author

Yash Raj
