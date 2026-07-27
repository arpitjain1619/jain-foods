import React from "react";
import ReactDOM from "react-dom/client";
import logo from "url:./assets/logo/logo.png";
import resLogo from "url:./assets/cards/logo.jpeg";

/**
 * Header
 *  - Logo
 *  - Nav Items
 * Body
 *  - Search Bar
 *  - RestaurentContainer
 *      - RestaurentCard
 *          - Img
 *          - Name of Restaurent
 *          - Star Rating
 *          - Cusines
 *          - Delivery Time
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact
 */

const styleCard = {
  backgroundColor: "#f0f0f0",
};

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Jain Foods" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const RestaurentCard = () => {
  return (
    <div className="res-card" style={styleCard}>
      <img className="res-logo" src={resLogo} alt="Restaurent Food"></img>
      <h3>Jain Foods</h3>
      <h4>North Indian, South Indian, Italian</h4>
      <h4>5.0 stars</h4>
      <h4>30 minutes</h4>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="res-container">
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
        <RestaurentCard />
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
