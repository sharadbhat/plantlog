export const SunlightExposure = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export type Plant = {
  id: string;
  dateAdded: Date;
  name: string;
  description?: string;
  wateringFrequencyDays: number;
  lastWateredDate: Date | null;
  sunlightExposure: typeof SunlightExposure;
  lowTempThreshold?: number;
  highTempThreshold?: number;
};

export type PlantInput = Omit<Plant, "id" | "dateAdded" | "lastWateredDate">;

export type PlantStore = {
  plants: Array<Plant>;
  addPlant: (plant: Plant) => void;
};
