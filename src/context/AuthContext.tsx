import React, { createContext, FC, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import apiClient from "../api/clientApi.ts";
import authApi, { RegisterInterface, LoginInterface } from "../api/authApi.ts";
import userApi, { EditUserInterface } from "../api/userApi.ts";
import { User } from "../utils/types/@User.ts";

type AuthData = {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
};

type AuthContextType = {
  isLoading: boolean;
  userData?: User;
  authData?: AuthData;
  register: (
    userDetails: RegisterInterface
  ) => Promise<undefined | string> | null;
  login: (userDetails: LoginInterface) => Promise<undefined | string> | null;
  logout: () => void;
  toggleLoading: () => void;
  editUserInfo: (userId: string, data: EditUserInterface) => void;
  getUserInfo: (id: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  register: (userDetails: RegisterInterface) => null,
  login: (userDetails: LoginInterface) => null,
  logout: () => {},
  toggleLoading: () => {},
  editUserInfo: () => null,
  getUserInfo: () => null,
});

export const AuthProvider: FC<{ children: any }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
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

    // const [userRes] = await Promise.all([
    // userApi.getUser(data.userId),
    await SecureStore.setItemAsync("authData", JSON.stringify(data));

    // ]);
    // setUserData(userRes.data as User);
    setAuthData(data as AuthData);

    apiClient.setHeader("Authorization", `JWT ${data.accessToken}`);

    setIsLoading(false);
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

        // const [userRes] = await Promise.all([
        // userApi.getUser(data.userId),
        await SecureStore.setItemAsync("authData", JSON.stringify(data));

        // ]);
        // setUserData(userRes.data as User);
        setAuthData(data as AuthData);
        apiClient.setHeader("Authorization", `JWT ${data.accessToken}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLoading = (val?: boolean) =>
    setIsLoading((prevState) => val || !prevState);

  const editUserInfo = async (userId: string, data: EditUserInterface) => {
    await userApi.editUserInfo(userId, data);
    getUserInfo(userId);
  };

  const getUserInfo = async (userId: string) => {
    const res = await userApi.getUser(userId);
    setUserData(res.data as User);
  };

  const onLaunch = async () => {
    await isLoggedIn();
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    onLaunch();
  }, []);

  const authContext: AuthContextType = {
    isLoading,
    userData,
    authData,
    register,
    login,
    logout,
    getUserInfo,
    editUserInfo,
    toggleLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
