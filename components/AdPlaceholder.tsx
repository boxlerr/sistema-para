type AdSize = "leaderboard" | "rectangle" | "skyscraper" | "banner";

const sizeClasses: Record<AdSize, string> = {
  leaderboard: "h-24 w-full max-w-[728px]",
  rectangle: "h-[250px] w-full max-w-[300px]",
  skyscraper: "h-[600px] w-full max-w-[160px]",
  banner: "h-32 w-full",
};

export default function AdPlaceholder({
  size = "banner",
  label = "Espacio Publicitario",
}: {
  size?: AdSize;
  label?: string;
}) {
  return (
    <div
      role="complementary"
      aria-label="Espacio publicitario"
      className={`mx-auto my-8 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 text-xs font-medium uppercase tracking-wider text-slate-400 ${sizeClasses[size]}`}
    >
      {label}
    </div>
  );
}
