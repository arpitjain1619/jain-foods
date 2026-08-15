import logo from "url:../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Header = () => {
  const { loggedInUserName } = useContext(UserContext);

  return (
    <div className="flex justify-between shadow-md">
      <div className="logo-container">
        <img className="w-25" src={logo} alt="Jain Foods" />
      </div>
      <div className="flex items-start">
        <ul className="flex p-5 m-5 text-2xl">
          <li>
            <Link className="font-bold m-3" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="font-bold m-3" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="font-bold m-3" to="/contact">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="font-bold m-3" to="/coming-soon">
              Cart
            </Link>
          </li>
          <li>
            <Link className="font-bold m-3" to="/instamart">
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
