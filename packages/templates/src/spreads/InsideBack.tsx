import { PaperGrain, PassportStamp } from "@memorybook/design/components/atoms";

export type InsideBackProps = {
  tripStats: { label: string; value: string }[] | undefined;
};

export default function InsideBack({ tripStats }: InsideBackProps): React.ReactElement {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-paper p-8">
      <PaperGrain />

      {/* Decorative world map SVG */}
      <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 400 280">
        <ellipse cx="200" cy="140" rx="180" ry="100" fill="none" stroke="#2c1f15" strokeWidth="0.5" />
        <path d="M50 140 Q100 80 200 100 T350 140" fill="none" stroke="#2c1f15" strokeWidth="0.3" />
        <path d="M60 160 Q120 200 200 180 T340 160" fill="none" stroke="#2c1f15" strokeWidth="0.3" />
      </svg>

      <div className="relative z-10 grid grid-cols-2 gap-6">
        {tripStats?.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faded">{stat.label}</p>
            <p className="mt-1 font-display text-2xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <PassportStamp city="THE WORLD" date="2024" className="mt-8" />
    </div>
  );
}
