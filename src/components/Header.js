import logo from "url:../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  let totalCartItems = 0;
  const cartItems = useSelector((store) => store.cart.items);

  cartItems.map((cartItem) => {
    totalCartItems = totalCartItems + cartItem.quantity;
  });

  const { loggedInUserName } = useContext(UserContext);

  return (
    <div className="flex justify-between shadow-md">
      <div className="logo-container">
        <Link to="/">
          <img className="w-25" src={logo} alt="Jain Foods" />
        </Link>
      </div>
      <div className="flex items-start">
        <ul className="flex p-5 m-5 text-lg">
          <li>
            <Link className="m-3" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="m-3" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="m-3" to="/contact">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="m-3" to="/cart">
              <span className="px-2 bg-green-500">{totalCartItems}</span>
              <span className="ml-1">Cart</span>
            </Link>
          </li>
          <li>
            <Link className="m-3" to="/instamart">
              Instamart
            </Link>
          </li>
          <li className="font-bold text-green-600">{loggedInUserName}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
