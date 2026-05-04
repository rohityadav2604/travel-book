// Page templates 1-6: Cover, Title, Hero, Single, Grid, Collage

const PaperBg = ({ children }) => (
  <div className="page">
    <div className="paper-texture" />
    <div className="paper-grain" />
    {children}
    <div className="paper-edge" />
  </div>
);

const Photo = ({ src, style, className = "" }) => (
  <div className={`photo ${className}`} style={style}>
    <div className="photo-inner" style={{ backgroundImage: `url(${src})` }} />
  </div>
);

// ============================================================
// 01 — COVER
// ============================================================
const TemplateCover = () => (
  <PaperBg>
    {/* warm vignette */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(255,220,170,.15), rgba(120,60,20,.18) 80%)", pointerEvents: "none" }} />

    {/* top tape + stamp */}
    <Tape width={140} color="cream" rotate={-4} style={{ position: "absolute", top: 30, left: "50%", marginLeft: -70 }} />

    <div style={{ position: "absolute", top: 60, right: 48, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
      <Stamp country="POSTE" value="L.500" color="terra" style={{ transform: "rotate(6deg)" }} />
    </div>

    <PassportStamp city="VOL.I" date="MCMLXXIV" color="terra" rotate={-12} style={{ position: "absolute", top: 110, left: 56 }} />

    {/* main title block */}
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 60px" }}>
      <div className="smallcaps" style={{ fontSize: 13, color: "var(--terracotta-deep)", marginBottom: 24 }}>
        — A Travelogue —
      </div>
      <Flourish width={180} color="#8b3a1e" />
      <h1 className="f-display" style={{
        fontSize: 74, lineHeight: .95, margin: "24px 0 8px",
        color: "var(--ink)",
        fontStyle: "italic",
        letterSpacing: "-.01em",
      }}>Wanderbound</h1>
      <div className="f-script" style={{ fontSize: 32, color: "var(--terracotta)", marginTop: -2 }}>
        &amp; other small adventures
      </div>
      <Flourish width={180} color="#8b3a1e" style={{ marginTop: 28 }} />
      <div className="smallcaps" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 32, lineHeight: 1.8 }}>
        Photographs · Letters · Maps<br />
        Volume One · Summer Editions
      </div>
    </div>

    {/* subtle hand drawn border ornament */}
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <rect x="36" y="36" width="528" height="528" fill="none" stroke="#8b3a1e" strokeWidth="0.8" opacity=".4" />
      <rect x="44" y="44" width="512" height="512" fill="none" stroke="#8b3a1e" strokeWidth="0.4" opacity=".3" />
      {/* corner ornaments */}
      {[[44,44,0],[556,44,90],[556,556,180],[44,556,270]].map(([x,y,r],i)=>(
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 0 L 24 0 M 0 0 L 0 24 M 4 4 Q 12 4 12 12" stroke="#8b3a1e" strokeWidth="0.8" fill="none" opacity=".55"/>
          <circle r="2" fill="#8b3a1e" opacity=".7"/>
        </g>
      ))}
    </svg>

    <div className="coffee-stain" style={{ bottom: 80, left: 60, opacity: .6 }} />
    <Botanical size={70} rotate={-20} style={{ position: "absolute", bottom: 50, right: 60, opacity: .6 }} />

    <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)", fontFamily: "Special Elite, monospace", fontSize: 11, letterSpacing: ".2em", bottom: 22 }}>
      Property of the Wanderer
    </div>
  </PaperBg>
);

