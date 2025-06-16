import type { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (token: string, user: User) => Promise<boolean>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simplified storage functions
const storeAuthData = async (token: string, user: User): Promise<void> => {
  try {
    const authData = { token, user, timestamp: Date.now() };
    await AsyncStorage.setItem("userSession", JSON.stringify(authData));
    console.log("✅ Auth data stored successfully");
  } catch (error) {
    console.error("❌ Failed to store auth data:", error);
    throw error;
  }
};

const getStoredAuthData = async (): Promise<any> => {
  try {
    const authJSON = await AsyncStorage.getItem("userSession");
    if (authJSON) {
      const data = JSON.parse(authJSON);
      console.log("✅ Auth data retrieved from storage");
      return data;
    }
    console.log("ℹ️ No auth data found in storage");
    return null;
  } catch (error) {
    console.error("❌ Failed to get stored auth data:", error);
    return null;
  }
};

const removeStoredAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("userSession");
    console.log("✅ Auth data removed successfully");
  } catch (error) {
    console.error("❌ Failed to remove auth data:", error);
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Simple initialization
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      console.log("🔄 Initializing AuthContext...");

      try {
        const storedAuthData = await getStoredAuthData();

        if (isMounted && storedAuthData?.token && storedAuthData?.user) {
          console.log("✅ Restoring user session");
          setToken(storedAuthData.token);
          setUser(storedAuthData.user);
        }
      } catch (error) {
        console.error("❌ Auth initialization error:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsInitialized(true);
          console.log("✅ AuthContext initialized");
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = async (
    authToken: string,
    userData: User
  ): Promise<boolean> => {
    try {
      console.log("🔄 Signing in user...");

      if (!authToken || !userData) {
        throw new Error("Invalid authentication data");
      }

      await storeAuthData(authToken, userData);
      setToken(authToken);
      setUser(userData);

      console.log("✅ User signed in successfully");
      return true;
    } catch (error) {
      console.error("❌ Sign in failed:", error);
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      console.log("🔄 Signing out user...");

      await removeStoredAuthData();
      setToken(null);
      setUser(null);

      console.log("✅ User signed out successfully");
    } catch (error) {
      console.error("❌ Sign out failed:", error);
    }
  };

  const isAuthenticated = Boolean(user && token && isInitialized);

  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    signIn,
    signOut,
    isAuthenticated,
    isInitialized,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
