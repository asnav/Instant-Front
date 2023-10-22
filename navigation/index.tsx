import React, { FC, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppNavigator from "../navigation/app/app_navigator";
import AuthNavigator from "../navigation/auth/auth_navigator";

const App: FC = () => {
  const { authData } = useContext(AuthContext);
  return authData ? <AppNavigator /> : <AuthNavigator />;
};

export default App;
