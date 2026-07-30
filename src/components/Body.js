import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        {resList.map((res) => {
          return <RestaurantCard key={res.info.resId} resData={res} />;
        })}
      </div>
    </div>
  );
};

export default Body;
