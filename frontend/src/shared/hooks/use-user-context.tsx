import React from "react";
import { UserContext } from "@/app/provider/UserProvider";

const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useContext must be used within a UserProvider");
  }
  return context;
};

export { useUserContext };
