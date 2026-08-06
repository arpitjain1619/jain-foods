import { SWIGGY_IMAGE_CDN_BASE_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { name, cloudinaryImageId, avgRating, cuisines, costForTwo, locality } =
    props.restaurantData.info;

  const cuisinesAll = cuisines.join(", ");

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={`${SWIGGY_IMAGE_CDN_BASE_URL}${cloudinaryImageId}`}
        alt="Restaurant Logo"
      ></img>
      <h3>{name}</h3>
      <h4>{avgRating}</h4>
      <h4>{costForTwo}</h4>
      <h4>{locality}</h4>
      <h4>{cuisinesAll}</h4>
    </div>
  );
};

export default RestaurantCard;
