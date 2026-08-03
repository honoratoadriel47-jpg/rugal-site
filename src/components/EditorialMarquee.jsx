import Marquee from "react-fast-marquee";

/**
 * Marquee editorial lento com tipografia gigante.
 */
export default function EditorialMarquee({
  items = ["FIRE", "PRISON", "TIMES", "OVERSIZED", "STREETWEAR"],
  dark = true,
}) {
  return (
    <div
      className={`border-y ${
        dark ? "border-white/15 bg-[#111111]" : "border-[#e5e5e5] bg-white"
      } py-6 md:py-8`}
      data-testid="editorial-marquee"
    >
      <Marquee speed={38} gradient={false} autoFill>
        {items.map((item, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            <span
              className={`font-display text-6xl md:text-8xl leading-none ${
                dark ? "text-white" : "text-[#111111]"
              }`}
            >
              {item}
            </span>
            <span className="text-[#e50914] font-display text-5xl md:text-7xl leading-none">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
