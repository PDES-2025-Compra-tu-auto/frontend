import type { UserProfile } from "@/domain/user/types";
import type { LoginCredentials } from "@/pages/Login/validations";
import { loginCTA } from "@/services";
import { refreshCTA, validateCTA } from "@/services/domain/auth";
import { createContext, useCallback, useEffect, useMemo, useState, type FC } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  getToken: () => Promise<string | undefined>;
  login: (credentials: any) => Promise<any>;
  logout: () => Promise<void>;
  isLoading: boolean;
  userProfile: UserProfile;
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
      validateToken(accessToken);
    }else{
    setIsLoading(false)
    }
  }, []);

  const validateToken = (accessToken: string) => {
    validateCTA(accessToken)
      .then(() => {
        setIsAuthenticated(true);
        setToken(accessToken);
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        throw error;
      }).finally(()=>{
            setIsLoading(false);

      });
  };
  
  const getToken = useCallback(async (): Promise<string | undefined> => {
    setIsLoading(true);

    try {
      const token = accessToken ?? localStorage.getItem("accessToken");

      if (!token) {
        setIsAuthenticated(false);
        setToken(undefined);
        return undefined;
      }
      try {
        await validateCTA(token);
        setIsAuthenticated(true);
        setToken(token);
        return token;
      } catch {
        try {
          const { access_token: newToken } = await refreshCTA({ token });
          localStorage.setItem("accessToken", newToken);
          setIsAuthenticated(true);
          setToken(newToken);
          return newToken;
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userContext");
          setIsAuthenticated(false);
          setToken(undefined);
          return undefined;
        }
      }
    } catch (error) {
      return undefined;
    } finally {
      setIsLoading(false);
    }
  },[isAuthenticated]);

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
  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      getToken,
      login,
      logout,
      isLoading,
      userProfile,
    }),
    [isAuthenticated, getToken, login, logout, isLoading, userProfile]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
