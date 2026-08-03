import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, Gem, Flame } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import EditorialMarquee from "@/components/EditorialMarquee";
import { CATEGORIES, MANIFESTO, SITE } from "@/data/store";

const VALUES = [
  { icon: Flame, title: "Atitude", text: "Cada peça nasce da cultura de rua, feita para quem não tem medo de se destacar." },
  { icon: Gem, title: "Qualidade", text: "Tecidos premium, estampas duráveis e acabamento que você sente no primeiro toque." },
  { icon: Target, title: "Propósito", text: "Vestir a nova geração com estilo acessível, sem abrir mão da exclusividade." },
];

export default function About() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111111]">
        <img src={CATEGORIES[1].image} alt="Sobre a Rugal" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-8 py-28 md:py-40">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">Nossa história</motion.p>
          <h1 className="mt-3 max-w-4xl font-display text-6xl md:text-9xl leading-[0.85] text-white">
            NASCEMOS DA RUA.
          </h1>
          <p className="mt-6 max-w-xl font-body text-base text-white/70 leading-relaxed">
            {SITE.brandFull} surgiu da vontade de traduzir a energia do streetwear em peças que
            qualquer um pode vestir com orgulho. Do asfalto para o seu guarda-roupa.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <img src={CATEGORIES[2].image} alt="Rugal Modas" className="aspect-[4/5] w-full object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">Missão</p>
            <h2 className="mt-3 font-display text-5xl md:text-7xl leading-none text-[#111]">
              MAIS QUE ROUPA, UM ESTILO DE VIDA
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-[#444]">
              Selecionamos as melhores marcas e criamos peças autorais para o público de 16 a 30 anos.
              Camisas Fire, Prison, times nacionais e internacionais, oversized e moda urbana — tudo com
              o padrão premium que a rua merece.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-[#444]">
              Acreditamos que estilo é uma forma de expressão. Por isso cada drop é pensado para durar,
              impressionar e acompanhar você em qualquer rolê.
            </p>
            <Link to="/produtos" className="mt-8 inline-flex w-fit items-center gap-3 bg-[#111] px-8 py-4 font-strong text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e50914]">
              Ver Coleção <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <EditorialMarquee items={["ORIGINAL", "PREMIUM", "STREETWEAR", "URBANO"]} dark={false} />

      {/* Valores */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
        <Reveal className="mb-12">
          <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">No que acreditamos</p>
          <h2 className="mt-2 font-display text-5xl md:text-7xl leading-none text-[#111]">NOSSOS VALORES</h2>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1} className="border border-[#e5e5e5] p-8">
              <v.icon size={30} className="text-[#e50914]" strokeWidth={1.8} />
              <h3 className="mt-5 font-strong text-2xl font-bold uppercase tracking-tight text-[#111]">{v.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#666]">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Manifesto reuse */}
      <section className="bg-[#111111] py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-px md:grid-cols-3 bg-white/10">
            {MANIFESTO.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.1} className="bg-[#111111] p-8 md:p-10">
                <span className="font-display text-6xl text-[#e50914]">{m.n}</span>
                <h3 className="mt-4 font-strong text-xl font-bold uppercase text-white">{m.title}</h3>
                <p className="mt-3 font-body text-sm text-white/60 leading-relaxed">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
