// Mountain templates 1-7

// === 01 COVER ===
const MTCover = () => (
  <MPaperBg variant="dark">
    <MPhoto src={M_PHOTO_URLS.fog} style={{ position: "absolute", inset: 0, opacity: .55 }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,53,40,.55), rgba(20,30,25,.85))" }} />
    <MountainSilhouette width={600} height={260} color="#1a2218" style={{ position: "absolute", bottom: 0, left: 0 }} />

    <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center" }}>
      <div className="m-caps" style={{ color: "#b8c2a3", fontSize: 10 }}>VOL · II &nbsp; / &nbsp; A FIELD GUIDE</div>
    </div>

    <div style={{ position: "absolute", top: 200, left: 0, right: 0, textAlign: "center", color: "#ecebe2" }}>
      <h1 className="m-display" style={{ fontSize: 96, fontWeight: 300, margin: 0, letterSpacing: "-.03em", lineHeight: .95, fontStyle: "italic" }}>Highland</h1>
      <div className="m-caps" style={{ marginTop: 16, fontSize: 10, color: "#b8c2a3", letterSpacing: ".5em" }}>NOTES FROM THE QUIET COUNTRY</div>
    </div>

    <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center", color: "#b8c2a3" }}>
      <div className="m-mono" style={{ fontSize: 10, letterSpacing: ".25em" }}>47°.32′N &nbsp; · &nbsp; 11°.84′E</div>
      <div className="m-mono" style={{ fontSize: 9, letterSpacing: ".2em", marginTop: 6, opacity: .7 }}>OCT — NOV &nbsp; · &nbsp; MMXXIV</div>
    </div>

    <div style={{ position: "absolute", top: 60, right: 50 }}><MCompass size={50} style={{ filter: "invert(1) opacity(.5)" }} /></div>
    <div style={{ position: "absolute", inset: 26, border: "1px solid rgba(184,194,163,.25)", pointerEvents: "none" }} />
  </MPaperBg>
);

// === 02 CONTENTS === photo-led contents
const MTContents = () => (
  <MPaperBg>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220 }}>
      <MPhoto src={M_PHOTO_URLS.peaks} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,30,25,.3), transparent 50%, rgba(236,235,226,1))" }} />
      <div style={{ position: "absolute", top: 50, left: 56, right: 56, color: "#ecebe2" }}>
        <div className="m-caps" style={{ fontSize: 9, opacity: .9, letterSpacing: ".4em" }}>CONTENTS</div>
        <h2 className="m-display" style={{ fontSize: 44, margin: "10px 0 0", fontStyle: "italic", fontWeight: 300, letterSpacing: "-.02em", textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>The route, in chapters</h2>
      </div>
    </div>

    <div style={{ position: "absolute", top: 235, left: 56, right: 56 }}>
      {[
        { n: "I", t: "Approach", s: "valley fog, the long climb up", p: "06" },
        { n: "II", t: "The Ridge", s: "saddle line, alpine wind", p: "24" },
        { n: "III", t: "Summit Day", s: "2,847 m — clarity", p: "48" },
        { n: "IV", t: "Descent", s: "river, moss, cabin at dusk", p: "72" },
      ].map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "13px 0", borderBottom: i < 3 ? "1px solid rgba(58,68,56,.18)" : "none" }}>
          <div className="m-display" style={{ fontSize: 20, fontStyle: "italic", color: "var(--m-moss)", minWidth: 32 }}>{c.n}</div>
          <div style={{ flex: 1 }}>
            <div className="m-display" style={{ fontSize: 22, fontStyle: "italic", color: "var(--m-ink)" }}>{c.t}</div>
            <div className="m-serif" style={{ fontSize: 12, color: "var(--m-ink-soft)", marginTop: 2, fontStyle: "italic" }}>{c.s}</div>
          </div>
          <div className="m-mono" style={{ fontSize: 10, color: "var(--m-ink-soft)", letterSpacing: ".1em" }}>p. {c.p}</div>
        </div>
      ))}
    </div>

    <div className="m-pagenum" style={{ left: "50%", transform: "translateX(-50%)" }}>iv</div>
  </MPaperBg>
);

