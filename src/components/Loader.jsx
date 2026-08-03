import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111111]"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="font-display text-6xl md:text-8xl text-white tracking-wide"
          >
            RUGAL
            <span className="text-[#e50914]">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
            className="mt-3 uppercase tracking-[0.4em] text-xs text-white"
          >
            Streetwear Premium
          </motion.p>

          <div className="mt-10 h-[2px] w-48 overflow-hidden bg-white/20">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1 }}
              className="h-full bg-[#e50914]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}