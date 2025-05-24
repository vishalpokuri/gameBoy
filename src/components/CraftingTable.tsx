import { useDroppable } from "@dnd-kit/core";
import InventoryItem from "./subcomponents/InventoryItem";
import type { Item, Craftables } from "../utils/types";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { craftableItems } from "../utils/dummyData";

interface Props {
  items: Item[];
}

function CraftingTable({ items }: Props) {
  const [itemSelected, setItemSelected] = useState<Craftables | null>(null);
  const { setNodeRef, isOver } = useDroppable({
    id: "CRAFT",
  });
  const itemsIds = useMemo(
    () => items.map((item) => item.id.toString()),
    [items]
  );

  return (
    <>
      <div className="mt-10">
        <h1
          className={`my-2 mb-4 ${
            itemSelected == null ? "text-white" : "text-gray-400"
          }`}
        >
          Build Tools{" "}
          <span
            className={`my-2 mb-2 ${
              itemSelected !== null ? "text-white" : "text-gray-400"
            }`}
          >
            {"> Crafting Table"}
          </span>
        </h1>
      </div>

      <div
        className={`max-h-[250px] min-h-[250px] overflow-y-auto border rounded-xl 
        }`}
      >
        <div
          ref={setNodeRef}
          className={` transition-colors ${
            isOver
              ? "border-green-400/20 bg-green-400/10"
              : "border-green-400/20"
          }`}
        >
          {itemSelected !== null ? (
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
          ) : (
            <div className="">
              {craftableItems.map((item) => (
                <CraftingItem item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CraftingTable;

function CraftingItem({ item }: { item: Craftables }) {
  return (
    <div>
      <div className="flex h-16 rounded-lg gap-5 m-2 mx-2 border-gray-400/50 border-[1px] items-center">
        <div className="bg-gray-400/10 p-1">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-[60px] h-[60px] rounded-xl  object-contain"
          />
        </div>
        <div>
          <p className="text-white font-base">{item.title}</p>
        </div>
      </div>
    </div>
  );
}
