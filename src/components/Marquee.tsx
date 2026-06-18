const words = [
  "Product Design",
  "UX",
  "Human-Centered",
  "Prototyping",
  "Research",
  "Systems",
];

export default function Marquee() {
  const strip = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div className="animate-marquee flex w-max gap-6 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex gap-6">
            {strip.map((w, i) => (
              <span
                key={`${dup}-${i}`}
                className="font-display text-2xl font-extrabold tracking-tight text-ink/80"
              >
                {w}
                <span className="ml-6 text-pink">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
