import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Truck, MessageCircle, BadgeCheck, Star, Instagram,
} from "lucide-react";
import { Reveal, MaskLine } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import EditorialMarquee from "@/components/EditorialMarquee";
import { getFeaturedProducts, CATEGORIES, TRUST_BADGES, MANIFESTO, TESTIMONIALS, INSTAGRAM_POSTS, SITE } from "@/data/store";
import { openWhatsApp } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/data/store";

const ICONS = { ShieldCheck, Truck, MessageCircle, BadgeCheck };

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.8]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-[#111111]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={CATEGORIES[0].image}
          alt="Rugal Modas streetwear"
          className="h-full w-full object-cover object-center"
        />
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-[#111111]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-16 md:px-8 md:pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 flex items-center gap-3 font-strong text-xs uppercase tracking-[0.3em] text-white/70"
        >
          <span className="h-px w-10 bg-[#e50914]" /> {SITE.tagline} — Drop 2026
        </motion.p>

        <h1 className="font-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] text-white">
          <MaskLine delay={0.15}>ESTILO QUE</MaskLine>
          <MaskLine delay={0.32} className="text-[#e50914]">IMPRESSIONA.</MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 max-w-md font-body text-base md:text-lg text-white/80"
        >
          As melhores marcas do streetwear nacional. Camisas Fire, Prison,
          times e oversized com qualidade premium.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            to="/produtos"
            data-testid="hero-ver-colecao"
            className="group inline-flex items-center gap-3 bg-white px-8 py-4 font-strong text-sm font-bold uppercase tracking-widest text-[#111111] transition-colors hover:bg-[#e50914] hover:text-white"
          >
            Ver Coleção
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            data-testid="hero-whatsapp"
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.collection)}
            className="inline-flex items-center gap-3 border border-white/40 px-8 py-4 font-strong text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
          >
            Falar no WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBadges() {
  return (
    <section data-testid="trust-badges" className="border-b border-[#e5e5e5] bg-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#e5e5e5]">
        {TRUST_BADGES.map((b, i) => {
          const Icon = ICONS[b.icon];
          return (
            <Reveal key={b.title} delay={i * 0.08} className="flex flex-col gap-2 p-6 md:p-8">
              <Icon size={26} className="text-[#e50914]" strokeWidth={1.8} />
              <h3 className="font-strong text-sm font-bold uppercase tracking-tight text-[#111111]">{b.title}</h3>
              <p className="font-body text-xs text-[#777] leading-relaxed">{b.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section data-testid="categories-section" className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <Reveal className="mb-10 flex items-end justify-between">
        <div>
          <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">Coleções</p>
          <h2 className="mt-2 font-display text-5xl md:text-7xl leading-none text-[#111111]">CATEGORIAS</h2>
        </div>
        <Link to="/produtos" className="hidden md:inline-flex items-center gap-2 font-strong text-sm uppercase tracking-widest hover:text-[#e50914] transition-colors">
          Ver tudo <ArrowRight size={16} />
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06} className={`${c.span} min-h-[280px] md:min-h-[340px]`}>
            <Link
              to={`/produtos?cat=${c.slug}`}
              data-testid={`category-${c.slug}`}
              className="group relative flex h-full items-end overflow-hidden bg-[#111111]"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[900ms] ease-out group-hover:scale-110 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="relative z-10 p-6 md:p-8">
                <p className="font-body text-[11px] uppercase tracking-widest text-white/70">{c.subtitle}</p>
                <h3 className="mt-1 font-display text-4xl md:text-5xl leading-none text-white">{c.name}</h3>
                <span className="mt-3 inline-flex items-center gap-2 font-strong text-xs uppercase tracking-widest text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  Explorar <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section data-testid="manifesto-section" className="bg-[#111111] py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal className="mb-16">
          <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">Manifesto</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl md:text-7xl leading-[0.9] text-white">
            NÃO É SÓ ROUPA.<br />É POSTURA.
          </h2>
        </Reveal>
        <div className="grid gap-px md:grid-cols-3 bg-white/10">
          {MANIFESTO.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.1} className="bg-[#111111] p-8 md:p-10">
              <span className="font-display text-6xl md:text-7xl text-[#e50914]">{m.n}</span>
              <h3 className="mt-4 font-strong text-xl font-bold uppercase tracking-tight text-white">{m.title}</h3>
              <p className="mt-3 font-body text-sm text-white/60 leading-relaxed">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const products = getFeaturedProducts();
  return (
    <section data-testid="featured-section" className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <Reveal className="mb-10 flex items-end justify-between">
        <div>
          <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">Seleção da casa</p>
          <h2 className="mt-2 font-display text-5xl md:text-7xl leading-none text-[#111111]">EM DESTAQUE</h2>
        </div>
        <Link to="/produtos" className="hidden md:inline-flex items-center gap-2 font-strong text-sm uppercase tracking-widest hover:text-[#e50914] transition-colors">
          Ver todos <ArrowRight size={16} />
        </Link>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      <div className="mt-10 md:hidden">
        <Link to="/produtos" className="flex items-center justify-center gap-2 border border-[#111] py-4 font-strong text-sm uppercase tracking-widest">
          Ver todos os produtos <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function MidBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} data-testid="mid-banner" className="relative overflow-hidden bg-[#111111]">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={CATEGORIES[3].image} alt="Nova coleção" className="h-full w-full object-cover opacity-50" />
      </motion.div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-8 py-28 md:py-40 text-center">
        <Reveal>
          <p className="font-strong text-xs uppercase tracking-[0.4em] text-[#e50914]">Edição limitada</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-6xl md:text-[9rem] leading-[0.85] text-white">
            NOVA COLEÇÃO 2026
          </h2>
          <button
            data-testid="mid-banner-cta"
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.collection)}
            className="mt-8 inline-flex items-center gap-3 bg-[#e50914] px-10 py-4 font-strong text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            Comprar Agora <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section data-testid="testimonials-section" className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
      <Reveal className="mb-12">
        <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">Quem veste, aprova</p>
        <h2 className="mt-2 font-display text-5xl md:text-7xl leading-none text-[#111111]">DEPOIMENTOS</h2>
      </Reveal>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08} className="flex flex-col border border-[#e5e5e5] p-6">
            <div className="flex gap-0.5 text-[#e50914]">
              {Array.from({ length: t.stars }).map((_, s) => (
                <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-[#333]">“{t.text}”</p>
            <div className="mt-5 border-t border-[#eee] pt-4">
              <p className="font-strong text-sm font-bold uppercase tracking-tight text-[#111]">{t.name}</p>
              <p className="font-body text-xs text-[#999]">{t.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section data-testid="instagram-section" className="bg-[#111111] py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">@{SITE.instagramHandle}</p>
            <h2 className="mt-2 font-display text-5xl md:text-7xl leading-none text-white">NO FEED</h2>
          </div>
          <button
            data-testid="instagram-follow"
            onClick={() => window.open(SITE.instagramUrl, "_blank")}
            className="inline-flex items-center gap-2 bg-white px-6 py-3 font-strong text-sm font-bold uppercase tracking-widest text-[#111] transition-colors hover:bg-[#e50914] hover:text-white"
          >
            <Instagram size={18} /> Seguir no Instagram
          </button>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {INSTAGRAM_POSTS.map((src, i) => (
            <Reveal key={i} delay={(i % 6) * 0.05}>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden">
                <img src={src} alt="Instagram Rugal" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 grid place-items-center bg-[#e50914]/0 opacity-0 transition-all duration-300 group-hover:bg-[#e50914]/70 group-hover:opacity-100">
                  <Instagram size={26} className="text-white" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Categories />
      <EditorialMarquee items={["FIRE", "PRISON", "TIMES", "OVERSIZED", "LANÇAMENTOS"]} dark />
      <Manifesto />
      <Featured />
      <MidBanner />
      <Testimonials />
      <InstagramSection />
    </>
  );
}
