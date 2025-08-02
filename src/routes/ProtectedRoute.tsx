import { useWallet } from "@solana/wallet-adapter-react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { publicKey } = useWallet();
  return publicKey?.toBase58() ? <Outlet /> : <Navigate to="/" replace />;
};
