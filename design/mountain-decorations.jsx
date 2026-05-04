// Mountain decorations + templates — single file
const M_PHOTO_URLS = {
  summit:     "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80",
  peaks:      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
  mistForest: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
  waterfall:  "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&q=80",
  lake:       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  trail:      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
  ridge:      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
  pine:       "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1200&q=80",
  river:      "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1200&q=80",
  fog:        "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200&q=80",
  rocks:      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
  alpine:     "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
  moss:       "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80",
  cabin:      "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?w=1200&q=80",
  valley:     "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
};

const MPaperBg = ({ children, variant = "light" }) => (
  <div className={`m-page ${variant === "dark" ? "dark" : variant === "slate" ? "slate" : variant === "bone" ? "bone" : ""}`}>
    <div className="m-paper-tex" />
    <div className="m-grain" />
    {children}
    <div className="m-edge" />
  </div>
);

const MPhoto = ({ src, style, archival }) => (
  <div className={`m-photo ${archival ? "m-photo-archival" : ""}`} style={style}>
    <div className="m-photo-inner" style={{ backgroundImage: `url(${src})` }} />
  </div>
);

// === DECORATIONS ===

const ContourLines = ({ width = 600, height = 600, opacity = .25, style }) => (
  <svg width={width} height={height} viewBox="0 0 600 600" style={{ pointerEvents: "none", ...style }}>
    {Array.from({ length: 12 }).map((_, i) => {
      const r = 60 + i * 36;
      return <ellipse key={i} cx="300" cy="320" rx={r * 1.2} ry={r * 0.65} fill="none" stroke="#2c4a37" strokeWidth="0.6" opacity={opacity * (1 - i * 0.05)} />;
    })}
    {Array.from({ length: 8 }).map((_, i) => {
      const r = 30 + i * 22;
      return <ellipse key={`b${i}`} cx="160" cy="180" rx={r * 0.9} ry={r * 0.55} fill="none" stroke="#2c4a37" strokeWidth="0.5" opacity={opacity * (1 - i * 0.06)} />;
    })}
  </svg>
);

const MountainSilhouette = ({ width = 600, height = 200, color = "#2c4a37", style }) => (
  <svg width={width} height={height} viewBox="0 0 600 200" preserveAspectRatio="none" style={style}>
    <path d="M 0 200 L 0 130 L 60 90 L 110 120 L 170 60 L 220 100 L 280 30 L 340 80 L 400 50 L 460 95 L 520 70 L 580 110 L 600 95 L 600 200 Z"
      fill={color} opacity=".85" />
    <path d="M 0 200 L 0 160 L 50 140 L 110 165 L 170 130 L 240 155 L 320 125 L 400 150 L 480 130 L 560 155 L 600 145 L 600 200 Z"
      fill={color} opacity=".5" />
  </svg>
);

const MCompass = ({ size = 80, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <circle cx="50" cy="50" r="46" fill="none" stroke="#3a4438" strokeWidth="1" opacity=".7" />
    <circle cx="50" cy="50" r="36" fill="none" stroke="#3a4438" strokeWidth="0.4" opacity=".5" />
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
      <line key={a} x1="50" y1="50" x2="50" y2="6" stroke="#3a4438"
        strokeWidth={a%90===0?1:0.4} opacity={a%90===0?.8:.4} transform={`rotate(${a} 50 50)`} />
    ))}
    <polygon points="50,12 53,50 50,46 47,50" fill="#2c4a37" />
    <polygon points="50,88 53,50 50,54 47,50" fill="#3a4438" opacity=".5" />
    <circle cx="50" cy="50" r="2" fill="#1a2218" />
    <text x="50" y="5" textAnchor="middle" fontSize="7" fill="#3a4438" fontWeight="600" fontFamily="Inter Tight, sans-serif">N</text>
  </svg>
);

const Fern = ({ size = 80, rotate = 0, style }) => (
  <svg width={size} height={size * 2} viewBox="0 0 80 160" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M40 5 Q40 80 40 158" stroke="#2c4a37" strokeWidth="0.9" fill="none" opacity=".75" />
    {Array.from({ length: 16 }).map((_, i) => {
      const y = 12 + i * 9;
      const len = 30 - i * 1.4;
      return (
        <g key={i} opacity={.7}>
          <path d={`M40 ${y} Q ${40-len*0.6} ${y-3} ${40-len} ${y+2}`} stroke="#4a6346" strokeWidth="0.7" fill="none" />
          <path d={`M40 ${y} Q ${40+len*0.6} ${y-3} ${40+len} ${y+2}`} stroke="#4a6346" strokeWidth="0.7" fill="none" />
        </g>
      );
    })}
  </svg>
);

