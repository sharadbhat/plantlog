import { Flex } from "@mantine/core";
import { usePlantStore } from "../../store";
import PlantCard from "../PlantCard";

const CardList = () => {
  const plants = usePlantStore((state) => state.plants);

  return (
    <Flex direction={"column"} gap={"10px"}>
      {plants.map((plant) => (
        <PlantCard {...plant} />
      ))}
    </Flex>
  );
};

export default CardList;
