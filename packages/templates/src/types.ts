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

export type Assignment = {
  slotId: string;
  photoId: string;
};

export type PlacementResult = {
  spreadId: string;
  templateName: string;
  assignments: Assignment[];
};

export type PhotoInput = {
  id: string;
  width: number;
  height: number;
  pinned: boolean;
  displayOrder: number;
};