// === 03 CHAPTER DIVIDER === photo-led
const MTDivider = () => (
  <MPaperBg variant="dark">
    <MPhoto src={M_PHOTO_URLS.ridge} style={{ position: "absolute", inset: 0, opacity: .85 }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,30,25,.4) 0%, rgba(20,30,25,.65) 100%)" }} />
    <div style={{ position: "absolute", inset: 26, border: "1px solid rgba(184,194,163,.3)", pointerEvents: "none" }} />

    <div className="m-display" style={{ position: "absolute", top: 60, left: "50%", transform: "translateX(-50%)", fontSize: 200, lineHeight: 1, color: "#b8c2a3", opacity: .15, fontStyle: "italic" }}>II</div>

    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 70px", textAlign: "center", color: "#ecebe2" }}>
      <div className="m-caps" style={{ color: "#b8c2a3", fontSize: 10, letterSpacing: ".5em" }}>CHAPTER · TWO</div>
      <MRule width={50} color="#b8c2a3" style={{ marginTop: 14 }} />
      <h2 className="m-display" style={{ fontSize: 78, fontStyle: "italic", fontWeight: 300, margin: "26px 0 10px", letterSpacing: "-.02em", textShadow: "0 2px 12px rgba(0,0,0,.4)" }}>The Ridge</h2>
      <div className="m-mono" style={{ fontSize: 10, color: "#b8c2a3", letterSpacing: ".3em", marginBottom: 22 }}>DAYS 7 — 12</div>
      <p className="m-serif" style={{ fontStyle: "italic", fontSize: 16, lineHeight: 1.5, color: "#dcdbcf", maxWidth: 360, margin: 0, textWrap: "pretty" }}>
        "At this altitude the wind no longer asks. It arrives, and we make space for it."
      </p>
    </div>

    <div className="m-pagenum" style={{ left: "50%", transform: "translateX(-50%)", color: "#b8c2a3" }}>24</div>
  </MPaperBg>
);

// === 04 FULL BLEED HERO ===
const MTHero = () => (
  <MPaperBg>
    <MPhoto src={M_PHOTO_URLS.waterfall} style={{ position: "absolute", inset: 0 }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(20,30,25,.7) 100%)" }} />
    <div style={{ position: "absolute", inset: 24, border: "1px solid rgba(236,235,226,.3)", pointerEvents: "none" }} />

    <div style={{ position: "absolute", top: 56, left: 56, color: "#ecebe2" }}>
      <div className="m-caps" style={{ fontSize: 10, opacity: .8, letterSpacing: ".4em" }}>PLATE · VII</div>
    </div>
    <div style={{ position: "absolute", top: 56, right: 56, textAlign: "right", color: "#ecebe2" }}>
      <div className="m-mono" style={{ fontSize: 10, letterSpacing: ".25em", opacity: .8 }}>47°.32′N · 11°.84′E</div>
      <div className="m-mono" style={{ fontSize: 9, marginTop: 4, opacity: .6 }}>05:47 · ELEVATION 1,820m</div>
    </div>

    <div style={{ position: "absolute", left: 56, right: 56, bottom: 56, color: "#ecebe2" }}>
      <h2 className="m-display" style={{ fontSize: 52, fontWeight: 300, fontStyle: "italic", lineHeight: 1, margin: "0 0 14px", letterSpacing: "-.02em" }}>The river falls without ceremony.</h2>
      <div className="m-script" style={{ fontSize: 22, color: "#b8c2a3" }}>— north face, before the rain</div>
    </div>

    <div className="m-pagenum" style={{ left: "50%", transform: "translateX(-50%)", color: "#b8c2a3" }}>14</div>
  </MPaperBg>
);

// === 05 SINGLE PHOTO + CAPTION === photo-first
const MTSingle = () => (
  <MPaperBg>
    <div style={{ position: "absolute", top: 56, left: 56, right: 56, bottom: 130 }}>
      <MPhoto src={M_PHOTO_URLS.lake} style={{ width: "100%", height: "100%" }} />
    </div>
    <div style={{ position: "absolute", top: 70, left: 70, color: "#ecebe2", textShadow: "0 1px 4px rgba(0,0,0,.5)" }}>
      <div className="m-caps" style={{ fontSize: 9, opacity: .9, letterSpacing: ".4em" }}>OBSERVED · OCT 12</div>
    </div>
    <div style={{ position: "absolute", left: 56, right: 56, bottom: 64, padding: "16px 20px", background: "var(--m-bone)", borderTop: "3px solid var(--m-pine)", display: "flex", gap: 18, alignItems: "flex-start" }}>
      <div style={{ flex: "0 0 auto" }}>
        <div className="m-display" style={{ fontSize: 22, fontStyle: "italic", color: "var(--m-pine)", lineHeight: 1, fontWeight: 300, whiteSpace: "nowrap" }}>Lake at first light</div>
        <div className="m-mono" style={{ fontSize: 9, color: "var(--m-ink-faded)", letterSpacing: ".15em", marginTop: 6 }}>06:18 · 4°C · still</div>
      </div>
      <div style={{ flex: 1, borderLeft: "1px solid var(--m-ink-faded)", paddingLeft: 18 }}>
        <p className="m-script" style={{ fontSize: 16, lineHeight: 1.4, margin: 0, color: "var(--m-ink-soft)", textWrap: "pretty" }}>
          The water held the sky — then a duck arrived and put an end to it.
        </p>
      </div>
    </div>
    <div className="m-pagenum">— 27 —</div>
  </MPaperBg>
);

