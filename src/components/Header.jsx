import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE, PRODUCTS } from "@/data/store";
import { brl } from "@/lib/whatsapp";
import { useRef } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const searchRef = useRef(null);
  const location = useLocation();
  const isActive = (to) => {
  return location.pathname + location.search === to;
};
  useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20);

  window.addEventListener("scroll", onScroll);

  return () => window.removeEventListener("scroll", onScroll);
}, []);

useEffect(() => {
  function handleClickOutside(event) {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setSearchOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
}, []);

useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
  };

  window.addEventListener("keydown", handleEsc);

  return () =>
    window.removeEventListener("keydown", handleEsc);
}, []);
  

  const results = q.trim()
    ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : [];

  return (
    <>
      <header
        data-testid="site-header"
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled
      ? "bg-[#111111]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl"
      : "bg-transparent border-b border-transparent"
  }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link
  to="/"
  data-testid="logo-link"
  className="group flex items-center overflow-hidden"
>
              <span
  className={`font-display leading-none tracking-wide transition-all duration-500
  group-hover:-translate-x-1
  ${
    scrolled
      ? "text-2xl md:text-3xl text-white"
      : "text-3xl md:text-4xl text-white"
  }`}
>
  {SITE.brand}
</span>
              <span
  className={`font-display text-[#e50914] transition-all duration-500
  group-hover:scale-150 group-hover:rotate-12
  ${
    scrolled
      ? "text-2xl md:text-3xl"
      : "text-3xl md:text-4xl"
  }`}
>
  .
</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((l) => (
               <Link
  key={l.label}
  to={l.to}
  data-testid={`nav-${l.label.toLowerCase()}`}
  className={`relative font-strong text-[13px] font-600 uppercase tracking-widest transition-all duration-300
    ${
      isActive(l.to)
        ? "text-[#e50914] after:w-full"
        : "text-[#111111] hover:text-[#e50914] after:w-0 hover:after:w-full"
    }
    after:absolute after:left-0 after:-bottom-1 after:h-[2px]
    after:bg-[#e50914] after:transition-all after:duration-300`}
>
  {l.label}
</Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              <button
                data-testid="search-toggle"
                aria-label="Pesquisar"
                onClick={() => setSearchOpen((v) => !v)}
                className="text-[#111111] hover:text-[#e50914] transition-colors"
              >
                <Search size={20} strokeWidth={2.2} />
              </button>
              <button
                data-testid="cart-icon"
                aria-label="Carrinho"
                className="relative text-[#111111] hover:text-[#e50914] transition-colors"
              >
                <ShoppingBag size={20} strokeWidth={2.2} />
                <span className="absolute -top-2 -right-2 grid h-4 w-4 place-items-center rounded-full bg-[#e50914] text-[9px] font-bold text-white">
                  0
                </span>
              </button>
              <button
                data-testid="menu-toggle"
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
                className="lg:hidden text-[#111111]"
              >
                <Menu size={24} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
    ref={searchRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-[#e5e5e5] bg-white"
            >
              <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-5">
                <input
                  data-testid="search-input"
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar camisas, times, coleções..."
                  className="w-full border-b-2 border-[#111111] bg-transparent pb-2 font-strong text-lg md:text-2xl uppercase tracking-tight outline-none placeholder:text-[#bbb]"
                />
                {results.length > 0 && (
                  <div className="mt-4 flex flex-col divide-y divide-[#eee]">
                  {q.trim() && results.length === 0 && (
  <div className="py-10 text-center">
    <p className="font-strong uppercase tracking-widest text-[#999]">
      Nenhum produto encontrado.
    </p>
  </div>
)}
                    {results.map((p) => (
                     <button
  key={p.id}
  data-testid={`search-result-${p.id}`}
  onClick={() => {
    navigate(`/produto/${p.id}`);
    setSearchOpen(false);
    setQ("");
  }}
  className="flex items-center gap-4 px-2 py-3 transition-all duration-300 hover:bg-[#f8f8f8]"
>
  <img
    src={p.image}
    alt={p.name}
    className="h-16 w-16 object-cover"
  />

  <div className="flex-1 text-left">
    <p className="font-strong uppercase text-sm">
      {p.name}
    </p>

    <p className="text-sm text-[#777]">
      {brl(p.price)}
    </p>
  </div>
</button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#111111] lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
              <span className="font-display text-3xl text-white">
                {SITE.brand}<span className="text-[#e50914]">.</span>
              </span>
              <button data-testid="menu-close" onClick={() => setMenuOpen(false)} className="text-white">
                <X size={26} />
              </button>
            </div>
            <nav className="flex flex-col px-5 py-6">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={l.to}
                    data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-4xl text-white hover:text-[#e50914] transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
