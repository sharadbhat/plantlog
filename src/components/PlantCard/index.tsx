import { Card, Grid, Text } from "@mantine/core";
import { IconChevronRight, IconPlant } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useCallback } from "react";
import type { Plant } from "../../types";
import { CONSTANTS } from "../../constants";
import classes from "./index.module.css";

dayjs.extend(relativeTime);

type Detail = {
  key: string;
  label: string;
  weight: number;
  color: string | undefined;
  value: string | undefined;
};

const PlantCard = (plantProps: Plant) => {
  const isNextWateringDateOverdue = useCallback(() => {
    const now = dayjs();
    const lastWateredDate = dayjs(plantProps.lastWateredDate);
    const nextWateringDate = lastWateredDate.add(
      plantProps.wateringFrequencyDays,
      "day"
    );
    return nextWateringDate.isBefore(now, "day");
  }, [plantProps.lastWateredDate, plantProps.wateringFrequencyDays]);

  const getNextWateringDateString = () => {
    const now = dayjs();
    const lastWateredDate = dayjs(plantProps.lastWateredDate);
    const nextWateringDate = lastWateredDate.add(
      plantProps.wateringFrequencyDays,
      "day"
    );

    const diffDays = nextWateringDate.diff(now, "day");
    if (diffDays < 0) {
      return "Overdue by " + Math.abs(diffDays) + " days";
    } else if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else {
      return `In ${diffDays} days`;
    }
  };

  const getLastWateredDateString = () => {
    const now = dayjs();
    const lastWateredDate = dayjs(plantProps.lastWateredDate);

    const diffDays = now.diff(lastWateredDate, "day");

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  const details: Detail[] = [
    {
      key: "lastWateredDate",
      label: "Last Watered",
      weight: 500,
      color: undefined,
      value: getLastWateredDateString(),
    },
    {
      key: "nextWateringDate",
      label: "Next Watering",
      weight: isNextWateringDateOverdue() ? 600 : 500,
      color: isNextWateringDateOverdue() ? "red" : undefined,
      value: getNextWateringDateString(),
    },
  ];

  const renderDetails = () => {
    return details.map(({ key, label, weight, color, value }) => (
      <Grid.Col key={key} span={6}>
        <Text size="xs" c="dimmed">
          {label}
        </Text>
        <Text fw={weight} size="sm" c={color}>
          {(value as unknown as string) || "Never"}
        </Text>
      </Grid.Col>
    ));
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <div className={classes.header}>
          <IconPlant
            className={classes.icon}
            size={24}
            stroke={2}
            color="#0d5b15ff"
          />
          <Text className={classes.title} truncate={"end"}>
            {plantProps.name}
          </Text>
          <IconChevronRight
            size={24}
            stroke={2}
            color={CONSTANTS.ICON_COLOR}
            className={classes.chevron}
          />
        </div>
      </Card.Section>
      <Card.Section className={classes.details}>
        <Grid grow>{renderDetails()}</Grid>
      </Card.Section>
    </Card>
  );
};

export default PlantCard;
