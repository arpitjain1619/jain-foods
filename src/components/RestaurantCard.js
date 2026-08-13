import { SWIGGY_IMAGE_CDN_BASE_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { name, cloudinaryImageId, avgRating, cuisines, costForTwo, locality } =
    props.restaurantData.info;

  const cuisinesAll = cuisines.join(", ");

  return (
    <div className="m-8 p-4 w-75 h-135 bg-gray-100 hover:bg-gray-200 rounded-md">
      <img
        className="w-70 h-64"
        src={`${SWIGGY_IMAGE_CDN_BASE_URL}${cloudinaryImageId}`}
        alt="Restaurant Logo"
      ></img>
      <h3 className="font-bold my-2">{name}</h3>
      <h4 className="my-3">{avgRating}</h4>
      <h4 className="my-3">{costForTwo}</h4>
      <h4 className="my-3">{locality}</h4>
      <h4 className="my-3">{cuisinesAll}</h4>
    </div>
  );
};

export default RestaurantCard;
