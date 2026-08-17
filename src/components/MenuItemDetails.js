import MenuItemDetail from "./MenuItemDetail";

const MenuItemDetails = ({ index, showIndex, menuItemList }) => {
  return (
    index === showIndex && (
      <div className="mt-5">
        {menuItemList.itemCards?.length > 0 &&
          menuItemList.itemCards.map((itemCard, index) => {
            const info = itemCard.card.info;

            return (
              <ul key={index}>
                <MenuItemDetail info={info} />
              </ul>
            );
          })}
      </div>
    )
  );
};

export default MenuItemDetails;
