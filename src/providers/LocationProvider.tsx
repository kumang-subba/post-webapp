import { useState } from "react";
import { LocationContext } from "./LocationContext";
import { Location } from "react-router-dom";

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [backgroundLocation, setBackgroundLocation] = useState<Location | null>(
    null
  );
  return (
    <LocationContext.Provider
      value={{ backgroundLocation, setBackgroundLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
}
