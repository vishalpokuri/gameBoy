import { create } from "zustand";
import type { Craftables } from "./types";
// import {
//   BARREL_AR,
//   BARREL_NORMAL,
//   PISTOL_SUPRESSOR,
//   FRONT_PORT_AR,
// } from "./dummyData";

interface ActiveTabStore {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

interface QueueItem {
  item: Craftables;
  startTime: Date;
}

// interface InventoryItemStore {
//   inventoryItems: Item[];
//   setInventoryItem: (value: Item) => void;
// }

interface QueueStore {
  queueItems: QueueItem[];
  setQueueItem: (item: Craftables, startTime: Date) => void;
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
}));

// export const useInventoryItemStore = create<InventoryItemStore>((set, get) => ({
//   inventoryItems: [
//     { id: "1", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
//     { id: "2", ...BARREL_AR, currentlyAt: "INVENTORY" },
//     { id: "3", ...FRONT_PORT_AR, currentlyAt: "INVENTORY" },
//     { id: "4", ...BARREL_AR, currentlyAt: "INVENTORY" },
//     { id: "5", ...PISTOL_SUPRESSOR, currentlyAt: "INVENTORY" },
//     { id: "6", ...BARREL_AR, currentlyAt: "INVENTORY" },
//     { id: "7", ...BARREL_AR, currentlyAt: "INVENTORY" },
//     { id: "8", ...BARREL_NORMAL, currentlyAt: "INVENTORY" },
//   ],
//   setInventoryItem: (item) =>
//     set({
//       inventoryItems: [...get().inventoryItems, item],
//     }),
// }));
