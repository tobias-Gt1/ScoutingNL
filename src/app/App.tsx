import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, MapPin, Phone, Mail, Users, Check, ChevronDown } from "lucide-react";
import aardeBg from "../imports/aarde.jpg";
import bladBg from "../imports/blad.jpg";
import houtBg from "../imports/hout.jpg";
import meerBg from "../imports/meer.jpg";
import steenBg from "../imports/steen.jpg";

type Page = "home" | "over-ons" | "speltakken" | "nieuws" | "agenda" | "aanmelden" | "sollicitatie" | "contact";

// ─── Data ────────────────────────────────────────────────────────────────────

const SPELTAKKEN = [
  {
    id: "bevers",
    name: "Bevers",
    age: "4–6 jaar",
    color: "#FF0000",
    description:
      "De allerkleinsten! Bevers ontdekken de wereld spelenderwijs in een veilige, warme groepje vol plezier.",
    activities: ["Bouwen", "Zingen", "Knutselen", "Spelletjes", "Natuur ontdekken"],
    img: "1516627145497-ae6968895b74",
  },
  {
    id: "welpen",
    name: "Welpen",
    age: "7–10 jaar",
    color: "#FFFF00",
    textColor: "#1a1a1a",
    description:
      "Welpen gaan op avontuur, leren samenwerken en ontdekken wat ze allemaal kunnen.",
    activities: ["Kamperen", "Koken op vuur", "Spoorzoeken", "Spelletjes", "Projecten"],
    img: "1526976668912-1a811878dd37",
  },
  {
    id: "scouts",
    name: "Scouts",
    age: "11–14 jaar",
    color: "#31A529",
    description:
      "Scouts leren zelfstandigheid en teamwerk in de natuur. Groot avontuur, echte vaardigheden.",
    activities: ["Trekken", "Bivakken", "Eerste hulp", "Navigeren", "Avontuur"],
    img: "1464822759023-fed622ff2c3b",
  },
  {
    id: "explorers",
    name: "Explorers",
    age: "15–17 jaar",
    color: "#1A368D",
    description:
      "Explorers nemen het heft in eigen handen en organiseren hun eigen activiteiten en expedities.",
    activities: ["Expedities", "Projecten", "Vrijwilligerswerk", "Leiderschap", "Reizen"],
    img: "1501854140801-50d01698950b",
  },
  {
    id: "roverscouts",
    name: "Roverscouts",
    age: "18–20 jaar",
    color: "#4A2E19",
    description:
      "Roverscouts zijn jong volwassenen die scouting op hun eigen manier beleven en anderen inspireren.",
    activities: ["Mentorschap", "Grote projecten", "Internationaal", "Avontuur", "Community"],
    img: "1533577716844-fd82a37fe68a",
  },
];

const NIEUWS = [
  {
    id: 1,
    title: "Zomerkamp 2025 — Een onvergetelijke week!",
    date: "15 juni 2025",
    category: "Activiteit",
    excerpt:
      "Meer dan 120 leden gingen op kamp in de Ardennen. Het was een week vol avontuur, vriendschap en herinneringen voor het leven.",
    img: "1504280390367-361c6d9f38f4",
  },
  {
    id: 2,
    title: "Nieuwe leiding gezocht voor Welpentak",
    date: "2 juni 2025",
    category: "Organisatie",
    excerpt:
      "Wij zijn op zoek naar enthousiaste begeleiders voor onze Welpentak. Heb jij hart voor kinderen en avontuur?",
    img: "1529156069898-49953e39b3ac",
  },
  {
    id: 3,
    title: "Wereld Scoutingdag gevierd in het park",
    date: "22 februari 2025",
    category: "Evenement",
    excerpt:
      "Op 22 februari vierden wij samen met honderden scouts uit de regio de Wereld Scoutingdag met een groot buitenfeest.",
    img: "1526976668912-1a811878dd37",
  },
  {
    id: 4,
    title: "VOG verplicht voor alle begeleiders",
    date: "10 januari 2025",
    category: "Beleid",
    excerpt:
      "Vanaf dit jaar is een Verklaring Omtrent Gedrag (VOG) verplicht voor alle vrijwilligers die met kinderen werken.",
    img: "1554224155-1696413565d3",
  },
];

const AGENDA = [
  { id: 1, dag: "Zat", datum: "5 jul", titel: "Bevers — Zomerspelen", locatie: "Scoutingterrein", tak: "Bevers", color: "#FF0000" },
  { id: 2, dag: "Zat", datum: "12 jul", titel: "Welpen — Kampvuur avond", locatie: "Scoutingterrein", tak: "Welpen", color: "#FFFF00" },
  { id: 3, dag: "Zat", datum: "19 jul", titel: "Scouts — Dagtocht Veluwe", locatie: "Veluwe", tak: "Scouts", color: "#31A529" },
  { id: 4, dag: "Za", datum: "2 aug", titel: "Zomerkamp 2025 (start)", locatie: "Ardennen, België", tak: "Alle takken", color: "#1A368D" },
  { id: 5, dag: "Za", datum: "9 aug", titel: "Zomerkamp 2025 (einde)", locatie: "Ardennen, België", tak: "Alle takken", color: "#1A368D" },
  { id: 6, dag: "Zat", datum: "6 sep", titel: "Eerste bijeenkomst nieuw seizoen", locatie: "Scoutingterrein", tak: "Alle takken", color: "#FF0000" },
  { id: 7, dag: "Zat", datum: "20 sep", titel: "Explorers — Nighthike", locatie: "Nationaal Park", tak: "Explorers", color: "#1A368D" },
  { id: 8, dag: "Zat", datum: "11 okt", titel: "Ouderavond", locatie: "Clubhuis", tak: "Alle takken", color: "#4A2E19" },
];

