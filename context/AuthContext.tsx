import React, { createContext, FC, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import apiClient from "../api/clientApi";
import authApi, { RegisterInterface, LoginInterface } from "../api/authApi";
import userApi, { EditUserInterface } from "../api/userApi";
import { User } from "../utils/types/@User";

type AuthData = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

type AuthContextType = {
  isLoading: boolean;
  splashLoading: boolean;
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
  splashLoading: false,
  register: (userDetails: RegisterInterface) => null,
  login: (userDetails: LoginInterface) => null,
  editUserInfo: () => null,
  getUserInfo: () => null,
  logout: () => {},
  toggleLoading: () => {},
});

export const AuthProvider: FC<{ children: any }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [splashLoading, setSplashLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const [authData, setAuthData] = useState<AuthData>();

  const register = async (
    userDetails: RegisterInterface
  ): Promise<undefined | string> => {
    setIsLoading(true);
    const res = await authApi.register(userDetails);

    const data: AuthData | any = res.data;

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

    const data: AuthData | any = res.data;

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
    setAuthData(data);

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
      setSplashLoading(true);

      const fetchedAuthData: string | null = await SecureStore.getItemAsync(
        "authData"
      );

      if (fetchedAuthData) {
        const authDataObject = JSON.parse(fetchedAuthData);
        setAuthData(authDataObject);
        apiClient.setHeader(
          "Authorization",
          `JWT ${authDataObject.accessToken}`
        );
      }

      setSplashLoading(false);
    } catch (error) {
      setSplashLoading(false);
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

  useEffect(() => {
    isLoggedIn();
  }, []);

  const authContext: AuthContextType = {
    isLoading,
    authData,
    splashLoading,
    register,
    login,
    logout,
    getUserInfo,
    userData,
    editUserInfo,
    toggleLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
