import type { Plant, PlantInput } from "../types";
import { usePlantStore } from "../store";

const useAddPlant = () => {
  const addPlant = (plant: PlantInput) => {
    const plantId = "";
    const dateAdded = new Date();
    const lastWateredDate = null;

    const newPlant: Plant = {
      id: plantId,
      dateAdded,
      name: plant.name,
      description: plant.description,
      wateringFrequencyDays: plant.wateringFrequencyDays,
      lastWateredDate,
      sunlightExposure: plant.sunlightExposure,
      lowTempThreshold: plant.lowTempThreshold,
      highTempThreshold: plant.highTempThreshold,
    };

    usePlantStore.getState().addPlant(newPlant);
  };

  return {
    addPlant,
  };
};

export default useAddPlant;
