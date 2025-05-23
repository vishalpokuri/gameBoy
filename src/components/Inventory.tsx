import { useDroppable } from "@dnd-kit/core";
import InventoryItem from "./subcomponents/InventoryItem";
import type { Item } from "../utils/types";

interface Props {
  items: Item[];
}

function Inventory({ items }: Props) {
  const { setNodeRef } = useDroppable({
    id: "INVENTORY",
  });

  return (
    <div
      ref={setNodeRef}
      className="h-3/5 overflow-y-auto border border-gray-400 rounded-lg scrollbar-hidden"
    >
      <div className="grid grid-cols-3 gap-2 p-2">
        {items.map((item) => (
          <InventoryItem
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Inventory;
