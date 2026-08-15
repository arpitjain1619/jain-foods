import { Link } from "react-router-dom";
import { SWIGGY_IMAGE_CDN_BASE_URL } from "../utils/constants";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantHeader = (props) => {
  const data = props.data;

  const { loggedInUserName } = useContext(UserContext);

  const createCuisineSlug = (cuisine, city) => {
    const baseUrl = "https://www.swiggy.com/city/";

    return (
      baseUrl +
      city.toLowerCase() +
      "/" +
      cuisine.toLowerCase().replace(/\s+/g, "-") +
      "-dish-restaurants"
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        {data.name}
        <span className="ml-2 text-green-600">
          ({`${loggedInUserName}'s favorite restaurant`})
        </span>
      </h1>
      <div className="w-full h-80 overflow-hidden mb-5">
        <img
          src={`${SWIGGY_IMAGE_CDN_BASE_URL}${data.cloudinaryImageId}`}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="font-semibold">
        <span>{data.avgRating}</span>
        <span className="ml-2">({data.totalRatingsString})</span>
        <span className="ml-2">.</span>
        <span className="ml-2">({data.costForTwoMessage})</span>
      </div>
      {data.cuisines &&
        data.cuisines.map((cuisine, index) => (
          <span key={index}>
            <Link
              target="_blank"
              className="mr-1 text-orange-500 font-bold"
              to={createCuisineSlug(cuisine, data.city)}
              key={cuisine}
            >
              {cuisine}
            </Link>
            {index < data.cuisines.length - 1 && ", "}
          </span>
        ))}
    </div>
  );
};

export default RestaurantHeader;
