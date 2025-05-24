import { create } from "zustand";
import type { Craftables, Item } from "./types";

import {
  BARREL_NORMAL,
  BARREL_AR,
  FRONT_PORT_AR,
  PISTOL_SUPRESSOR,
} from "../utils/dummyData";
interface ActiveTabStore {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

interface QueueItem {
  item: Craftables;
  startTime: Date;
}

interface InventoryStore {
  items: Item[];
  moveItem: (itemId: string, newZone: Item["currentlyAt"]) => void;
  clearCraftingTable: () => void;
  setItems: (items: Item[]) => void;
}

// Initial items data
const initialItems: Item[] = [
  { id: "1", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
  { id: "2", ...BARREL_AR, currentlyAt: "INVENTORY" },
  { id: "3", ...FRONT_PORT_AR, currentlyAt: "INVENTORY" },
  { id: "4", ...PISTOL_SUPRESSOR, currentlyAt: "INVENTORY" },
  { id: "5", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
  { id: "6", ...BARREL_AR, currentlyAt: "INVENTORY" },
  { id: "7", ...FRONT_PORT_AR, currentlyAt: "INVENTORY" },
  { id: "8", ...PISTOL_SUPRESSOR, currentlyAt: "INVENTORY" },
  { id: "9", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
  { id: "10", ...BARREL_AR, currentlyAt: "INVENTORY" },
  { id: "11", ...FRONT_PORT_AR, currentlyAt: "INVENTORY" },
  { id: "12", ...PISTOL_SUPRESSOR, currentlyAt: "INVENTORY" },
  { id: "13", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
  { id: "14", ...BARREL_AR, currentlyAt: "INVENTORY" },
  { id: "15", ...FRONT_PORT_AR, currentlyAt: "INVENTORY" },
  { id: "16", ...PISTOL_SUPRESSOR, currentlyAt: "INVENTORY" },
  { id: "17", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
  { id: "18", ...BARREL_AR, currentlyAt: "INVENTORY" },
  { id: "19", ...FRONT_PORT_AR, currentlyAt: "INVENTORY" },
  { id: "20", ...PISTOL_SUPRESSOR, currentlyAt: "INVENTORY" },
  { id: "21", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
  { id: "22", ...BARREL_AR, currentlyAt: "INVENTORY" },
  { id: "23", ...FRONT_PORT_AR, currentlyAt: "INVENTORY" },
  { id: "24", ...PISTOL_SUPRESSOR, currentlyAt: "INVENTORY" },
  { id: "25", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
];

export const useInventoryStore = create<InventoryStore>((set) => ({
  items: initialItems,

  moveItem: (itemId: string, newZone: Item["currentlyAt"]) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, currentlyAt: newZone } : item
      ),
    }));
  },

  clearCraftingTable: () => {
    set((state) => ({
      items: state.items.filter((item) => item.currentlyAt !== "CRAFT"),
    }));
  },

  setItems: (items: Item[]) => {
    set({ items });
  },
}));

//Queue

interface QueueStore {
  queueItems: QueueItem[];
  setQueueItem: (item: Craftables, startTime: Date) => void;
  removeFromQueue: (itemId: string) => void;
}
export const useActiveTabStore = create<ActiveTabStore>((set) => ({
  activeTab: "Queue",
  setActiveTab: (value) => set({ activeTab: value }),
}));

export const useQueueStore = create<QueueStore>((set, get) => ({
  queueItems: [],
  setQueueItem: (item, startTime) =>
    set({
      queueItems: [...get().queueItems, { item, startTime }],
    }),
  removeFromQueue: (itemId) =>
    set({
      queueItems: get().queueItems.filter((qi) => qi.item.id !== itemId),
    }),
}));

//History
interface HistoryItem {
  item: Craftables;
  endTime: Date;
}

interface HistoryStore {
  items: HistoryItem[];
  addCompletedItem: (item: Craftables) => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  items: [],
  addCompletedItem: (item) => {
    set((state) => ({
      items: [...state.items, { item, endTime: new Date() }],
    }));
  },
}));
