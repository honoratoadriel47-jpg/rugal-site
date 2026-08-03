import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PRODUCTS, CATEGORIES, getBrands } from "@/data/store";
import { brl } from "@/lib/whatsapp";
import { SlidersHorizontal, X } from "lucide-react";

const CAT_OPTIONS = [
  { slug: "all", name: "Todas as categorias" },
  ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name })),
  { slug: "masculino", name: "Masculino" },
];

function FiltersPanel({ category, onCategory, brand, setBrand, brands, price, setPrice, maxPrice }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="font-strong text-xs font-bold uppercase tracking-widest text-[#111]">Categoria</label>
        <Select value={category} onValueChange={onCategory}>
          <SelectTrigger data-testid="filter-category" className="mt-3 rounded-none border-[#111]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CAT_OPTIONS.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="font-strong text-xs font-bold uppercase tracking-widest text-[#111]">Marca</label>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger data-testid="filter-brand" className="mt-3 rounded-none border-[#111]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as marcas</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="font-strong text-xs font-bold uppercase tracking-widest text-[#111]">
          Preço — {brl(price[0])} a {brl(price[1])}
        </label>
        <Slider
          data-testid="filter-price"
          className="mt-5"
          min={0}
          max={maxPrice}
          step={10}
          value={price}
          onValueChange={setPrice}
        />
      </div>
    </div>
  );
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const brands = getBrands();
  const maxPrice = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)));

  const [category, setCategory] = useState(params.get("cat") || "all");
  const [brand, setBrand] = useState("all");
  const [price, setPrice] = useState([0, maxPrice]);
  const [sort, setSort] = useState("relevancia");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = params.get("cat");
    if (cat) setCategory(cat);
  }, [params]);

  const handleCategory = (val) => {
    setCategory(val);
    if (val === "all") setParams({});
    else setParams({ cat: val });
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "all" && category !== "masculino") list = list.filter((p) => p.category === category);
    if (brand !== "all") list = list.filter((p) => p.brand === brand);
    list = list.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (sort === "menor") list.sort((a, b) => a.price - b.price);
    if (sort === "maior") list.sort((a, b) => b.price - a.price);
    if (sort === "nome") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, brand, price, sort]);

  const activeCat = CAT_OPTIONS.find((c) => c.slug === category);

  const filterProps = {
    category, onCategory: handleCategory, brand, setBrand, brands, price, setPrice, maxPrice,
  };

  return (
    <div className="pt-16 md:pt-20">
      {/* Page header */}
      <div className="border-b border-[#e5e5e5] bg-[#111111]">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-16 md:py-24">
          <Reveal>
            <p className="font-strong text-xs uppercase tracking-[0.3em] text-[#e50914]">Loja</p>
            <h1 className="mt-2 font-display text-6xl md:text-8xl leading-none text-white">
              {activeCat && activeCat.slug !== "all" ? activeCat.name.toUpperCase() : "TODOS OS PRODUTOS"}
            </h1>
            <p className="mt-3 font-body text-sm text-white/50">{filtered.length} produtos encontrados</p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-10 md:py-16">
        {/* Mobile filter toggle + sort */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            data-testid="mobile-filter-toggle"
            onClick={() => setShowFilters(true)}
            className="lg:hidden inline-flex items-center gap-2 border border-[#111] px-4 py-2.5 font-strong text-xs uppercase tracking-widest"
          >
            <SlidersHorizontal size={15} /> Filtros
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:block font-body text-xs uppercase tracking-widest text-[#999]">Ordenar</span>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger data-testid="filter-sort" className="w-[190px] rounded-none border-[#111]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Relevância</SelectItem>
                <SelectItem value="menor">Menor preço</SelectItem>
                <SelectItem value="maior">Maior preço</SelectItem>
                <SelectItem value="nome">Nome (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <FiltersPanel {...filterProps} />
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <p className="py-20 text-center font-strong uppercase tracking-widest text-[#999]">Nenhum produto encontrado.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-3xl">FILTROS</h3>
              <button data-testid="mobile-filter-close" onClick={() => setShowFilters(false)}><X /></button>
            </div>
            <FiltersPanel {...filterProps} />
            <button
              onClick={() => setShowFilters(false)}
              className="mt-8 w-full bg-[#111] py-4 font-strong text-sm uppercase tracking-widest text-white"
            >
              Ver {filtered.length} produtos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
