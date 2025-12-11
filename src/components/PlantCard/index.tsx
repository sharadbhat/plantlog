import type { Plant } from "../../types";

const PlantCard = (plantProps: Plant) => {
  return (
    <div>
      <p>{plantProps.name}</p>
    </div>
  );
};

export default PlantCard;
