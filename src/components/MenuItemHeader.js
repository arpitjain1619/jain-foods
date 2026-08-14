import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MenuItemHeader = ({ index, menuItemList, handleClick }) => {
  return (
    <div
      className="font-bold text-lg flex justify-between items-center shadow-md cursor-pointer pb-2"
      onClick={() => {
        handleClick(index);
      }}
    >
      <div>
        <span>{menuItemList.title}</span>
        {menuItemList.itemCards?.length > 0 && (
          <span className="ml-1">({menuItemList.itemCards.length})</span>
        )}
      </div>
      <FontAwesomeIcon icon={faChevronDown} />
    </div>
  );
};

export default MenuItemHeader;
