import { CONSTANTS } from "../constants";

export type SunlightExposure =
  (typeof CONSTANTS.PLANT_LIGHT_OPTIONS)[number]["value"];

export type Plant = {
  id: string;
  dateAdded: Date;
  iconName: keyof typeof CONSTANTS.ICON_MAP;
  iconColor: string;
  name: string;
  description?: string;
  wateringFrequencyDays: number;
  lastWateredDate: Date;
  sunlightExposure: SunlightExposure;
  lowTempThreshold?: number;
  highTempThreshold?: number;
};

export type PlantInput = Omit<Plant, "id" | "dateAdded">;

export type PlantStore = {
  plants: Array<Plant>;
  addPlant: (plant: Plant) => void;
};
