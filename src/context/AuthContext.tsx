import React, { createContext, FC, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import apiClient from "../api/clientApi.ts";
import authApi, { RegisterInterface, LoginInterface } from "../api/authApi.ts";

type AuthData = {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
};

type AuthContextType = {
  isLoading: boolean;
  authData?: AuthData;
  register: (
    userDetails: RegisterInterface
  ) => Promise<undefined | string> | null;
  login: (userDetails: LoginInterface) => Promise<undefined | string> | null;
  changeUsername: (username: string) => Promise<undefined | string> | null;
  changeEmail: (email: string) => Promise<undefined | string> | null;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<undefined | string> | null;
  logout: () => void;
  toggleLoading: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  register: (userDetails: RegisterInterface) => null,
  login: (userDetails: LoginInterface) => null,
  changeUsername: (username: string) => null,
  changeEmail: (email: string) => null,
  changePassword: (oldPassword: string, newPassword: string) => null,
  logout: () => {},
  toggleLoading: () => {},
});

export const AuthProvider: FC<{ children: any }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authData, setAuthData] = useState<AuthData>();

  const register = async (
    userDetails: RegisterInterface
  ): Promise<undefined | string> => {
    setIsLoading(true);
    const res = await authApi.register(userDetails);

    const data: any = res.data;

    if (!res.ok) {
      setIsLoading(false);
      if (data) return data.message as string;
      else return "failed connecting to server";
    }

    setIsLoading(false);
    return undefined;
  };

  const login = async (
    userDetails: LoginInterface
  ): Promise<undefined | string> => {
    setIsLoading(true);
    const res = await authApi.login(userDetails);

    const data: any = res.data;

    if (!res.ok) {
      setIsLoading(false);
      if (data) return data.message as string;
      else return "failed connecting to server";
    }
    await SecureStore.setItemAsync("authData", JSON.stringify(data));

    setAuthData(data as AuthData);

    apiClient.setHeader("Authorization", `JWT ${data.accessToken}`);

    setIsLoading(false);
    return undefined;
  };

  const changeUsername = async (username: string) => {
    const res = await authApi.changeUsername(username);

    const data: any = res.data;

    if (!res.ok) {
      if (data) return data.message as string;
      else return "failed connecting to server";
    }
    setAuthData({ ...(authData as AuthData), username: username });
    return undefined;
  };

  const changeEmail = async (email: string) => {
    const res = await authApi.changeEmail(email);

    const data: any = res.data;

    if (!res.ok) {
      if (data) return data.message as string;
      else return "failed connecting to server";
    }
    setAuthData({ ...(authData as AuthData), email: email });
    return undefined;
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const res = await authApi.changePassword(oldPassword, newPassword);

    const data: any = res.data;

    if (!res.ok) {
      if (data) return data.message as string;
      else return "failed connecting to server";
    }
    return undefined;
  };

  const logout = async () => {
    setIsLoading(true);
    await authApi.logout(authData ? authData.refreshToken : "");
    await SecureStore.deleteItemAsync("authData");
    setIsLoading(false);
    setAuthData(undefined);
  };

  const isLoggedIn = async () => {
    try {
      const fetchedAuthData: string | null = await SecureStore.getItemAsync(
        "authData"
      );

      if (fetchedAuthData) {
        const oldAuthData: AuthData = await JSON.parse(fetchedAuthData);
        const res = await authApi.refresh(oldAuthData.refreshToken);
        if (!res.ok) return;

        const data: any = res.data;

        await SecureStore.setItemAsync("authData", JSON.stringify(data));

        setAuthData(data as AuthData);
        apiClient.setHeader("Authorization", `JWT ${data.accessToken}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLoading = (val?: boolean) =>
    setIsLoading((prevState) => val || !prevState);

  const onLaunch = async () => {
    await isLoggedIn();
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    onLaunch();
  }, []);

  const authContext: AuthContextType = {
    isLoading,
    authData,
    register,
    login,
    changeUsername,
    changeEmail,
    changePassword,
    logout,
    toggleLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
