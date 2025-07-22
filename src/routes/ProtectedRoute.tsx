import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const email = Cookies.get("email");
  return email ? <Outlet /> : <Navigate to="/" replace />;
};
