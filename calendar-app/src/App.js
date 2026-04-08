import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

const MONTH_IMAGES = {
  0:  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80',
  1:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  2:  'https://images.unsplash.com/photo-1490750967868-88df5691166e?w=600&q=80',
  3:  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80',
  4:  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80',
  5:  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  6:  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80',
  7:  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80',
  8:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  9:  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80',
  10: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80',
  11: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=600&q=80',
};

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const HOLIDAYS = {
  '1-1':  '🎊 New Year',
  '1-26': '🇮🇳 Republic Day',
  '3-8':  "👩 Women's Day",
  '4-14': '🙏 Ambedkar Jayanti',
  '8-15': '🇮🇳 Independence Day',
  '10-2': '🕊️ Gandhi Jayanti',
  '10-31':'🎃 Halloween',
  '12-25':'🎄 Christmas',
  '12-31':'🎆 New Year\'s Eve',
};

const themes = {
  warm:   { '--accent':'#c2714f','--accent2':'#e8b89a','--bg':'#faf6f1','--card':'#fff9f5','--text':'#2c1810','--muted':'#8a7060' },
  cool:   { '--accent':'#3a7ca5','--accent2':'#90caf9','--bg':'#f0f6ff','--card':'#ffffff','--text':'#0d2137','--muted':'#5a7a99' },
  forest: { '--accent':'#4a7c59','--accent2':'#a8d5b5','--bg':'#f2f7f2','--card':'#ffffff','--text':'#1a2e1e','--muted':'#5a7a61' },
  dusk:   { '--accent':'#7c3d7f','--accent2':'#d4a8d6','--bg':'#faf0ff','--card':'#fff8ff','--text':'#2a0d2e','--muted':'#8a6a8c' },
};

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay(); }
function dateKey(year, month, day) { return `${year}-${month + 1}-${day}`; }
function isSameDate(a, b) { return a && b && a.y === b.y && a.m === b.m && a.d === b.d; }
function isInRange(day, year, month, start, end) {
  if (!start || !end) return false;
  const cur = new Date(year, month, day);
  const s = new Date(start.y, start.m, start.d);
  const e = new Date(end.y, end.m, end.d);
  const [lo, hi] = s <= e ? [s, e] : [e, s];
  return cur > lo && cur < hi;
}

