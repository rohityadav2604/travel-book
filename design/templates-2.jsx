// Page templates 7-13: Map, Journal, Quote, Ephemera, Photo+Journal, Index, Back Cover

// ============================================================
// 07 — MAP PAGE WITH ROUTE
// ============================================================
const TemplateMap = () => (
  <PaperBg>
    {/* faint grid like old atlas */}
    <div style={{ position: "absolute", inset: 0,
      background: "linear-gradient(#8b3a1e 1px, transparent 1px) 0 0/40px 40px, linear-gradient(90deg, #8b3a1e 1px, transparent 1px) 0 0/40px 40px",
      opacity: .04, pointerEvents: "none" }} />

    <div style={{ position: "absolute", top: 40, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)" }}>itinerary · plate vii</div>
        <h3 className="f-display" style={{ fontSize: 30, fontStyle: "italic", margin: "4px 0 0", color: "var(--ink)" }}>
          The Italian Route
        </h3>
      </div>
      <Compass size={56} style={{ opacity: .85 }} />
    </div>

    {/* the map */}
    <div style={{ position: "absolute", top: 130, left: 50, right: 50, padding: 12, background: "#ecdcb9", boxShadow: "0 1px 2px rgba(0,0,0,.1), 0 14px 30px rgba(44,31,21,.18)" }}>
      <div style={{ border: "1px solid #6b4f3a", padding: 12, background: "#f3e7d1", overflow: "hidden" }}>
        <HandDrawnMap width={476} height={260} style={{ display: "block", margin: "0 auto" }} />
      </div>
      <Tape width={60} color="cream" rotate={-8} style={{ position: "absolute", top: -10, left: 30 }} />
      <Tape width={60} color="cream" rotate={6} style={{ position: "absolute", top: -10, right: 30 }} />
    </div>

    {/* route legend */}
    <div style={{ position: "absolute", left: 60, right: 60, bottom: 70, display: "flex", gap: 24, justifyContent: "space-between" }}>
      <div style={{ flex: "0 0 180px" }}>
        <div className="smallcaps" style={{ fontSize: 10, color: "var(--terracotta-deep)", marginBottom: 6 }}>route</div>
        <div className="f-serif" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-soft)" }}>
          <div>① Napoli &nbsp; <span style={{opacity:.6}}>3 days</span></div>
          <div>② Roma &nbsp; <span style={{opacity:.6}}>5 days</span></div>
          <div>③ Firenze &nbsp; <span style={{opacity:.6}}>4 days</span></div>
          <div>④ Venezia &nbsp; <span style={{opacity:.6}}>3 days</span></div>
        </div>
      </div>
      <div style={{ flex: 1, fontStyle: "italic" }}>
        <p className="f-script" style={{ fontSize: 18, lineHeight: 1.3, color: "var(--ink-soft)", margin: 0 }}>
          850 km of slow trains, three stolen siestas, &amp; one entirely unintentional stop in a town with no name on any map.
        </p>
      </div>
    </div>

    <div className="page-num">— 22 —</div>
  </PaperBg>
);

