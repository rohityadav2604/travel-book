// Mountain templates 8-13

// === 08 TOPO MAP ===
const MTMap = () => (
  <MPaperBg>
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(58,68,56,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(58,68,56,.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

    <div style={{ position: "absolute", top: 40, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="m-caps" style={{ color: "var(--m-ink-faded)", whiteSpace: "nowrap", fontSize: 9 }}>Plate · IX &nbsp;/&nbsp; Topographic survey</div>
        <h3 className="m-display" style={{ fontSize: 28, fontStyle: "italic", margin: "4px 0 0", fontWeight: 300, color: "var(--m-pine)", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>The summit traverse</h3>
      </div>
      <MCompass size={56} style={{ flex: "0 0 auto" }} />
    </div>

    <div style={{ position: "absolute", top: 130, left: 50, right: 50, padding: 14, background: "var(--m-bone)", border: "1px solid var(--m-ink-faded)", boxShadow: "0 14px 30px rgba(20,30,25,.18)" }}>
      <TopoMap width={476} height={260} />
    </div>

    <div style={{ position: "absolute", top: 430, left: 60, right: 60 }}>
      <div className="m-caps" style={{ fontSize: 9, color: "var(--m-moss)", marginBottom: 6 }}>ELEVATION PROFILE</div>
      <ElevationProfile width={480} height={56} />
    </div>

    <div style={{ position: "absolute", left: 60, right: 60, bottom: 56, display: "flex", gap: 28 }}>
      <div style={{ flex: 1 }}>
        <div className="m-caps" style={{ fontSize: 9, color: "var(--m-moss)" }}>ROUTE</div>
        <div className="m-mono" style={{ fontSize: 11, color: "var(--m-ink-soft)", marginTop: 6, lineHeight: 1.7 }}>
          <div>① trailhead &nbsp; <span style={{opacity:.5}}>0 km · 1,120m</span></div>
          <div>② summit &nbsp; <span style={{opacity:.5}}>14 km · 2,847m</span></div>
          <div>③ saddle ridge &nbsp; <span style={{opacity:.5}}>22 km · 2,610m</span></div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="m-caps" style={{ fontSize: 9, color: "var(--m-moss)" }}>STATS</div>
        <div className="m-mono" style={{ fontSize: 11, color: "var(--m-ink-soft)", marginTop: 6, lineHeight: 1.7 }}>
          <div>distance &nbsp;<span style={{opacity:.5}}>34 km</span></div>
          <div>elev. gain &nbsp;<span style={{opacity:.5}}>+1,727m</span></div>
          <div>moving time &nbsp;<span style={{opacity:.5}}>11h 22m</span></div>
        </div>
      </div>
    </div>

    <div className="m-pagenum">— 22 —</div>
  </MPaperBg>
);

// === 09 FIELD JOURNAL === photo-led split
const MTJournal = () => (
  <MPaperBg>
    <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 260 }}>
      <MPhoto src={M_PHOTO_URLS.ridge} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,30,25,.2), rgba(20,30,25,.5))" }} />
      <div style={{ position: "absolute", top: 50, left: 24, right: 24, color: "#ecebe2" }}>
        <div className="m-caps" style={{ fontSize: 9, opacity: .9, letterSpacing: ".35em" }}>DAY 9</div>
        <h3 className="m-display" style={{ fontSize: 36, fontStyle: "italic", margin: "8px 0 0", lineHeight: 1, fontWeight: 300, letterSpacing: "-.02em", textShadow: "0 2px 6px rgba(0,0,0,.5)" }}>The saddle</h3>
      </div>
      <div style={{ position: "absolute", bottom: 30, left: 24, right: 24, color: "#b8c2a3" }}>
        <div className="m-mono" style={{ fontSize: 9, letterSpacing: ".15em" }}>OCT · 18 · 14h 06</div>
        <div className="m-mono" style={{ fontSize: 9, letterSpacing: ".15em", marginTop: 4, opacity: .8 }}>NW 22kt · -2°C</div>
      </div>
    </div>

    <div style={{ position: "absolute", top: 56, left: 290, right: 56, bottom: 56 }}>
      <div className="m-caps" style={{ fontSize: 9, color: "var(--m-moss)", letterSpacing: ".3em" }}>FIELD JOURNAL</div>
      <MRule width={50} color="var(--m-moss)" style={{ marginTop: 10 }} />

      <p className="m-serif" style={{ fontSize: 13, lineHeight: 1.7, color: "var(--m-ink)", margin: "20px 0 0", textWrap: "pretty", fontStyle: "italic" }}>
        Crossed the saddle in low cloud. The cairns kept their distance and the wind kept ours.
      </p>
      <p className="m-script" style={{ fontSize: 17, lineHeight: 1.4, color: "var(--m-ink-soft)", margin: "14px 0 0", textWrap: "pretty" }}>
        Saw a chamois. Did not photograph it.
      </p>

      <div style={{ marginTop: 22, paddingTop: 14, borderTop: "1px solid var(--m-ink-faded)" }}>
        <div className="m-caps" style={{ fontSize: 9, color: "var(--m-moss)", letterSpacing: ".25em" }}>SIGHTINGS</div>
        <div className="m-mono" style={{ fontSize: 10, color: "var(--m-ink-soft)", marginTop: 8, lineHeight: 1.7 }}>
          chamois · 1 &nbsp;&nbsp; raven · 4<br/>
          ibex sign · yes &nbsp;&nbsp; wolf · no
        </div>
        <AnimalTracks style={{ marginTop: 10, opacity: .8, width: "100%" }} />
      </div>

      <div className="m-script" style={{ position: "absolute", bottom: 0, right: 0, fontSize: 22, color: "var(--m-pine)" }}>— E.</div>
    </div>

    <div className="m-pagenum">— 41 —</div>
  </MPaperBg>
);

// === 10 QUOTE === photo-led, less text
const MTQuote = () => (
  <MPaperBg variant="dark">
    <MPhoto src={M_PHOTO_URLS.alpine} style={{ position: "absolute", inset: 0, opacity: .55 }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,30,25,.55), rgba(20,30,25,.85))" }} />

    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 80px", textAlign: "center", color: "#ecebe2" }}>
      <MRule width={50} color="#b8c2a3" />
      <p className="m-display" style={{ fontSize: 36, lineHeight: 1.25, fontStyle: "italic", margin: "30px 0", fontWeight: 300, textWrap: "balance", letterSpacing: "-.01em", textShadow: "0 2px 12px rgba(0,0,0,.5)" }}>
        We climb not to leave the world, but to look at it from a quieter window.
      </p>
      <MRule width={50} color="#b8c2a3" />
      <div className="m-script" style={{ fontSize: 20, color: "#b8c2a3", marginTop: 24 }}>— from the cabin journal</div>
    </div>

    <div className="m-pagenum" style={{ left: "50%", transform: "translateX(-50%)", color: "#b8c2a3" }}>— 50 —</div>
  </MPaperBg>
);

// === 11 PHOTO + JOURNAL MIX === photo-led
const MTPhotoJournal = () => (
  <MPaperBg>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 320 }}>
      <MPhoto src={M_PHOTO_URLS.valley} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,30,25,.45) 0%, transparent 40%, transparent 70%, rgba(236,235,226,.95) 100%)" }} />
      <div style={{ position: "absolute", top: 40, left: 56, right: 56, color: "#ecebe2" }}>
        <div className="m-caps" style={{ fontSize: 9, opacity: .85, letterSpacing: ".4em" }}>NOTES &amp; OBSERVATIONS · X · MMXXIV</div>
        <h3 className="m-display" style={{ fontSize: 38, fontStyle: "italic", margin: "10px 0 0", fontWeight: 300, letterSpacing: "-.02em", textShadow: "0 2px 8px rgba(0,0,0,.5)" }}>The descent into pine</h3>
      </div>
    </div>

    <div style={{ position: "absolute", top: 340, left: 56, right: 56, bottom: 56, display: "grid", gridTemplateColumns: "150px 1fr", gap: 18 }}>
      <div>
        <MPhoto src={M_PHOTO_URLS.river} style={{ width: "100%", height: 130 }} archival />
        <div className="m-caps" style={{ fontSize: 8, color: "var(--m-ink-faded)", marginTop: 6, letterSpacing: ".2em" }}>RIVER · DAY 14</div>
        <div className="m-mono" style={{ fontSize: 8, color: "var(--m-ink-faded)", letterSpacing: ".15em", marginTop: 8 }}>OCT · 23</div>
        <div className="m-mono" style={{ fontSize: 8, color: "var(--m-ink-faded)", letterSpacing: ".15em" }}>16h 42 · 7°C</div>
      </div>
      <div>
        <p className="m-serif" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--m-ink)", textWrap: "pretty", margin: 0, fontStyle: "italic" }}>
          The trees came back slowly — first one or two, then a thicket, then the whole green roof of the lower mountain.
        </p>
        <div style={{ marginTop: 12, padding: "10px 14px", borderLeft: "2px solid var(--m-moss)", background: "rgba(74,99,70,.08)" }}>
          <div className="m-caps" style={{ fontSize: 8, color: "var(--m-moss)", letterSpacing: ".25em" }}>FOUND</div>
          <div className="m-script" style={{ fontSize: 16, color: "var(--m-ink-soft)", marginTop: 4, lineHeight: 1.3 }}>
            jay feather · three grey stones · a pinecone the size of a fist
          </div>
        </div>
      </div>
    </div>

    <PressedLeaf size={36} rotate={-15} style={{ position: "absolute", bottom: 30, right: 30, opacity: .55 }} />
    <div className="m-pagenum">— 64 —</div>
  </MPaperBg>
);

