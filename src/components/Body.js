import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { TOP_RATING, SWIGGY_GET_API_URL } from "../utils/constants";

const Body = () => {
  let [filteredRestaurantList, setFilteredRestaurantList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const restaurantListFetch = await fetch(SWIGGY_GET_API_URL);
    const restaurantListData = await restaurantListFetch.json();

    const restaurants =
      restaurantListData?.data?.cards?.flatMap((card) => {
        const grid = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        return Array.isArray(grid) ? grid : [];
      }) ?? [];

    const restaurantsList = restaurants.filter(
      (restaurant) => !restaurant["@type"],
    );

    setFilteredRestaurantList(restaurantsList);
  };

  return (
    <div className="body">
      <div>
        <button
          className="filter-btn"
          onClick={() => {
            filteredRestaurantList = filteredRestaurantList
              .filter((restaurant) => {
                return restaurant.info.avgRating > TOP_RATING;
              })
              .sort((a, b) => b.info.avgRating - a.info.avgRating);

            setFilteredRestaurantList(filteredRestaurantList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurantList.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant.info.id}
              restaurantData={restaurant}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