// ============================================================
// 08 — JOURNAL / DIARY ENTRY
// ============================================================
const TemplateJournal = () => (
  <PaperBg>
    {/* ruled lines */}
    <div style={{ position: "absolute", top: 200, left: 80, right: 80, bottom: 100,
      backgroundImage: "linear-gradient(transparent 27px, rgba(74,53,38,.2) 28px)",
      backgroundSize: "100% 28px", pointerEvents: "none" }} />
    {/* margin red line */}
    <div style={{ position: "absolute", top: 60, bottom: 60, left: 130, width: 1, background: "rgba(185,83,46,.45)" }} />

    {/* header date */}
    <div style={{ position: "absolute", top: 50, left: 80, right: 230, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, paddingBottom: 8, borderBottom: "1px solid var(--ink-faded)" }}>
      <div className="f-script" style={{ fontSize: 22, color: "var(--ink-soft)", whiteSpace: "nowrap" }}>Tuesday, the 16th</div>
      <div className="f-mono" style={{ fontSize: 8, color: "var(--ink-faded)", letterSpacing: ".15em", whiteSpace: "nowrap" }}>FAIR &amp; WINDY</div>
    </div>

    <div className="f-display" style={{ position: "absolute", top: 92, left: 80, fontSize: 28, fontStyle: "italic", color: "var(--terracotta-deep)" }}>
      Kyoto, evening
    </div>

    {/* journal text */}
    <div style={{ position: "absolute", top: 180, left: 145, right: 80, bottom: 110 }}>
      <p className="f-script dropcap" style={{ fontSize: 21, lineHeight: 1.33, color: "var(--ink-soft)", margin: 0, textWrap: "pretty" }}>
        Today began before the sun did. We climbed Fushimi Inari while the gates were still wet from morning rain, and the foxes seemed to watch us from every shrine. M. counted 412 torii before she stopped counting. I lost count somewhere around the seventh switchback, when I sat on a stone bench and ate a peach so ripe it stained my journal. I have left the page in. It looks like a sunset.
      </p>
      <p className="f-script" style={{ fontSize: 21, lineHeight: 1.33, color: "var(--ink-soft)", marginTop: 16, textWrap: "pretty" }}>
        We took the slow train back. A boy across the aisle offered me a paper crane. I am keeping it here, between this page and the next.
      </p>
    </div>

    {/* paperclip + small photo */}
    <div style={{ position: "absolute", top: 110, right: 60, transform: "rotate(6deg)" }}>
      <div style={{ background: "#f7ecd4", padding: "8px 8px 22px", boxShadow: "0 8px 18px rgba(44,31,21,.2)", width: 130 }}>
        <Photo src={window.PHOTOS.temple} style={{ width: "100%", aspectRatio: 1 }} />
        <div className="f-script" style={{ position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center", fontSize: 13, color: "var(--ink-soft)" }}>
          Fushimi
        </div>
      </div>
      {/* paperclip */}
      <svg width="40" height="60" viewBox="0 0 40 60" style={{ position: "absolute", top: -20, left: 50 }}>
        <path d="M10 8 Q 10 4 14 4 L 28 4 Q 32 4 32 8 L 32 48 Q 32 54 26 54 Q 20 54 20 48 L 20 14 Q 20 10 24 10 L 24 42"
          stroke="#7a6a5a" strokeWidth="1.5" fill="none" />
      </svg>
    </div>

    {/* signature */}
    <div style={{ position: "absolute", bottom: 60, right: 100 }}>
      <div className="f-script" style={{ fontSize: 28, color: "var(--ink)", transform: "rotate(-4deg)" }}>— E.</div>
    </div>

    <PassportStamp city="KYOTO" date="16·X·74" shape="circle" color="burgundy" rotate={12} style={{ position: "absolute", bottom: 130, left: 50 }} />

    <div className="page-num">— 41 —</div>
  </PaperBg>
);

// ============================================================
// 09 — QUOTE / TYPOGRAPHY PAGE
// ============================================================
const TemplateQuote = () => (
  <PaperBg>
    {/* warm vignette */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(255,220,170,.22), transparent 60%)" }} />

    {/* big quotation marks */}
    <div className="f-display" style={{
      position: "absolute", top: 70, left: 60, fontSize: 220, lineHeight: 1, color: "var(--terracotta)", opacity: .25, fontStyle: "italic",
    }}>“</div>
    <div className="f-display" style={{
      position: "absolute", bottom: 0, right: 60, fontSize: 220, lineHeight: 1, color: "var(--terracotta)", opacity: .25, fontStyle: "italic",
    }}>”</div>

    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 90px", textAlign: "center" }}>
      <Flourish width={140} color="#8b3a1e" />
      <p className="f-display" style={{
        fontSize: 44, lineHeight: 1.2, fontStyle: "italic", color: "var(--ink)", margin: "32px 0", textWrap: "balance",
      }}>
        Not all those who wander<br />are lost — some of us<br />are simply taking the long way home.
      </p>
      <Flourish width={140} color="#8b3a1e" />
      <div className="f-script" style={{ fontSize: 26, marginTop: 28, color: "var(--terracotta-deep)" }}>
        — found in a guesthouse in Hanoi
      </div>
      <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)", marginTop: 16, letterSpacing: ".4em" }}>
        author unknown · 1971
      </div>
    </div>

    <FernSprig size={70} rotate={-30} style={{ position: "absolute", top: 80, right: 60, opacity: .5 }} />
    <Botanical size={80} rotate={20} style={{ position: "absolute", bottom: 80, left: 50, opacity: .5 }} />

    <div className="page-num">— 50 —</div>
  </PaperBg>
);

// ============================================================
// 10 — TICKET STUBS & EPHEMERA
// ============================================================
const TemplateEphemera = () => (
  <PaperBg>
    <div style={{ position: "absolute", top: 50, left: 60, right: 60 }}>
      <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)" }}>kept &amp; collected</div>
      <h3 className="f-display" style={{ fontSize: 38, fontStyle: "italic", margin: "4px 0 0", color: "var(--ink)" }}>
        Things from pockets
      </h3>
      <Flourish width={140} color="#8b3a1e" style={{ marginTop: 12 }} />
    </div>

    <div className="coffee-stain" style={{ top: 250, left: 200, opacity: .35, width: 80, height: 80 }} />

    {/* ticket 1 */}
    <div style={{ position: "absolute", top: 150, left: 60, transform: "rotate(-3deg)", width: 320 }}>
      <Ticket from="LONDON" to="PARIS" date="22·IX·74" seat="14B" />
    </div>

    {/* boarding pass-style */}
    <div style={{ position: "absolute", top: 220, right: 50, transform: "rotate(4deg)", background: "#ecdcb9", padding: "10px 14px", boxShadow: "0 8px 20px rgba(44,31,21,.18)", border: "1px solid #6b4f3a", width: 200 }}>
      <div className="f-mono" style={{ fontSize: 8, color: "var(--ink-faded)", letterSpacing: ".2em", borderBottom: "1px dashed #6b4f3a", paddingBottom: 5 }}>
        BOARDING PASS · 1stCLASS
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <div>
          <div className="f-mono" style={{ fontSize: 7, color: "var(--ink-faded)" }}>FROM</div>
          <div className="f-display" style={{ fontSize: 20, color: "var(--ink)" }}>CDG</div>
        </div>
        <div style={{ alignSelf: "center", color: "var(--terracotta)", fontSize: 18 }}>→</div>
        <div>
          <div className="f-mono" style={{ fontSize: 7, color: "var(--ink-faded)" }}>TO</div>
          <div className="f-display" style={{ fontSize: 20, color: "var(--ink)" }}>FCO</div>
        </div>
      </div>
      <div className="f-mono" style={{ fontSize: 8, color: "var(--ink-soft)", marginTop: 6, letterSpacing: ".15em" }}>
        FLT AZ-414 · 14:20 · GATE B7
      </div>
    </div>

    {/* postcard */}
    <div style={{ position: "absolute", top: 320, left: 70, transform: "rotate(-1deg)", width: 260, padding: 6, background: "#f7ecd4", boxShadow: "0 12px 28px rgba(44,31,21,.2)" }}>
      <div style={{ border: "1px solid #8b3a1e", padding: 10, position: "relative" }}>
        <div className="f-display" style={{ fontSize: 16, fontStyle: "italic", color: "var(--terracotta-deep)" }}>Greetings from Paris</div>
        <div className="f-script" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.3, paddingRight: 56 }}>
          The cafés are exactly as small &amp; perfect as you said. I have eaten my weight in croissants. Wish you were here.
        </div>
        <div className="f-script" style={{ fontSize: 14, color: "var(--ink)", marginTop: 4, textAlign: "right" }}>— love, A.</div>
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <Stamp country="FRANCE" value="0,80F" color="terra" />
        </div>
      </div>
    </div>

    {/* coins / tokens drawn */}
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: "absolute", bottom: 90, right: 100, transform: "rotate(8deg)" }}>
      <circle cx="40" cy="40" r="32" fill="#c89441" opacity=".7" stroke="#8b3a1e" strokeWidth="1" />
      <circle cx="40" cy="40" r="26" fill="none" stroke="#8b3a1e" strokeWidth="0.6" opacity=".8" />
      <text x="40" y="32" textAnchor="middle" fontSize="8" fill="#3a2a1c" fontFamily="Cormorant SC, serif" letterSpacing="1">REPVBLICA</text>
      <text x="40" y="48" textAnchor="middle" fontSize="14" fill="#3a2a1c" fontFamily="DM Serif Display, serif">100</text>
      <text x="40" y="60" textAnchor="middle" fontSize="6" fill="#3a2a1c" fontFamily="Cormorant SC, serif" letterSpacing="1">LIRE</text>
    </svg>

    {/* matchbook */}
    <div style={{ position: "absolute", bottom: 80, left: 70, transform: "rotate(-6deg)", width: 100, height: 60, background: "linear-gradient(180deg, #8b3a1e 0%, #8b3a1e 60%, #4a1a14 60%, #4a1a14 100%)", padding: "8px 10px", color: "#f3e7d1", boxShadow: "0 6px 14px rgba(0,0,0,.25)" }}>
      <div className="f-display" style={{ fontSize: 12, fontStyle: "italic", lineHeight: 1 }}>Caffè</div>
      <div className="f-display" style={{ fontSize: 14, fontStyle: "italic", lineHeight: 1 }}>Trastevere</div>
      <div className="f-mono" style={{ fontSize: 6, letterSpacing: ".15em", marginTop: 4, opacity: .8 }}>EST. 1894 · ROMA</div>
    </div>

    <div className="page-num">— 56 —</div>
  </PaperBg>
);

