import Cookies from "js-cookie";
import React, { createContext, useState } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const defaultValue: AuthContextType = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  const login = () => {
    setLoginStatus(true);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setLoginStatus(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loginStatus,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