const SKILL_CATS = [
  {
    emoji: "🏕️",
    title: "Buitenactiviteiten",
    skills: ["Kamperen", "Koken op vuur", "Kaartlezen / Navigeren", "EHBO / Eerste hulp", "Klimmen / Touwwerk", "Kanovaren / Watersport", "Fietsen / MTB", "Zwemmen"],
  },
  {
    emoji: "🎨",
    title: "Creatief & Cultureel",
    skills: ["Knutselen / Ambacht", "Muziek / Instrument", "Zang / Muziek", "Toneel / Drama", "Fotografie / Video", "Tekenen / Schilderen"],
  },
  {
    emoji: "⚽",
    title: "Sport & Beweging",
    skills: ["Voetbal", "Basketbal", "Volleybal", "Atletiek", "Judo / Vechtsporten", "Yoga / Meditatie", "Dans / Beweging", "Teamspellen"],
  },
  {
    emoji: "💻",
    title: "Techniek & Digitaal",
    skills: ["ICT / Computers", "Sociale media", "Video editing", "Website / Apps", "Electronica / Arduino"],
  },
  {
    emoji: "👥",
    title: "Leiderschap & Pedagogiek",
    skills: ["Groepsbegeleiding", "Conflictoplossing", "Motiveren / Coachen", "Lesgeven / Trainen", "Projectmanagement"],
  },
];

const CERTS = ["EHBO", "BHV", "VOG", "Zwemdiploma A", "Zwemdiploma B", "Rijbewijs B", "Kanovaarbewijs", "Klimcursus", "Motorrijbewijs", "WAFA Outdoor EHBO"];
const BESCHIKBAAR_OPT = ["Zaterdagochtend", "Zaterdagmiddag", "Zondagochtend", "Zondagmiddag", "Doordeweeks avond", "Weekendkamp (1 nacht)", "Meerdaags kamp", "Zomerkamp (week)"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

function BgImage({ src, opacity = 0.12 }: { src: string; opacity?: number }) {
  return <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ opacity }} />;
}

