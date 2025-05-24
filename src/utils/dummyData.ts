import type { Section, Item, BaseItem, Craftables } from "./types";

// Sections
export const sections: Section[] = [
  { id: "INVENTORY", title: "Inventory" },
  { id: "CRAFT", title: "Crafting Table" },
];

// Base item templates
export const BARREL_NORMAL: BaseItem = {
  imageUrl: "/InventoryImages/barrel.png",
  name: "Barrel normal",
};

export const PISTOL_SUPRESSOR: BaseItem = {
  imageUrl: "/InventoryImages/pistol_suppressor_tactical.png",
  name: "Pistol Supressor",
};

export const BARREL_AR: BaseItem = {
  imageUrl: "/InventoryImages/BarrelAR.png",
  name: "Barrel Assault Rifle",
};

export const FRONT_PORT_AR: BaseItem = {
  imageUrl: "/InventoryImages/frontPortAR.png",
  name: "Front Port Assault Rifle",
};

// eslint-disable-next-line prefer-const
export let inventoryItems: Item[] = [
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

export const craftableItems: Craftables[] = [
  {
    id: "101",
    title: "Repair Kit",
    imageUrl: "/CraftableImages/repairKit.png",
    duration: 1200,
    requirements: [
      { item: BARREL_NORMAL, quantity: 1 },
      { item: BARREL_AR, quantity: 1 },
      { item: FRONT_PORT_AR, quantity: 1 },
      { item: PISTOL_SUPRESSOR, quantity: 1 },
    ],
  },
  {
    id: "102",
    title: "Pistol",
    duration: 600,
    imageUrl: "/CraftableImages/pistol.png",
    requirements: [
      { item: BARREL_NORMAL, quantity: 1 },
      { item: PISTOL_SUPRESSOR, quantity: 1 },
    ],
  },
  {
    id: "103",
    title: "Bolt Assembly",
    duration: 300,
    imageUrl: "/CraftableImages/boltAssembly.png",
    requirements: [{ item: BARREL_AR, quantity: 1 }],
  },
  {
    id: "104",
    title: "Hammer P",
    duration: 120,
    imageUrl: "/CraftableImages/hammerP.png",
    requirements: [{ item: FRONT_PORT_AR, quantity: 1 }],
  },
];