// ============================================================
// 11 — PHOTO + JOURNAL MIX (two-column)
// ============================================================
const TemplatePhotoJournal = () => (
  <PaperBg>
    <div style={{ position: "absolute", top: 56, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: ".4em" }}>field notes &amp; photographs</div>
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-faded)", letterSpacing: ".15em" }}>VIII · 1974</div>
    </div>

    <h3 className="f-display" style={{ position: "absolute", top: 88, left: 60, right: 60, fontSize: 42, fontStyle: "italic", margin: 0, color: "var(--ink)" }}>
      The drive to Provence
    </h3>
    <Flourish width={520} color="#8b3a1e" style={{ position: "absolute", top: 142, left: 60 }} />

    {/* left column — photos */}
    <div style={{ position: "absolute", top: 170, left: 60, width: 240, display: "flex", flexDirection: "column", gap: 14 }}>
      <Photo src={window.PHOTOS.field} style={{ width: "100%", aspectRatio: "4/3" }} />
      <div className="f-script" style={{ fontSize: 16, color: "var(--ink-soft)", textAlign: "center", marginTop: -6 }}>
        — lavender, mile 142 —
      </div>
      <Photo src={window.PHOTOS.village} style={{ width: "100%", aspectRatio: "4/5" }} />
      <div className="f-script" style={{ fontSize: 16, color: "var(--ink-soft)", textAlign: "center", marginTop: -6 }}>
        — Gordes at noon —
      </div>
    </div>

    {/* right column — journal */}
    <div style={{ position: "absolute", top: 170, left: 320, right: 60, bottom: 100 }}>
      <div className="f-mono" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: ".15em", marginBottom: 10 }}>
        AUG · 08 &nbsp;·&nbsp; 14:20
      </div>
      <p className="f-serif dropcap" style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink)", textWrap: "pretty", margin: 0 }}>
        We rented the smallest car they had — a Citroën the color of butter — and drove without a map. The lavender begins all at once: one bend in the road and the world is purple. I made M. stop three times in the first hour just to stand in it.
      </p>
      <p className="f-serif" style={{ fontSize: 17, lineHeight: 1.55, color: "var(--ink-soft)", textWrap: "pretty", marginTop: 14, fontStyle: "italic" }}>
        For lunch — peaches, hard cheese, a baguette torn in half, warm rosé from a paper cup. We ate on the hood of the car and watched a man on a bicycle go by twice without explaining why.
      </p>

      <div style={{ marginTop: 18, padding: "14px 16px", borderLeft: "3px solid var(--terracotta)", background: "rgba(217,164,65,.12)" }}>
        <div className="smallcaps" style={{ fontSize: 9, color: "var(--terracotta-deep)" }}>kept</div>
        <div className="f-script" style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 4 }}>
          three sprigs of lavender, pressed between p. 64 &amp; p. 65.
        </div>
      </div>
    </div>

    <PostageMark city="VIA AVION" style={{ position: "absolute", bottom: 70, right: 80, transform: "rotate(-4deg)" }} />
    <Botanical size={50} rotate={-20} style={{ position: "absolute", bottom: 60, left: 30, opacity: .55 }} />

    <div className="page-num">— 64 —</div>
  </PaperBg>
);