// === 06 PHOTO GRID === photo-dominant mosaic
const MTGrid = () => (
  <MPaperBg>
    <div style={{ position: "absolute", top: 30, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
      <h3 className="m-display" style={{ fontSize: 22, fontStyle: "italic", margin: 0, fontWeight: 300, color: "var(--m-pine)", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>Five days in the pines</h3>
      <div className="m-mono" style={{ fontSize: 9, color: "var(--m-ink-faded)", letterSpacing: ".2em", whiteSpace: "nowrap" }}>X · MMXXIV</div>
    </div>

    <div style={{ position: "absolute", top: 70, left: 56, right: 56, bottom: 110, display: "grid", gridTemplateColumns: "1.4fr 1fr", gridTemplateRows: "1.3fr 1fr", gap: 8 }}>
      <div style={{ gridRow: "1 / span 2", position: "relative" }}>
        <MPhoto src={M_PHOTO_URLS.mistForest} style={{ width: "100%", height: "100%" }} />
        <div className="m-caps" style={{ position: "absolute", bottom: 10, left: 12, fontSize: 8, color: "#ecebe2", letterSpacing: ".3em", textShadow: "0 1px 3px rgba(0,0,0,.6)" }}>I · MIST AT DAYBREAK</div>
      </div>
      <div style={{ position: "relative" }}>
        <MPhoto src={M_PHOTO_URLS.pine} style={{ width: "100%", height: "100%" }} />
        <div className="m-caps" style={{ position: "absolute", bottom: 8, left: 10, fontSize: 8, color: "#ecebe2", letterSpacing: ".3em", textShadow: "0 1px 3px rgba(0,0,0,.6)" }}>II · CANOPY</div>
      </div>
      <div style={{ position: "relative" }}>
        <MPhoto src={M_PHOTO_URLS.moss} style={{ width: "100%", height: "100%" }} />
        <div className="m-caps" style={{ position: "absolute", bottom: 8, left: 10, fontSize: 8, color: "#ecebe2", letterSpacing: ".3em", textShadow: "0 1px 3px rgba(0,0,0,.6)" }}>III · MOSS</div>
      </div>
    </div>

    <div style={{ position: "absolute", left: 56, right: 56, bottom: 50, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
      <p className="m-serif" style={{ fontSize: 12, color: "var(--m-ink-soft)", fontStyle: "italic", margin: 0, textWrap: "pretty", flex: 1 }}>
        "The forest does not perform — it tolerates."
      </p>
      <div className="m-mono" style={{ fontSize: 9, color: "var(--m-ink-faded)", letterSpacing: ".15em", whiteSpace: "nowrap" }}>— 32</div>
    </div>
  </MPaperBg>
);

// === 07 POLAROID COLLAGE ===
const MTCollage = () => (
  <MPaperBg>
    <div style={{ position: "absolute", top: 50, left: 60, right: 60 }}>
      <div className="m-caps" style={{ color: "var(--m-ink-faded)" }}>Field Notebook</div>
      <h3 className="m-display" style={{ fontSize: 28, fontStyle: "italic", margin: "4px 0 0", color: "var(--m-pine)", fontWeight: 300, letterSpacing: "-.02em", whiteSpace: "nowrap" }}>Things at altitude</h3>
    </div>

    {[
      { src: M_PHOTO_URLS.summit, top: 120, left: 50, w: 170, rot: -3, cap: "summit, 11h" },
      { src: M_PHOTO_URLS.ridge, top: 220, left: "50%", ml: -100, w: 200, rot: 2, cap: "saddle ridge", z: 2 },
      { src: M_PHOTO_URLS.rocks, top: 130, right: 60, w: 160, rot: 5, cap: "scree field" },
      { src: M_PHOTO_URLS.alpine, top: 380, left: 90, w: 150, rot: -4, cap: "the long view" },
      { src: M_PHOTO_URLS.fog, top: 360, right: 80, w: 170, rot: 3, cap: "weather, incoming" },
    ].map((p, i) => (
      <div key={i} style={{ position: "absolute", top: p.top, left: p.left, right: p.right, marginLeft: p.ml, width: p.w, transform: `rotate(${p.rot}deg)`, zIndex: p.z, background: "var(--m-bone)", padding: "8px 8px 28px", boxShadow: "0 12px 28px rgba(20,30,25,.22)" }}>
        <MPhoto src={p.src} style={{ width: "100%", aspectRatio: 1 }} />
        <div className="m-script" style={{ position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center", fontSize: 14, color: "var(--m-ink-soft)" }}>{p.cap}</div>
      </div>
    ))}

    <PressedLeaf size={45} rotate={-25} style={{ position: "absolute", bottom: 60, left: 30, opacity: .55 }} />
    <Fern size={35} rotate={20} style={{ position: "absolute", top: 90, right: 30, opacity: .5 }} />
    <div className="m-pagenum">— 38 —</div>
  </MPaperBg>
);

Object.assign(window, { MTCover, MTContents, MTDivider, MTHero, MTSingle, MTGrid, MTCollage });
