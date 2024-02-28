import { createContext, useContext } from "react";
import { Location } from "react-router-dom";

type LocationContextType = {
  backgroundLocation: Location | null;
  setBackgroundLocation: (location: Location | null) => void;
};

export const LocationContext = createContext({} as LocationContextType);

export const useLocationContext = () => {
  return useContext(LocationContext);
};
