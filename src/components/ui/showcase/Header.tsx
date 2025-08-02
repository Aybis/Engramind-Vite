"use client";
import { BellDot, MenuIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../../../theme/theme-toggle";
import { formatNickname, navbarLinkData } from "../../../utils/helper";
import { NavbarLinkData } from "../../../interface";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWindowWidth } from "../../../hooks/useWindowWidth";

interface HeaderProps {
  name: string;
  setIsOpenDrawer: (value: boolean) => void;
  setShowConfirm: (value: boolean) => void;
  setShowUpdateNickname: (value: boolean) => void;
  currentNickname: string;
}

export const ShowcaseHeader = (
  {
    name,
    setIsOpenDrawer,
    setShowConfirm,
    setShowUpdateNickname,
    currentNickname,
  }: HeaderProps // Default value for name
) => {
  const width = useWindowWidth();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-zinc-200 bg-white/50 backdrop-blur-sm dark:bg-zinc-800 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <MenuIcon
          onClick={() => setIsOpenDrawer(true)}
          className="md:hidden text-black dark:text-white block cursor-pointer"
        />
        <nav className="hidden md:flex gap-6 text-md text-gray-700 dark:text-gray-300 leading-relaxed">
          {navbarLinkData.map((linkData: NavbarLinkData, index: number) => (
            <Link
              key={linkData.id + index.toString()}
              to={linkData.href}
              className={`hover:text-purple-600 dark:hover:text-purple-400 ${
                (linkData?.includes &&
                  pathname?.includes(linkData?.includes)) ||
                pathname === linkData?.href
                  ? "text-purple-600 font-bold"
                  : ""
              }`}
            >
              {linkData.title}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 items-center relative">
          <WalletMultiButton
            style={{ display: width > 768 ? "flex" : "none" }}
          />
          <ThemeToggle customClassName="md:block hidden" />
        </div>
      </div>
    </header>
  );
};
