import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../providers/AuthContext";

const PrivateRoutes = () => {
  const { currentUser } = useAuthContext();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
