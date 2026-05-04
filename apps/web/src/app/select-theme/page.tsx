import { Suspense } from "react";
import SelectThemePage from "./SelectThemePage";

export default function SelectThemeWrapper(): React.ReactElement {
  return (
    <Suspense fallback={<div className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6">
      <p className="font-serif text-xl text-ink-faded">Loading...</p>
    </div>}>
      <SelectThemePage />
    </Suspense>
  );
}
