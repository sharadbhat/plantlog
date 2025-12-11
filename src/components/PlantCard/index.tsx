import { Card, Text } from "@mantine/core";
import type { Plant } from "../../types";
import classes from "./index.module.css";

const PlantCard = (plantProps: Plant) => {
  const details = [
    {
      key: "wateringFrequencyDays",
      label: "Watering Frequency",
      value: `${plantProps.wateringFrequencyDays} days`,
    },
    {
      key: "sunlightExposure",
      label: "Sunlight Exposure",
      value: plantProps.sunlightExposure,
    },
    {
      key: "lastWateredDate",
      label: "Last Watered",
      value: plantProps.lastWateredDate,
    },
  ];

  const renderDetails = () => {
    return details.map(({ key, label, value }) => (
      <div key={key}>
        <Text size="xs" c="dimmed">
          {label}
        </Text>
        <Text fw={500} size="sm">
          {(value as unknown as string) || "Never"}
        </Text>
      </div>
    ));
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.header}>
        <Text className={classes.title}>{plantProps.name}</Text>
      </Card.Section>
      <Card.Section className={classes.footer}>{renderDetails()}</Card.Section>
    </Card>
  );
};

export default PlantCard;
