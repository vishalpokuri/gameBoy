import { useDroppable } from "@dnd-kit/core";
import InventoryItem from "./subcomponents/InventoryItem";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import type { Item } from "../utils/types";
import { useMemo } from "react";

interface Props {
  items: Item[];
}

function Inventory({ items }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: "INVENTORY",
  });

  const itemsIds = useMemo(
    () => items.map((item) => item.id.toString()),
    [items]
  );

  return (
    <div
      ref={setNodeRef}
      className={`max-h-[250px] min-h-[250px] overflow-y-auto border rounded-lg  transition-colors ${
        isOver ? "border-blue-400 bg-blue-400/10" : "border-gray-400"
      }`}
    >
      <div className="grid grid-cols-3 gap-2 p-2 min-h-full">
        <SortableContext items={itemsIds} strategy={rectSortingStrategy}>
          {items.map((item) => (
            <InventoryItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default Inventory;