// ============================================================
// 02 — TITLE / CHAPTER DIVIDER
// ============================================================
const TemplateTitle = () => (
  <PaperBg>
    <div style={{ position: "absolute", top: 56, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)" }}>Chapter Two</div>
      <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)" }}>pp. 24 – 47</div>
    </div>

    <Flourish width={120} color="#8b3a1e" style={{ position: "absolute", top: 92, left: "50%", transform: "translateX(-50%)" }} />

    {/* large overlapping number */}
    <div className="f-display" style={{
      position: "absolute", top: "26%", left: "50%", transform: "translate(-50%, -50%)",
      fontSize: 280, lineHeight: 1, color: "var(--terracotta)", opacity: .14, fontStyle: "italic",
      pointerEvents: "none",
    }}>II</div>

    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 80px" }}>
      <div className="f-script" style={{ fontSize: 32, color: "var(--terracotta-deep)", marginBottom: 8 }}>
        the long way to
      </div>
      <h2 className="f-display" style={{ fontSize: 86, lineHeight: 1, margin: 0, color: "var(--ink)", fontStyle: "italic" }}>
        Tuscany
      </h2>
      <div className="smallcaps" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 24, letterSpacing: ".4em" }}>
        June &nbsp; · &nbsp; July &nbsp; · &nbsp; 1974
      </div>
      <div style={{ marginTop: 40, maxWidth: 380 }}>
        <p className="f-serif" style={{ fontStyle: "italic", fontSize: 18, lineHeight: 1.6, color: "var(--ink-soft)", textWrap: "pretty" }}>
          “We took the slow train south, the kind with windows that open and a conductor who hummed the same six bars all the way to Orvieto.”
        </p>
      </div>
    </div>

    <Botanical size={90} rotate={-12} style={{ position: "absolute", bottom: 70, left: 70, opacity: .55 }} />
    <FernSprig size={70} rotate={20} style={{ position: "absolute", bottom: 60, right: 90, opacity: .55 }} />

    <PassportStamp city="TUSCANIA" date="VI · MCMLXXIV" shape="circle" color="olive" rotate={-15} style={{ position: "absolute", top: 140, right: 60 }} />

    <Flourish width={120} color="#8b3a1e" style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)" }} />
    <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>— ii —</div>
  </PaperBg>
);

// ============================================================
// 03 — FULL BLEED HERO PHOTO
// ============================================================
const TemplateHero = () => (
  <PaperBg>
    <Photo src={window.PHOTOS.coast} style={{ position: "absolute", inset: 0 }} />

    {/* dark gradient at bottom for text */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(20,12,6,.65) 100%)" }} />
    {/* warm color overlay */}
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(217,164,65,.08), rgba(139,58,30,.18))", mixBlendMode: "multiply" }} />

    {/* corner frame */}
    <div style={{ position: "absolute", inset: 24, border: "1px solid rgba(243,231,209,.35)", pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 32, border: "0.5px solid rgba(243,231,209,.25)", pointerEvents: "none" }} />

    {/* tape at top corners */}
    <Tape width={70} color="cream" rotate={-12} style={{ position: "absolute", top: 8, left: 36, opacity: .9 }} />
    <Tape width={70} color="cream" rotate={10} style={{ position: "absolute", top: 8, right: 36, opacity: .9 }} />

    {/* caption block */}
    <div style={{ position: "absolute", left: 56, right: 56, bottom: 56, color: "#f3e7d1" }}>
      <div className="smallcaps" style={{ fontSize: 11, opacity: .8, letterSpacing: ".4em" }}>plate xiv</div>
      <h2 className="f-display" style={{ fontSize: 52, lineHeight: 1, margin: "10px 0 8px", fontStyle: "italic" }}>
        The first sight of the sea
      </h2>
      <div className="f-script" style={{ fontSize: 26, opacity: .92 }}>
        — somewhere south of Cinque Terre, dawn —
      </div>
    </div>

    <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)", color: "#f3e7d1", opacity: .6 }}>14</div>
  </PaperBg>
);

