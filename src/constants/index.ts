import {
  IconCactus,
  IconFlowerFilled,
  IconGrowth,
  IconLeaf,
  IconLeaf2,
  IconPlant,
  IconPlant2,
  IconSeedling,
} from "@tabler/icons-react";

export const CONSTANTS = {
  ICON_COLOR: "#6c451c",
  DEFAULT_PLANT_ICON_COLOR: "#0d5b15",
  PLANT_ICON_COLOR_SWATCHES: [
    "#0d5b15",
    "#82c91e",
    "#fab005",
    "#fd7e14",
    "#fa93c5",
    "#fa5252",
    "#6c451c",
    "#2e2e2e",
  ],
  ICON_MAP: {
    ICON_PLANT: {
      name: "ICON_PLANT",
      icon: IconPlant,
    },
    "ICON_PLANT-2": {
      name: "ICON_PLANT-2",
      icon: IconPlant2,
    },
    ICON_CACTUS: {
      name: "ICON_CACTUS",
      icon: IconCactus,
    },
    ICON_FLOWER_FILLED: {
      name: "ICON_FLOWER_FILLED",
      icon: IconFlowerFilled,
    },
    ICON_LEAF: {
      name: "ICON_LEAF",
      icon: IconLeaf,
    },
    "ICON_LEAF-2": {
      name: "ICON_LEAF-2",
      icon: IconLeaf2,
    },
    ICON_SEEDLING: {
      name: "ICON_SEEDLING",
      icon: IconSeedling,
    },
    ICON_GROWTH: {
      name: "ICON_GROWTH",
      icon: IconGrowth,
    },
  },
  PLANT_LIGHT_OPTIONS: [
    {
      value: "FULL_SHADE",
      label: "Full Shade",
    },
    {
      value: "PARTIAL_SHADE",
      label: "Partial Shade",
    },
    {
      value: "FILTERED_LIGHT",
      label: "Filtered Light",
    },
    {
      value: "BRIGHT_INDIRECT",
      label: "Bright Indirect Light",
    },
    {
      value: "FULL_SUN",
      label: "Full Sun",
    },
  ],
};