// ============================================================
// 12 — INDEX / ITINERARY
// ============================================================
const TemplateIndex = () => (
  <PaperBg>
    <div style={{ position: "absolute", top: 56, left: 60, right: 60, textAlign: "center" }}>
      <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: ".5em" }}>contents</div>
      <h3 className="f-display" style={{ fontSize: 44, fontStyle: "italic", margin: "8px 0 4px", color: "var(--ink)" }}>
        The Whole Journey
      </h3>
      <Flourish width={160} color="#8b3a1e" style={{ display: "block", margin: "0 auto" }} />
    </div>

    <div style={{ position: "absolute", top: 170, left: 80, right: 80 }}>
      {[
        { num: "I", title: "How it began", sub: "London — a packing list, a postcard", page: "01" },
        { num: "II", title: "The long way to Tuscany", sub: "Naples · Rome · Florence · Venice", page: "24" },
        { num: "III", title: "An interlude in Provence", sub: "Lavender, butter-yellow Citroën", page: "62" },
        { num: "IV", title: "Bits of Greece", sub: "Athens · Hydra · Santorini", page: "84" },
        { num: "V", title: "All the way home", sub: "Marseille — and a long quiet train", page: "108" },
      ].map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 18, padding: "14px 0", borderBottom: i < 4 ? "1px dashed rgba(74,53,38,.3)" : "none" }}>
          <div className="f-display" style={{ fontSize: 28, fontStyle: "italic", color: "var(--terracotta)", minWidth: 40 }}>{c.num}</div>
          <div style={{ flex: 1 }}>
            <div className="f-display" style={{ fontSize: 22, fontStyle: "italic", color: "var(--ink)" }}>{c.title}</div>
            <div className="f-script" style={{ fontSize: 16, color: "var(--ink-soft)", marginTop: 2 }}>{c.sub}</div>
          </div>
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 40, height: 1, borderTop: "1px dotted var(--ink-faded)" }} />
            <div className="f-mono" style={{ fontSize: 13, color: "var(--ink-soft)", letterSpacing: ".1em" }}>p. {c.page}</div>
          </div>
        </div>
      ))}
    </div>

    {/* total stats */}
    <div style={{ position: "absolute", bottom: 70, left: 80, right: 80, display: "flex", justifyContent: "space-around", paddingTop: 18, borderTop: "1px solid var(--ink-faded)" }}>
      {[
        { num: "11", label: "countries" },
        { num: "37", label: "cities" },
        { num: "94", label: "days" },
        { num: "212", label: "photographs" },
      ].map((s, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div className="f-display" style={{ fontSize: 32, fontStyle: "italic", color: "var(--terracotta-deep)", lineHeight: 1 }}>{s.num}</div>
          <div className="smallcaps" style={{ fontSize: 9, color: "var(--ink-faded)", marginTop: 4, letterSpacing: ".3em" }}>{s.label}</div>
        </div>
      ))}
    </div>

    <FernSprig size={50} rotate={-15} style={{ position: "absolute", top: 130, left: 30, opacity: .5 }} />
    <FernSprig size={50} rotate={15} style={{ position: "absolute", top: 130, right: 30, opacity: .5, transform: "scaleX(-1)" }} />

    <div className="page-num">— iii —</div>
  </PaperBg>
);