// ============================================================
// 04 — SINGLE PHOTO WITH CAPTION
// ============================================================
const TemplateSingle = () => (
  <PaperBg>
    {/* photo centered with elegant frame */}
    <div style={{ position: "absolute", top: 60, left: 60, right: 60 }}>
      <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)", textAlign: "center", letterSpacing: ".5em" }}>
        — observed —
      </div>
      <h3 className="f-display" style={{ fontSize: 38, fontStyle: "italic", textAlign: "center", margin: "8px 0 4px", color: "var(--ink)" }}>
        A morning in Lisbon
      </h3>
      <Flourish width={80} color="#8b3a1e" style={{ display: "block", margin: "0 auto" }} />
    </div>

    <div style={{ position: "absolute", top: 170, left: 80, right: 80, bottom: 220 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", padding: 14, background: "#f7ecd4", boxShadow: "0 1px 2px rgba(0,0,0,.1), 0 18px 40px rgba(44,31,21,.22)" }}>
        <Photo src={window.PHOTOS.windows} style={{ position: "absolute", top: 14, left: 14, right: 14, bottom: 14 }} />
        <Tape width={64} color="terra" rotate={-8} style={{ position: "absolute", top: -10, left: 24 }} />
        <Tape width={64} color="terra" rotate={6} style={{ position: "absolute", top: -10, right: 24 }} />
      </div>
    </div>

    {/* journal caption */}
    <div style={{ position: "absolute", left: 80, right: 80, bottom: 90, display: "flex", gap: 24, alignItems: "flex-start" }}>
      <div style={{ flex: "0 0 auto", width: 80 }}>
        <div className="f-mono" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: ".15em" }}>JUL · 03</div>
        <div className="f-mono" style={{ fontSize: 9, color: "var(--ink-faded)", letterSpacing: ".15em", marginTop: 2 }}>07:42</div>
      </div>
      <div style={{ flex: 1, borderLeft: "1px solid var(--ink-faded)", paddingLeft: 24, opacity: .9 }}>
        <p className="f-script" style={{ fontSize: 22, lineHeight: 1.35, margin: 0, color: "var(--ink-soft)" }}>
          The yellow tram woke me before the bells did. I sat on the windowsill with cold coffee and watched the city remember itself.
        </p>
      </div>
    </div>

    <PassportStamp city="LISBOA" date="03·VII·74" color="terra" rotate={8} style={{ position: "absolute", top: 200, right: 28 }} />

    <div className="page-num">— 27 —</div>
  </PaperBg>
);

// ============================================================
// 05 — PHOTO GRID (3-up + 1 hero)
// ============================================================
const TemplateGrid = () => (
  <PaperBg>
    <div style={{ position: "absolute", top: 50, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <h3 className="f-display" style={{ fontSize: 32, fontStyle: "italic", margin: 0, color: "var(--ink)" }}>
        A week in Marrakesh
      </h3>
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-faded)", letterSpacing: ".2em" }}>IV · MMXXIV</div>
    </div>
    <Flourish width={480} color="#8b3a1e" style={{ position: "absolute", top: 92, left: 60 }} />

    {/* hero on left, 3 small on right */}
    <div style={{ position: "absolute", top: 120, left: 60, width: 260, height: 240 }}>
      <Photo src={window.PHOTOS.market} style={{ width: "100%", height: "100%" }} />
      <div className="f-script" style={{ fontSize: 16, color: "var(--ink-soft)", marginTop: 4, textAlign: "center" }}>
        the souk at dusk
      </div>
    </div>

    <div style={{ position: "absolute", top: 120, right: 60, width: 170, display: "flex", flexDirection: "column", gap: 4 }}>
      {[
        { src: window.PHOTOS.desert, cap: "the road to merzouga" },
        { src: window.PHOTOS.alley, cap: "blue alleyway" },
        { src: window.PHOTOS.food, cap: "first tagine" },
      ].map((p, i) => (
        <div key={i}>
          <Photo src={p.src} style={{ width: "100%", height: 78 }} />
          <div className="f-script" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: -1, textAlign: "center" }}>{p.cap}</div>
        </div>
      ))}
    </div>

    {/* footer journal note */}
    <div style={{ position: "absolute", left: 60, right: 60, bottom: 60, display: "flex", gap: 20, alignItems: "flex-start" }}>
      <Botanical size={40} rotate={-15} style={{ flex: "0 0 auto", opacity: .6, marginTop: -6 }} />
      <p className="f-serif" style={{ fontStyle: "italic", fontSize: 14, lineHeight: 1.45, color: "var(--ink-soft)", margin: 0, flex: 1 }}>
        Seven days were not nearly enough. The light here arrives slowly and leaves all at once — by six the walls turn the color of saffron, and by seven they are violet.
      </p>
    </div>

    <div className="page-num">— 32 —</div>
  </PaperBg>
);

