const RestaurantCard = (props) => {
  const { name, image, rating, cuisine, costText } = props.resData.info;

  const cuisines = cuisine
    .map(({ name }) => {
      return name;
    })
    .join(", ");

  return (
    <div className="res-card">
      <img className="res-logo" src={image.url} alt="Restaurant Logo"></img>
      <h3>{name}</h3>
      <h4>{cuisines}</h4>
      <h4>{rating.aggregate_rating}</h4>
      <h4>{costText.text}</h4>
      <h4>{props.resData.distance}</h4>
    </div>
  );
};

export default RestaurantCard;
