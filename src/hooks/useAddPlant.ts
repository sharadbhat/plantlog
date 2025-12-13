import type { Plant, PlantInput } from "../types";
import { usePlantStore } from "../store";

const useAddPlant = () => {
  const addPlant = (plant: PlantInput) => {
    const plantId = "";
    const dateAdded = new Date();

    const newPlant: Plant = {
      id: plantId,
      dateAdded,
      iconName: plant.iconName,
      iconColor: plant.iconColor,
      name: plant.name,
      description: plant.description,
      wateringFrequencyDays: plant.wateringFrequencyDays,
      lastWateredDate: plant.lastWateredDate,
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