// === 12 TRAIL LOG + STATS ===
const MTTrailLog = () => (
  <MPaperBg variant="bone">
    <div style={{ position: "absolute", top: 50, left: 60, right: 60 }}>
      <div className="m-caps" style={{ color: "var(--m-ink-faded)" }}>Appendix · Trail Log</div>
      <h3 className="m-display" style={{ fontSize: 32, fontStyle: "italic", margin: "4px 0 0", color: "var(--m-pine)", fontWeight: 300, letterSpacing: "-.02em" }}>Twenty-one days</h3>
      <MRule width={80} color="var(--m-moss)" style={{ marginTop: 10 }} />
    </div>

    <div style={{ position: "absolute", top: 140, left: 60, right: 60, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      {[
        { n: "21", l: "days on foot" },
        { n: "68", l: "kilometres", u: "km" },
        { n: "+4,210", l: "elev. gain", u: "m" },
        { n: "2,847", l: "high point", u: "m" },
      ].map((s, i) => (
        <div key={i} style={{ background: "var(--m-paper)", padding: "14px 12px", border: "1px solid var(--m-ink-faded)" }}>
          <div className="m-display" style={{ fontSize: 28, fontStyle: "italic", color: "var(--m-pine)", lineHeight: 1, fontWeight: 300 }}>
            {s.n}<span style={{ fontSize: 12, color: "var(--m-ink-faded)", marginLeft: 2 }}>{s.u || ""}</span>
          </div>
          <div className="m-caps" style={{ fontSize: 8, color: "var(--m-ink-faded)", marginTop: 8 }}>{s.l}</div>
        </div>
      ))}
    </div>

    <div style={{ position: "absolute", top: 260, left: 60, right: 60 }}>
      <div className="m-caps" style={{ fontSize: 9, color: "var(--m-moss)", marginBottom: 10 }}>DAILY LOG</div>
      <div style={{ display: "grid", gridTemplateColumns: "30px 80px 80px 1fr 60px", gap: 6, fontSize: 11, color: "var(--m-ink-soft)" }} className="m-mono">
        <div className="m-caps" style={{ fontSize: 8, color: "var(--m-ink-faded)" }}>D</div>
        <div className="m-caps" style={{ fontSize: 8, color: "var(--m-ink-faded)" }}>FROM</div>
        <div className="m-caps" style={{ fontSize: 8, color: "var(--m-ink-faded)" }}>TO</div>
        <div className="m-caps" style={{ fontSize: 8, color: "var(--m-ink-faded)" }}>NOTE</div>
        <div className="m-caps" style={{ fontSize: 8, color: "var(--m-ink-faded)", textAlign: "right" }}>KM</div>
        {[
          ["1", "Innsbruck", "Hütte 1", "rain, late start", "8.4"],
          ["3", "Hütte 1", "Lake Camp", "first cold night", "11.2"],
          ["7", "Lake Camp", "Saddle Hut", "crossed snowline", "9.8"],
          ["9", "Saddle Hut", "Summit Camp", "see folio 41", "6.1"],
          ["10", "Summit Camp", "Summit", "clear morning", "3.4"],
          ["14", "Pine Lodge", "River", "easy day", "7.0"],
          ["18", "River", "Lower Cabin", "wind, fast walking", "12.6"],
          ["21", "Lower Cabin", "Innsbruck", "—", "9.5"],
        ].map((r, i) => (
          <React.Fragment key={i}>
            <div style={{ borderTop: "1px solid rgba(58,68,56,.15)", paddingTop: 6 }}>{r[0]}</div>
            <div style={{ borderTop: "1px solid rgba(58,68,56,.15)", paddingTop: 6 }}>{r[1]}</div>
            <div style={{ borderTop: "1px solid rgba(58,68,56,.15)", paddingTop: 6 }}>{r[2]}</div>
            <div style={{ borderTop: "1px solid rgba(58,68,56,.15)", paddingTop: 6, fontStyle: "italic", color: "var(--m-ink-faded)" }}>{r[3]}</div>
            <div style={{ borderTop: "1px solid rgba(58,68,56,.15)", paddingTop: 6, textAlign: "right" }}>{r[4]}</div>
          </React.Fragment>
        ))}
      </div>
    </div>

    <div className="m-pagenum">— 88 —</div>
  </MPaperBg>
);

// === 13 SPECIMEN / PRESSED LEAF ===
const MTSpecimen = () => (
  <MPaperBg>
    <div style={{ position: "absolute", top: 50, left: 60, right: 60 }}>
      <div className="m-caps" style={{ color: "var(--m-ink-faded)" }}>Herbarium &amp; Specimens</div>
      <h3 className="m-display" style={{ fontSize: 32, fontStyle: "italic", margin: "4px 0 0", color: "var(--m-pine)", fontWeight: 300, letterSpacing: "-.02em" }}>Found along the way</h3>
      <MRule width={80} color="var(--m-moss)" style={{ marginTop: 10 }} />
    </div>

    <div style={{ position: "absolute", top: 140, left: 60, right: 60, bottom: 60, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 14 }}>
      {[
        { Item: <Fern size={70} rotate={-5} />, name: "Asplenium trichomanes", common: "maidenhair spleenwort", date: "OCT · 12", loc: "1,640m · north slope" },
        { Item: <PressedLeaf size={75} rotate={6} />, name: "Acer pseudoplatanus", common: "sycamore maple", date: "OCT · 18", loc: "1,210m · valley" },
        { Item: <RockSpec />, name: "Granitic gneiss", common: "ridge stone, weathered", date: "OCT · 21", loc: "2,610m · saddle" },
        { Item: <PressedLeaf size={65} rotate={-12} />, name: "Sorbus aucuparia", common: "rowan, autumn leaf", date: "OCT · 22", loc: "1,840m · trail" },
      ].map((sp, i) => (
        <div key={i} style={{ border: "1px solid var(--m-ink-faded)", padding: 14, background: "var(--m-bone)", position: "relative", display: "flex", flexDirection: "column" }}>
          <div className="m-caps" style={{ fontSize: 8, color: "var(--m-ink-faded)", letterSpacing: ".25em" }}>SPECIMEN · 0{i+1}</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0" }}>
            {sp.Item}
          </div>
          <div className="m-display" style={{ fontSize: 14, fontStyle: "italic", color: "var(--m-pine)", letterSpacing: "-.01em" }}>{sp.name}</div>
          <div className="m-serif" style={{ fontSize: 11, color: "var(--m-ink-soft)", fontStyle: "italic", marginTop: 1 }}>{sp.common}</div>
          <div className="m-mono" style={{ fontSize: 8, color: "var(--m-ink-faded)", letterSpacing: ".1em", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
            <span>{sp.date}</span><span>{sp.loc}</span>
          </div>
          <TrailBlaze style={{ position: "absolute", top: 8, right: 10 }} />
        </div>
      ))}
    </div>

    <div className="m-pagenum">— 96 —</div>
  </MPaperBg>
);

Object.assign(window, { MTMap, MTJournal, MTQuote, MTPhotoJournal, MTTrailLog, MTSpecimen });
