import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storedUser = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
