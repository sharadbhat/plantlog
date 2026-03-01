import { Flex } from "@mantine/core";
import { usePlantStore } from "../../store";
import PlantCard from "../PlantCard";
import { useEffect, useState } from "react";

const CardList = () => {
  const plants = usePlantStore((state) => state.plants);
  const [isBrave, setIsBrave] = useState(false);

  useEffect(() => {
    const checkBrave = async () => {
      const navigatorWithBrave = navigator as Navigator & {
        brave?: { isBrave?: () => Promise<boolean> };
      };

      if (navigatorWithBrave.brave?.isBrave) {
        const result = await navigatorWithBrave.brave.isBrave();
        setIsBrave(result);
      }
    };

    checkBrave();
  }, []);

  return (
    <Flex direction="column" gap="10px">
      {isBrave && <div>Running in Brave Browser</div>}

      {plants.map((plant) => (
        <PlantCard key={plant.id} {...plant} />
      ))}
    </Flex>
  );
};

export default CardList;