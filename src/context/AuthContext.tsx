import React, { createContext, FC, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import apiClient from "../api/clientApi.ts";
import authApi, { RegisterInterface, LoginInterface } from "../api/authApi.ts";
import userApi, { EditUserInterface } from "../api/userApi.ts";
import { User } from "../utils/types/@User.ts";

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
  logout: () => {},
  toggleLoading: () => {},
  editUserInfo: () => null,
  getUserInfo: () => null,
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
      setSplashLoading(true);

      const fetchedAuthData: string | null = await SecureStore.getItemAsync(
        "authData"
      );

      if (fetchedAuthData) {
        const authDataObject: AuthData = JSON.parse(fetchedAuthData);
        const res = await authApi.refresh(authDataObject.refreshToken);

        const data: any = res.data;

        if (!res.ok) {
          setSplashLoading(false);
          return;
        }

        // const [userRes] = await Promise.all([
        // userApi.getUser(data.userId),
        await SecureStore.setItemAsync("authData", JSON.stringify(data));

        // ]);
        // setUserData(userRes.data as User);
        setAuthData(data as AuthData);
        apiClient.setHeader("Authorization", `JWT ${data.accessToken}`);
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
    splashLoading,
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
