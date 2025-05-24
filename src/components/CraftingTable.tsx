import { useDroppable } from "@dnd-kit/core";
import InventoryItem from "./subcomponents/InventoryItem";
import type { Item } from "../utils/types";

interface Props {
  items: Item[];
}

function CraftingTable({ items }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: "CRAFT",
  });

  return (
    <div
      ref={setNodeRef}
      className={`max-h-[250px] min-h-[250px] overflow-y-auto border rounded-lg transition-colors ${
        isOver ? "border-green-400 bg-green-400/10" : "border-green-400"
      }`}
    >
      <div className="grid grid-cols-3 gap-2 p-2 min-h-full">
        {items.map((item) => (
          <InventoryItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
}

export default CraftingTable;
