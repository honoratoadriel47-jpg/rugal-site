import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { SITE, NAV_LINKS } from "@/data/store";
import { openWhatsApp } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#111111] text-white">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-5xl md:text-6xl">
              {SITE.brand}<span className="text-[#e50914]">.</span>
            </span>
            <p className="mt-4 max-w-sm font-body text-sm text-white/60 leading-relaxed">
              {SITE.brandFull} — {SITE.tagline}. As melhores marcas do streetwear
              nacional e internacional, com atitude e qualidade premium.
            </p>
            <button
              data-testid="footer-instagram"
              onClick={() => window.open(SITE.instagramUrl, "_blank")}
              className="mt-6 inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 font-strong text-xs uppercase tracking-widest hover:border-[#e50914] hover:text-[#e50914] transition-colors"
            >
              <Instagram size={16} /> @{SITE.instagramHandle}
            </button>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-strong text-xs uppercase tracking-[0.2em] text-white/40">Navegação</h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-white/80 hover:text-[#e50914] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-strong text-xs uppercase tracking-[0.2em] text-white/40">Contato</h4>
            <ul className="mt-5 space-y-4 font-body text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MessageCircle size={16} className="mt-0.5 text-[#e50914]" />
                <button data-testid="footer-whatsapp" onClick={() => openWhatsApp()} className="hover:text-[#e50914] transition-colors">
                  {SITE.whatsappDisplay}
                </button>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-[#e50914]" /> {SITE.email}
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 text-[#e50914]" /> {SITE.hours}
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-[#e50914]" /> {SITE.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} {SITE.brandFull}. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-white/40">
            Feito com atitude para quem veste a rua.
          </p>
        </div>
      </div>
    </footer>
  );
}
