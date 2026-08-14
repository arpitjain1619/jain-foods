import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { SWIGGY_IMAGE_CDN_BASE_URL } from "../utils/constants";

const MenuItemDetails = ({ index, showIndex, menuItemList }) => {
  return (
    index === showIndex && (
      <div className="mt-5">
        {menuItemList.itemCards?.length > 0 &&
          menuItemList.itemCards.map((itemCard, index) => {
            const info = itemCard.card.info;

            console.log(info);

            return (
              <ul key={index}>
                <li>
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <div className="font-bold">{info.name}</div>
                      <div>₹{(info.defaultPrice ?? info.price) / 100}</div>
                      <div className="mt-1">
                        <FontAwesomeIcon icon={faStar} color="green" />
                        <span>{info.ratings.aggregatedRating.rating}</span>
                        <span className="ml-1">
                          ({info.ratings.aggregatedRating.ratingCountV2})
                        </span>
                      </div>
                      {info.description && (
                        <div className="mt-1 w-auto">
                          <span className="text-gray-500">
                            {info.description}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <img
                        className="rounded-4xl w-40 h-36 ml-1"
                        src={`${SWIGGY_IMAGE_CDN_BASE_URL}${info.imageId}`}
                      ></img>
                    </div>
                  </div>
                  <div className="h-0.5 bg-gray-200 w-210 mb-10"></div>
                </li>
              </ul>
            );
          })}
      </div>
    )
  );
};

export default MenuItemDetails;
