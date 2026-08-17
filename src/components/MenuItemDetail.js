import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { SWIGGY_IMAGE_CDN_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";
import { useState } from "react";

const MenuItemDetail = ({ info }) => {
  let currentQuantity = 0;
  const cartItems = useSelector((store) => store.cart.items);
  const existItem = cartItems.find((item) => item.id === info.id);

  if (existItem) {
    currentQuantity = existItem.quantity;
  }

  const [itemQuantity, setItemQuantity] = useState(currentQuantity);

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    setItemQuantity(currentQuantity + 1);
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    currentQuantity -= 1;
    setItemQuantity(currentQuantity);

    dispatch(removeItem(item));
  };

  return (
    <li className="list-none">
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
              <span className="text-gray-500">{info.description}</span>
            </div>
          )}
        </div>
        <div className="relative w-40 ml-1 mb-10">
          <img
            className="rounded-2xl w-40 h-36 object-cover"
            src={`${SWIGGY_IMAGE_CDN_BASE_URL}${info.imageId}`}
          />
          {itemQuantity > 0 ? (
            <div
              className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 
             w-[100px] h-10 bg-white rounded-lg shadow-md 
             flex items-center justify-between overflow-hidden"
            >
              <button
                onClick={() => handleRemoveItem(info)}
                className="w-1/3 h-full text-green-600 font-bold cursor-pointer
               hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-1/3 text-center text-green-600 font-bold">
                {itemQuantity}
              </span>
              <button
                onClick={() => handleAddItem(info)}
                className="w-1/3 h-full text-green-600 font-bold cursor-pointer
               hover:bg-gray-100"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddItem(info)}
              className="cursor-pointer absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-[100px] h-10 bg-white text-green-600 font-bold rounded-lg shadow-md"
            >
              ADD
            </button>
          )}
        </div>
      </div>
      <div className="h-0.5 bg-gray-200 w-210 mb-10"></div>
    </li>
  );
};

export default MenuItemDetail;
