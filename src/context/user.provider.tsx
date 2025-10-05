"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types";
import { getCurrentUser, logoutUser } from "../services/AuthService";
import { protectedRoutes } from "../constant";
import { useRouter } from "next/navigation";
import FxLoader from "../components/UI/FxLoader";

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

interface IUserProviderValues {
  user: IUser | null;

  setUser: (user: IUser | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleUser: () => void;
  logOut: (pathname: string) => void;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const logOut = async (pathname: string) => {
    try {
      logoutUser();
      setUser(null);
    } finally {
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    handleUser();
  }, []);


  if(isLoading){
    return <FxLoader />
  }

  return (
    <UserContext.Provider
      value={{ user, logOut, isLoading, setIsLoading, setUser, handleUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be within the UserProvider context");
  }
  return context;
};
