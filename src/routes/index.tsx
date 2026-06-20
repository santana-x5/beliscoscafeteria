import { useEffect, useState, useRef, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Instagram,
  MapPin,
  MessageCircle,
  Check,
  Star,
} from "lucide-react";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Belisco's Bistrô Café — Casa de Eventos em São Lourenço da Mata" },
      {
        name: "description",
        content:
          "Casa de eventos para casamentos, 15 anos, bodas e comemorações em São Lourenço da Mata — PE.",
      },
      { property: "og:title", content: "Belisco's Bistrô Café — Casa de Eventos" },
      {
        property: "og:description",
        content: "Para todos os momentos. Casamentos, 15 anos e comemorações.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/55XXXXXXXXXX";
const PHONE = "tel:+55XXXXXXXXXXX";
const INSTAGRAM = "https://instagram.com/beliscosbistro";
const MAPS = "https://maps.google.com/?q=Rua+Dez+de+Janeiro+102+São+Lourenço+da+Mata";

const galleryImages = [
  { label: "Casamento — cerimônia", ratio: "4/5" },
  { label: "15 anos — entrada da debutante", ratio: "3/4" },
  { label: "Casamento — primeira dança", ratio: "4/3" },
  { label: "Aniversário — mesa decorada", ratio: "1/1" },
  { label: "15 anos — valsa", ratio: "4/5" },
  { label: "Casamento — recepção", ratio: "3/4" },
  { label: "Bodas — brinde", ratio: "4/3" },
  { label: "15 anos — pista de dança", ratio: "1/1" },
  { label: "Casamento — bouquet", ratio: "4/5" },
  { label: "Comemoração — convidados", ratio: "3/4" },
  { label: "15 anos — decoração", ratio: "4/3" },
  { label: "Bodas — celebração", ratio: "4/5" },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade-in observer
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallax
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!leftColRef.current || !rightColRef.current) return;
        const rect = leftColRef.current.getBoundingClientRect();
        const progress = -rect.top;
        leftColRef.current.style.transform = `translateY(${progress * -0.05}px)`;
        rightColRef.current.style.transform = `translateY(${progress * 0.05}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)),
    [],
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % galleryImages.length)),
    [],
  );
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox, prev, next]);

  const navLinks = [
    { label: "Sobre", href: "#sobre" },
    { label: "Eventos", href: "#eventos" },
    { label: "Galeria", href: "#galeria" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "var(--cream)" : "transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(44,31,14,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <a
            href="#hero"
            className="text-xl md:text-2xl tracking-widest"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              color: scrolled ? "var(--brown-dark)" : "#fff",
            }}
          >
            BELISCO'S
          </a>
          <ul className="hidden md:flex gap-10">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-70"
                  style={{ color: scrolled ? "var(--brown-dark)" : "#fff" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{ color: scrolled || menuOpen ? "var(--brown-dark)" : "#fff" }}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden border-t"
            style={{ backgroundColor: "var(--cream)", borderColor: "rgba(44,31,14,0.1)" }}
          >
            <ul className="flex flex-col p-6 gap-5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm tracking-[0.2em] uppercase"
                    style={{ color: "var(--brown-dark)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative w-full" style={{ height: "100vh" }}>
        <img
          src="/hero.jpg"
          alt="Fachada do Belisco's Bistrô Café à noite"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <p
            className="mb-6 uppercase tracking-[0.3em] text-xs md:text-sm"
            style={{ color: "var(--gold)", fontWeight: 500 }}
          >
            São Lourenço da Mata — PE
          </p>
          <h1
            className="text-white leading-[0.95]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
            }}
          >
            Belisco's
            <span
              className="block italic mt-2"
              style={{
                color: "var(--gold)",
                fontWeight: 400,
                fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
              }}
            >
              Bistrô Café
            </span>
          </h1>
          <p
            className="mt-8 text-white/90 max-w-xl"
            style={{ fontWeight: 300, fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
          >
            Para todos os momentos.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-10"
          >
            Faça sua reserva
          </a>
        </div>
        <a
          href="#cta-strip"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 animate-bounce"
          aria-label="Rolar para baixo"
        >
          <ChevronDown size={32} />
        </a>
      </section>

      {/* GOLD STRIP */}
      <div
        id="cta-strip"
        className="w-full py-4 px-6"
        style={{ backgroundColor: "var(--gold)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-center">
          <p className="text-white text-sm md:text-base" style={{ fontWeight: 400 }}>
            Solicite um orçamento ou agende uma visita ao Belisco's Bistrô Café
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase border border-white text-white px-5 py-2.5 hover:bg-white hover:text-[var(--gold)] transition-colors shrink-0"
          >
            Agende uma visita
          </a>
        </div>
      </div>

      {/* SOBRE */}
      <section
        id="sobre"
        className="py-24 md:py-32 px-6"
        style={{ backgroundColor: "var(--cream)" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-center">
          <div className="fade-in">
            <p className="section-label">Bem-vindo ao Belisco's</p>
            <h2
              className="mt-4"
              style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", lineHeight: 1.15 }}
            >
              Como vamos realizar o seu sonho?
            </h2>
            <span
              className="block mt-5 mb-6"
              style={{ width: 40, height: 2, backgroundColor: "var(--gold)" }}
            />
            <p className="text-base md:text-lg leading-relaxed mb-5">
              O Belisco's Bistrô Café é um espaço único em São Lourenço da Mata, criado
              para transformar momentos especiais em memórias eternas. Com uma atmosfera
              acolhedora, iluminação cuidadosa e culinária autoral, cada evento aqui tem
              identidade própria.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Nosso espaço já foi palco de casamentos inesquecíveis, festas de 15 anos
              encantadoras e comemorações de todas as naturezas. Venha nos visitar e
              descobrir por que somos a escolha certa para o seu grande momento.
            </p>
          </div>
          <div
            className="fade-in overflow-hidden"
            style={{ aspectRatio: "4/5", borderRadius: 12 }}
          >
            <Placeholder label="Foto do espaço interno aqui" />
          </div>
        </div>
      </section>

      {/* NOSSO ESPAÇO */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: "var(--beige)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="fade-in max-w-3xl mx-auto"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2 }}
          >
            Tudo que você precisa para realizar o evento dos seus sonhos
          </h2>
          <span className="gold-divider" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-14">
            {[
              ["Espaço Externo", "Jardim iluminado e área aberta para cerimônias ao ar livre.", "Foto do jardim externo aqui"],
              ["Salão Principal", "Ambiente climatizado e decorado com charme e sofisticação.", "Foto do salão decorado aqui"],
              ["Culinária Autoral", "Pratos exclusivos preparados especialmente para o seu evento.", "Foto de prato do evento aqui"],
              ["Open Bar", "Drinks e bebidas selecionadas para animar cada momento.", "Foto de drinks aqui"],
              ["Decoração Personalizada", "Cada detalhe pensado para refletir a sua história.", "Foto de decoração de evento aqui"],
              ["Ambiente Fotogênico", "Cenários únicos para fotos que durarão para sempre.", "Foto de ensaio fotográfico aqui"],
              ["Música ao Vivo", "Shows e apresentações que elevam a experiência do seu evento.", "Foto de música ao vivo aqui"],
              ["E muito mais!", "Venha nos visitar e conheça tudo que preparamos para você.", "Foto geral do espaço aqui"],
            ].map(([title, desc, ph], i) => (
              <div
                key={title}
                className="fade-in text-left bg-white overflow-hidden"
                style={{ borderRadius: 8, boxShadow: "0 4px 18px rgba(44,31,14,0.05)", transitionDelay: `${i * 60}ms` }}
              >
                <div style={{ aspectRatio: "4/3" }}>
                  <Placeholder label={ph} />
                </div>
                <div className="p-6">
                  <p style={{ color: "var(--gold)", fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")}.
                  </p>
                  <h3 className="text-lg mt-1 mb-2" style={{ fontWeight: 700 }}>{title}</h3>
                  <p className="text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-14"
          >
            Quero um orçamento
          </a>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="section-label">Depoimentos</p>
          <h2 className="mt-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            Veja o que nossos clientes falam de nós!
          </h2>
          <span className="gold-divider" />
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-14 text-left">
            {[
              ["O espaço é simplesmente lindo. Fizemos nosso casamento aqui e foi perfeito em cada detalhe. A equipe cuidou de tudo com muito carinho.", "Ana & Carlos"],
              ["Minha festa de 15 anos foi um sonho realizado. O ambiente, a decoração, a comida — tudo impecável. Recomendo de olhos fechados!", "Letícia M."],
              ["Comemoramos nossas bodas de prata no Belisco's e não poderíamos ter escolhido lugar melhor. Voltaremos com certeza!", "Roberto & Sandra"],
            ].map(([quote, name], i) => (
              <div
                key={name}
                className="fade-in bg-white p-8 md:p-10 relative"
                style={{
                  borderRadius: 8,
                  border: "1px solid #e8e0d5",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <span
                  className="block leading-none"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "var(--gold)",
                    fontSize: "4rem",
                    height: "2rem",
                  }}
                >
                  "
                </span>
                <p className="italic mt-2 text-base leading-relaxed">{quote}</p>
                <p className="mt-6 text-center" style={{ fontWeight: 700, color: "var(--brown-dark)" }}>
                  {name}
                </p>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} fill="var(--gold)" stroke="var(--gold)" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-14"
          >
            Quero um orçamento
          </a>
        </div>
      </section>

      {/* EVENTOS */}
      <section id="eventos" className="py-24 md:py-32 px-6" style={{ backgroundColor: "var(--beige)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="section-label">Soluções preparadas especialmente para o seu sonho</p>
          <h2 className="mt-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            Soluções para todo tipo de evento
          </h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Escolha abaixo o tipo de evento que deseja realizar e veja tudo o que podemos
            oferecer.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              ["Casamentos", "O seu casamento será o dia mais feliz da sua vida. Realizamos cerimônias e recepções com toda a elegância que esse momento merece.", "Foto de casamento aqui"],
              ["15 Anos", "O baile de debutante é um sonho. Criamos uma experiência mágica e inesquecível para a noite mais especial da sua vida.", "Foto de festa de 15 anos aqui"],
              ["Comemorações", "Aniversários, bodas, formaturas e confraternizações — realizamos qualquer celebração com o charme que só o Belisco's oferece.", "Foto de aniversário/bodas aqui"],
            ].map(([title, desc, ph], i) => (
              <div
                key={title}
                className="fade-in bg-white overflow-hidden flex flex-col"
                style={{ borderRadius: 8, boxShadow: "0 6px 24px rgba(44,31,14,0.07)", transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative" style={{ aspectRatio: "3/4" }}>
                  <Placeholder label={ph} />
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--gold)" }}
                  >
                    <Check size={22} color="#fff" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="px-7 pt-10 pb-8 text-center flex-1 flex flex-col">
                  <h3 className="text-2xl" style={{ fontWeight: 700 }}>{title}</h3>
                  <span className="gold-divider" />
                  <p className="text-sm leading-relaxed mt-3 flex-1">{desc}</p>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold btn-gold-hover mt-6 self-center"
                  >
                    Quero um orçamento
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA PARALLAX */}
      <section
        id="galeria"
        className="py-24 md:py-32 px-6 overflow-hidden"
        style={{ backgroundColor: "var(--footer)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white" style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)" }}>
            Momentos que ficam para sempre
          </h2>
          <p className="mt-3" style={{ color: "var(--gold)", fontStyle: "italic" }}>
            Clique em qualquer foto para ver em alta resolução
          </p>
          <span className="gold-divider" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-14">
            <div ref={leftColRef} className="flex flex-col gap-4 md:gap-6 will-change-transform">
              {galleryImages.filter((_, i) => i % 2 === 0).map((img, i) => {
                const idx = i * 2;
                return (
                  <button
                    key={idx}
                    onClick={() => setLightbox(idx)}
                    className="block w-full overflow-hidden hover:opacity-90 transition-opacity"
                    style={{ aspectRatio: img.ratio, borderRadius: 6 }}
                  >
                    <Placeholder label={img.label} dark />
                  </button>
                );
              })}
            </div>
            <div ref={rightColRef} className="flex flex-col gap-4 md:gap-6 will-change-transform md:mt-12">
              {galleryImages.filter((_, i) => i % 2 === 1).map((img, i) => {
                const idx = i * 2 + 1;
                return (
                  <button
                    key={idx}
                    onClick={() => setLightbox(idx)}
                    className="block w-full overflow-hidden hover:opacity-90 transition-opacity"
                    style={{ aspectRatio: img.ratio, borderRadius: 6 }}
                  >
                    <Placeholder label={img.label} dark />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-28 px-6 text-center" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
            Toque no botão abaixo para solicitar um orçamento!
          </h2>
          <span className="gold-divider" />
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-8"
          >
            Quero um orçamento
          </a>
        </div>
      </section>

      {/* SOCIAL BAR */}
      <div className="grid grid-cols-4">
        {[
          { icon: MessageCircle, href: WHATSAPP, hover: "#25D366", grad: false, label: "WhatsApp" },
          { icon: Instagram, href: INSTAGRAM, hover: "", grad: true, label: "Instagram" },
          { icon: Phone, href: PHONE, hover: "#2563eb", grad: false, label: "Telefone" },
          { icon: MapPin, href: MAPS, hover: "#EA4335", grad: false, label: "Google Maps" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <a
              key={i}
              href={s.href}
              target={s.href.startsWith("tel:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: "var(--footer-alt)",
                height: 80,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = s.grad
                  ? "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
                  : s.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--footer-alt)";
              }}
            >
              <Icon size={28} color="#fff" strokeWidth={1.6} />
            </a>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer
        id="contato"
        className="px-6 py-14 text-center"
        style={{ backgroundColor: "var(--footer)", color: "var(--beige)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#fff",
              letterSpacing: "0.15em",
            }}
          >
            BELISCO'S BISTRÔ CAFÉ
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold btn-gold-hover mt-6"
          >
            Quero um orçamento
          </a>
          <p className="text-sm mt-8 opacity-80">
            Rua Dez de Janeiro, 102 — São Lourenço da Mata, PE
          </p>
          <p className="text-xs mt-3 opacity-60">
            © 2025 Belisco's Bistrô Café — Todos os direitos reservados
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full transition-transform hover:scale-110"
        style={{
          width: 58,
          height: 58,
          backgroundColor: "#25D366",
          boxShadow: "0 6px 20px rgba(37,211,102,0.4)",
        }}
      >
        <MessageCircle size={28} color="#fff" />
      </a>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white z-10 p-2"
            aria-label="Fechar"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white z-10 p-2"
            aria-label="Anterior"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white z-10 p-2"
            aria-label="Próxima"
          >
            <ChevronRight size={40} />
          </button>
          <div
            className="flex-1 flex items-center justify-center p-6 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full max-w-4xl"
              style={{ aspectRatio: galleryImages[lightbox].ratio, maxHeight: "75vh" }}
            >
              <Placeholder label={galleryImages[lightbox].label} dark />
            </div>
          </div>
          <div
            className="flex gap-2 overflow-x-auto p-4 justify-start md:justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="shrink-0 transition-opacity"
                style={{
                  width: 64,
                  height: 64,
                  opacity: i === lightbox ? 1 : 0.5,
                  border: i === lightbox ? "2px solid var(--gold)" : "2px solid transparent",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
                aria-label={img.label}
              >
                <Placeholder label="" dark />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