// ============================================================
// 13 — BACK COVER
// ============================================================
const TemplateBack = () => (
  <PaperBg>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, rgba(255,220,170,.15), rgba(120,60,20,.18) 80%)", pointerEvents: "none" }} />

    {/* postage mark blocks like a letter back */}
    <div style={{ position: "absolute", top: 60, right: 60, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
      <Stamp country="MUNDO" value="∞" color="olive" style={{ transform: "rotate(-6deg)" }} />
      <PassportStamp city="THE END" date="MCMLXXIV" color="terra" rotate={6} />
    </div>

    {/* address-block style memory */}
    <div style={{ position: "absolute", top: 120, left: 60, width: 280 }}>
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-faded)", letterSpacing: ".2em", marginBottom: 10 }}>
        — RETURN TO —
      </div>
      <div className="f-script" style={{ fontSize: 24, color: "var(--ink), marginBottom: 4" }}>
        the one who wandered
      </div>
      <div className="f-script" style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.4 }}>
        c/o the kitchen table<br />
        a small flat by the river<br />
        somewhere quiet, again
      </div>
    </div>

    {/* big sentiment */}
    <div style={{ position: "absolute", top: "44%", left: 60, right: 60, textAlign: "center" }}>
      <Flourish width={180} color="#8b3a1e" style={{ display: "block", margin: "0 auto 28px" }} />
      <p className="f-display" style={{ fontSize: 36, fontStyle: "italic", lineHeight: 1.25, color: "var(--ink)", margin: 0, textWrap: "balance" }}>
        And so we came home,<br />
        full of weather &amp; cheese<br />
        &amp; impossible light.
      </p>
      <Flourish width={180} color="#8b3a1e" style={{ display: "block", margin: "28px auto 0" }} />
    </div>

    {/* colophon */}
    <div style={{ position: "absolute", bottom: 110, left: 60, right: 60, textAlign: "center" }}>
      <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)", letterSpacing: ".4em" }}>colophon</div>
      <p className="f-serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-soft)", lineHeight: 1.6, marginTop: 8, maxWidth: 360, margin: "8px auto 0" }}>
        Bound &amp; printed in a small shop near the harbor. Set in Cormorant &amp; Caveat. Two hundred copies — this is no. 047.
      </p>
    </div>

    {/* corner border */}
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <rect x="36" y="36" width="528" height="528" fill="none" stroke="#8b3a1e" strokeWidth="0.8" opacity=".4" />
      <rect x="44" y="44" width="512" height="512" fill="none" stroke="#8b3a1e" strokeWidth="0.4" opacity=".3" />
    </svg>

    <Botanical size={70} rotate={-25} style={{ position: "absolute", bottom: 50, left: 70, opacity: .5 }} />
    <FernSprig size={60} rotate={20} style={{ position: "absolute", bottom: 50, right: 70, opacity: .5 }} />

    <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)", fontFamily: "Special Elite, monospace", fontSize: 10, letterSpacing: ".25em" }}>
      ~ FIN ~
    </div>
  </PaperBg>
);

Object.assign(window, { TemplateMap, TemplateJournal, TemplateQuote, TemplateEphemera, TemplatePhotoJournal, TemplateIndex, TemplateBack });
