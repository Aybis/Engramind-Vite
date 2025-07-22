import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const LoggedInRoute = () => {
  const email = Cookies.get("email");
  return email ? <Navigate to="/showcase" replace /> : <Outlet />;
};
