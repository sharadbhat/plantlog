import { Flex } from "@mantine/core";
import { usePlantStore } from "../../store";
import PlantCard from "../PlantCard";
import { useEffect, useState } from "react";

const CardList = () => {
  const plants = usePlantStore((state) => state.plants);

  const [isBrave, setIsBrave] = useState<boolean | null>(null);

  useEffect(() => {
    const checkBrave = async () => {
      const navigatorWithBrave = navigator as Navigator & {
        brave?: { isBrave?: () => Promise<boolean> };
      };

      if (navigatorWithBrave.brave?.isBrave) {
        const result = await navigatorWithBrave.brave.isBrave();
        setIsBrave(result);
      } else {
        setIsBrave(false);
      }
    };

    checkBrave();
  }, []);

  return (
    <Flex direction="column" gap="10px">
      {isBrave !== null && (
        <div>
          {isBrave ? "Running in Brave Browser" : "Not Brave Browser"}
        </div>
      )}

      {plants.map((plant) => (
        <PlantCard key={plant.id} {...plant} />
      ))}
    </Flex>
  );
};

export default CardList;