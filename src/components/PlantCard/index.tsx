import { Card, Text } from "@mantine/core";
import type { Plant } from "../../types";
import "./index.css";

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
    <Card withBorder padding="lg" radius="md" className={"card"}>
      <Text className={"title"}>{plantProps.name}</Text>
      <Card.Section className={"footer"}>{renderDetails()}</Card.Section>
    </Card>
  );
};

export default PlantCard;
