import { usePlantStore } from "../../store";
import PlantCard from "../PlantCard";

const CardList = () => {
  const plants = usePlantStore((state) => state.plants);

  return (
    <div>
      {plants.map((plant) => (
        <div key={plant.id}>
          <PlantCard {...plant} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