// ============================================================
// 06 — POLAROID / SCRAPBOOK COLLAGE
// ============================================================
const TemplateCollage = () => (
  <PaperBg>
    <div className="coffee-stain" style={{ top: 40, right: 80, opacity: .5 }} />

    <div style={{ position: "absolute", top: 50, left: 60 }}>
      <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)" }}>scraps & souvenirs</div>
      <h3 className="f-display" style={{ fontSize: 36, fontStyle: "italic", margin: "4px 0 0", color: "var(--ink)" }}>
        Bits of Greece
      </h3>
    </div>

    {/* polaroid 1 - top left */}
    <div style={{ position: "absolute", top: 110, left: 50, width: 180, transform: "rotate(-5deg)" }}>
      <div style={{ background: "#f7ecd4", padding: "10px 10px 36px", boxShadow: "0 12px 28px rgba(44,31,21,.22)" }}>
        <Photo src={window.PHOTOS.coast} style={{ width: "100%", aspectRatio: 1 }} />
        <div className="f-script" style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center", fontSize: 16, color: "var(--ink-soft)" }}>
          Santorini, July
        </div>
      </div>
      <Tape width={60} color="terra" rotate={-12} style={{ position: "absolute", top: -10, left: 60 }} />
    </div>

    {/* polaroid 2 - center, larger */}
    <div style={{ position: "absolute", top: 220, left: "50%", marginLeft: -110, width: 220, transform: "rotate(3deg)", zIndex: 2 }}>
      <div style={{ background: "#f7ecd4", padding: "10px 10px 40px", boxShadow: "0 14px 32px rgba(44,31,21,.28)" }}>
        <Photo src={window.PHOTOS.boat} style={{ width: "100%", aspectRatio: 1 }} />
        <div className="f-script" style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center", fontSize: 18, color: "var(--ink-soft)" }}>
          ferry to Hydra
        </div>
      </div>
      <Tape width={70} color="cream" rotate={-6} style={{ position: "absolute", top: -12, left: 75 }} />
    </div>

    {/* polaroid 3 - right */}
    <div style={{ position: "absolute", top: 130, right: 60, width: 170, transform: "rotate(7deg)" }}>
      <div style={{ background: "#f7ecd4", padding: "8px 8px 32px", boxShadow: "0 10px 26px rgba(44,31,21,.22)" }}>
        <Photo src={window.PHOTOS.cafe} style={{ width: "100%", aspectRatio: 1 }} />
        <div className="f-script" style={{ position: "absolute", bottom: 6, left: 0, right: 0, textAlign: "center", fontSize: 15, color: "var(--ink-soft)" }}>
          taverna lunch
        </div>
      </div>
      <Tape width={56} color="olive" rotate={8} style={{ position: "absolute", top: -10, left: 56 }} />
    </div>

    {/* ticket */}
    <div style={{ position: "absolute", bottom: 130, left: 70, transform: "rotate(-4deg)" }}>
      <Ticket from="ATHINA" to="HYDRA" date="14·VII·74" seat="—" />
    </div>

    {/* stamp */}
    <Stamp country="HELLAS" value="Δ.5" color="burgundy" style={{ position: "absolute", bottom: 180, right: 90, transform: "rotate(8deg)" }} />

    {/* handwritten note */}
    <div style={{ position: "absolute", bottom: 60, right: 80, transform: "rotate(-2deg)", maxWidth: 220 }}>
      <p className="f-script" style={{ fontSize: 22, lineHeight: 1.3, color: "var(--ink-soft)", margin: 0 }}>
        all the blue you've ever heard about — &amp; then more.
      </p>
    </div>

    <PassportStamp city="ATHINA" date="13·VII·74" color="teal" rotate={-18} style={{ position: "absolute", bottom: 220, left: 250 }} />

    <Botanical size={70} rotate={30} style={{ position: "absolute", top: 410, left: 30, opacity: .5 }} />

    <div className="page-num">— 38 —</div>
  </PaperBg>
);

Object.assign(window, { PaperBg, Photo, TemplateCover, TemplateTitle, TemplateHero, TemplateSingle, TemplateGrid, TemplateCollage });
