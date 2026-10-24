import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Users,
} from "lucide-react";
import lorenaCentro from "@/assets/lorena-portada.webp";
import lorenaRetrato from "@/assets/procedimiento1.webp";
import lorenaequipo from "@/assets/lorena-equipo.webp";

import { REVIEWS } from "@/data/reviews";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

const TITLE = "Mg. Lorena Bahos | Rejuvenecimiento Facial y Estética en Mocoa, Putumayo";
const DESC =
  "Academia y Centro de Belleza Integral en Mocoa. Levantamiento de párpados, hidratación profunda, tratamiento de melasma, eliminación de tatuajes con láser sin dolor y sueroterapia.";
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://mglorenabahos.netlify.app").replace(
  /\/+$/,
  "",
);
const CANONICAL_URL = SITE_URL ? `${SITE_URL}/` : "/";
const SOCIAL_IMAGE_URL = SITE_URL ? `${SITE_URL}/social-share.webp` : "/social-share.webp";
const YEARS_EXPERIENCE = 5;
const WHATSAPP_URL = "https://wa.me/573237298148";
const WA = `${WHATSAPP_URL}?${new URLSearchParams({ text: "Hola, quisiera más información sobre sus servicios." })}`;
const LOCATION =
  "Av. San Francisco, enseguida del ICBF, Edificio Fénix, piso 2, Mocoa, Putumayo, Colombia";
const MAP_QUERY = encodeURIComponent(`Mg. Lorena Bahos Centro de Belleza Integral, ${LOCATION}`);
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;

function serviceWhatsAppUrl(serviceName: string) {
  const text = `Hola, Lorena. Quisiera agendar el servicio de ${serviceName}. ¿Podrías darme más información y ayudarme a reservar?`;
  return `${WHATSAPP_URL}?${new URLSearchParams({ text })}`;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "estética Mocoa, rejuvenecimiento facial Putumayo, tratamiento melasma Mocoa, eliminación de tatuajes láser Mocoa, sueroterapia Mocoa, Lorena Bahos",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CO" },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: SOCIAL_IMAGE_URL },
      {
        property: "og:image:alt",
        content: "Mg. Lorena Bahos, Centro de Belleza Integral en Mocoa",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SOCIAL_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "Mg. Lorena Bahos — Academia y Centro de Belleza Integral",
          telephone: "+57 323 7298148",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. San Francisco, enseguida del ICBF, Edificio Fénix, piso 2",
            addressLocality: "Mocoa",
            addressRegion: "Putumayo",
            addressCountry: "CO",
          },
          founder: { "@type": "Person", name: "Lorena Bahos", jobTitle: "Magíster en Estética" },
          makesOffer: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

const SERVICES = [
  {
    name: "Levantamiento de párpados",
    desc: "Mirada renovada y luminosa sin cirugía, con tecnología de plasma de precisión.",
  },
  {
    name: "Hidratación profunda de piel",
    desc: "Devuelve firmeza, suavidad y un brillo natural a tu rostro desde las capas internas.",
  },
  {
    name: "Hidratación y revitalización labial",
    desc: "Labios más definidos, suaves y llenos de vida con un acabado natural.",
  },
  {
    name: "Terapia regenerativa",
    desc: "Estimula la renovación celular para una piel visiblemente más joven.",
  },
  {
    name: "Tratamiento de melasma",
    desc: "Protocolos personalizados para unificar el tono y reducir manchas.",
  },
  {
    name: "Eliminación de señales",
    desc: "Retiro seguro de lunares, verrugas y pequeñas marcas en la piel.",
  },
  {
    name: "Eliminación de tatuajes y micropigmentación",
    desc: "Tecnología láser sin dolor para borrar tinta de forma progresiva y segura.",
  },
  {
    name: "Aclaramiento íntimo",
    desc: "Tratamiento delicado y discreto para unificar el tono de zonas sensibles.",
  },
  {
    name: "Sueroterapia",
    desc: "Vitaminas y antioxidantes que revitalizan tu cuerpo y tu piel desde adentro.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const counters = new Map<HTMLElement, number>();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      els.forEach((el) => {
        el.classList.add("in");
        const counter = el.querySelector<HTMLElement>("[data-count]");
        if (counter)
          counter.textContent = `${counter.dataset["count"]}${counter.dataset["suffix"] ?? ""}`;
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const counter = el.querySelector<HTMLElement>("[data-count]");
          const suffix = counter?.dataset["suffix"] ?? "";
          const runningFrame = counters.get(el);
          if (runningFrame !== undefined) cancelAnimationFrame(runningFrame);

          if (!entry.isIntersecting) {
            el.classList.remove("in");
            if (counter) counter.textContent = `0${suffix}`;
            return;
          }

          el.classList.add("in");
          if (!counter) return;

          const target = Number(counter.dataset["count"]);
          if (!Number.isFinite(target)) return;
          let startTime: number | undefined;
          const animate = (time: number) => {
            startTime ??= time;
            const progress = Math.min((time - startTime) / 1400, 1);
            const easedProgress = 1 - (1 - progress) ** 3;
            counter.textContent = `${Math.round(target * easedProgress)}${suffix}`;
            if (progress < 1) counters.set(el, requestAnimationFrame(animate));
            else counters.delete(el);
          };
          counters.set(el, requestAnimationFrame(animate));
        }),
      { threshold: 0.2 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      counters.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, []);
}

