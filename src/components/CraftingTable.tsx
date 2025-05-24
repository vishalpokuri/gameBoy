import { useDroppable } from "@dnd-kit/core";
import InventoryItem from "./subcomponents/InventoryItem";
import type { Item, Craftables } from "../utils/types";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState, useEffect } from "react";
import { craftableItems } from "../utils/dummyData";
import {
  useActiveTabStore,
  useInventoryStore,
  useQueueStore,
} from "../utils/store";
import { toast } from "sonner";

interface Props {
  items: Item[];
}

function CraftingTable({ items }: Props) {
  const [itemSelected, setItemSelected] = useState<Craftables | null>(null);
  const { clearCraftingTable } = useInventoryStore();
  const { setActiveTab } = useActiveTabStore();

  const { setQueueItem } = useQueueStore();
  const [step, setStep] = useState<"SELECT" | "CONFIRM">("SELECT");
  const [requirements, setRequirements] = useState<
    {
      item: { name: string; imageUrl: string };
      quantity: number;
      fulfilled: number;
    }[]
  >([]);

  function handleCraftItem() {
    setQueueItem(itemSelected!, new Date());
    clearCraftingTable();
    setActiveTab("Queue");
  }

  // Custom drop validation function
  const canAcceptItem = (itemName: string): boolean => {
    if (!itemSelected || step !== "CONFIRM") return true;

    const requirement = itemSelected.requirements.find(
      (req) => req.item.name === itemName
    );
    if (!requirement) return false;

    const currentCount = items.filter((item) => item.name === itemName).length;
    return currentCount < requirement.quantity;
  };

  const { setNodeRef, isOver } = useDroppable({
    id: "CRAFT",
    data: {
      accepts: (item: Item) => {
        const canAccept = canAcceptItem(item.name);
        if (!canAccept && itemSelected && step === "CONFIRM") {
          const requirement = itemSelected.requirements.find(
            (req) => req.item.name === item.name
          );
          if (requirement) {
            toast.error(
              `You already have enough ${item.name} (${requirement.quantity}/${requirement.quantity})`
            );
          } else {
            toast.error(`${item.name} is not required for this recipe`);
          }
        }
        return canAccept;
      },
    },
  });

  const itemsIds = useMemo(
    () => items.map((item) => item.id.toString()),
    [items]
  );

  useEffect(() => {
    if (itemSelected) {
      const updatedRequirements = itemSelected.requirements.map((req) => ({
        item: req.item,
        quantity: req.quantity,
        fulfilled: 0,
      }));
      setRequirements(updatedRequirements);
    } else {
      setRequirements([]);
    }
  }, [itemSelected]);

  useEffect(() => {
    if (itemSelected && step === "CONFIRM") {
      const updatedRequirements = itemSelected.requirements.map((req) => {
        const fulfilledCount = items.filter(
          (item) => item.name === req.item.name
        ).length;
        return {
          item: req.item,
          quantity: req.quantity,
          fulfilled: Math.min(fulfilledCount, req.quantity),
        };
      });
      setRequirements(updatedRequirements);
    }
  }, [items, itemSelected, step]);

  const allRequirementsFulfilled = requirements.every(
    (req) => req.fulfilled >= req.quantity
  );

  const handleBackClick = () => {
    setStep("SELECT");
    setItemSelected(null);

    const currentItems = useInventoryStore.getState().items;
    useInventoryStore
      .getState()
      .setItems(
        currentItems.map((item) =>
          item.currentlyAt === "CRAFT"
            ? { ...item, currentlyAt: "INVENTORY" }
            : item
        )
      );
  };

  return (
    <>
      <div className="mt-10 flex justify-between items-center">
        <h1
          className={`my-2 mb-4 ${
            step === "SELECT" ? "text-white" : "text-gray-400"
          }`}
        >
          Build Tools{" "}
          <span
            className={`my-2 mb-2 ${
              step === "CONFIRM" ? "text-white" : "text-gray-400"
            }`}
          >
            {"> Crafting Table"}
          </span>
        </h1>

        {step === "CONFIRM" && (
          <button
            onClick={handleBackClick}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-sm flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ArrowSvg />
            Back
          </button>
        )}
      </div>

      <div className="relative max-h-[250px] min-h-[250px] flex flex-col border rounded-xl overflow-hidden">
        <div
          ref={setNodeRef}
          className={`flex-1 overflow-y-auto transition-colors ${
            isOver
              ? "border-green-400/20 bg-green-400/10"
              : "border-green-400/20"
          }`}
        >
          {step === "SELECT" && (
            <div className="relative max-h-[400px] overflow-y-auto">
              <div
                className={`transition-all duration-300 ${
                  itemSelected ? "pb-32" : "pb-4"
                }`}
              >
                {craftableItems.map((item) => (
                  <CraftingItem
                    key={item.id}
                    item={item}
                    selected={itemSelected?.id === item.id}
                    setItemSelected={setItemSelected}
                  />
                ))}
              </div>
            </div>
          )}

          {step === "CONFIRM" && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-4 gap-2 p-2 min-h-full">
                  <SortableContext
                    items={itemsIds}
                    strategy={rectSortingStrategy}
                  >
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

              {itemSelected && (
                <div className="absolute bottom-0 w-full bg-gray-800/95 backdrop-blur-sm border-t border-gray-600/50 p-3 gap-2">
                  <div className="flex gap-3 overflow-x-auto">
                    {requirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 min-w-fit"
                      >
                        <div className="relative">
                          <img
                            src={req.item.imageUrl}
                            alt={req.item.name}
                            className="w-8 h-8 rounded object-contain bg-gray-700/50 p-1"
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            req.fulfilled >= req.quantity
                              ? "text-green-400"
                              : "text-gray-300"
                          }`}
                        >
                          {req.fulfilled}/{req.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full mt-2 px-4 py-3 rounded-xl shadow-2xl font-medium transition-all duration-200 cursor-pointer ${
                      allRequirementsFulfilled
                        ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-green-500/25 hover:-translate-y-0.5 transform"
                        : "bg-gray-600 text-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!allRequirementsFulfilled}
                    onClick={handleCraftItem}
                  >
                    {allRequirementsFulfilled
                      ? "Craft Item"
                      : "Missing Requirements"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {itemSelected && step !== "CONFIRM" && (
          <div className="p-4 pointer-events-auto animate-slideUp sticky w-full bottom-0">
            <button
              onClick={() => setStep("CONFIRM")}
              className="w-full cursor-pointer bg-green-600 text-white px-4 py-3 rounded-xl shadow-2xl hover:bg-green-700 hover:shadow-green-500/25 hover:-translate-y-0.5 transform transition-all duration-200 font-medium"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CraftingTable;

function CraftingItem({
  item,
  selected,
  setItemSelected,
}: {
  item: Craftables;
  selected: boolean;
  setItemSelected: (item: Craftables) => void;
}) {
  return (
    <div className="cursor-pointer" onClick={() => setItemSelected(item)}>
      <div
        className={`flex h-16 rounded-lg gap-5 m-2 mx-2 border-[1px] items-center overflow-hidden transition-colors ${
          selected ? "border-white bg-gray-500/10" : "border-gray-400/50"
        }`}
      >
        <div className="bg-gray-400/10 p-1">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-[60px] h-[60px] rounded-xl object-contain"
          />
        </div>
        <div>
          <p className="text-white font-base">{item.title}</p>
        </div>
      </div>
    </div>
  );
}

function ArrowSvg() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </>
  );
}
