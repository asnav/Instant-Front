import React, { FC, useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import AppNavigator from "./app/app_navigator.tsx";
import AuthNavigator from "./auth/auth_navigator.tsx";

const App: FC = () => {
  const { authData } = useContext(AuthContext);
  return authData ? <AppNavigator /> : <AuthNavigator />;
};

export default App;
