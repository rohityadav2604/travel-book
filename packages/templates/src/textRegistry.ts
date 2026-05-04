import type { Assignment } from "./types";

export type EditableTextFieldDef = {
  key: string;
  label: string;
  defaultValue?: string;
  multiline?: boolean;
  slotCaptionSource?: string;
};

const shared = {
  note: { key: "note", label: "Additional note", multiline: true },
} satisfies Record<string, EditableTextFieldDef>;

const registry: Record<string, EditableTextFieldDef[]> = {
  Cover: [
    { key: "kicker", label: "Kicker", defaultValue: "-- A Travelogue --" },
    { key: "title", label: "Title", defaultValue: "Wanderbound" },
    { key: "date", label: "Subtitle", defaultValue: "& other small adventures" },
    { key: "contents", label: "Contents line", defaultValue: "Photographs · Letters · Maps\nVolume One · Summer Editions", multiline: true },
    { key: "property", label: "Footer mark", defaultValue: "Property of the Wanderer" },
  ],
  InsideFront: [
    { key: "quote", label: "Opening quote", defaultValue: "The world is a book, and those who do not travel read only one page.", multiline: true },
    { key: "attribution", label: "Attribution", defaultValue: "-- st. augustine" },
    { key: "stampCity", label: "Stamp city", defaultValue: "DEPART" },
    { key: "stampDate", label: "Stamp date", defaultValue: "01·I·74" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- ii --" },
  ],
  ChapterDivider: [
    { key: "chapterHeader", label: "Chapter header", defaultValue: "Chapter Two" },
    { key: "pageRange", label: "Page range", defaultValue: "pp. 24 - 47" },
    { key: "numeral", label: "Large numeral", defaultValue: "II" },
    { key: "pretitle", label: "Pretitle", defaultValue: "the long way to" },
    { key: "label", label: "Chapter title", defaultValue: "Chapter" },
    { key: "dateRange", label: "Date range", defaultValue: "June · July · 1974" },
    { key: "quote", label: "Chapter quote", defaultValue: "We took the slow train south, the kind with windows that open and a conductor who hummed the same six bars all the way to Orvieto.", multiline: true },
    { key: "stampCity", label: "Stamp city", defaultValue: "TUSCANIA" },
    { key: "stampDate", label: "Stamp date", defaultValue: "VI · MCMLXXIV" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- ii --" },
  ],
  GrandVista: [
    { key: "plate", label: "Plate label", defaultValue: "plate xiv" },
    { key: "hero", label: "Hero caption", defaultValue: "The first sight of the sea", slotCaptionSource: "hero", multiline: true },
    { key: "subtitle", label: "Subtitle", defaultValue: "-- somewhere south of here, dawn --" },
    { key: "pageNumber", label: "Page number", defaultValue: "14" },
  ],
  JournalPage: [
    { key: "date", label: "Date", defaultValue: "Tuesday, the 16th" },
    { key: "weather", label: "Weather", defaultValue: "FAIR & WINDY" },
    { key: "location", label: "Location", defaultValue: "Kyoto, evening" },
    { key: "body", label: "Journal text", defaultValue: "Today began before the sun did. We climbed Fushimi Inari while the gates were still wet from morning rain, and the foxes seemed to watch us from every shrine. M. counted 412 torii before she stopped counting. I lost count somewhere around the seventh switchback, when I sat on a stone bench and ate a peach so ripe it stained my journal. I have left the page in. It looks like a sunset.", multiline: true },
    { key: "body2", label: "Second paragraph", defaultValue: "We took the slow train back. A boy across the aisle offered me a paper crane. I am keeping it here, between this page and the next.", multiline: true },
    { key: "polaroidCaption", label: "Pinned photo caption", defaultValue: "Fushimi" },
    { key: "signature", label: "Signature", defaultValue: "-- E." },
    { key: "stampCity", label: "Stamp city", defaultValue: "KYOTO" },
    { key: "stampDate", label: "Stamp date", defaultValue: "16·X·74" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 41 --" },
  ],
  PolaroidWall: [
    { key: "eyebrow", label: "Eyebrow", defaultValue: "scraps & souvenirs" },
    { key: "title", label: "Title", defaultValue: "Bits of the Journey" },
    { key: "ticketFrom", label: "Ticket from", defaultValue: "ATHINA" },
    { key: "ticketTo", label: "Ticket to", defaultValue: "HYDRA" },
    { key: "ticketDate", label: "Ticket date", defaultValue: "14·VII·74" },
    { key: "ticketSeat", label: "Ticket seat", defaultValue: "--" },
    { key: "stampCountry", label: "Stamp country", defaultValue: "MUNDO" },
    { key: "stampValue", label: "Stamp value", defaultValue: "∞" },
    { key: "noteText", label: "Handwritten note", defaultValue: "all the blue you've ever heard about -- & then more.", multiline: true },
    { key: "passportCity", label: "Passport city", defaultValue: "ATHINA" },
    { key: "passportDate", label: "Passport date", defaultValue: "13·VII·74" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 38 --" },
  ],
  GoldenHour: [
    { key: "eyebrow", label: "Eyebrow", defaultValue: "golden hour · plate vi" },
    { key: "title", label: "Title", defaultValue: "Evening Light" },
    { key: "footerNote", label: "Footer note", defaultValue: "The light here arrives slowly and leaves all at once -- by six the walls turn the color of saffron, and by seven they are violet.", multiline: true },
    { key: "stampCity", label: "Stamp city", defaultValue: "GOLDEN" },
    { key: "stampDate", label: "Stamp date", defaultValue: "19·VIII·74" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 22 --" },
  ],
  ContactSheet: [
    { key: "filmLabel", label: "Film label", defaultValue: "KODAK TRI-X 400 · 36 EXP" },
    { key: "rollLabel", label: "Roll label", defaultValue: "ROLL 07" },
  ],
  MapPage: [
    { key: "eyebrow", label: "Eyebrow", defaultValue: "itinerary · plate vii" },
    { key: "caption", label: "Map title", defaultValue: "The Route" },
    { key: "routeHeader", label: "Route header", defaultValue: "route" },
    { key: "stop1", label: "Stop 1", defaultValue: "① Napoli   3 days" },
    { key: "stop2", label: "Stop 2", defaultValue: "② Roma   5 days" },
    { key: "stop3", label: "Stop 3", defaultValue: "③ Firenze   4 days" },
    { key: "stop4", label: "Stop 4", defaultValue: "④ Venezia   3 days" },
    { key: "routeNote", label: "Route note", defaultValue: "850 km of slow trains, three stolen siestas, & one entirely unintentional stop in a town with no name on any map.", multiline: true },
    { key: "stampCity", label: "Stamp city", defaultValue: "MAPPA" },
    { key: "stampDate", label: "Stamp date", defaultValue: "VII·74" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 22 --" },
  ],
  QuotePage: [
    { key: "quote", label: "Quote", defaultValue: "Not all those who wander\nare lost -- some of us\nare simply taking the long way home.", multiline: true },
    { key: "caption", label: "Attribution", defaultValue: "-- found in a guesthouse in Hanoi" },
    { key: "authorLine", label: "Author line", defaultValue: "author unknown · 1971" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 50 --" },
  ],
  Ephemera: [
    { key: "eyebrow", label: "Eyebrow", defaultValue: "kept & collected" },
    { key: "title", label: "Title", defaultValue: "Things from pockets" },
    { key: "ticketFrom", label: "Ticket from", defaultValue: "LONDON" },
    { key: "ticketTo", label: "Ticket to", defaultValue: "PARIS" },
    { key: "ticketDate", label: "Ticket date", defaultValue: "22·IX·74" },
    { key: "ticketSeat", label: "Ticket seat", defaultValue: "14B" },
    { key: "boardingHeader", label: "Boarding header", defaultValue: "BOARDING PASS · 1stCLASS" },
    { key: "fromLabel", label: "From label", defaultValue: "FROM" },
    { key: "fromCode", label: "From code", defaultValue: "CDG" },
    { key: "toLabel", label: "To label", defaultValue: "TO" },
    { key: "toCode", label: "To code", defaultValue: "FCO" },
    { key: "flightInfo", label: "Flight info", defaultValue: "FLT AZ-414 · 14:20 · GATE B7" },
    { key: "postcardTitle", label: "Postcard title", defaultValue: "Greetings from Paris" },
    { key: "postcardBody", label: "Postcard body", defaultValue: "The cafés are exactly as small & perfect as you said. I have eaten my weight in croissants. Wish you were here.", multiline: true },
    { key: "postcardSignature", label: "Postcard signature", defaultValue: "-- love, A." },
    { key: "coinTop", label: "Coin top", defaultValue: "REPVBLICA" },
    { key: "coinValue", label: "Coin value", defaultValue: "100" },
    { key: "coinBottom", label: "Coin bottom", defaultValue: "LIRE" },
    { key: "matchbookLine1", label: "Matchbook line 1", defaultValue: "Caffè" },
    { key: "matchbookLine2", label: "Matchbook line 2", defaultValue: "Trastevere" },
    { key: "matchbookLine3", label: "Matchbook line 3", defaultValue: "EST. 1894 · ROMA" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 56 --" },
  ],
  InsideBack: [
    { key: "heading", label: "Heading", defaultValue: "the journey in numbers" },
    { key: "stat1Value", label: "Stat 1 value", defaultValue: "11" },
    { key: "stat1Label", label: "Stat 1 label", defaultValue: "Countries" },
    { key: "stat2Value", label: "Stat 2 value", defaultValue: "37" },
    { key: "stat2Label", label: "Stat 2 label", defaultValue: "Cities" },
    { key: "stat3Value", label: "Stat 3 value", defaultValue: "94" },
    { key: "stat3Label", label: "Stat 3 label", defaultValue: "Days" },
    { key: "stat4Value", label: "Stat 4 value", defaultValue: "212" },
    { key: "stat4Label", label: "Stat 4 label", defaultValue: "Photographs" },
    { key: "stampCity", label: "Stamp city", defaultValue: "THE WORLD" },
    { key: "stampDate", label: "Stamp date", defaultValue: "MCMLXXIV" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- cvi --" },
  ],
  BackCover: [
    { key: "returnLabel", label: "Return label", defaultValue: "-- RETURN TO --" },
    { key: "returnName", label: "Return name", defaultValue: "the one who wandered" },
    { key: "returnAddress", label: "Return address", defaultValue: "c/o the kitchen table\na small flat by the river\nsomewhere quiet, again", multiline: true },
    { key: "sentiment", label: "Sentiment", defaultValue: "And so we came home,\nfull of weather & cheese\n& impossible light.", multiline: true },
    { key: "colophonLabel", label: "Colophon label", defaultValue: "colophon" },
    { key: "colophon", label: "Colophon", defaultValue: "Bound & printed in a small shop near the harbor. Set in Cormorant & Caveat. Two hundred copies -- this is no. 047.", multiline: true },
    { key: "brand", label: "Footer brand", defaultValue: "Wanderbound" },
    { key: "passportCity", label: "Passport city", defaultValue: "THE END" },
    { key: "passportDate", label: "Passport date", defaultValue: "MCMLXXIV" },
  ],
  SinglePhotoPage: [
    { key: "title", label: "Title", defaultValue: "A morning in Lisbon" },
    { key: "date", label: "Date", defaultValue: "JUL · 03" },
    { key: "time", label: "Time", defaultValue: "07:42" },
    { key: "caption", label: "Caption", defaultValue: "The yellow tram woke me before the bells did. I sat on the windowsill with cold coffee and watched the city remember itself.", slotCaptionSource: "hero", multiline: true },
    { key: "location", label: "Location", defaultValue: "LISBOA" },
    { key: "locationDate", label: "Location date", defaultValue: "03·VII·74" },
  ],
  PhotoGrid: [
    { key: "title", label: "Title", defaultValue: "A week in Marrakesh" },
    { key: "date", label: "Date", defaultValue: "IV · MMXXIV" },
    { key: "hero", label: "Hero caption", defaultValue: "the souk at dusk", slotCaptionSource: "hero" },
    { key: "footerNote", label: "Footer note", defaultValue: "Seven days were not nearly enough. The light here arrives slowly and leaves all at once -- by six the walls turn the color of saffron, and by seven they are violet.", multiline: true },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 32 --" },
  ],
  PhotoJournal: [
    { key: "header", label: "Header", defaultValue: "field notes & photographs" },
    { key: "date", label: "Date", defaultValue: "VIII · 1974" },
    { key: "title", label: "Title", defaultValue: "The drive to Provence" },
    { key: "journalDate", label: "Journal date", defaultValue: "AUG · 08  ·  14:20" },
    { key: "body", label: "Body paragraph 1", defaultValue: "We rented the smallest car they had -- a Citroën the color of butter -- and drove without a map. The lavender begins all at once: one bend in the road and the world is purple. I made M. stop three times in the first hour just to stand in it.", multiline: true },
    { key: "body2", label: "Body paragraph 2", defaultValue: "For lunch -- peaches, hard cheese, a baguette torn in half, warm rosé from a paper cup. We ate on the hood of the car and watched a man on a bicycle go by twice without explaining why.", multiline: true },
    { key: "keptLabel", label: "Kept label", defaultValue: "kept" },
    { key: "keptNote", label: "Kept note", defaultValue: "three sprigs of lavender, pressed between p. 64 & p. 65." },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 64 --" },
  ],
  HeroFocus: [
    { key: "caption", label: "Caption", slotCaptionSource: "hero", multiline: true },
    { key: "subtitle", label: "Subtitle", defaultValue: "-- the journey continues --" },
    { key: "pageNumber", label: "Page number", defaultValue: "--" },
  ],
  GalleryDuo: [
    { key: "title", label: "Title", defaultValue: "Side by Side" },
    { key: "left", label: "Left caption", slotCaptionSource: "left" },
    { key: "right", label: "Right caption", slotCaptionSource: "right" },
    { key: "pageNumber", label: "Page number", defaultValue: "--" },
  ],
  StorySpread: [
    { key: "title", label: "Title", defaultValue: "The Road Behind & Ahead" },
    { key: "body", label: "Story text", defaultValue: "Every journey leaves marks that maps cannot capture. The laughter shared over a missed train, the silence of a sunrise that no camera could hold, the strangers who became friends before a single name was exchanged.\n\nThis book is a tribute to those fragments -- the moments between the plans, the beauty between the borders, the stories that unfolded when we let the world lead the way.\n\nWherever the next path begins, these pages will remind us that the best part of travel is not the destination, but the company we keep along the way.", multiline: true },
    { key: "author", label: "Author" },
    { key: "date", label: "Date" },
  ],
  GroupPhotoSpread: [
    { key: "caption", label: "Caption", slotCaptionSource: "hero", multiline: true },
    { key: "subtitle", label: "Subtitle" },
  ],
  HighlandCover: [
    { key: "volumeLabel", label: "Volume label", defaultValue: "VOL · II / A FIELD GUIDE" },
    { key: "title", label: "Title", defaultValue: "Highland" },
    { key: "date", label: "Subtitle", defaultValue: "NOTES FROM THE QUIET COUNTRY" },
    { key: "coords", label: "Coordinates", defaultValue: "47°.32′N · 11°.84′E" },
    { key: "season", label: "Season", defaultValue: "OCT -- NOV · MMXXIV" },
  ],
  HighlandHero: [
    { key: "plate", label: "Plate label", defaultValue: "PLATE · VII" },
    { key: "coords", label: "Coordinates", defaultValue: "47°.32′N · 11°.84′E" },
    { key: "timeElevation", label: "Time/elevation", defaultValue: "05:47 · ELEVATION 1,820m" },
    { key: "caption", label: "Caption", defaultValue: "The river falls without ceremony.", slotCaptionSource: "hero", multiline: true },
    { key: "subtitle", label: "Subtitle", defaultValue: "-- north face, before the rain" },
    { key: "pageNumber", label: "Page number", defaultValue: "14" },
  ],
  HighlandGrid: [
    { key: "title", label: "Title", defaultValue: "Five days in the pines" },
    { key: "issue", label: "Issue label", defaultValue: "X · MMXXIV" },
    { key: "hero", label: "Hero caption", slotCaptionSource: "hero" },
    { key: "topRight", label: "Top right caption", slotCaptionSource: "topRight" },
    { key: "bottomRight", label: "Bottom right caption", slotCaptionSource: "bottomRight" },
    { key: "quote", label: "Footer quote", defaultValue: "The forest does not perform -- it tolerates.", multiline: true },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 32" },
  ],
  HighlandJournal: [
    { key: "dayLabel", label: "Day label", defaultValue: "DAY 9" },
    { key: "title", label: "Title", defaultValue: "The saddle" },
    { key: "date", label: "Date", defaultValue: "OCT · 18 · 14h 06" },
    { key: "weather", label: "Weather", defaultValue: "NW 22kt · -2°C" },
    { key: "sectionLabel", label: "Section label", defaultValue: "FIELD JOURNAL" },
    { key: "quote", label: "Journal quote", defaultValue: "Crossed the saddle in low cloud. The cairns kept their distance and the wind kept ours.", multiline: true },
    { key: "body", label: "Journal note", defaultValue: "Saw a chamois. Did not photograph it.", multiline: true },
    { key: "sightingsLabel", label: "Sightings label", defaultValue: "SIGHTINGS" },
    { key: "sightingsBody", label: "Sightings body", defaultValue: "chamois · 1   raven · 4\nibex sign · yes   wolf · no", multiline: true },
    { key: "signature", label: "Signature", defaultValue: "— E." },
    { key: "pageNumber", label: "Page number", defaultValue: "— 41 —" },
  ],
  HighlandQuote: [
    { key: "quote", label: "Quote", defaultValue: "We climb not to leave the world, but to look at it from a quieter window.", multiline: true },
    { key: "caption", label: "Attribution", defaultValue: "-- from the cabin journal" },
    { key: "pageNumber", label: "Page number", defaultValue: "-- 50 --" },
  ],
  HighlandBackCover: [
    { key: "brand", label: "Brand", defaultValue: "Highland" },
    { key: "tagline", label: "Tagline", defaultValue: "A FIELD GUIDE TO THE QUIET COUNTRY" },
    { key: "footer", label: "Footer", defaultValue: "PRINTED IN THE MOUNTAINS" },
  ],
  CityCover: [
    { key: "eyebrow", label: "Eyebrow", defaultValue: "Travel Book" },
    { key: "title", label: "Title", defaultValue: "City Lights" },
    { key: "date", label: "Date" },
  ],
  CityHero: [
    { key: "caption", label: "Caption", slotCaptionSource: "hero", multiline: true },
    { key: "subtitle", label: "Subtitle" },
  ],
  CityMap: [
    { key: "caption", label: "Caption", slotCaptionSource: "hero" },
  ],
  MosaicGrid: [],
  IndexPage: [
    { key: "heading", label: "Heading", defaultValue: "contents" },
    { key: "title", label: "Title", defaultValue: "The Whole Journey" },
    { key: "chapter1Num", label: "Chapter 1 number", defaultValue: "I" },
    { key: "chapter1Title", label: "Chapter 1 title", defaultValue: "How it began" },
    { key: "chapter1Sub", label: "Chapter 1 subtitle", defaultValue: "London — a packing list, a postcard" },
    { key: "chapter1Page", label: "Chapter 1 page", defaultValue: "01" },
    { key: "chapter2Num", label: "Chapter 2 number", defaultValue: "II" },
    { key: "chapter2Title", label: "Chapter 2 title", defaultValue: "The long way to Tuscany" },
    { key: "chapter2Sub", label: "Chapter 2 subtitle", defaultValue: "Naples · Rome · Florence · Venice" },
    { key: "chapter2Page", label: "Chapter 2 page", defaultValue: "24" },
    { key: "chapter3Num", label: "Chapter 3 number", defaultValue: "III" },
    { key: "chapter3Title", label: "Chapter 3 title", defaultValue: "An interlude in Provence" },
    { key: "chapter3Sub", label: "Chapter 3 subtitle", defaultValue: "Lavender, butter-yellow Citroën" },
    { key: "chapter3Page", label: "Chapter 3 page", defaultValue: "62" },
    { key: "chapter4Num", label: "Chapter 4 number", defaultValue: "IV" },
    { key: "chapter4Title", label: "Chapter 4 title", defaultValue: "Bits of Greece" },
    { key: "chapter4Sub", label: "Chapter 4 subtitle", defaultValue: "Athens · Hydra · Santorini" },
    { key: "chapter4Page", label: "Chapter 4 page", defaultValue: "84" },
    { key: "chapter5Num", label: "Chapter 5 number", defaultValue: "V" },
    { key: "chapter5Title", label: "Chapter 5 title", defaultValue: "All the way home" },
    { key: "chapter5Sub", label: "Chapter 5 subtitle", defaultValue: "Marseille — and a long quiet train" },
    { key: "chapter5Page", label: "Chapter 5 page", defaultValue: "108" },
    { key: "stat1Num", label: "Stat 1 number", defaultValue: "11" },
    { key: "stat1Label", label: "Stat 1 label", defaultValue: "countries" },
    { key: "stat2Num", label: "Stat 2 number", defaultValue: "37" },
    { key: "stat2Label", label: "Stat 2 label", defaultValue: "cities" },
    { key: "stat3Num", label: "Stat 3 number", defaultValue: "94" },
    { key: "stat3Label", label: "Stat 3 label", defaultValue: "days" },
    { key: "stat4Num", label: "Stat 4 number", defaultValue: "212" },
    { key: "stat4Label", label: "Stat 4 label", defaultValue: "photographs" },
    { key: "pageNumber", label: "Page number", defaultValue: "— iii —" },
  ],
};

function humanizeKey(key: string): string {
  return key
    .replace(/-/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function dynamicSlotField(slotId: string): EditableTextFieldDef {
  return {
    key: slotId,
    label: `${humanizeKey(slotId)} caption`,
    slotCaptionSource: slotId,
  };
}

export function getTemplateTextFields(
  templateName: string,
  slotIds: string[],
  existingTexts?: Record<string, string>,
): EditableTextFieldDef[] {
  const fields = [...(registry[templateName] ?? [])];

  if (["PolaroidWall", "ContactSheet", "MosaicGrid"].includes(templateName)) {
    fields.push(...slotIds.map(dynamicSlotField));
  }

  if (templateName === "GoldenHour") {
    fields.push(...slotIds.filter((id) => id.startsWith("right")).map(dynamicSlotField));
  }

  if (templateName === "PhotoGrid") {
    fields.push(...slotIds.filter((id) => id !== "hero").map(dynamicSlotField));
  }

  if (templateName === "PhotoJournal") {
    fields.push(...slotIds.map(dynamicSlotField));
  }

  fields.push(shared.note);

  const seen = new Set(fields.map((field) => field.key));
  for (const key of Object.keys(existingTexts ?? {})) {
    if (!seen.has(key)) {
      fields.push({ key, label: humanizeKey(key), multiline: key === "body" || key === "caption" || key === "quote" || key === "note" });
      seen.add(key);
    }
  }

  return fields;
}

export function resolveTemplateTextValue({
  assignments,
  field,
  getPhotoCaption,
  texts,
}: {
  assignments: Assignment[];
  field: EditableTextFieldDef;
  getPhotoCaption: (photoId: string) => string | null | undefined;
  texts?: Record<string, string> | undefined;
}): string {
  const explicit = texts?.[field.key];
  if (explicit !== undefined) {
    return explicit;
  }

  if (field.slotCaptionSource) {
    const assignment = assignments.find((item) => item.slotId === field.slotCaptionSource);
    if (assignment) {
      return getPhotoCaption(assignment.photoId) ?? field.defaultValue ?? "";
    }
  }

  return field.defaultValue ?? "";
}