const PressedLeaf = ({ size = 90, rotate = 0, style }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 90 126" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M45 8 Q 12 50 45 120 Q 78 50 45 8 Z" fill="#5e7858" opacity=".55" stroke="#2c4a37" strokeWidth="0.7" />
    <path d="M45 8 L 45 120" stroke="#2c4a37" strokeWidth="0.6" opacity=".7" />
    {Array.from({ length: 7 }).map((_, i) => {
      const y = 22 + i * 13;
      return <g key={i} opacity=".6">
        <path d={`M45 ${y} Q ${30} ${y+6} ${22} ${y+10}`} stroke="#2c4a37" strokeWidth="0.4" fill="none" />
        <path d={`M45 ${y} Q ${60} ${y+6} ${68} ${y+10}`} stroke="#2c4a37" strokeWidth="0.4" fill="none" />
      </g>;
    })}
  </svg>
);

const TrailBlaze = ({ color = "#8a5a3a", style }) => (
  <svg width="20" height="32" viewBox="0 0 20 32" style={style}>
    <rect x="2" y="2" width="16" height="28" fill={color} stroke="#1a2218" strokeWidth="0.5" />
  </svg>
);

const AnimalTracks = ({ style }) => (
  <svg width="200" height="40" viewBox="0 0 200 40" style={style}>
    {[20, 60, 100, 140, 180].map((x, i) => (
      <g key={i} transform={`translate(${x} ${i % 2 ? 10 : 22})`} opacity=".55" fill="#3a4438">
        <ellipse cx="0" cy="2" rx="3" ry="4" />
        <ellipse cx="-4" cy="-3" rx="1.5" ry="2" />
        <ellipse cx="4" cy="-3" rx="1.5" ry="2" />
        <ellipse cx="-5" cy="3" rx="1.3" ry="1.8" />
        <ellipse cx="5" cy="3" rx="1.3" ry="1.8" />
      </g>
    ))}
  </svg>
);

const Constellation = ({ size = 100, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    {[[20,30],[35,22],[48,35],[60,28],[72,45],[80,30],[55,55],[40,60],[25,68],[70,75],[85,65]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r={i%3===0?2:1.2} fill="#ecebe2" opacity=".9" />
    ))}
    {[[20,30,35,22],[35,22,48,35],[48,35,60,28],[60,28,72,45],[72,45,80,30],[48,35,55,55],[55,55,40,60],[40,60,25,68],[55,55,70,75]].map(([x1,y1,x2,y2],i)=>(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ecebe2" strokeWidth="0.4" opacity=".5" />
    ))}
  </svg>
);

const TopoMap = ({ width = 480, height = 280, style }) => (
  <svg width={width} height={height} viewBox="0 0 480 280" style={style}>
    {/* contour lines */}
    {Array.from({ length: 10 }).map((_, i) => {
      const off = i * 14;
      return <ellipse key={i} cx={170} cy={130} rx={150 - off} ry={80 - off * 0.5} fill="none" stroke="#2c4a37" strokeWidth="0.5" opacity={0.5 - i * 0.03} />;
    })}
    {Array.from({ length: 7 }).map((_, i) => {
      const off = i * 12;
      return <ellipse key={`p${i}`} cx={350} cy={160} rx={90 - off} ry={50 - off * 0.4} fill="none" stroke="#2c4a37" strokeWidth="0.5" opacity={0.5 - i * 0.04} />;
    })}
    {/* river */}
    <path d="M 20 240 Q 80 220 120 240 T 240 220 T 360 240 T 460 230" fill="none" stroke="#4a6878" strokeWidth="1.6" opacity=".75" />
    {/* trail */}
    <path d="M 30 250 Q 90 200 150 180 Q 200 150 240 130 Q 290 110 340 130 Q 390 150 440 110"
      fill="none" stroke="#8a5a3a" strokeWidth="2" strokeDasharray="2 5" />
    {/* trail markers */}
    {[
      {x:30, y:250, label:"trailhead"},
      {x:170, y:130, label:"summit · 2,847m"},
      {x:340, y:130, label:"saddle ridge"},
      {x:440, y:110, label:"basecamp"},
    ].map((p,i)=>(
      <g key={i}>
        <circle cx={p.x} cy={p.y} r="3.5" fill="#2c4a37" />
        <circle cx={p.x} cy={p.y} r="7" fill="none" stroke="#2c4a37" strokeWidth="0.5" opacity=".5" />
        <text x={p.x + 11} y={p.y + 3} fontFamily="Inter Tight, sans-serif" fontSize="9" fill="#1a2218" fontWeight="500">{p.label}</text>
      </g>
    ))}
    {/* tree symbols */}
    {[[60,80],[90,100],[400,200],[60,200],[420,80],[260,70]].map(([x,y],i)=>(
      <g key={i} transform={`translate(${x} ${y})`} opacity=".55">
        <path d="M 0 0 l -4 8 l 8 0 z" fill="#2c4a37" />
        <path d="M 0 -4 l -3 6 l 6 0 z" fill="#2c4a37" />
      </g>
    ))}
  </svg>
);

