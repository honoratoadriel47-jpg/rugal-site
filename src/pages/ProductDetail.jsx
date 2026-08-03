import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Check, Ruler } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProductById, getRelated, SIZE_TABLE, FEATURES } from "@/data/store";
import { openWhatsApp, brl } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/data/store";

function WGlyph({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.117.553 4.185 1.605 6.01L4 29l8.19-1.567a11.94 11.94 0 0 0 3.812.62C22.62 28.053 28 22.67 28 16.05 28 8.43 22.62 3 16.003 3zm5.44 14.44c-.298-.15-1.764-.87-2.037-.97-.273-.1-.472-.15-.67.15-.198.297-.767.968-.94 1.166-.173.198-.347.223-.644.075-.298-.15-1.26-.464-2.4-1.48-.887-.79-1.485-1.766-1.66-2.063-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.15-.67-1.612-.918-2.207-.242-.58-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.478 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.764-.72 2.013-1.416.248-.695.248-1.29.173-1.415-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

const SIZES = ["P", "M", "G", "GG", "XG"];

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");

  if (!product) return <Navigate to="/produtos" replace />;

  const related = getRelated(product);
  const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <div className="pt-16 md:pt-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-8 md:py-12">
        <Link to="/produtos" data-testid="back-to-products" className="inline-flex items-center gap-2 font-strong text-xs uppercase tracking-widest text-[#777] hover:text-[#e50914] transition-colors">
          <ArrowLeft size={15} /> Voltar para a loja
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex gap-3 sm:flex-col">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  data-testid={`thumb-${i}`}
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-20 overflow-hidden border ${activeImg === i ? "border-[#e50914]" : "border-[#e5e5e5]"}`}
                >
                  <img src={g} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex-1 overflow-hidden bg-[#f4f4f4]"
            >
              <img src={gallery[activeImg]} alt={product.name} className="aspect-[4/5] w-full object-cover" />
              {discount > 0 && (
                <span className="absolute right-4 top-4 bg-[#e50914] px-3 py-1.5 font-strong text-sm font-bold text-white">-{discount}%</span>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-[#999]">{product.brand}</p>
            <h1 className="mt-2 font-display text-5xl md:text-6xl leading-none text-[#111]">{product.name}</h1>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-strong text-3xl font-800 text-[#111]">{brl(product.price)}</span>
              {product.oldPrice && <span className="font-body text-lg text-[#bbb] line-through">{brl(product.oldPrice)}</span>}
            </div>
            <p className="mt-1 font-body text-xs text-[#25D366] font-600">ou no WhatsApp com condições especiais</p>

            <p className="mt-6 font-body text-sm leading-relaxed text-[#444]">{product.description}</p>

            {/* Sizes */}
            <div className="mt-8">
              <p className="font-strong text-xs font-bold uppercase tracking-widest text-[#111]">Tamanho</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    data-testid={`size-${s}`}
                    onClick={() => setSize(s)}
                    className={`h-12 w-12 rounded-md border-2 font-strong text-sm font-bold
transition-all duration-300 active:scale-95
${
  size === s
    ? "border-[#e50914] bg-[#e50914] text-white shadow-lg shadow-red-500/30"
    : "border-[#d9d9d9] hover:border-[#e50914] hover:text-[#e50914] hover:-translate-y-1"
}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy */}
            <button
              data-testid="buy-now-button"
              onClick={() => {
  if (!size) {
  toast.error("Selecione um tamanho antes de continuar.", {
    description: "Escolha P, M, G, GG ou XG para prosseguir.",
  });
  return;
}

  openWhatsApp(
    WHATSAPP_MESSAGES.product(
      product.name,
      product.price,
      size
    )
  );
}}
              className="mt-8 flex w-full items-center justify-center gap-3 bg-[#e50914] py-5 font-strong text-base font-bold uppercase tracking-widest text-white transition-transform hover:scale-[1.02]"
            >
              <WGlyph /> Comprar pelo WhatsApp
            </button>

            {/* Features */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 font-body text-sm text-[#444]">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#e50914]" /> {f}
                </li>
              ))}
            </ul>

            {/* Size table */}
            <div className="mt-10 border border-[#e5e5e5]">
              <div className="flex items-center gap-2 border-b border-[#e5e5e5] bg-[#f9f9f9] px-4 py-3">
                <Ruler size={16} className="text-[#e50914]" />
                <span className="font-strong text-xs font-bold uppercase tracking-widest">Tabela de Tamanhos</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Largura</TableHead>
                    <TableHead>Comprimento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SIZE_TABLE.map((r) => (
                    <TableRow key={r.size}>
                      <TableCell className="font-strong font-bold">{r.size}</TableCell>
                      <TableCell>{r.chest}</TableCell>
                      <TableCell>{r.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <Reveal className="mb-8">
              <h2 className="font-display text-4xl md:text-6xl leading-none text-[#111]">VOCÊ TAMBÉM VAI CURTIR</h2>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
