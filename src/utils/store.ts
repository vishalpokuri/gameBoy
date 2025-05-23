import { create } from "zustand";

interface ActiveTabProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const useActiveTabStore = create<ActiveTabProps>((set) => ({
  activeTab: "Queue",
  setActiveTab: (value) => set({ activeTab: value }),
}));