export default function App() {
  const today = new Date();
  const [viewYear, setViewYear]     = useState(today.getFullYear());
  const [viewMonth, setViewMonth]   = useState(today.getMonth());
  const [direction, setDirection]   = useState(0);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd]     = useState(null);
  const [hoverDay, setHoverDay]     = useState(null);
  const [focusedDay, setFocusedDay] = useState(null);
  const [notes, setNotes]           = useState({});
  const [noteInput, setNoteInput]   = useState('');
  const [activeNoteKey, setActiveNoteKey] = useState(null);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const [theme, setTheme]           = useState('warm');
  const [tooltip, setTooltip]       = useState({ visible: false, text: '', x: 0, y: 0 });

  const daysInMonth  = getDaysInMonth(viewYear, viewMonth);
  const firstDay     = getFirstDayOfMonth(viewYear, viewMonth);
  const monthImg     = MONTH_IMAGES[viewMonth];
  const themeVars    = themes[theme];
  const isCurrentMonth = viewMonth === today.getMonth() && viewYear === today.getFullYear();

  useEffect(() => { setImgLoaded(false); }, [viewMonth]);

  useEffect(() => {
    if (rangeStart && rangeEnd) {
      const key = `${dateKey(rangeStart.y, rangeStart.m, rangeStart.d)}_${dateKey(rangeEnd.y, rangeEnd.m, rangeEnd.d)}`;
      setActiveNoteKey(key);
      setNoteInput(notes[key] || '');
    } else if (rangeStart) {
      const key = dateKey(rangeStart.y, rangeStart.m, rangeStart.d);
      setActiveNoteKey(key);
      setNoteInput(notes[key] || '');
    } else {
      setActiveNoteKey(null);
      setNoteInput('');
    }
  }, [rangeStart, rangeEnd]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      const arrows = ['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Enter','Escape'];
      if (arrows.includes(e.key)) e.preventDefault();
      const max = getDaysInMonth(viewYear, viewMonth);
      if (e.key === 'ArrowRight') {
        if (!focusedDay) { setFocusedDay(1); return; }
        if (focusedDay < max) setFocusedDay(f => f + 1);
        else { navigate(1); setFocusedDay(1); }
      }
      if (e.key === 'ArrowLeft') {
        if (!focusedDay) { setFocusedDay(max); return; }
        if (focusedDay > 1) setFocusedDay(f => f - 1);
        else {
          const pm = viewMonth - 1 < 0 ? 11 : viewMonth - 1;
          const py = viewMonth - 1 < 0 ? viewYear - 1 : viewYear;
          navigate(-1);
          setFocusedDay(getDaysInMonth(py, pm));
        }
      }
      if (e.key === 'ArrowDown') setFocusedDay(f => f ? Math.min(f + 7, max) : 1);
      if (e.key === 'ArrowUp')   setFocusedDay(f => f ? Math.max(f - 7, 1)   : max);
      if (e.key === 'Enter' && focusedDay) handleDayClick(focusedDay);
      if (e.key === 'Escape') { setRangeStart(null); setRangeEnd(null); setFocusedDay(null); }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [focusedDay, viewYear, viewMonth, rangeStart, rangeEnd]);

  function navigate(dir) {
    setDirection(dir);
    let m = viewMonth + dir, y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0)  { m = 11; y--; }
    setViewMonth(m);
    setViewYear(y);
  }

  function handleDayClick(day) {
    const clicked = { y: viewYear, m: viewMonth, d: day };
    setFocusedDay(day);
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(clicked); setRangeEnd(null);
    } else {
      const s = new Date(rangeStart.y, rangeStart.m, rangeStart.d);
      const c = new Date(clicked.y, clicked.m, clicked.d);
      if (c.getTime() === s.getTime()) { setRangeStart(null); setRangeEnd(null); }
      else if (c < s) { setRangeEnd(rangeStart); setRangeStart(clicked); fireConfetti(); }
      else            { setRangeEnd(clicked); fireConfetti(); }
    }
  }

  function fireConfetti() {
    confetti({ particleCount: 70, spread: 55, origin: { y: 0.6 },
      colors: [themeVars['--accent'], themeVars['--accent2'], '#ffffff'] });
  }

  function saveNote() {
    if (!activeNoteKey) return;
    setNotes(prev => ({ ...prev, [activeNoteKey]: noteInput }));
  }

  function deleteNote() {
    if (!activeNoteKey) return;
    setNotes(prev => { const n = { ...prev }; delete n[activeNoteKey]; return n; });
    setNoteInput('');
  }

  function getRangeLabel() {
    if (!rangeStart) return 'Click a day to start';
    if (!rangeEnd)   return `Start: ${MONTH_NAMES[rangeStart.m]} ${rangeStart.d} — click end date`;
    const diff = Math.round(Math.abs(new Date(rangeEnd.y, rangeEnd.m, rangeEnd.d) - new Date(rangeStart.y, rangeStart.m, rangeStart.d)) / 86400000) + 1;
    return `${MONTH_NAMES[rangeStart.m]} ${rangeStart.d} → ${MONTH_NAMES[rangeEnd.m]} ${rangeEnd.d} · ${diff} days`;
  }

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday    = d => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const holidayKey = d => `${viewMonth + 1}-${d}`;

  return (
    <div className={`app theme-${theme}`} style={themeVars}>
      <div className="calendar-wrapper">

        {/* ── LEFT IMAGE PANEL ── */}
        <div className="image-panel">
          <div className="img-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={viewMonth}
                src={monthImg}
                alt={MONTH_NAMES[viewMonth]}
                className="hero-img"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                onLoad={() => setImgLoaded(true)}
              />
            </AnimatePresence>
            <div className="img-overlay" />
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${viewMonth}`}
                className="month-badge"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                <span className="month-name-big">{MONTH_NAMES[viewMonth]}</span>
                <span className="year-label">{viewYear}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Theme switcher */}
          <div className="theme-switcher">
            <span className="theme-label">Theme</span>
            <div className="theme-dots">
              {Object.keys(themes).map(t => (
                <button key={t} className={`theme-dot dot-${t} ${theme === t ? 'active' : ''}`}
                  onClick={() => setTheme(t)} title={t} />
              ))}
            </div>
          </div>

          {/* Range label */}
          <div className="range-label-panel">
            <div className="range-icon">📅</div>
            <p className="range-text">{getRangeLabel()}</p>
            {(rangeStart || rangeEnd) && (
              <button className="clear-btn" onClick={() => { setRangeStart(null); setRangeEnd(null); }}>Clear</button>
            )}
          </div>
        </div>

        {/* ── RIGHT CALENDAR PANEL ── */}
        <div className="calendar-panel">

          {/* Header */}
          <div className="cal-header">
            <motion.button className="nav-btn" onClick={() => navigate(-1)} whileTap={{ scale: 0.82 }}>‹</motion.button>
            <div className="cal-title">
              <AnimatePresence mode="wait">
                <motion.span key={`${viewMonth}-${viewYear}`} className="cal-month"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}>
                  {MONTH_NAMES[viewMonth]}
                </motion.span>
              </AnimatePresence>
              <span className="cal-year">{viewYear}</span>
              {!isCurrentMonth && (
                <motion.button className="today-jump-btn"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  onClick={() => { setDirection(0); setViewMonth(today.getMonth()); setViewYear(today.getFullYear()); }}>
                  Today
                </motion.button>
              )}
            </div>
            <motion.button className="nav-btn" onClick={() => navigate(1)} whileTap={{ scale: 0.82 }}>›</motion.button>
          </div>

          {/* Day headers */}
          <div className="day-headers">
            {DAY_NAMES.map(d => <div key={d} className="day-header">{d}</div>)}
          </div>

          {/* Calendar Grid */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${viewYear}-${viewMonth}`}
              className="cal-grid"
              custom={direction}
              variants={{
                enter:  d => ({ x: d > 0 ? 80 : -80, opacity: 0, rotateY: d > 0 ? 12 : -12 }),
                center: { x: 0, opacity: 1, rotateY: 0 },
                exit:   d => ({ x: d > 0 ? -80 : 80, opacity: 0, rotateY: d > 0 ? -12 : 12 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ perspective: 800 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, { offset }) => {
                if (offset.x < -50) navigate(1);
                else if (offset.x > 50) navigate(-1);
              }}
            >
              {cells.map((day, idx) => {
                if (!day) return <div key={`e-${idx}`} className="cell empty" />;

                const isStart    = isSameDate({ y: viewYear, m: viewMonth, d: day }, rangeStart);
                const isEnd      = isSameDate({ y: viewYear, m: viewMonth, d: day }, rangeEnd);
                const inRange    = isInRange(day, viewYear, viewMonth, rangeStart, rangeEnd);
                const hoverRange = rangeStart && !rangeEnd && hoverDay &&
                  isInRange(day, viewYear, viewMonth, rangeStart, { y: viewYear, m: viewMonth, d: hoverDay });
                const hoverEdge  = rangeStart && !rangeEnd && hoverDay === day;
                const holiday    = HOLIDAYS[holidayKey(day)];
                const hasNote    = notes[dateKey(viewYear, viewMonth, day)];
                const isFocused  = focusedDay === day;

                return (
                  <motion.div
                    key={day}
                    className={[
                      'cell',
                      isToday(day) ? 'today'        : '',
                      isStart      ? 'range-start'  : '',
                      isEnd        ? 'range-end'    : '',
                      inRange      ? 'in-range'     : '',
                      hoverRange   ? 'hover-range'  : '',
                      hoverEdge    ? 'hover-edge'   : '',
                      holiday      ? 'holiday'      : '',
                      isFocused    ? 'keyboard-focus': '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => handleDayClick(day)}
                    onMouseEnter={e => {
                      setHoverDay(day);
                      const text = holiday || (hasNote ? '📝 ' + notes[dateKey(viewYear, viewMonth, day)] : '');
                      if (text) setTooltip({ visible: true, text, x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => { setHoverDay(null); setTooltip({ visible: false, text: '' }); }}
                    whileTap={{ scale: 0.82 }}
                    animate={(isStart || isEnd) ? { scale: [1, 1.18, 1.06] } : { scale: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="day-num">{day}</span>
                    {holiday && <span className="holiday-dot" title={holiday}>•</span>}
                    {hasNote  && <span className="note-dot"    title="Has note">✎</span>}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Legend */}
          <div className="legend">
            <span className="legend-item"><span className="legend-dot today-dot" />Today</span>
            <span className="legend-item"><span className="legend-dot range-dot" />Selected</span>
            <span className="legend-item"><span className="legend-dot holiday-dot-l" />Holiday</span>
            <span className="legend-item"><span className="legend-dot note-dot-l" />Note</span>
            <span className="legend-item kbd-hint">⌨ Arrow keys + Enter</span>
          </div>

          {/* Notes */}
          <div className="notes-section">
            <div className="notes-header">
              <span className="notes-title">✎ Notes</span>
              {activeNoteKey && (
                <span className="notes-for">
                  {rangeEnd
                    ? `${MONTH_NAMES[rangeStart.m]} ${rangeStart.d} – ${rangeEnd.d}`
                    : rangeStart ? `${MONTH_NAMES[rangeStart.m]} ${rangeStart.d}` : ''}
                </span>
              )}
            </div>
            <textarea
              className="notes-input"
              placeholder={rangeStart ? 'Write a note for this date/range...' : 'Select a date to add notes...'}
              value={noteInput}
              disabled={!rangeStart}
              onChange={e => setNoteInput(e.target.value)}
              rows={3}
            />
            <div className="notes-actions">
              <button className="save-btn" onClick={saveNote} disabled={!rangeStart}>Save Note</button>
              {notes[activeNoteKey] && <button className="del-btn" onClick={deleteNote}>Delete</button>}
            </div>
            {Object.keys(notes).length > 0 && (
              <div className="saved-notes">
                <p className="saved-title">Saved Notes</p>
                {Object.entries(notes).map(([k, v]) => (
                  <div key={k} className="saved-note-item">
                    <span className="saved-note-key">{k.replace(/_/g, ' → ')}</span>
                    <span className="saved-note-val">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div className="tooltip" style={{ top: tooltip.y - 44, left: tooltip.x }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
