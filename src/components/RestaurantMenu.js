import { useState } from "react";
import MenuItemHeader from "./MenuItemHeader";
import MenuItemDetails from "./MenuItemDetails";

const RestaurantMenu = ({ menuItems, isOpen }) => {
  const [showIndex, setShowIndex] = useState(null);

  const itemCategory = [
    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
  ];

  const handleClick = (index) => {
    index === showIndex ? setShowIndex(null) : setShowIndex(index);
  };

  const menu = menuItems.filter((menuItem) => {
    return itemCategory.includes(menuItem.card.card["@type"]);
  });

  if (menu.length > 0) {
    return menu.map((menuItem, index) => {
      const menuItemList = menuItem.card.card;

      return (
        itemCategory.includes(menuItemList["@type"]) && (
          <div key={index} className="mb-5">
            <MenuItemHeader
              index={index}
              menuItemList={menuItemList}
              handleClick={handleClick}
            />
            <MenuItemDetails
              index={index}
              showIndex={showIndex}
              menuItemList={menuItemList}
            />
          </div>
        )
      );
    });
  }
};

export default RestaurantMenu;
