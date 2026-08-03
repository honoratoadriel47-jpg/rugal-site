import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Loader from "@/components/Loader";
import { Toaster } from "@/components/ui/sonner";



export default function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

const scaleX = useSpring(scrollYProgress, {
  stiffness: 120,
  damping: 20,
  restDelta: 0.001,
});

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1200);

  return () => clearTimeout(timer);
}, []);
  return (
    <div className="min-h-screen bg-white">
      <motion.div
  style={{ scaleX }}
  className="fixed left-0 top-0 z-[999] h-[3px] w-full origin-left bg-[#e50914]"
/>
      <Loader loading={loading} />
      <Header />
      <main>
  <AnimatePresence mode="wait">
    <motion.div
      key={location.pathname + location.search}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Outlet />
    </motion.div>
  </AnimatePresence>
</main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster position="top-center" richColors />
    </div>
  );
}
