import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import ComingSoon from "./components/ComingSoon";
import Error from "./components/Error";
import RestaurantDetails from "./components/RestaurantDetails";
import UserContext from "./utils/UserContext";

const AppLayout = () => {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    // Make an API call to authenticate user and get the logged in user details
    const userData = {
      name: "Arpit Jain",
      intereset: "React",
    };

    setUserDetails(userData);
  }, []);

  return (
    // Before this Provider, the default Context value is "User"
    <UserContext.Provider value={{ loggedInUserName: userDetails?.name }}>
      {/* loggedInUserName => Arpit Jain 
          Parent Provider changes the Context value to "Arpit Jain" */}
      <div className="app">
        <UserContext.Provider value={{ loggedInUserName: "Jain's Food" }}>
          {/* loggedInUserName => Jain's Food
              Nested Provider overrides the parent value for Header only as "Jain's Food" */}
          <Header />
        </UserContext.Provider>
        {/* loggedInUserName => Arpit Jain 
            Outlet is outside the nested Provider, so it gets the parent value "Arpit Jain" */}
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const Instamart = lazy(() => import("./components/Instamart"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <Instamart />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantDetails />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
