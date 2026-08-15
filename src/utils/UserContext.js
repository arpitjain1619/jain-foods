import { createContext } from "react";

const UserContext = createContext({ loggedInUserName: "User" });

export default UserContext;
