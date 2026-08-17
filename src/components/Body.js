import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { TOP_RATING } from "../utils/constants";
import { Link } from "react-router-dom";
import useRestaurantList from "../utils/useRestaurantList";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);

  const restaurantList = useRestaurantList();

  const handleTopRatedRestaurantsClick = () => {
    setSearchText("");

    const topRatedRestaurantList = restaurantList
      .filter((restaurant) => restaurant.info.avgRating > TOP_RATING)
      .sort((a, b) => b.info.avgRating - a.info.avgRating);

    setFilteredRestaurantList(topRatedRestaurantList);
  };

  const handleSearchClick = () => {
    const searchedRestaurantList = restaurantList.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredRestaurantList(searchedRestaurantList);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    handleSearchClick();
  };

  useEffect(() => {
    setFilteredRestaurantList(restaurantList);
  }, [restaurantList]);

  return (
    <div className="m-2">
      <div className="flex mb-10">
        <div>
          <input
            className="p-2 rounded-lg w-100 bg-gray-200 focus-visible:border-none"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="border ml-2 px-2 py-1 cursor-pointer bg-blue-200 rounded-sm"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
        <button
          className="border ml-20 w-52 cursor-pointer bg-blue-200 rounded-sm"
          onClick={handleTopRatedRestaurantsClick}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurantList.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={`/restaurants/${restaurant.info.id}`}
            >
              <RestaurantCard restaurantData={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
