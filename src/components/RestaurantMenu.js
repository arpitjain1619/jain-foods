import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const { resId } = useParams();

  return (
    <div>
      <h1>Name - {resId}</h1>
      <h2>Location</h2>
      <h2>Menu:</h2>
      <h3>Paneer 65</h3>
      <h3>Paneer Tikka</h3>
    </div>
  );
};

export default RestaurantMenu;
