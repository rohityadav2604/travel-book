import { PaperGrain } from "@memorybook/design/components/atoms";

export type BackCoverProps = {
  brand: string | undefined;
};

export default function BackCover({ brand }: BackCoverProps): React.ReactElement {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-paper-2">
      <PaperGrain />
      <div className="text-center">
        <p className="font-display text-2xl text-ink">{brand || "MemoryBook"}</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faded">
          Travel books with a worn-in journal soul
        </p>
      </div>
    </div>
  );
}
