// Mountain book shell — flippable page-by-page presentation

const { useState, useEffect, useCallback } = React;

const M_TEMPLATES = [
  { key: "cover",        name: "01 · Cover",                    comp: () => <MTCover /> },
  { key: "contents",     name: "02 · Contents / Index",         comp: () => <MTContents /> },
  { key: "divider",      name: "03 · Chapter Divider",          comp: () => <MTDivider /> },
  { key: "hero",         name: "04 · Full-Bleed Hero",          comp: () => <MTHero /> },
  { key: "single",       name: "05 · Single Photo + Caption",   comp: () => <MTSingle /> },
  { key: "grid",         name: "06 · Photo Grid",               comp: () => <MTGrid /> },
  { key: "collage",      name: "07 · Polaroid Collage",         comp: () => <MTCollage /> },
  { key: "map",          name: "08 · Topographic Map",          comp: () => <MTMap /> },
  { key: "journal",      name: "09 · Field Journal",            comp: () => <MTJournal /> },
  { key: "quote",        name: "10 · Quote / Typography",       comp: () => <MTQuote /> },
  { key: "photoJournal", name: "11 · Photo + Journal Mix",      comp: () => <MTPhotoJournal /> },
  { key: "trailLog",     name: "12 · Trail Log + Stats",        comp: () => <MTTrailLog /> },
  { key: "specimen",     name: "13 · Herbarium / Specimens",    comp: () => <MTSpecimen /> },
];

function App() {
  const [idx, setIdx] = useState(() => {
    const saved = localStorage.getItem("mountainbook.idx");
    return saved ? Math.min(parseInt(saved, 10) || 0, M_TEMPLATES.length - 1) : 0;
  });
  const [flipping, setFlipping] = useState(null);

  useEffect(() => { localStorage.setItem("mountainbook.idx", String(idx)); }, [idx]);

  const goto = useCallback((next) => {
    if (flipping) return;
    if (next < 0 || next >= M_TEMPLATES.length) return;
    setFlipping(next > idx ? "next" : "prev");
    setTimeout(() => {
      setIdx(next);
      setTimeout(() => setFlipping(null), 50);
    }, 520);
  }, [idx, flipping]);

  const next = () => goto(idx + 1);
  const prev = () => goto(idx - 1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const current = M_TEMPLATES[idx];
  const flipPage = flipping === "next" ? current : (flipping === "prev" ? M_TEMPLATES[idx - 1] : null);
  const targetIdx = flipping === "next" ? idx + 1 : (flipping === "prev" ? idx - 1 : idx);
  const target = M_TEMPLATES[targetIdx] || current;

  return (
    <div className="app-root mountain-app" data-screen-label="Highland Mountain Book">
      <header className="topbar">
        <div className="topbar-title">
          <span className="f-display" style={{ fontStyle: "italic" }}>Highland</span>
          <span className="topbar-sub">— a field guide to the quiet country —</span>
        </div>
        <div className="topbar-meta">
          <span className="f-mono">{String(idx + 1).padStart(2, "0")}<span style={{ opacity: .4 }}> / {M_TEMPLATES.length}</span></span>
        </div>
      </header>

      <main className="stage">
        <div className="strip">
          {M_TEMPLATES.map((t, i) => (
            <button key={t.key}
              className={`strip-dot ${i === idx ? "active" : ""}`}
              onClick={() => goto(i)}
              title={t.name}>
              <span className="strip-num">{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="book-wrap">
          <button className="nav-btn nav-prev" onClick={prev} disabled={idx === 0} aria-label="Previous page">
            <svg width="28" height="28" viewBox="0 0 28 28"><path d="M18 6 L 10 14 L 18 22" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>

          <div className="book">
            <div className="book-binding-l" />
            <div className="book-binding-r" />

            <div className="page-stack">
              <div className="page-under">
                <PageFrame name={target.name}>{target.comp()}</PageFrame>
              </div>

              {flipping && flipPage && (
                <div className={`page-flipper ${flipping}`}>
                  <div className="page-flipper-front">
                    <PageFrame name={flipPage.name}>{flipPage.comp()}</PageFrame>
                  </div>
                  <div className="page-flipper-back" />
                </div>
              )}

              {!flipping && (
                <div className="page-current">
                  <PageFrame name={current.name}>{current.comp()}</PageFrame>
                </div>
              )}
            </div>
          </div>

          <button className="nav-btn nav-next" onClick={next} disabled={idx === M_TEMPLATES.length - 1} aria-label="Next page">
            <svg width="28" height="28" viewBox="0 0 28 28"><path d="M10 6 L 18 14 L 10 22" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>

        <div className="template-name">
          <span className="smallcaps">{current.name}</span>
        </div>
      </main>

      <div className="hint">← → arrow keys to turn pages</div>
    </div>
  );
}

function PageFrame({ name, children }) {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      el.style.setProperty("--page-scale", String(w / 600));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="page-frame" ref={ref}>
      {children}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