const LOGO_SRC = "/src/imports/Scouting_NL_logo_RGB_transparanteachtergrond.png";

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ current, go }: { current: Page; go: (p: Page) => void }) {
  const [open, setOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Over ons", page: "over-ons" },
    { label: "Speltakken", page: "speltakken" },
    { label: "Nieuws", page: "nieuws" },
    { label: "Agenda", page: "agenda" },
    { label: "Contact", page: "contact" },
  ];

  const nav = (p: Page) => { go(p); setOpen(false); };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20 sm:h-24">
        {/* Logo */}
        <button onClick={() => nav("home")} className="shrink-0 rounded-xl bg-white border border-black/5 px-2 py-1">
          <img
            src={LOGO_SRC}
            alt="Scouting Nederland"
            className="h-14 sm:h-16 w-auto object-contain"
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => nav(l.page)}
              className="text-sm font-bold transition-colors"
              style={{ color: current === l.page ? "#FF0000" : "#1a1a1a" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => nav("aanmelden")}
            className="bg-[#FF0000] text-white font-bold text-sm px-4 py-2 rounded-full hover:bg-[#c0050f] transition-colors"
          >
            Aanmelden
          </button>
          <button
            onClick={() => nav("sollicitatie")}
            className="border-2 border-[#1A368D] text-[#1A368D] font-bold text-sm px-4 py-2 rounded-full hover:bg-[#1A368D] hover:text-white transition-colors"
          >
            Word begeleider
          </button>
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#f0f0f0] px-4 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <button key={l.page} onClick={() => nav(l.page)} className="text-left font-bold py-2 text-[#1a1a1a] hover:text-[#FF0000]">
              {l.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button onClick={() => nav("aanmelden")} className="bg-[#FF0000] text-white font-bold py-3 rounded-full">Aanmelden</button>
            <button onClick={() => nav("sollicitatie")} className="border-2 border-[#1A368D] text-[#1A368D] font-bold py-3 rounded-full">Word begeleider</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="inline-flex items-center bg-white rounded-xl px-3 py-2 mb-4">
              <img
                src={LOGO_SRC}
                alt="Scouting Nederland"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Avontuur, vriendschap en groei — voor iedereen van 4 tot 20 jaar.
            </p>
          </div>

          <div>
            <div className="text-[#FFFF00] font-bold mb-4 text-sm uppercase tracking-wider">Speltakken</div>
            {SPELTAKKEN.map((s) => (
              <button key={s.id} onClick={() => go("speltakken")} className="block text-white/60 hover:text-white text-sm py-1 transition-colors">
                {s.name}
              </button>
            ))}
          </div>

          <div>
            <div className="text-[#FFFF00] font-bold mb-4 text-sm uppercase tracking-wider">Organisatie</div>
            {(["over-ons", "nieuws", "agenda", "contact"] as Page[]).map((p) => (
              <button key={p} onClick={() => go(p)} className="block text-white/60 hover:text-white text-sm py-1 capitalize transition-colors">
                {p.replace("-", " ")}
              </button>
            ))}
          </div>

          <div>
            <div className="text-[#FFFF00] font-bold mb-4 text-sm uppercase tracking-wider">Meedoen</div>
            <button onClick={() => go("aanmelden")} className="block text-white/60 hover:text-white text-sm py-1 transition-colors">Aanmelden als lid</button>
            <button onClick={() => go("sollicitatie")} className="block text-white/60 hover:text-white text-sm py-1 transition-colors">Word begeleider</button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/40 text-xs">
          <span>© 2025 Scouting Nederland. Alle rechten voorbehouden.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacybeleid</a>
            <a href="#" className="hover:text-white transition-colors">Cookiebeleid</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page: Home ──────────────────────────────────────────────────────────────

function HomePage({ go }: { go: (p: Page) => void }) {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF0000 0%, #b0040f 45%, #1A368D 100%)" }}
      >
        <BgImage src={meerBg} opacity={0.18} />
        <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full opacity-15" style={{ background: "#FFFF00", transform: "translate(25%, -35%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ background: "#31A529", transform: "translate(-30%, 35%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-36 text-white">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FFFF00] text-[#1a1a1a] font-bold px-4 py-1.5 rounded-full text-sm mb-8">
              🏕️ Scouting Nederland
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-6">
              Avontuur<br />begint hier
            </h1>
            <p className="text-xl text-white/75 mb-10 max-w-lg leading-relaxed">
              Ontdek vriendschap, natuur en jezelf bij Scouting. Voor kinderen en jongeren van 4 tot 20 jaar.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => go("aanmelden")}
                className="inline-flex items-center gap-2 bg-[#FFFF00] text-[#1a1a1a] font-extrabold px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform"
              >
                Meld je aan <ArrowRight size={20} />
              </button>
              <button
                onClick={() => go("over-ons")}
                className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-colors"
              >
                Over ons
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce">
          <span className="text-xs font-medium">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-[#1A368D] py-10 overflow-hidden">
        <BgImage src={aardeBg} opacity={0.09} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "180+", label: "leden" },
            { num: "25+", label: "begeleiders" },
            { num: "2010", label: "opgericht" },
            { num: "5", label: "speltakken" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black text-[#FFFF00]">{s.num}</div>
              <div className="text-sm text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Speltakken */}
      <section className="relative py-24 bg-white overflow-hidden">
        <BgImage src={houtBg} opacity={0.08} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a]">Onze speltakken</h2>
            <p className="text-[#666] mt-2 text-lg">Voor elke leeftijd een eigen avontuur</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SPELTAKKEN.map((s) => (
              <button
                key={s.id}
                onClick={() => go("speltakken")}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] text-left hover:scale-105 transition-transform duration-300"
                style={{ background: s.color }}
              >
                <img
                  src={unsplash(s.img, 400, 533)}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-300"
                />
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="text-white font-extrabold text-xl drop-shadow">{s.name}</div>
                  <div className="text-white/80 text-sm">{s.age}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => go("speltakken")} className="inline-flex items-center gap-2 font-bold text-[#FF0000] hover:gap-4 transition-all text-sm">
              Meer over speltakken <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Nieuws */}
      <section className="relative py-24 bg-[#f8f8f8] overflow-hidden">
        <BgImage src={bladBg} opacity={0.08} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a]">Laatste nieuws</h2>
              <p className="text-[#666] mt-2 text-lg">Blijf op de hoogte</p>
            </div>
            <button onClick={() => go("nieuws")} className="hidden md:inline-flex items-center gap-2 font-bold text-[#FF0000] hover:gap-4 transition-all text-sm">
              Alle nieuws <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NIEUWS.slice(0, 3).map((n) => (
              <article key={n.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img src={unsplash(n.img, 600, 338)} alt={n.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="inline-block bg-[#FF0000]/10 text-[#FF0000] font-bold text-xs px-3 py-1 rounded-full mb-3">{n.category}</span>
                  <h3 className="font-extrabold text-[#1a1a1a] text-base leading-snug mb-2">{n.title}</h3>
                  <p className="text-[#666] text-sm line-clamp-2">{n.excerpt}</p>
                  <div className="mt-4 text-xs text-[#aaa]">{n.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA begeleider */}
      <section className="relative py-24 bg-[#1A368D] text-white overflow-hidden">
        <BgImage src={steenBg} opacity={0.1} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <div className="text-[#FFFF00] font-bold text-sm mb-2 uppercase tracking-wider">🌟 Vrijwilliger worden</div>
            <h2 className="text-4xl md:text-5xl font-black">Word begeleider!</h2>
            <p className="text-white/65 mt-4 max-w-xl text-lg leading-relaxed">
              Heb jij passie voor avontuur en wil je het verschil maken in het leven van kinderen? Sluit je aan bij ons team.
            </p>
          </div>
          <button
            onClick={() => go("sollicitatie")}
            className="shrink-0 bg-[#FFFF00] text-[#1a1a1a] font-extrabold px-10 py-5 rounded-full text-xl hover:scale-105 transition-transform"
          >
            Solliciteer nu
          </button>
        </div>
      </section>

      {/* Agenda preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a]">Aankomende activiteiten</h2>
            </div>
            <button onClick={() => go("agenda")} className="hidden md:inline-flex items-center gap-2 font-bold text-[#FF0000] hover:gap-4 transition-all text-sm">
              Volledige agenda <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AGENDA.slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center gap-4 p-4 border-2 border-[#f0f0f0] rounded-xl hover:border-[#FF0000] transition-colors">
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white font-bold text-xs"
                  style={{ background: e.color, color: e.color === "#FFFF00" ? "#1a1a1a" : "white" }}
                >
                  <span className="opacity-75">{e.dag}</span>
                  <span className="text-lg leading-tight font-extrabold">{e.datum.split(" ")[0]}</span>
                  <span className="opacity-75">{e.datum.split(" ")[1]}</span>
                </div>
                <div>
                  <div className="font-bold text-[#1a1a1a] text-sm">{e.titel}</div>
                  <div className="text-xs text-[#666] flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {e.locatie}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Page: Over ons ──────────────────────────────────────────────────────────

function OverOnsPage() {
  return (
    <div>
      <section className="pt-32 pb-20 bg-[#1A368D] text-white relative overflow-hidden">
        <BgImage src={steenBg} opacity={0.1} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl md:text-7xl font-black">Over ons</h1>
          <p className="text-white/65 mt-4 text-xl max-w-2xl">
            Wij zijn Scouting Nederland — een beweging van avontuur, vriendschap en persoonlijke groei.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-[#1a1a1a] mb-6">Onze missie</h2>
            <p className="text-[#444] text-lg leading-relaxed mb-4">
              Scouting helpt jongeren om te groeien tot zelfstandige, verantwoordelijke mensen die positief bijdragen aan de samenleving. Dat doen we door avontuur, spel en uitdaging.
            </p>
            <p className="text-[#444] text-lg leading-relaxed">
              Met meer dan 160.000 leden in Nederland is Scouting de grootste vrijwilligersorganisatie voor jongeren van het land.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: "Opgericht", value: "1910" },
                { label: "Leden NL", value: "160.000+" },
                { label: "Landen", value: "170+" },
                { label: "Seizoenen", value: "75+" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-[#f8f8f8]">
                  <div className="text-2xl font-black text-[#FF0000]">{s.value}</div>
                  <div className="text-sm text-[#666]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-square">
            <img src={unsplash("1533577716844-fd82a37fe68a", 600, 600)} alt="Scouts in actie" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-black text-[#1a1a1a] mb-12 text-center">Onze waarden</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🤝", title: "Vriendschap", desc: "Verbinding met anderen, ongeacht achtergrond of cultuur." },
              { icon: "🌿", title: "Natuur", desc: "Respect voor en verbinding met de natuur om ons heen." },
              { icon: "⚡", title: "Avontuur", desc: "Grenzen verleggen en nieuwe ervaringen opdoen." },
              { icon: "🌍", title: "Gemeenschap", desc: "Bijdragen aan een betere wereld, dichtbij en veraf." },
            ].map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl text-center shadow-sm">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-extrabold text-[#1a1a1a] text-lg mb-2">{v.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// ─── Page: Speltakken ────────────────────────────────────────────────────────

function SpeltakkenPage() {
  const [active, setActive] = useState(0);
  const s = SPELTAKKEN[active];
  const textOnColor = s.color === "#FFFF00" ? "#1a1a1a" : "white";

  return (
    <div>
      <section className="pt-32 pb-0" style={{ background: s.color, transition: "background 0.4s" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl md:text-7xl font-black" style={{ color: textOnColor }}>Speltakken</h1>
          <p className="mt-3 text-lg opacity-70" style={{ color: textOnColor }}>Voor elke leeftijd een eigen avontuur</p>

          <div className="flex flex-wrap gap-2 mt-10">
            {SPELTAKKEN.map((sp, i) => (
              <button
                key={sp.id}
                onClick={() => setActive(i)}
                className="px-5 py-3 rounded-t-xl font-bold text-sm transition-all"
                style={
                  active === i
                    ? { background: "white", color: "#1a1a1a" }
                    : { background: "rgba(255,255,255,0.2)", color: textOnColor }
                }
              >
                {sp.name} <span className="opacity-60 font-normal ml-1">{sp.age}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span
                className="inline-block px-4 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: s.color, color: textOnColor }}
              >
                {s.age}
              </span>
              <h2 className="text-4xl font-black text-[#1a1a1a] mb-4">{s.name}</h2>
              <p className="text-[#444] text-lg leading-relaxed mb-8">{s.description}</p>

              <h3 className="font-bold text-[#1a1a1a] mb-3 text-sm uppercase tracking-wider">Wat doen {s.name}?</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {s.activities.map((a) => (
                  <span key={a} className="px-3 py-1.5 rounded-full font-semibold text-sm" style={{ background: s.color, color: textOnColor }}>
                    {a}
                  </span>
                ))}
              </div>

              <div className="p-5 rounded-2xl border-2" style={{ borderColor: s.color + "40", background: s.color + "0d" }}>
                <div className="font-bold text-[#1a1a1a] mb-1">📅 Wanneer?</div>
                <p className="text-[#555] text-sm">Elke zaterdag van 10:00 – 12:30 op het scoutingterrein. In vakantie- en kampperiodes gelden andere tijden.</p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-[#f0f0f0]">
              <img src={unsplash(s.img, 600, 450)} alt={s.name} className="w-full h-full object-cover transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Page: Nieuws ────────────────────────────────────────────────────────────

function NieuwsPage() {
  return (
    <div>
      <section className="pt-32 pb-20 bg-[#FF0000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl md:text-7xl font-black">Nieuws</h1>
          <p className="text-white/65 mt-4 text-xl">Blijf op de hoogte van alles bij Scouting</p>
        </div>
      </section>

      <section className="py-16 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NIEUWS.map((n) => (
            <article key={n.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="aspect-video overflow-hidden bg-[#f0f0f0]">
                <img src={unsplash(n.img, 600, 338)} alt={n.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-[#FF0000]/10 text-[#FF0000] font-bold text-xs px-3 py-1 rounded-full">{n.category}</span>
                  <span className="text-xs text-[#aaa]">{n.date}</span>
                </div>
                <h2 className="font-extrabold text-[#1a1a1a] text-base leading-snug mb-2">{n.title}</h2>
                <p className="text-[#666] text-sm leading-relaxed">{n.excerpt}</p>
                <button className="mt-4 inline-flex items-center gap-1 font-bold text-[#FF0000] text-sm hover:gap-3 transition-all">
                  Lees meer <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Page: Agenda ────────────────────────────────────────────────────────────

function AgendaPage() {
  return (
    <div>
      <section className="pt-32 pb-20 bg-[#31A529] text-white relative overflow-hidden">
        <BgImage src={aardeBg} opacity={0.1} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl md:text-7xl font-black">Agenda</h1>
          <p className="text-white/65 mt-4 text-xl">Alle aankomende activiteiten op een rij</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-3">
            {AGENDA.map((e) => {
              const textCol = e.color === "#FFFF00" ? "#1a1a1a" : "white";
              return (
                <div
                  key={e.id}
                  className="group flex items-center gap-4 p-4 border-2 border-[#f0f0f0] rounded-2xl hover:border-[#FF0000] transition-all bg-white hover:shadow-md cursor-pointer"
                >
                  <div
                    className="shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center font-bold text-xs"
                    style={{ background: e.color, color: textCol }}
                  >
                    <span className="opacity-70">{e.dag}</span>
                    <span className="text-xl font-black leading-none">{e.datum.split(" ")[0]}</span>
                    <span className="opacity-70">{e.datum.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-[#1a1a1a] truncate">{e.titel}</h3>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-[#666]">
                      <span className="flex items-center gap-1"><MapPin size={11} /> {e.locatie}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {e.tak}</span>
                    </div>
                  </div>
                  <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[#FF0000] text-white font-bold text-xs px-3 py-2 rounded-lg">
                    Details
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Page: Aanmelden ─────────────────────────────────────────────────────────

function AanmeldenPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    voornaam: "", achternaam: "", geboortedatum: "", email: "", telefoon: "",
    speltaktak: "", ouderNaam: "", ouderTelefoon: "", ouderEmail: "",
  });

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const selectedTak = SPELTAKKEN.find((s) => s.id === form.speltaktak);

  const inputCls = "w-full border-2 border-[#e0e0e0] rounded-xl px-4 py-3 focus:border-[#FF0000] outline-none transition-colors text-[#1a1a1a] text-sm";

  return (
    <div>
      <section className="pt-32 pb-20 bg-[#FFFF00] relative overflow-hidden">
        <BgImage src={bladBg} opacity={0.1} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1a]">Aanmelden</h1>
          <p className="text-[#1a1a1a]/60 mt-4 text-xl">Word lid van Scouting Nederland</p>
        </div>
      </section>

      <section className="py-16 bg-[#f8f8f8]">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          {/* Steps progress */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2 flex-1 last:flex-none">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors"
                  style={step >= n ? { background: "#FF0000", color: "white" } : { background: "#e0e0e0", color: "#aaa" }}
                >
                  {step > n ? <Check size={16} /> : n}
                </div>
                {n < 3 && (
                  <div className="h-1 flex-1 rounded transition-colors" style={{ background: step > n ? "#FF0000" : "#e0e0e0" }} />
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-[#aaa] text-center mb-8">
            {["Persoonlijke gegevens", "Speltaktak & ouder", "Bevestiging"][step - 1]}
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-6">Gegevens nieuw lid</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#555] mb-1">Voornaam</label>
                    <input value={form.voornaam} onChange={(e) => upd("voornaam", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#555] mb-1">Achternaam</label>
                    <input value={form.achternaam} onChange={(e) => upd("achternaam", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#555] mb-1">Geboortedatum</label>
                    <input type="date" value={form.geboortedatum} onChange={(e) => upd("geboortedatum", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#555] mb-1">Telefoonnummer</label>
                    <input type="tel" value={form.telefoon} onChange={(e) => upd("telefoon", e.target.value)} className={inputCls} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-[#555] mb-1">E-mailadres</label>
                    <input type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className={inputCls} />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="mt-6 w-full bg-[#FF0000] text-white font-bold py-4 rounded-xl hover:bg-[#c0050f] transition-colors">
                  Volgende →
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-6">Kies speltaktak</h2>
                <div className="space-y-2 mb-6">
                  {SPELTAKKEN.map((s) => {
                    const sel = form.speltaktak === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => upd("speltaktak", s.id)}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left"
                        style={{ borderColor: sel ? "#FF0000" : "#e0e0e0", background: sel ? "#fef0f0" : "white" }}
                      >
                        <div className="w-8 h-8 rounded-lg shrink-0" style={{ background: s.color }} />
                        <div className="flex-1">
                          <div className="font-bold text-[#1a1a1a] text-sm">{s.name}</div>
                          <div className="text-xs text-[#666]">{s.age}</div>
                        </div>
                        {sel && <Check size={18} className="text-[#FF0000]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-[#f0f0f0] pt-5">
                  <h3 className="font-bold text-[#1a1a1a] mb-3 text-sm">Gegevens ouder / verzorger</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#555] mb-1">Naam</label>
                      <input value={form.ouderNaam} onChange={(e) => upd("ouderNaam", e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#555] mb-1">Telefoon</label>
                      <input type="tel" value={form.ouderTelefoon} onChange={(e) => upd("ouderTelefoon", e.target.value)} className={inputCls} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-[#555] mb-1">E-mail</label>
                      <input type="email" value={form.ouderEmail} onChange={(e) => upd("ouderEmail", e.target.value)} className={inputCls} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 border-2 border-[#e0e0e0] text-[#666] font-bold py-4 rounded-xl hover:border-[#ccc] transition-colors">← Terug</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-[#FF0000] text-white font-bold py-4 rounded-xl hover:bg-[#c0050f] transition-colors">Volgende →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-[#31A529] rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-2">Bijna klaar!</h2>
                <p className="text-[#666] mb-6 text-sm">Controleer je gegevens en bevestig de aanmelding.</p>
                <div className="text-left bg-[#f8f8f8] rounded-xl p-5 mb-6 space-y-2 text-sm">
                  <div><span className="font-bold">Naam: </span>{form.voornaam} {form.achternaam}</div>
                  <div><span className="font-bold">E-mail: </span>{form.email}</div>
                  {selectedTak && <div><span className="font-bold">Speltaktak: </span>{selectedTak.name} ({selectedTak.age})</div>}
                  {form.ouderNaam && <div><span className="font-bold">Ouder/verzorger: </span>{form.ouderNaam}</div>}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 border-2 border-[#e0e0e0] text-[#666] font-bold py-4 rounded-xl">← Terug</button>
                  <button className="flex-1 bg-[#FF0000] text-white font-bold py-4 rounded-xl hover:bg-[#c0050f] transition-colors">
                    Aanmelding versturen 🎉
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Page: Sollicitatie ──────────────────────────────────────────────────────

function SollicitatiePage() {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<Record<string, number>>({});
  const [certs, setCerts] = useState<string[]>([]);
  const [beschikbaar, setBeschikbaar] = useState<string[]>([]);
  const [form, setForm] = useState({
    voornaam: "", achternaam: "", email: "", telefoon: "", leeftijd: "",
    ervaring: "", motivatie: "",
  });

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const setSkill = (s: string, v: number) => setSkills((sk) => ({ ...sk, [s]: sk[s] === v ? 0 : v }));
  const toggleCert = (c: string) => setCerts((cs) => cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]);
  const toggleBesch = (b: string) => setBeschikbaar((bs) => bs.includes(b) ? bs.filter((x) => x !== b) : [...bs, b]);

  const TOTAL = 5;
  const stepLabels = ["Profiel", "Vaardigheden", "Certificaten", "Beschikbaar", "Motivatie"];

  const inputCls = "w-full border-2 border-[#e0e0e0] rounded-xl px-4 py-3 focus:border-[#1A368D] outline-none transition-colors text-[#1a1a1a] text-sm";

  const SkillRow = ({ skill }: { skill: string }) => {
    const v = skills[skill] || 0;
    return (
      <div className="flex items-center justify-between py-2.5 border-b border-[#f5f5f5] last:border-0">
        <span className="text-sm text-[#333] flex-1 pr-4">{skill}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setSkill(skill, n)}
              title={["", "Beginner", "Enige ervaring", "Gemiddeld", "Gevorderd", "Expert"][n]}
              className="w-7 h-7 rounded-full text-xs font-bold transition-all"
              style={
                v >= n
                  ? { background: "#FF0000", color: "white", transform: "scale(1.1)" }
                  : { background: "#f0f0f0", color: "#ccc" }
              }
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="pt-32 pb-20 bg-[#1A368D] text-white relative overflow-hidden">
        <BgImage src={meerBg} opacity={0.1} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-block bg-[#FFFF00] text-[#1a1a1a] font-bold px-4 py-1.5 rounded-full text-xs mb-4 uppercase tracking-wider">
            Vrijwilliger worden
          </div>
          <h1 className="text-5xl md:text-7xl font-black">Word begeleider</h1>
          <p className="text-white/65 mt-4 text-xl max-w-2xl">
            Deel jouw talenten en maak het verschil. Vul het formulier in — veel beter dan een Excel!
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#f8f8f8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-[#aaa] mb-1.5">
              <span>Stap {step} van {TOTAL}</span>
              <span>{Math.round((step / TOTAL) * 100)}% voltooid</span>
            </div>
            <div className="h-2 bg-[#e0e0e0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF0000] rounded-full transition-all duration-500"
                style={{ width: `${(step / TOTAL) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {stepLabels.map((l, i) => (
                <span
                  key={l}
                  className="text-xs font-bold"
                  style={{ color: step === i + 1 ? "#FF0000" : step > i + 1 ? "#31A529" : "#ccc" }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {/* Step 1 — Profiel */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-1">Jouw profiel</h2>
                <p className="text-[#888] text-sm mb-6">Vertel ons wie jij bent</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#555] mb-1">Voornaam</label>
                    <input value={form.voornaam} onChange={(e) => upd("voornaam", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#555] mb-1">Achternaam</label>
                    <input value={form.achternaam} onChange={(e) => upd("achternaam", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#555] mb-1">Leeftijd</label>
                    <input type="number" min="16" max="99" value={form.leeftijd} onChange={(e) => upd("leeftijd", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#555] mb-1">Telefoonnummer</label>
                    <input type="tel" value={form.telefoon} onChange={(e) => upd("telefoon", e.target.value)} className={inputCls} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-[#555] mb-1">E-mailadres</label>
                    <input type="email" value={form.email} onChange={(e) => upd("email", e.target.value)} className={inputCls} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-[#555] mb-1">Eerdere scoutingervaring (optioneel)</label>
                    <textarea
                      rows={3}
                      value={form.ervaring}
                      onChange={(e) => upd("ervaring", e.target.value)}
                      placeholder="Bijv: 5 jaar als lid bij Scouting Groep X, daarna als Welpenleider..."
                      className={inputCls + " resize-none"}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Vaardigheden */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-1">Jouw vaardigheden</h2>
                <p className="text-[#888] text-sm mb-6">
                  Beoordeel jezelf op schaal 1 (beginner) t/m 5 (expert). Laat leeg als niet van toepassing.
                </p>
                <div className="space-y-4">
                  {SKILL_CATS.map((cat) => (
                    <details key={cat.title} className="border border-[#f0f0f0] rounded-2xl overflow-hidden group">
                      <summary className="flex items-center gap-3 p-4 bg-[#f8f8f8] cursor-pointer list-none font-extrabold text-[#1a1a1a] select-none hover:bg-[#f0f0f0] transition-colors">
                        <span className="text-2xl">{cat.emoji}</span>
                        {cat.title}
                        <span className="ml-auto text-[#ccc] group-open:rotate-180 transition-transform text-xs">▼</span>
                      </summary>
                      <div className="px-4 divide-y divide-[#f5f5f5]">
                        {cat.skills.map((s) => (
                          <SkillRow key={s} skill={s} />
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 — Certificaten */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-1">{"Diploma's & certificaten"}</h2>
                <p className="text-[#888] text-sm mb-6">Selecteer welke je hebt behaald</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {CERTS.map((c) => {
                    const sel = certs.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() => toggleCert(c)}
                        className="px-4 py-2 rounded-full border-2 font-semibold text-sm transition-all"
                        style={
                          sel
                            ? { borderColor: "#31A529", background: "#31A529", color: "white" }
                            : { borderColor: "#e0e0e0", color: "#555" }
                        }
                      >
                        {sel && "✓ "}{c}
                      </button>
                    );
                  })}
                </div>
                {certs.length > 0 && (
                  <div className="p-4 bg-[#31A529]/10 rounded-xl">
                    <div className="font-bold text-[#31A529] text-xs mb-2 uppercase tracking-wider">Geselecteerd ({certs.length})</div>
                    <div className="flex flex-wrap gap-1.5">
                      {certs.map((c) => (
                        <span key={c} className="text-xs bg-[#31A529] text-white px-2.5 py-1 rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4 — Beschikbaarheid */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-1">Beschikbaarheid</h2>
                <p className="text-[#888] text-sm mb-6">Wanneer kan jij helpen?</p>
                <div className="grid grid-cols-2 gap-3">
                  {BESCHIKBAAR_OPT.map((b) => {
                    const sel = beschikbaar.includes(b);
                    return (
                      <button
                        key={b}
                        onClick={() => toggleBesch(b)}
                        className="p-4 rounded-xl border-2 text-left transition-all"
                        style={
                          sel
                            ? { borderColor: "#1A368D", background: "#1A368D" + "0d" }
                            : { borderColor: "#e0e0e0" }
                        }
                      >
                        <div className="font-semibold text-sm" style={{ color: sel ? "#1A368D" : "#444" }}>
                          {sel ? "✓ " : ""}{b}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5 — Motivatie */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-black text-[#1a1a1a] mb-1">Jouw motivatie</h2>
                <p className="text-[#888] text-sm mb-6">Vertel ons waarom jij begeleider wilt worden</p>
                <textarea
                  rows={7}
                  value={form.motivatie}
                  onChange={(e) => upd("motivatie", e.target.value)}
                  placeholder="Ik wil begeleider worden omdat..."
                  className={inputCls + " resize-none"}
                />

                <div className="mt-6 bg-[#f8f8f8] rounded-2xl p-5 text-sm space-y-2">
                  <h3 className="font-black text-[#1a1a1a] mb-3">Samenvatting</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <div><span className="text-[#aaa] text-xs">Naam</span><div className="font-semibold text-[#1a1a1a]">{form.voornaam} {form.achternaam}</div></div>
                    <div><span className="text-[#aaa] text-xs">Leeftijd</span><div className="font-semibold text-[#1a1a1a]">{form.leeftijd ? `${form.leeftijd} jaar` : "—"}</div></div>
                    <div><span className="text-[#aaa] text-xs">E-mail</span><div className="font-semibold text-[#1a1a1a] truncate">{form.email || "—"}</div></div>
                    <div><span className="text-[#aaa] text-xs">Certificaten</span><div className="font-semibold text-[#1a1a1a]">{certs.length > 0 ? certs.length + " stuks" : "—"}</div></div>
                    <div className="col-span-2">
                      <span className="text-[#aaa] text-xs">Topvaardigheden (4+)</span>
                      <div className="font-semibold text-[#1a1a1a]">
                        {Object.entries(skills).filter(([, v]) => v >= 4).map(([k]) => k).join(", ") || "—"}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#aaa] text-xs">Beschikbaar</span>
                      <div className="font-semibold text-[#1a1a1a]">{beschikbaar.join(", ") || "—"}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={() => setStep((s) => s - 1)} className="flex-1 border-2 border-[#e0e0e0] text-[#666] font-bold py-4 rounded-xl hover:border-[#ccc] transition-colors">
                  ← Terug
                </button>
              )}
              {step < TOTAL ? (
                <button onClick={() => setStep((s) => s + 1)} className="flex-1 bg-[#1A368D] text-white font-bold py-4 rounded-xl hover:bg-[#002570] transition-colors">
                  Volgende →
                </button>
              ) : (
                <button className="flex-1 bg-[#FF0000] text-white font-bold py-4 rounded-xl hover:bg-[#c0050f] transition-colors flex items-center justify-center gap-2">
                  Sollicitatie versturen 🎉
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Page: Contact ───────────────────────────────────────────────────────────

function ContactPage() {
  const inputCls = "w-full border-2 border-[#e0e0e0] rounded-xl px-4 py-3 focus:border-[#FF0000] outline-none transition-colors text-[#1a1a1a] text-sm";

  return (
    <div>
      <section className="pt-32 pb-20 bg-[#1a1a1a] text-white relative overflow-hidden">
        <BgImage src={houtBg} opacity={0.1} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl md:text-7xl font-black">Contact</h1>
          <p className="text-white/50 mt-4 text-xl">Vragen? Wij helpen je graag verder</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-black text-[#1a1a1a] mb-8">Contactgegevens</h2>
            <div className="space-y-3 mb-10">
              {[
                { icon: <MapPin size={18} />, label: "Adres", value: "Scoutingstraat 1, 1234 AB Amsterdam" },
                { icon: <Phone size={18} />, label: "Telefoon", value: "020 – 123 45 67" },
                { icon: <Mail size={18} />, label: "E-mail", value: "info@scouting-amsterdam.nl" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#f0f0f0] hover:border-[#FF0000] transition-colors">
                  <div className="w-10 h-10 bg-[#FF0000]/10 text-[#FF0000] rounded-lg flex items-center justify-center shrink-0">{c.icon}</div>
                  <div>
                    <div className="text-xs text-[#aaa] font-bold uppercase tracking-wider">{c.label}</div>
                    <div className="font-semibold text-[#1a1a1a] text-sm">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden h-52 bg-[#e0e0e0]">
              <img src={unsplash("1526778548025-fa2f459cd5c1", 600, 300)} alt="Kaartlocatie" className="w-full h-full object-cover" />
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-[#f8f8f8]">
              <div className="font-bold text-[#1a1a1a] mb-1">Openingstijden</div>
              <div className="text-sm text-[#666] space-y-1">
                <div className="flex justify-between"><span>Zaterdag</span><span className="font-semibold">09:30 – 13:00</span></div>
                <div className="flex justify-between"><span>Overig</span><span className="font-semibold">Op afspraak</span></div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black text-[#1a1a1a] mb-8">Stuur een bericht</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#555] mb-1">Naam</label>
                  <input className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#555] mb-1">E-mail</label>
                  <input type="email" className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#555] mb-1">Onderwerp</label>
                <input className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#555] mb-1">Bericht</label>
                <textarea rows={6} className={inputCls + " resize-none"} />
              </div>
              <button className="w-full bg-[#FF0000] text-white font-bold py-4 rounded-xl hover:bg-[#c0050f] transition-colors">
                Verstuur bericht
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const go = (p: Page) => setPage(p);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home":        return <HomePage go={go} />;
      case "over-ons":    return <OverOnsPage />;
      case "speltakken":  return <SpeltakkenPage />;
      case "nieuws":      return <NieuwsPage />;
      case "agenda":      return <AgendaPage />;
      case "aanmelden":   return <AanmeldenPage />;
      case "sollicitatie": return <SollicitatiePage />;
      case "contact":     return <ContactPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <Navbar current={page} go={go} />
      <main>{renderPage()}</main>
      <Footer go={go} />
    </div>
  );
}

