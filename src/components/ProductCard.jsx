import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { openWhatsApp, brl } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/data/store";

// Ícone WhatsApp compacto
function WGlyph({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.117.553 4.185 1.605 6.01L4 29l8.19-1.567a11.94 11.94 0 0 0 3.812.62C22.62 28.053 28 22.67 28 16.05 28 8.43 22.62 3 16.003 3zm5.44 14.44c-.298-.15-1.764-.87-2.037-.97-.273-.1-.472-.15-.67.15-.198.297-.767.968-.94 1.166-.173.198-.347.223-.644.075-.298-.15-1.26-.464-2.4-1.48-.887-.79-1.485-1.766-1.66-2.063-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.15-.67-1.612-.918-2.207-.242-.58-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.478 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.764-.72 2.013-1.416.248-.695.248-1.29.173-1.415-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

export default function ProductCard({ product, index = 0 }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
  data-testid={`product-card-${product.id}`}
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -8,
    transition: { duration: 0.3 }
  }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{
    duration: 0.55,
    delay: (index % 4) * 0.06,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="group flex flex-col overflow-hidden border border-[#e5e5e5] bg-white transition-all duration-300 hover:border-[#e50914]/30 hover:shadow-2xl"
>
      <Link
  to={`/produto/${product.id}`}
  className="relative block overflow-hidden bg-[#f4f4f4]"
>
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
           className="h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:brightness-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-[220%] transition-transform duration-1000" />
        </div>
        <div
  className="
    pointer-events-none
    absolute
    inset-0
    -translate-x-[140%]
    skew-x-12
    bg-gradient-to-r
    from-transparent
    via-white/25
    to-transparent
    transition-transform
    duration-700
    group-hover:translate-x-[180%]
  "
/>
        {product.tag && (
          <span className="absolute left-0 top-3 bg-[#111111] px-3 py-1 font-strong text-[10px] font-bold uppercase tracking-widest text-white">
            {product.tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3 bg-[#e50914] px-2.5 py-1 font-strong text-[11px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="font-body text-[11px] uppercase tracking-widest text-[#999]">
          {product.brand}
        </span>
        <Link to={`/produto/${product.id}`}>
          <h3 className="mt-1 font-strong text-base font-700 uppercase leading-tight tracking-tight text-[#111111] hover:text-[#e50914] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-strong text-lg font-800 text-[#111111]">{brl(product.price)}</span>
          {product.oldPrice && (
            <span className="font-body text-sm text-[#bbb] line-through">{brl(product.oldPrice)}</span>
          )}
        </div>

        <button
  data-testid={`buy-whatsapp-${product.id}`}
  onClick={() => {
    openWhatsApp(
      WHATSAPP_MESSAGES.product(product.name, product.price)
    );
  }}
  className="mt-4 flex items-center justify-center gap-2 bg-[#111111] py-3 font-strong text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#e50914] hover:shadow-lg hover:shadow-[#e50914]/30"
>
  <WGlyph /> Comprar pelo WhatsApp
</button>
      </div>
    </motion.div>
  );
}