function Index() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[number] | null>(null);
  const [activeExperience, setActiveExperience] = useState(0);
  const [isExperienceHovered, setIsExperienceHovered] = useState(false);
  const experienceTouchStartX = useRef<number | null>(null);
  const activeExperienceIndex = REVIEWS.length > 0 ? activeExperience % REVIEWS.length : 0;

  useEffect(() => {
    const layout = new URLSearchParams(window.location.search).get("pdf");
    if (layout !== "desktop" && layout !== "mobile") return;

    document.documentElement.dataset["printLayout"] = layout;
    return () => {
      delete document.documentElement.dataset["printLayout"];
    };
  }, []);

  useEffect(() => {
    if (
      REVIEWS.length < 2 ||
      isExperienceHovered ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setActiveExperience((current) => (current + 1) % REVIEWS.length);
      }
    }, 6000);
    return () => window.clearInterval(interval);
  }, [isExperienceHovered]);

  const moveExperience = (direction: -1 | 1) => {
    if (REVIEWS.length < 2) {
      setActiveExperience(0);
      return;
    }
    setActiveExperience((current) => (current + direction + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const sections = ["inicio", "servicios", "sobre", "resenas", "equipo", "contacto", "ubicacion"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const marker = window.scrollY + 110;
      let currentSection = sections[0]?.id ?? "inicio";

      for (const section of sections) {
        if (section.offsetTop <= marker) currentSection = section.id;
        else break;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        currentSection = sections.at(-1)?.id ?? currentSection;
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border/70 bg-background/90 backdrop-blur-xl" : ""}`}
      >
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#inicio" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 font-display text-lg italic text-gold">
              LB
            </span>
            <span
              className={`relative py-2 text-[11px] font-medium tracking-[0.2em] uppercase after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform ${
                activeSection === "inicio" ? "after:scale-x-100" : "after:scale-x-0"
              }`}
              aria-current={activeSection === "inicio" ? "location" : undefined}
            >
              Lorena Bahos
            </span>
          </a>
          <div className="hidden items-center gap-5 text-[10px] tracking-[0.14em] uppercase text-muted-foreground md:flex lg:gap-7">
            <a
              href="#servicios"
              className={`relative py-2 transition hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform ${activeSection === "servicios" ? "text-foreground after:scale-x-100" : "after:scale-x-0"}`}
              aria-current={activeSection === "servicios" ? "location" : undefined}
            >
              Servicios
            </a>
            <a
              href="#sobre"
              className={`relative py-2 transition hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform ${activeSection === "sobre" ? "text-foreground after:scale-x-100" : "after:scale-x-0"}`}
              aria-current={activeSection === "sobre" ? "location" : undefined}
            >
              Sobre mí
            </a>
            <a
              href="#resenas"
              className={`relative py-2 transition hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform ${activeSection === "resenas" ? "text-foreground after:scale-x-100" : "after:scale-x-0"}`}
              aria-current={activeSection === "resenas" ? "location" : undefined}
            >
              Reseñas
            </a>
            <a
              href="#equipo"
              className={`relative py-2 transition hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform ${activeSection === "equipo" ? "text-foreground after:scale-x-100" : "after:scale-x-0"}`}
              aria-current={activeSection === "equipo" ? "location" : undefined}
            >
              Equipo
            </a>

            <a
              href="#ubicacion"
              className={`relative py-2 transition hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform ${activeSection === "ubicacion" ? "text-foreground after:scale-x-100" : "after:scale-x-0"}`}
              aria-current={activeSection === "ubicacion" ? "location" : undefined}
            >
              Ubicación
            </a>

            <a
              href="#contacto"
              className={`relative py-2 transition hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold after:transition-transform ${activeSection === "contacto" ? "text-foreground after:scale-x-100" : "after:scale-x-0"}`}
              aria-current={activeSection === "contacto" ? "location" : undefined}
            >
              Contacto
            </a>
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-foreground/20 px-6 py-2.5 text-[11px] tracking-[0.12em] uppercase transition hover:border-gold hover:text-gold"
          >
            Agendar
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section
          id="inicio"
          className="relative mx-auto grid min-h-[min(900px,100svh)] max-w-7xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10 lg:pb-20 lg:pt-32"
        >
          <div className="hero-in relative z-10 py-8 lg:py-0">
            <p className="mb-7 flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-gold">
              <span className="h-px w-9 bg-gold" /> Estética integral · Mocoa, Colombia
            </p>
            <h1 className="font-display text-[clamp(3.5rem,7vw,6.8rem)] font-light leading-[0.92] tracking-tight">
              El arte de <br />
              <span className="italic text-gold">sentirte</span>
              <br /> tú misma.
            </h1>
            <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Belleza que honra tu esencia. Tratamientos personalizados con ciencia, tecnología y
              una atención que se siente.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={WA}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-xs tracking-[0.12em] uppercase text-primary-foreground transition hover:bg-gold hover:text-white"
              >
                Reserva tu valoración{" "}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#servicios"
                className="text-xs tracking-[0.12em] uppercase text-muted-foreground transition hover:text-gold"
              >
                Descubre los tratamientos
              </a>
            </div>
            <div className="mt-14 flex items-center gap-4 border-t border-border/80 pt-6">
              <span className="font-display text-3xl italic text-gold">Mg.</span>
              <p className="text-[10px] leading-5 tracking-[0.16em] uppercase text-muted-foreground">
                Lorena Bahos
                <br />
                Especialista en estética integral
              </p>
            </div>
          </div>
          <div
            className="hero-in relative mx-auto w-full max-w-[600px] lg:ml-auto"
            style={{ animationDelay: ".25s" }}
          >
            <div className="absolute -inset-3 rounded-t-[48%] border border-gold/25 sm:-inset-4" />
            <div className="relative overflow-hidden rounded-t-[48%] bg-secondary">
              <img
                src={lorenaCentro}
                alt="Mg. Lorena Bahos en su Centro de Belleza Integral en Mocoa"
                fetchPriority="high"
                decoding="async"
                className="aspect-[0.88] w-full object-cover object-[center_28%] transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-full border border-border/70 bg-background/95 px-5 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:-left-10">
              <span className="font-display text-lg italic">Belleza con propósito</span>
            </div>
          </div>
          <a
            href="#servicios"
            aria-label="Ver tratamientos"
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition hover:text-gold lg:block"
          >
            <ArrowDown className="h-5 w-5" />
          </a>
        </section>

        {/* Statement */}
        <section className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-10 lg:py-24">
          <p className="reveal mx-auto max-w-5xl font-display text-4xl font-light leading-tight sm:text-6xl">
            Ciencia y cuidado.{" "}
            <span className="text-muted-foreground">Un ritual pensado para ti.</span>
          </p>
        </section>

        {/* Services */}
        <section id="servicios" className="bg-[#f1ede5] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="reveal mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-gold">
                  Cuidado personalizado
                </p>
                <h2 className="mt-4 font-display text-5xl font-light sm:text-7xl">
                  Nuestros rituales
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                Cada piel tiene su propia historia. Creamos el tratamiento ideal para acompañar la
                tuya.
              </p>
            </div>
            <div className="grid border-l border-t border-border/80 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <article
                  key={s.name}
                  className="reveal group border-b border-r border-border/80 transition duration-500 hover:bg-white/60"
                  style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                >
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setSelectedService(s)}
                    className="min-h-56 w-full p-7 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:p-9"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl italic text-gold/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-gold/70 transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-medium">{s.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    <span className="mt-6 inline-block text-[10px] tracking-[0.16em] uppercase text-gold">
                      Conocer tratamiento
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="sobre"
          className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-28 md:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-10 lg:py-36"
        >
          <div className="reveal relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rounded-t-[48%] border border-gold/30" />
            <div className="relative overflow-hidden rounded-t-[48%] bg-secondary">
              <img
                src={lorenaRetrato}
                alt="Mg. Lorena Bahos, especialista en estética integral"
                loading="lazy"
                className="aspect-[0.84] w-full object-cover object-[center_25%] transition duration-1000 hover:scale-105"
              />
            </div>
          </div>
          <div className="reveal">
            <p className="text-[10px] tracking-[0.28em] uppercase text-gold">
              Una atención cercana, un cuidado experto
            </p>
            <h2 className="mt-5 font-display text-5xl font-light leading-tight sm:text-7xl">
              Tu especialista,
              <br />
              <span className="italic text-gold">Lorena Bahos.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
              Magíster y formadora en estética integral. Dirijo una academia y un centro de belleza
              en Mocoa donde cada tratamiento se diseña a la medida de tu piel, combinando ciencia,
              tecnología y un trato cálido y cercano.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-5 border-t border-border/80 pt-8">
              {[
                { value: "9", suffix: "+", label: "Tratamientos", count: true },
                { value: "Láser", label: "Tecnología", count: false },
                { value: "100%", label: "Personalizado", count: false },
              ].map(({ value, suffix = "", label, count }) => (
                <div key={label} className={`reveal ${count ? "counter-reveal" : ""}`}>
                  <p className="font-display text-4xl">
                    {count ? (
                      <span data-count={value} data-suffix={suffix}>
                        0{suffix}
                      </span>
                    ) : (
                      value
                    )}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Illustrative experience examples */}
        <section id="resenas" className="bg-[#f1ede5] px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="reveal max-w-xl">
              <Quote className="mb-5 h-8 w-8 text-gold/70" strokeWidth={1.2} />
              <p className="text-[10px] tracking-[0.28em] uppercase text-gold">
                Un espacio para escuchar y compartir
              </p>
              <h2 className="mt-3 font-display text-5xl font-light leading-tight sm:text-7xl">
                Experiencias que <span className="italic text-gold">inspiran.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
                Una mirada al cuidado cercano y personalizado que queremos ofrecer en cada visita.
              </p>
              <div className="mt-6 grid grid-cols-2 border-y border-border/80 py-4">
                <div className="reveal flex items-center gap-3">
                  <span
                    className="font-display text-4xl font-light text-gold"
                    data-count={REVIEWS.length}
                    aria-label={`${REVIEWS.length} experiencias en el carrusel`}
                  >
                    0
                  </span>
                  <span className="text-[9px] leading-4 tracking-[0.14em] uppercase text-muted-foreground">
                    Experiencias
                    <br />
                    en el carrusel
                  </span>
                </div>
                <div className="reveal flex items-center gap-3 border-l border-border/80 pl-5">
                  <span
                    className="font-display text-4xl font-light text-foreground/70"
                    data-count={YEARS_EXPERIENCE}
                    aria-label={`${YEARS_EXPERIENCE} años de experiencia`}
                  >
                    0
                  </span>
                  <span className="text-[9px] leading-4 tracking-[0.14em] uppercase text-muted-foreground">
                    Años de
                    <br />
                    experiencia
                  </span>
                </div>
              </div>
              <p className="mt-3 max-w-md text-xs leading-5 text-muted-foreground">
                {REVIEWS.some((review) => review.illustrative)
                  ? "Las opiniones y fotografías reales podrán añadirse cuando contemos con la autorización de cada clienta."
                  : "Gracias a cada clienta por compartir su experiencia y permitirnos publicarla."}
              </p>
              <a
                href={`${WHATSAPP_URL}?${new URLSearchParams({ text: "Hola, Lorena. Quisiera compartir mi experiencia en el Centro de Belleza Integral." })}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-3 rounded-full border border-foreground/20 px-6 py-3 text-[10px] tracking-[0.14em] uppercase transition hover:border-gold hover:text-gold"
              >
                Comparte tu experiencia <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div
              role="region"
              aria-label={
                REVIEWS.some((review) => review.illustrative)
                  ? "Carrusel de experiencias ilustrativas"
                  : "Carrusel de reseñas"
              }
              aria-roledescription="carrusel"
              tabIndex={0}
              onMouseEnter={() => setIsExperienceHovered(true)}
              onMouseLeave={() => setIsExperienceHovered(false)}
              onFocus={() => setIsExperienceHovered(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setIsExperienceHovered(false);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveExperience(-1);
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveExperience(1);
                }
              }}
              onTouchStart={(event) => {
                experienceTouchStartX.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(event) => {
                const startX = experienceTouchStartX.current;
                const endX = event.changedTouches[0]?.clientX;
                experienceTouchStartX.current = null;
                if (startX === null || endX === undefined) return;
                if (startX - endX > 45) moveExperience(1);
                if (endX - startX > 45) moveExperience(-1);
              }}
              className="experience-carousel reveal mx-auto w-full max-w-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="experience-stage relative grid">
                {REVIEWS.map((review, index) => {
                  const isActive = activeExperienceIndex === index;
                  const direction = index < activeExperienceIndex ? -1 : 1;

                  return (
                    <div
                      key={`${review.author}-${review.title}`}
                      className={`experience-slide col-start-1 row-start-1 flex w-full items-center justify-center transition-[opacity,transform] duration-700 ease-out ${
                        isActive
                          ? "pointer-events-auto translate-x-0 opacity-100"
                          : `pointer-events-none ${direction < 0 ? "-translate-x-3" : "translate-x-3"} opacity-0`
                      }`}
                      aria-current={isActive}
                      aria-hidden={!isActive}
                      style={{ zIndex: isActive ? 1 : 0, animationDelay: `${index * -1.2}s` }}
                      role="group"
                      aria-roledescription="diapositiva"
                      aria-label={`${index + 1} de ${REVIEWS.length}: ${review.title}`}
                    >
                      <article className="experience-float w-[min(100%,22rem)] overflow-hidden rounded-t-[8rem] rounded-b-[1.75rem] border border-gold/40 bg-background/95 shadow-[var(--shadow-soft)]">
                        <div className="relative overflow-hidden bg-secondary">
                          <img
                            src={review.image}
                            alt={review.imageAlt}
                            loading="lazy"
                            className="aspect-[1.3] w-full object-cover"
                          />
                          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/50 bg-background/90 px-3 py-1.5 text-[8px] tracking-[0.15em] uppercase text-foreground backdrop-blur-sm">
                            {review.illustrative ? "Ilustración · ejemplo" : review.treatment}
                          </span>
                        </div>
                        <div className="px-6 pb-7 pt-5 text-center">
                          <span className="text-[8px] tracking-[0.16em] uppercase text-gold">
                            {review.illustrative
                              ? "Texto de muestra · no es reseña real"
                              : `Experiencia compartida · ${review.treatment}`}
                          </span>
                          <h3 className="mt-2 font-display text-2xl font-medium">{review.title}</h3>
                          <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
                            {review.text}
                          </p>
                          <p className="mt-4 text-[9px] tracking-[0.14em] uppercase text-foreground/70">
                            {review.author}
                          </p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-center gap-5">
                <button
                  type="button"
                  aria-label="Ver experiencia anterior"
                  onClick={() => moveExperience(-1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/80 text-foreground/70 transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2" aria-label="Seleccionar experiencia">
                  {REVIEWS.map((review, index) => (
                    <button
                      key={`${review.author}-${review.title}`}
                      type="button"
                      aria-label={`Mostrar experiencia ${index + 1}`}
                      aria-current={activeExperienceIndex === index}
                      onClick={() => setActiveExperience(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        activeExperienceIndex === index
                          ? "w-8 bg-gold"
                          : "w-1.5 bg-gold/35 hover:bg-gold/70"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Ver siguiente experiencia"
                  onClick={() => moveExperience(1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/80 text-foreground/70 transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 text-center text-[9px] tracking-[0.16em] uppercase text-muted-foreground">
                {String(activeExperienceIndex + 1).padStart(2, "0")} /{" "}
                {String(REVIEWS.length).padStart(2, "0")} · Experiencias
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          id="equipo"
          className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24"
        >
          <div className="reveal order-2 md:order-2">
            <p className="flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-gold">
              <Users className="h-4 w-4" /> Nuestro equipo
            </p>
            <h2 className="mt-5 font-display text-5xl font-light leading-tight sm:text-7xl">
              El cuidado experto <span className="italic text-gold">comienza aquí.</span>
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground">
              Al frente de nuestro centro, Lorena combina su experiencia en estética integral con
              una atención cercana y personalizada. Cada visita comienza escuchándote y entendiendo
              lo que tu piel necesita.
            </p>
            <div className="mt-9 flex items-center gap-4 border-t border-border/80 pt-6">
              <HeartHandshake className="h-5 w-5 text-gold" strokeWidth={1.4} />
              <p className="text-[10px] leading-5 tracking-[0.12em] uppercase text-muted-foreground">
                Atención cercana · Cuidado personalizado
              </p>
            </div>
          </div>
          <div className="reveal order-1 mx-auto w-full max-w-md md:order-1">
            <div className="relative overflow-hidden rounded-t-[48%] border border-gold/25 bg-secondary">
              <img
                src={lorenaequipo}
                alt="Mg. Lorena Bahos en su centro de belleza integral"
                loading="lazy"
                className="aspect-[0.88] w-full object-cover object-[center_25%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-7 pb-8 pt-20 text-white">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/75">
                  Dirección y formación
                </p>
                <p className="mt-2 font-display text-3xl">Mg. Lorena Bahos</p>
                <p className="mt-1 text-xs text-white/75">
                  Magíster y formadora en estética integral
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section id="ubicacion" className="scroll-mt-24 px-6 pb-16 lg:px-10 lg:pb-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
            <div className="reveal">
              <p className="flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-gold">
                <MapPin className="h-4 w-4" /> Nuestra ubicación
              </p>
              <h2 className="mt-5 font-display text-5xl font-light sm:text-6xl">
                Un espacio creado para ti.
              </h2>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">{LOCATION}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-foreground/20 px-6 py-3 text-[10px] tracking-[0.14em] uppercase transition hover:border-gold hover:text-gold"
              >
                Cómo llegar <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="reveal map-frame overflow-hidden rounded-[2rem] border border-gold/25 bg-secondary p-2 shadow-[var(--shadow-soft)]">
              <iframe
                title="Mapa de ubicación del Centro de Belleza Integral Mg. Lorena Bahos en Mocoa"
                src={MAP_EMBED_URL}
                className="h-[280px] w-full rounded-[1.5rem] border-0 sm:h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" className="px-6">
          <div className="reveal mx-auto max-w-7xl border border-gold/30 bg-[#24211c] px-8 py-20 text-center text-primary-foreground sm:py-28">
            <p className="text-[10px] tracking-[0.28em] uppercase text-gold">Un espacio para ti</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-display text-5xl font-light sm:text-7xl">
              Tu momento de <span className="italic text-gold">sentirte bien</span> empieza aquí.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-primary-foreground/65">
              Agenda tu valoración personalizada con Lorena y descubre el cuidado hecho a tu medida.
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary-foreground px-8 py-4 text-xs tracking-[0.12em] uppercase text-primary transition hover:bg-gold hover:text-white"
            >
              <MessageCircle className="h-4 w-4" /> Agenda por WhatsApp
            </a>
            <div className="mt-14 flex flex-col items-center justify-center gap-6 text-sm text-primary-foreground/70 sm:flex-row sm:gap-12">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" /> Av. San Francisco, enseguida del ICBF ·
                Edificio Fénix, piso 2 · Mocoa, Putumayo
              </span>
              <a
                href="tel:+573237298148"
                className="flex items-center gap-2 hover:text-primary-foreground"
              >
                <Phone className="h-4 w-4 text-gold" /> +57 323 729 8148
              </a>
            </div>
          </div>
        </section>
      </main>

      <Dialog
        open={selectedService !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedService(null);
        }}
      >
        <DialogContent className="max-h-[90svh] max-w-xl overflow-y-auto rounded-[2rem] border border-gold/25 bg-background p-8 shadow-[var(--shadow-soft)] sm:p-12">
          {selectedService && (
            <>
              <DialogHeader className="gap-4 pr-6">
                <span className="text-[10px] tracking-[0.24em] uppercase text-gold">
                  Ritual de cuidado personalizado
                </span>
                <DialogTitle className="font-display text-4xl font-light leading-tight sm:text-5xl">
                  {selectedService.name}
                </DialogTitle>
                <DialogDescription className="text-sm leading-7 text-muted-foreground">
                  {selectedService.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="my-8 border-y border-border/80 py-6">
                <p className="font-display text-xl italic">Un tratamiento pensado para ti.</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Escríbenos para conocer los detalles y coordinar una valoración personalizada.
                </p>
              </div>
              <a
                href={serviceWhatsAppUrl(selectedService.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-[10px] tracking-[0.14em] uppercase text-primary-foreground transition hover:bg-gold"
              >
                <MessageCircle className="h-4 w-4" /> Agendar este servicio{" "}
                <ArrowRight className="h-4 w-4" />
              </a>
              <DialogClose className="mt-5 text-center text-[10px] tracking-[0.14em] uppercase text-muted-foreground transition hover:text-foreground">
                Seguir explorando
              </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog>
        <footer className="flex flex-col gap-3 border-t py-8 text-center text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          <p>
            © {new Date().getFullYear()} Mg. Lorena Bahos · Academia y Centro de Belleza Integral
          </p>
          <p className="text-[9px] opacity-60">
            Diseñado y desarrollado por{" "}
            <a href="#" className="transition-colors hover:text-foreground">
              Ing. Yeferson Martinez
            </a>
          </p>
          <DialogTrigger asChild>
            <button
              type="button"
              className="mx-auto text-[9px] tracking-[0.12em] underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Política de Tratamiento de Datos
            </button>
          </DialogTrigger>
        </footer>
        <DialogContent className="max-h-[85svh] max-w-2xl overflow-y-auto rounded-[2rem] border border-gold/25 bg-background p-8 shadow-[var(--shadow-soft)] sm:p-10">
          <DialogHeader className="gap-4 pr-6 text-left">
            <span className="text-[10px] tracking-[0.24em] uppercase text-gold">
              Privacidad y protección de datos
            </span>
            <DialogTitle className="font-display text-3xl font-light leading-tight sm:text-4xl">
              Política de Tratamiento de Datos Personales
            </DialogTitle>
            <DialogDescription className="text-sm leading-7">
              En cumplimiento de la Ley 1581 de 2012 y sus normas reglamentarias, informamos cómo
              tratamos los datos personales que compartes voluntariamente por WhatsApp u otros
              canales de atención.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 text-sm leading-7 text-muted-foreground">
            <p>
              <strong className="text-foreground">Responsable:</strong> Mg. Lorena Bahos — Centro de
              Belleza Integral, Mocoa, Putumayo. Contacto:{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4"
              >
                WhatsApp +57 323 729 8148
              </a>
              .
            </p>
            <p>
              <strong className="text-foreground">Finalidades:</strong> utilizar los datos
              únicamente para responder tus consultas, agendar y gestionar valoraciones o citas, y
              brindarte atención al cliente relacionada con los servicios que solicites.
            </p>
            <p>
              <strong className="text-foreground">Datos y conservación:</strong> podremos tratar los
              datos de contacto y la información que proporciones sobre tu solicitud. Conservaremos
              estos datos solo durante el tiempo necesario para atender estas finalidades o cumplir
              obligaciones legales. No los vendemos ni los usamos para fines publicitarios.
            </p>
            <p>
              No estás obligado a suministrar datos sensibles, como información sobre tu salud. Si
              decides compartirlos y su tratamiento resulta necesario, solicitaremos autorización
              explícita previa.
            </p>
            <p>
              <strong className="text-foreground">Tus derechos:</strong> puedes solicitar conocer,
              actualizar o rectificar tus datos, pedir prueba de la autorización cuando corresponda,
              presentar consultas o reclamos, y solicitar su supresión o revocar la autorización
              cuando sea legalmente procedente. Para ejercerlos, escríbenos al WhatsApp indicado.
              También puedes acudir a la Superintendencia de Industria y Comercio cuando
              corresponda.
            </p>
            <p className="text-xs">
              WhatsApp es una plataforma de terceros y puede tratar información de acuerdo con sus
              propias políticas. Cuando la ley exija autorización previa, la solicitaremos antes del
              tratamiento correspondiente.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <a
        href={WA}
        target="_blank"
        rel="noopener"
        aria-label="Escribir por WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] transition hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
