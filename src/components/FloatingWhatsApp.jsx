import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/data/store";

// Ícone oficial do WhatsApp (SVG) para não usar emoji
function WhatsAppGlyph({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.117.553 4.185 1.605 6.01L4 29l8.19-1.567a11.94 11.94 0 0 0 3.812.62h.001C22.62 28.053 28 22.67 28 16.05 28 8.43 22.62 3 16.003 3zm0 21.86h-.001a9.9 9.9 0 0 1-3.29-.56l-.235-.082-4.86.93.94-4.74-.153-.243a9.87 9.87 0 0 1 15.34-12.13 9.86 9.86 0 0 1 2.9 7.01c0 5.47-4.45 9.915-9.92 9.915zm5.44-7.42c-.298-.15-1.764-.87-2.037-.97-.273-.1-.472-.15-.67.15-.198.297-.767.968-.94 1.166-.173.198-.347.223-.644.075-.298-.15-1.26-.464-2.4-1.48-.887-.79-1.485-1.766-1.66-2.063-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.15-.67-1.612-.918-2.207-.242-.58-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.478 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.764-.72 2.013-1.416.248-.695.248-1.29.173-1.415-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  return (
    <motion.button
      data-testid="floating-whatsapp"
      onClick={() => openWhatsApp(WHATSAPP_MESSAGES.general)}
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="rg-pulse fixed bottom-5 right-5 z-40 grid h-14 w-14 md:h-16 md:w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-lg"
    >
      <WhatsAppGlyph />
    </motion.button>
  );
}
