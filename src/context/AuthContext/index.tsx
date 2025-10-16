import type { UserProfile } from "@/domain/user/types";
import type { LoginCredentials } from "@/pages/Login/validations";
import { loginCTA } from "@/services";
import { refreshCTA, validateCTA } from "@/services/domain/auth";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  getToken: () => Promise<string | undefined>;
  login: (credentials: Omit<LoginCredentials,'role'>) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  userProfile?: UserProfile;
  updateProfile:(_newProfile:Partial<UserProfile>)=>void
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [lastValidationTime, setLastValidationTime] = useState<number | null>(
    null
  );
   const userStoreProfile: UserProfile = useMemo(
    () =>
      JSON.parse(localStorage.getItem("userContext") || "null") ?? undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated]
  );
  const [userProfile,setUserProfile]= useState(userStoreProfile)
  const VALIDATION_WINDOW_MS = 3 * 60 * 1000;

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      validateToken(accessToken);
      setLastValidationTime(Date.now());
    } else {
      setIsLoading(false);
    }
  }, []);

  const shouldRenewToken = (now: number, expiresAt: number, minutes = 5) => {
    const buffer = minutes * 60;
    const timeUntilExpiry = expiresAt - now;
    return timeUntilExpiry <= buffer;
  };

  const validateToken = (accessToken: string) => {
    validateCTA(accessToken)
      .then(() => {
        setIsAuthenticated(true);
        setAccessToken(accessToken);
      })
      .catch((error) => {
        localStorage.removeItem("accessToken");
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const clearAuth = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userContext");
    setIsAuthenticated(false);
    setAccessToken(undefined);
    setLastValidationTime(null);
  };

  const getToken = useCallback(async (): Promise<string | undefined> => {
    const now = Math.floor(Date.now() / 1000);

    const storeAndReturnToken = (token: string) => {
      setIsAuthenticated(true);
      setAccessToken(token);
      setLastValidationTime(now);
      return token;
    };

    try {
      const token = accessToken ?? localStorage.getItem("accessToken");

      if (!token) {
        clearAuth();
        return undefined;
      }

      const isTokenRecentlyValidated =
        lastValidationTime && now - lastValidationTime < VALIDATION_WINDOW_MS;

      const isTokenStillFresh = !shouldRenewToken(
        now,
        userProfile?.expiresAt,
        5
      );

      if (isTokenRecentlyValidated && isTokenStillFresh) {
        return token;
      }

      try {
        await validateCTA(token);
        return storeAndReturnToken(token);
      } catch {
        const refresh = localStorage.getItem("refreshToken") ?? "";
        const { accessToken: newToken } = await refreshCTA({ token: refresh });
        localStorage.setItem("accessToken", newToken);
        return storeAndReturnToken(newToken);
      }
    } catch {
      clearAuth();
      return undefined;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, lastValidationTime, userProfile]);

  const login = async (userCredentials:  Omit<LoginCredentials,'role'>) => {
    try {
      const { accessToken, refreshToken, ...rest } =
        await loginCTA(userCredentials);
      localStorage.setItem("userContext", JSON.stringify(rest));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setIsAuthenticated(true);
      setAccessToken(accessToken);
    } catch (error) {
      setIsAuthenticated(false);
      setAccessToken(undefined);
      throw error;
    }
  };

  const logout = async () => {
    clearAuth();
  };

  const updateProfile=(newProfile:Partial<UserProfile>)=>{
     localStorage.setItem(
                "userContext",
                JSON.stringify({
                  ...userProfile,
                  ...newProfile
                })
              );
              setUserProfile({...userProfile,...newProfile})
  }

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      getToken,
      login,
      logout,
      isLoading,
      userProfile,
      updateProfile
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAuthenticated, getToken, isLoading, userProfile]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
