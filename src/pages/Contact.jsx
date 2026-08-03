import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Instagram, Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/data/store";
import { openWhatsApp } from "@/lib/whatsapp";

export default function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  const submit = (e) => {
    e.preventDefault();
    // Sem back-end por enquanto: apenas feedback visual.
    toast.success("Mensagem enviada!", {
      description: "Em breve nossa equipe entra em contato. Para agilizar, chame no WhatsApp.",
    });
    setForm({ nome: "", email: "", mensagem: "" });
  };

  const channels = [
    { icon: Phone, label: "Telefone / WhatsApp", value: SITE.whatsappDisplay, action: () => openWhatsApp() },
    { icon: Instagram, label: "Instagram", value: `@${SITE.instagramHandle}`, action: () => window.open(SITE.instagramUrl, "_blank") },
    { icon: Mail, label: "E-mail", value: SITE.email },
    { icon: Clock, label: "Horário", value: SITE.hours },
  ];

  return (
    <div className="pt-16 md:pt-20">
      <div className="border-b border-[#e5e5e5] bg-[#111111]">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-24">
          <Reveal>
            <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">Fale com a gente</p>
            <h1 className="mt-2 font-display text-6xl md:text-8xl leading-none text-white">CONTATO</h1>
            <p className="mt-3 max-w-lg font-body text-sm text-white/50">
              Dúvidas sobre tamanhos, envios ou parcerias? A gente responde rápido.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Form */}
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl leading-none text-[#111]">ENVIE UMA MENSAGEM</h2>
            <form onSubmit={submit} data-testid="contact-form" className="mt-8 space-y-6">
              <div>
                <label className="font-strong text-xs font-bold uppercase tracking-widest text-[#111]">Nome</label>
                <Input
                  data-testid="contact-name"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Seu nome"
                  className="mt-2 h-12 rounded-none border-[#ddd] focus-visible:ring-[#e50914]"
                />
              </div>
              <div>
                <label className="font-strong text-xs font-bold uppercase tracking-widest text-[#111]">E-mail</label>
                <Input
                  data-testid="contact-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="voce@email.com"
                  className="mt-2 h-12 rounded-none border-[#ddd] focus-visible:ring-[#e50914]"
                />
              </div>
              <div>
                <label className="font-strong text-xs font-bold uppercase tracking-widest text-[#111]">Mensagem</label>
                <Textarea
                  data-testid="contact-message"
                  required
                  rows={5}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  placeholder="Escreva sua mensagem..."
                  className="mt-2 rounded-none border-[#ddd] focus-visible:ring-[#e50914]"
                />
              </div>
              <button
                data-testid="contact-submit"
                type="submit"
                className="flex w-full items-center justify-center gap-3 bg-[#111] py-4 font-strong text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#e50914]"
              >
                <Send size={16} /> Enviar Mensagem
              </button>
            </form>
          </Reveal>

          {/* Channels + map */}
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl leading-none text-[#111]">CANAIS DIRETOS</h2>
            <div className="mt-8 space-y-px bg-[#e5e5e5]">
              {channels.map((c) => (
                <button
                  key={c.label}
                  data-testid={`channel-${c.label.split(" ")[0].toLowerCase()}`}
                  onClick={c.action}
                  disabled={!c.action}
                  className="flex w-full items-center gap-4 bg-white p-5 text-left transition-colors enabled:hover:bg-[#fafafa]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center bg-[#111] text-white">
                    <c.icon size={18} />
                  </span>
                  <span>
                    <span className="block font-body text-[11px] uppercase tracking-widest text-[#999]">{c.label}</span>
                    <span className="block font-strong text-base font-bold text-[#111]">{c.value}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <button
              data-testid="contact-whatsapp-cta"
              onClick={() => openWhatsApp()}
              className="mt-4 flex w-full items-center justify-center gap-3 bg-[#25D366] py-4 font-strong text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-[1.02]"
            >
              <MessageCircle size={18} /> Chamar no WhatsApp
            </button>

            {/* Mapa ilustrativo */}
            <div className="relative mt-6 aspect-[16/9] overflow-hidden border border-[#e5e5e5] bg-[#111]">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=srgb&fm=jpg&q=80&w=1000"
                alt="Localização ilustrativa"
                className="h-full w-full object-cover opacity-50 grayscale"
              />
              <div className="absolute inset-0 grid place-items-center">
                <div className="flex flex-col items-center text-white">
                  <MapPin size={32} className="text-[#e50914]" />
                  <span className="mt-2 font-strong text-sm font-bold uppercase tracking-widest">{SITE.city}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
