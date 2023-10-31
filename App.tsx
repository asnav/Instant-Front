import React, { FC } from "react";
import { AuthProvider } from "./src/context/AuthContext.tsx";
import NavigationIndex from "./src/navigation/index.tsx";

const App: FC = () => (
  <AuthProvider>
    <NavigationIndex />
  </AuthProvider>
);

export default App;
