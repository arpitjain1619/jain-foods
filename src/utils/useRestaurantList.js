import { useEffect, useState } from "react";
import { SWIGGY_GET_API_URL } from "./constants";

const useRestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(SWIGGY_GET_API_URL);
    const restaurantListData = await response.json();

    let restaurants =
      restaurantListData?.data?.cards?.flatMap((card) => {
        const grid = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        return Array.isArray(grid) ? grid : [];
      }) ?? [];

    restaurants = restaurants.filter((restaurant) => !restaurant["@type"]);

    setRestaurantList(restaurants);
  };

  return restaurantList;
};

export default useRestaurantList;
