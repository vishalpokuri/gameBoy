import { useState } from "react";

import { DndContext } from "@dnd-kit/core";
import Inventory from "../components/Inventory";
import CraftingTable from "../components/CraftingTable";
import { items as initialItems } from "../utils/dummyData";
import type { Item } from "../utils/types";

function TableScreen() {
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const draggedId = active.id;
    const newZone = over.id as Item["currentlyAt"];

    setItems((prev) =>
      prev.map((item) =>
        item.id.toString() === draggedId
          ? { ...item, currentlyAt: newZone }
          : item
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4 text-white">
        <h1 className="my-2 mb-2">Inventory</h1>
        <Inventory items={items.filter((i) => i.currentlyAt === "INVENTORY")} />

        <h1 className="my-2 mb-2">Crafting Table</h1>
        <CraftingTable items={items.filter((i) => i.currentlyAt === "CRAFT")} />
      </div>
    </DndContext>
  );
}

export default TableScreen;
