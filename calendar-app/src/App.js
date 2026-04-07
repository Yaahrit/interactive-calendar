import React, { useState, useEffect } from 'react';
import './App.css';

const MONTH_IMAGES = {
  0: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80', // Jan - snow
  1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', // Feb - warm
  2: 'https://images.unsplash.com/photo-1490750967868-88df5691166e?w=600&q=80', // Mar - spring
  3: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=600&q=80', // Apr - flowers
  4: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80', // May - green
  5: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', // Jun - beach
  6: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80', // Jul - summer
  7: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80', // Aug - sunset
  8: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', // Sep - autumn
  9: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80', // Oct - fall
  10: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80', // Nov - fog
  11: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=600&q=80', // Dec - winter
};

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const HOLIDAYS = {
  '1-1': '🎊 New Year',
  '1-26': '🇮🇳 Republic Day',
  '3-8': '👩 Women\'s Day',
  '4-14': '🙏 Ambedkar Jayanti',
  '8-15': '🇮🇳 Independence Day',
  '10-2': '🕊️ Gandhi Jayanti',
  '10-31': '🎃 Halloween',
  '12-25': '🎄 Christmas',
  '12-31': '🎆 New Year\'s Eve',
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function dateKey(year, month, day) {
  return `${year}-${month + 1}-${day}`;
}

function isSameDate(a, b) {
  return a && b && a.y === b.y && a.m === b.m && a.d === b.d;
}

function isInRange(day, year, month, start, end) {
  if (!start || !end) return false;
  const cur = new Date(year, month, day);
  const s = new Date(start.y, start.m, start.d);
  const e = new Date(end.y, end.m, end.d);
  const [lo, hi] = s <= e ? [s, e] : [e, s];
  return cur > lo && cur < hi;
}

function isRangeEdge(day, year, month, start, end) {
  const cur = new Date(year, month, day);
  const s = start ? new Date(start.y, start.m, start.d) : null;
  const e = end ? new Date(end.y, end.m, end.d) : null;
  return (s && cur.getTime() === s.getTime()) || (e && cur.getTime() === e.getTime());
}

export default function App() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverDay, setHoverDay] = useState(null);
  const [notes, setNotes] = useState({});
  const [noteInput, setNoteInput] = useState('');
  const [activeNoteKey, setActiveNoteKey] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [theme, setTheme] = useState('warm');
  const [animDir, setAnimDir] = useState('');

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const monthImg = MONTH_IMAGES[viewMonth];

  useEffect(() => {
    setImgLoaded(false);
  }, [viewMonth]);

  useEffect(() => {
    if (rangeStart && rangeEnd) {
      const key = `${dateKey(rangeStart.y, rangeStart.m, rangeStart.d)}_${dateKey(rangeEnd.y, rangeEnd.m, rangeEnd.d)}`;
      setActiveNoteKey(key);
      setNoteInput(notes[key] || '');
    } else if (rangeStart && !rangeEnd) {
      const key = dateKey(rangeStart.y, rangeStart.m, rangeStart.d);
      setActiveNoteKey(key);
      setNoteInput(notes[key] || '');
    }
  }, [rangeStart, rangeEnd]);

  function handleDayClick(day) {
    const clicked = { y: viewYear, m: viewMonth, d: day };
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(clicked);
      setRangeEnd(null);
    } else {
      const s = new Date(rangeStart.y, rangeStart.m, rangeStart.d);
      const c = new Date(clicked.y, clicked.m, clicked.d);
      if (c < s) {
        setRangeEnd(rangeStart);
        setRangeStart(clicked);
      } else if (c.getTime() === s.getTime()) {
        setRangeStart(null);
        setRangeEnd(null);
      } else {
        setRangeEnd(clicked);
      }
    }
  }

  function navigate(dir) {
    setAnimDir(dir > 0 ? 'slide-left' : 'slide-right');
    setTimeout(() => setAnimDir(''), 300);
    let m = viewMonth + dir;
    let y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setViewMonth(m);
    setViewYear(y);
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
    if (!rangeEnd) return `Start: ${MONTH_NAMES[rangeStart.m]} ${rangeStart.d} — click end date`;
    const s = new Date(rangeStart.y, rangeStart.m, rangeStart.d);
    const e = new Date(rangeEnd.y, rangeEnd.m, rangeEnd.d);
    const diff = Math.round(Math.abs(e - s) / (1000 * 60 * 60 * 24)) + 1;
    return `${MONTH_NAMES[rangeStart.m]} ${rangeStart.d} → ${MONTH_NAMES[rangeEnd.m]} ${rangeEnd.d} · ${diff} days`;
  }

  const themes = {
    warm: { '--accent': '#c2714f', '--accent2': '#e8b89a', '--bg': '#faf6f1', '--card': '#fff9f5', '--text': '#2c1810', '--muted': '#8a7060' },
    cool: { '--accent': '#3a7ca5', '--accent2': '#90caf9', '--bg': '#f0f6ff', '--card': '#ffffff', '--text': '#0d2137', '--muted': '#5a7a99' },
    forest: { '--accent': '#4a7c59', '--accent2': '#a8d5b5', '--bg': '#f2f7f2', '--card': '#ffffff', '--text': '#1a2e1e', '--muted': '#5a7a61' },
    dusk: { '--accent': '#7c3d7f', '--accent2': '#d4a8d6', '--bg': '#faf0ff', '--card': '#fff8ff', '--text': '#2a0d2e', '--muted': '#8a6a8c' },
  };

  const themeVars = themes[theme] || themes.warm;

  // Build calendar grid
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const holidayKey = (d) => `${viewMonth + 1}-${d}`;

  return (
    <div className={`app theme-${theme}`} style={themeVars}>
      <div className="calendar-wrapper">

        {/* LEFT: Hero Image Panel */}
        <div className="image-panel">
          <div className="img-container">
            <img
              src={monthImg}
              alt={MONTH_NAMES[viewMonth]}
              className={`hero-img ${imgLoaded ? 'loaded' : ''}`}
              onLoad={() => setImgLoaded(true)}
            />
            <div className="img-overlay" />
            <div className="month-badge">
              <span className="month-name-big">{MONTH_NAMES[viewMonth]}</span>
              <span className="year-label">{viewYear}</span>
            </div>
          </div>

          {/* Theme switcher */}
          <div className="theme-switcher">
            <span className="theme-label">Theme</span>
            <div className="theme-dots">
              {Object.keys(themes).map(t => (
                <button key={t} className={`theme-dot dot-${t} ${theme === t ? 'active' : ''}`} onClick={() => setTheme(t)} title={t} />
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

        {/* RIGHT: Calendar + Notes */}
        <div className="calendar-panel">

          {/* Month Navigation */}
          <div className="cal-header">
            <button className="nav-btn" onClick={() => navigate(-1)}>‹</button>
            <div className="cal-title">
              <span className="cal-month">{MONTH_NAMES[viewMonth]}</span>
              <span className="cal-year">{viewYear}</span>
            </div>
            <button className="nav-btn" onClick={() => navigate(1)}>›</button>
          </div>

          {/* Day headers */}
          <div className="day-headers">
            {DAY_NAMES.map(d => <div key={d} className="day-header">{d}</div>)}
          </div>

          {/* Calendar Grid */}
          <div className={`cal-grid ${animDir}`}>
            {cells.map((day, idx) => {
              if (!day) return <div key={`e-${idx}`} className="cell empty" />;

              const isStart = isSameDate({ y: viewYear, m: viewMonth, d: day }, rangeStart);
              const isEnd = isSameDate({ y: viewYear, m: viewMonth, d: day }, rangeEnd);
              const inRange = isInRange(day, viewYear, viewMonth, rangeStart, rangeEnd);
              const isHover = hoverDay === day;
              const hoverRange = rangeStart && !rangeEnd && hoverDay &&
                isInRange(day, viewYear, viewMonth, rangeStart, { y: viewYear, m: viewMonth, d: hoverDay });
              const hoverEdge = rangeStart && !rangeEnd && hoverDay === day;
              const holiday = HOLIDAYS[holidayKey(day)];
              const hasNote = notes[dateKey(viewYear, viewMonth, day)];

              return (
                <div
                  key={day}
                  className={[
                    'cell',
                    isToday(day) ? 'today' : '',
                    isStart ? 'range-start' : '',
                    isEnd ? 'range-end' : '',
                    inRange ? 'in-range' : '',
                    hoverRange ? 'hover-range' : '',
                    hoverEdge ? 'hover-edge' : '',
                    holiday ? 'holiday' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => setHoverDay(day)}
                  onMouseLeave={() => setHoverDay(null)}
                >
                  <span className="day-num">{day}</span>
                  {holiday && <span className="holiday-dot" title={holiday}>•</span>}
                  {hasNote && <span className="note-dot" title="Has note">✎</span>}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="legend">
            <span className="legend-item"><span className="legend-dot today-dot" />Today</span>
            <span className="legend-item"><span className="legend-dot range-dot" />Selected</span>
            <span className="legend-item"><span className="legend-dot holiday-dot-l" />Holiday</span>
            <span className="legend-item"><span className="legend-dot note-dot-l" />Note</span>
          </div>

          {/* Notes Section */}
          <div className="notes-section">
            <div className="notes-header">
              <span className="notes-title">✎ Notes</span>
              {activeNoteKey && <span className="notes-for">
                {rangeEnd
                  ? `${MONTH_NAMES[rangeStart.m]} ${rangeStart.d} – ${rangeEnd.d}`
                  : rangeStart ? `${MONTH_NAMES[rangeStart.m]} ${rangeStart.d}` : ''}
              </span>}
            </div>
            <textarea
              className="notes-input"
              placeholder={rangeStart ? "Write a note for this date/range..." : "Select a date to add notes..."}
              value={noteInput}
              disabled={!rangeStart}
              onChange={e => setNoteInput(e.target.value)}
              rows={3}
            />
            <div className="notes-actions">
              <button className="save-btn" onClick={saveNote} disabled={!rangeStart}>Save Note</button>
              {notes[activeNoteKey] && <button className="del-btn" onClick={deleteNote}>Delete</button>}
            </div>

            {/* Saved notes list */}
            {Object.keys(notes).length > 0 && (
              <div className="saved-notes">
                <p className="saved-title">Saved Notes</p>
                {Object.entries(notes).map(([k, v]) => (
                  <div key={k} className="saved-note-item">
                    <span className="saved-note-key">{k.replace(/_/g, ' → ').replace(/-\d+-/g, (m) => m)}</span>
                    <span className="saved-note-val">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
