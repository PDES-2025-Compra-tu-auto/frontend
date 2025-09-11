import type { LoginCredentials } from "@/pages/Login/validations";
import { loginCTA } from "@/services";
import { createContext, useEffect, useMemo, useState, type FC } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  getToken: () => Promise<string | undefined>;
  login: (credentials: any) => Promise<any>;
  logout: () => Promise<void>;
  isLoading: boolean;
  userProfile: any;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setToken] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
      setToken(accessToken);
    }
    setIsLoading(false);
  }, []);

  const getToken = async (): Promise<string | undefined> => {
    setIsLoading(true);
    if (isAuthenticated) {
      setIsLoading(false);
      return Promise.resolve(accessToken);
    } else {
      const token = localStorage.getItem("accessToken");
      if (token) {
        //refresh
        setIsAuthenticated(true);
        setToken("newToken");
        setIsLoading(false);
        return Promise.resolve("new token");
      }
      setToken(token ?? undefined);
      setIsLoading(false);
      return Promise.resolve(token ?? undefined);
    }
  };

  const login = async (userCredentials: LoginCredentials) => {
    try {
      const { access_token, refresh_token } = await loginCTA(userCredentials);
      localStorage.setItem("userContext", JSON.stringify(userCredentials));
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      setIsAuthenticated(true);
      setToken(access_token);
    } catch (error) {
      setIsAuthenticated(false);
      setToken(undefined);
      throw error;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(undefined);
    localStorage.removeItem("userContext");
  };

  const userProfile = useMemo(
    () => JSON.parse(localStorage.getItem("userContext") || "null"),
    [localStorage]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getToken,
        login,
        logout,
        isLoading,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
