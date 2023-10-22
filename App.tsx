import React, { FC } from "react";
import { AuthProvider } from "./context/AuthContext";
import NavigationIndex from "./navigation/index";

const App: FC = () => (
  <AuthProvider>
    <NavigationIndex />
  </AuthProvider>
);

export default App;
