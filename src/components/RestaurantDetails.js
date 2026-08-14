import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnandShekhwati } from "../utils/mockdata/anandShekhawati";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantMenu from "./RestaurantMenu";

const RestaurantDetails = () => {
  const { resId } = useParams();

  const [header, setHeader] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const menuData = AnandShekhwati;

    const header = menuData?.data?.cards[2]?.card?.card?.info;
    setHeader(header);

    const menu =
      menuData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    setMenu(menu);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 mt-10">
      <RestaurantHeader data={header} />
      <div className="h-0.5 bg-gray-200 w-210 my-10"></div>
      <RestaurantMenu menuItems={menu} />
    </div>
  );
};

export default RestaurantDetails;
