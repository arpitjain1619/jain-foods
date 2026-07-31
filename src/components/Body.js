import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { TOP_RATING } from "../utils/constants";

const Body = () => {
  let [filteredRestaurantList, setFilteredRestaurantList] =
    useState(restaurantList);

  return (
    <div className="body">
      <div>
        <button
          className="filter-btn"
          onClick={() => {
            filteredRestaurantList = filteredRestaurantList
              .filter((restaurant) => {
                return restaurant.info.rating.aggregate_rating > TOP_RATING;
              })
              .sort(
                (a, b) =>
                  b.info.rating.aggregate_rating -
                  a.info.rating.aggregate_rating,
              );

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
              key={restaurant.info.resId}
              restaurantData={restaurant}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
