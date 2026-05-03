"use client";

import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { imageUrl } from "@/lib/imageUrl";

export type PhotoItem = {
  id: string;
  thumbnailKey: string | null;
  filename: string;
  pinned: boolean;
  excluded: boolean;
  status: string;
};

export type ThumbnailStripProps = {
  photos: PhotoItem[];
  onReorder: (photos: PhotoItem[]) => void;
  onTogglePin: (id: string) => void;
  onToggleExclude: (id: string) => void;
};

function SortablePhoto({
  photo,
  onTogglePin,
  onToggleExclude,
}: {
  photo: PhotoItem;
  onTogglePin: (id: string) => void;
  onToggleExclude: (id: string) => void;
}): React.ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: photo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const url = imageUrl("public", photo.thumbnailKey);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`
        relative flex-shrink-0 overflow-hidden rounded border-2 transition-opacity
        ${photo.excluded ? "border-ink-faded/20 opacity-40" : "border-ink-faded/30"}
        ${photo.pinned ? "ring-2 ring-terracotta" : ""}
      `}
      style={{ width: 100, height: 100, transform: style.transform, transition: style.transition, zIndex: style.zIndex }}
    >
      {url ? (
        <img src={url} alt={photo.filename} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-paper-2">
          <span className="font-mono text-[10px] text-ink-faded uppercase">processing</span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/40 px-1 py-0.5 opacity-0 transition-opacity hover:opacity-100">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onTogglePin(photo.id)}
          className={`h-5 w-5 rounded-full text-[10px] leading-5 ${photo.pinned ? "bg-terracotta text-paper" : "bg-paper/80 text-ink"}`}
          title={photo.pinned ? "Unpin" : "Pin"}
        >
          {photo.pinned ? "★" : "☆"}
        </button>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onToggleExclude(photo.id)}
          className={`h-5 w-5 rounded-full text-[10px] leading-5 ${photo.excluded ? "bg-burgundy text-paper" : "bg-paper/80 text-ink"}`}
          title={photo.excluded ? "Include" : "Exclude"}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function ThumbnailStrip({
  photos,
  onReorder,
  onTogglePin,
  onToggleExclude,
}: ThumbnailStripProps): React.ReactElement {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const items = useMemo(() => photos.map((p) => p.id), [photos]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      onReorder(arrayMove(photos, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {photos.map((photo) => (
            <SortablePhoto
              key={photo.id}
              photo={photo}
              onTogglePin={onTogglePin}
              onToggleExclude={onToggleExclude}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
