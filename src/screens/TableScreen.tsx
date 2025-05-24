import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import Inventory from "../components/Inventory";
import CraftingTable from "../components/CraftingTable";
import { inventoryItems as initialItems } from "../utils/dummyData";
import type { Item } from "../utils/types";

function TableScreen() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [draggedItemOriginalZone, setDraggedItemOriginalZone] = useState<
    Item["currentlyAt"] | null
  >(null);

  // Configure sensors for better drag behavior
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedItem = items.find((item) => item.id.toString() === active.id);
    if (draggedItem) {
      setActiveItem(draggedItem);
      setDraggedItemOriginalZone(draggedItem.currentlyAt);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveItem(null);
    const originalZone = draggedItemOriginalZone;
    setDraggedItemOriginalZone(null);

    const draggedId = active.id;
    if (!over) return;

    const newZone = over.id as string;
    if (newZone !== "INVENTORY" && newZone !== "CRAFT") {
      //return to originalZone
      return;
    }
    if (newZone !== originalZone) {
      setItems((prev) =>
        prev.map((item) =>
          item.id.toString() === draggedId
            ? { ...item, currentlyAt: newZone }
            : item
        )
      );
    }
  };

  const handleDragCancel = () => {
    setActiveItem(null);
    setDraggedItemOriginalZone(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="p-4 text-white">
        <h1 className="my-2 mb-2">Inventory</h1>
        <Inventory items={items.filter((i) => i.currentlyAt === "INVENTORY")} />

        <CraftingTable items={items.filter((i) => i.currentlyAt === "CRAFT")} />
      </div>

      {/* Drag preview */}
      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeItem ? (
          <div className="aspect-square bg-gradient-to-b from-[#fff]/60 to-[#fff]/20 rounded-lg flex flex-col items-center justify-center px-1 border-2 border-blue-400 shadow-lg opacity-90">
            <h1
              className=" text-gray-300 text-center font-semibold truncate w-full"
              style={{
                fontSize: "11px",
              }}
            >
              {activeItem.name}
            </h1>
            <img
              src={activeItem.imageUrl}
              alt={activeItem.name}
              className="w-3/4 h-3/4 object-contain"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default TableScreen;
