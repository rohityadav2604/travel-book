export type AspectRatioRange = {
  min: number;
  max: number;
};

export type SlotDef = {
  id: string;
  aspectRatioRange: AspectRatioRange;
  preferredSubject?: string;
  sizeWeight: number;
};

export type SpreadDef = {
  id: string;
  templateName: string;
  slots: SlotDef[];
};

export type PhotoAdjustment = {
  offsetX: number; // percent, default 0
  offsetY: number; // percent, default 0
  zoom: number; // default 1
  rotation: number; // degrees, default 0
};

export type Assignment = {
  slotId: string;
  photoId: string;
  adjustments?: PhotoAdjustment;
};

export type PlacementResult = {
  spreadId: string;
  templateName: string;
  assignments: Assignment[];
  slots?: SlotDef[];
  texts?: Record<string, string>;
};

export type PhotoInput = {
  id: string;
  width: number;
  height: number;
  pinned: boolean;
  displayOrder: number;
};

export type BookTheme = string;
