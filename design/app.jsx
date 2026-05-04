// Book shell — flippable page-by-page presentation

const { useState, useEffect, useCallback } = React;

const TEMPLATES = [
  { key: "cover",        name: "01 · Cover",                 comp: () => <TemplateCover /> },
  { key: "index",        name: "02 · Contents / Index",      comp: () => <TemplateIndex /> },
  { key: "title",        name: "03 · Chapter Title",         comp: () => <TemplateTitle /> },
  { key: "hero",         name: "04 · Full-Bleed Hero",       comp: () => <TemplateHero /> },
  { key: "single",       name: "05 · Single Photo + Caption",comp: () => <TemplateSingle /> },
  { key: "grid",         name: "06 · Photo Grid",            comp: () => <TemplateGrid /> },
  { key: "collage",      name: "07 · Polaroid Collage",      comp: () => <TemplateCollage /> },
  { key: "map",          name: "08 · Map Page",              comp: () => <TemplateMap /> },
  { key: "journal",      name: "09 · Journal Entry",         comp: () => <TemplateJournal /> },
  { key: "quote",        name: "10 · Quote / Typography",    comp: () => <TemplateQuote /> },
  { key: "ephemera",     name: "11 · Tickets &amp; Ephemera",   comp: () => <TemplateEphemera /> },
  { key: "photoJournal", name: "12 · Photo + Journal Mix",   comp: () => <TemplatePhotoJournal /> },
  { key: "back",         name: "13 · Back Cover",            comp: () => <TemplateBack /> },
];

function App() {
  const [idx, setIdx] = useState(() => {
    const saved = localStorage.getItem("travelbook.idx");
    return saved ? Math.min(parseInt(saved, 10) || 0, TEMPLATES.length - 1) : 0;
  });
  const [flipping, setFlipping] = useState(null); // 'next' | 'prev' | null

  useEffect(() => {
    localStorage.setItem("travelbook.idx", String(idx));
  }, [idx]);

  const goto = useCallback((next) => {
    if (flipping) return;
    if (next < 0 || next >= TEMPLATES.length) return;
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

  const current = TEMPLATES[idx];
  const flipPage = flipping === "next" ? current : (flipping === "prev" ? TEMPLATES[idx - 1] : null);
  const targetIdx = flipping === "next" ? idx + 1 : (flipping === "prev" ? idx - 1 : idx);
  const target = TEMPLATES[targetIdx] || current;

  return (
    <div className="app-root">
      {/* top bar */}
      <header className="topbar">
        <div className="topbar-title">
          <span className="f-display" style={{ fontStyle: "italic" }}>Wanderbound</span>
          <span className="topbar-sub">— travel book templates —</span>
        </div>
        <div className="topbar-meta">
          <span className="f-mono">{String(idx + 1).padStart(2, "0")}<span style={{ opacity: .4 }}> / {TEMPLATES.length}</span></span>
        </div>
      </header>

      {/* book stage */}
      <main className="stage">
        {/* page indicator strip */}
        <div className="strip">
          {TEMPLATES.map((t, i) => (
            <button key={t.key}
              className={`strip-dot ${i === idx ? "active" : ""}`}
              onClick={() => goto(i)}
              title={t.name.replace(/&amp;/g, "&")}>
              <span className="strip-num">{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        {/* the book */}
        <div className="book-wrap">
          <button className="nav-btn nav-prev" onClick={prev} disabled={idx === 0} aria-label="Previous page">
            <svg width="28" height="28" viewBox="0 0 28 28"><path d="M18 6 L 10 14 L 18 22" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>

          <div className="book">
            {/* book binding shadow */}
            <div className="book-binding-l" />
            <div className="book-binding-r" />

            <div className="page-stack">
              {/* underneath = target page */}
              <div className="page-under">
                <PageFrame name={target.name}>{target.comp()}</PageFrame>
              </div>

              {/* on top = current page that flips away */}
              {flipping && flipPage && (
                <div className={`page-flipper ${flipping}`}>
                  <div className="page-flipper-front">
                    <PageFrame name={flipPage.name}>{flipPage.comp()}</PageFrame>
                  </div>
                  <div className="page-flipper-back" />
                </div>
              )}

              {/* normal: show current page */}
              {!flipping && (
                <div className="page-current">
                  <PageFrame name={current.name}>{current.comp()}</PageFrame>
                </div>
              )}
            </div>
          </div>

          <button className="nav-btn nav-next" onClick={next} disabled={idx === TEMPLATES.length - 1} aria-label="Next page">
            <svg width="28" height="28" viewBox="0 0 28 28"><path d="M10 6 L 18 14 L 10 22" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>

        {/* template name */}
        <div className="template-name">
          <span className="smallcaps" dangerouslySetInnerHTML={{ __html: current.name }} />
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