const ElevationProfile = ({ width = 400, height = 80, style }) => (
  <svg width={width} height={height} viewBox="0 0 400 80" style={style}>
    <path d="M 0 65 L 30 60 L 60 55 L 100 35 L 140 25 L 180 10 L 220 18 L 260 30 L 300 25 L 340 40 L 380 55 L 400 60"
      fill="none" stroke="#2c4a37" strokeWidth="1.2" />
    <path d="M 0 65 L 30 60 L 60 55 L 100 35 L 140 25 L 180 10 L 220 18 L 260 30 L 300 25 L 340 40 L 380 55 L 400 60 L 400 80 L 0 80 Z"
      fill="#2c4a37" opacity=".15" />
    {/* axes */}
    <line x1="0" y1="80" x2="400" y2="80" stroke="#3a4438" strokeWidth="0.5" />
    <line x1="0" y1="0" x2="0" y2="80" stroke="#3a4438" strokeWidth="0.5" />
    {/* peak marker */}
    <circle cx="180" cy="10" r="2.5" fill="#8a5a3a" />
    <text x="184" y="8" fontSize="8" fill="#3a4438" fontFamily="Inter Tight, sans-serif">2,847m</text>
  </svg>
);

const Barometer = ({ size = 70, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <circle cx="50" cy="50" r="45" fill="#dcdbcf" stroke="#3a4438" strokeWidth="1" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="#3a4438" strokeWidth="0.4" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = i * 30;
      return <line key={i} x1="50" y1="10" x2="50" y2="14" stroke="#3a4438" strokeWidth="1" transform={`rotate(${a} 50 50)`} />;
    })}
    <line x1="50" y1="50" x2="68" y2="32" stroke="#8a5a3a" strokeWidth="1.6" />
    <circle cx="50" cy="50" r="2.5" fill="#1a2218" />
    <text x="50" y="78" textAnchor="middle" fontSize="6" fill="#3a4438" fontFamily="Inter Tight, sans-serif" letterSpacing="1">FAIR</text>
  </svg>
);

const RockSpec = ({ style }) => (
  <svg width="80" height="70" viewBox="0 0 80 70" style={style}>
    <polygon points="10,55 5,30 22,12 50,8 72,25 70,50 50,62 25,60" fill="#6b7280" stroke="#3b4651" strokeWidth="0.8" opacity=".85" />
    <polygon points="22,12 50,8 38,30" fill="#a8b0b0" opacity=".5" />
    <polygon points="50,8 72,25 58,32" fill="#3b4651" opacity=".4" />
    <line x1="20" y1="30" x2="35" y2="40" stroke="#1a2218" strokeWidth="0.4" opacity=".6" />
    <line x1="40" y1="20" x2="55" y2="35" stroke="#1a2218" strokeWidth="0.4" opacity=".6" />
  </svg>
);

const MRule = ({ width = 80, color = "currentColor", style }) => (
  <div style={{ width, height: 1, background: color, opacity: .35, ...style }} />
);

Object.assign(window, { M_PHOTO_URLS, MPaperBg, MPhoto, ContourLines, MountainSilhouette, MCompass, Fern, PressedLeaf, TrailBlaze, AnimalTracks, Constellation, TopoMap, ElevationProfile, Barometer, RockSpec, MRule });
