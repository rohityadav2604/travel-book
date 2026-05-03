import { Vignette, PaperGrain } from "@memorybook/design/components/atoms";

export type GrandVistaProps = {
  photoUrl: string | undefined;
  caption: string | undefined;
};

export default function GrandVista({ photoUrl, caption }: GrandVistaProps): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden bg-paper">
      <PaperGrain />
      {photoUrl && (
        <img
          src={photoUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <Vignette />
      {caption && (
        <div className="absolute bottom-6 left-6 max-w-md">
          <p className="font-script text-2xl leading-relaxed text-paper drop-shadow-md">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
