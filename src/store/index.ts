import { create } from "zustand";
import type { PlantStore } from "../types";

export const usePlantStore = create<PlantStore>((set) => ({
  plants: [],
  addPlant: (plant) => set((state) => ({ plants: [...state.plants, plant] })),
}));
