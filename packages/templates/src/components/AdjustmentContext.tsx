"use client";

import { createContext, useContext } from "react";
import type { PhotoAdjustment } from "../types";

export type AdjustmentContextValue = {
  adjustments: Record<string, PhotoAdjustment>;
  onAdjust?: ((slotId: string, delta: Partial<PhotoAdjustment>) => void) | undefined;
};

export const AdjustmentContext = createContext<AdjustmentContextValue>({
  adjustments: {},
});

export function useSlotAdjustment(slotId: string | undefined): PhotoAdjustment | undefined {
  const ctx = useContext(AdjustmentContext);
  if (!slotId) return undefined;
  return ctx.adjustments[slotId];
}
