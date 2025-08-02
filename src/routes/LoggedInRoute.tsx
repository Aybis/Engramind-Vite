import { useWallet } from "@solana/wallet-adapter-react";
import { Navigate, Outlet } from "react-router-dom";

export const LoggedInRoute = () => {
  const { publicKey } = useWallet();
  return publicKey?.toBase58() ? (
    <Navigate to="/showcase" replace />
  ) : (
    <Outlet />
  );
};
