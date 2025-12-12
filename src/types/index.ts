export const SunlightExposure = {
  SHADE: "Shade",
  PARTIAL_SHADE: "Partial Shade",
  FULL_SUN: "Full Sun",
} as const;

export type Plant = {
  id: string;
  dateAdded: Date;
  name: string;
  description?: string;
  wateringFrequencyDays: number;
  lastWateredDate: Date;
  sunlightExposure: typeof SunlightExposure;
  lowTempThreshold?: number;
  highTempThreshold?: number;
};

export type PlantInput = Omit<Plant, "id" | "dateAdded">;

export type PlantStore = {
  plants: Array<Plant>;
  addPlant: (plant: Plant) => void;
};
