import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { TOP_RATING, SWIGGY_GET_API_URL } from "../utils/constants";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const restaurantListFetch = await fetch(SWIGGY_GET_API_URL);
    const restaurantListData = await restaurantListFetch.json();

    let restaurants =
      restaurantListData?.data?.cards?.flatMap((card) => {
        const grid = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        return Array.isArray(grid) ? grid : [];
      }) ?? [];

    restaurants = restaurants.filter((restaurant) => !restaurant["@type"]);

    setRestaurantList(restaurants);
    setFilteredRestaurantList(restaurants);
  };

  return (
    <div className="body">
      <div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="filter-btn"
            onClick={() => {
              const searchedRestaurantList = restaurantList.filter(
                (restaurant) => {
                  return restaurant.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                },
              );

              setFilteredRestaurantList(searchedRestaurantList);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            setSearchText("");

            const topRatedRestaurantList = restaurantList
              .filter((restaurant) => {
                return restaurant.info.avgRating > TOP_RATING;
              })
              .sort((a, b) => b.info.avgRating - a.info.avgRating);

            setFilteredRestaurantList(topRatedRestaurantList);
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
