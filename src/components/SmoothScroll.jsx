import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

/**
 * Rolagem suave com momentum (Lenis).
 * Respeita prefers-reduced-motion.
 */
export default function SmoothScroll({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Sobe ao topo ao trocar de rota
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
