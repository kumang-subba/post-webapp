import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { User } from "../types/user";

type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User> | null>;
};
export const AuthContext = createContext({} as AuthContextType);

export const useAuthContext = () => {
  return useContext(AuthContext);
};
