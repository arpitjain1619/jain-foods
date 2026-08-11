import logo from "url:../../assets/logo/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Jain Foods" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link className="nav-item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/contact">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/coming-soon">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
