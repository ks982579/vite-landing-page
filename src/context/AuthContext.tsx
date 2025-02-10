import React, { createContext, useState } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  const login = () => {
    setLoginStatus(true);
  };

  const logout = () => {
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
};

export default AuthProvider;
