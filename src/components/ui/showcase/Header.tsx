'use client';
import { BellDot, MenuIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../../theme/theme-toggle';
import { formatNickname, navbarLinkData } from '../../../utils/helper';
import { NavbarLinkData } from '../../../interface';

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
  }: HeaderProps, // Default value for name
) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
    <header className="inset-x-0 mx-auto max-w-7xl rounded-lg top-8 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-2xl dark:border-white/10 sticky z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <MenuIcon
          onClick={() => setIsOpenDrawer(true)}
          className="md:hidden text-black dark:text-white block cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        />
        <nav className="hidden md:flex gap-6 text-md text-gray-700 dark:text-gray-300 leading-relaxed">
          {navbarLinkData.map((linkData: NavbarLinkData, index: number) => (
            <Link
              key={linkData.id + index.toString()}
              to={linkData.href}
              className={`hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                (linkData?.includes &&
                  pathname?.includes(linkData?.includes)) ||
                pathname === linkData?.href
                  ? 'text-purple-600 dark:text-purple-400 font-bold'
                  : ''
              }`}
            >
              {linkData.title}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 items-center relative">
          <div className="text-sm text-purple-600 dark:text-purple-300 capitalize font-semibold">
            Hi,{' '}
            <button
              type="button"
              className="cursor-pointer hover:text-purple-700 dark:hover:text-purple-200 transition-colors"
            >
              {formatNickname(currentNickname)}
            </button>
          </div>
          <BellDot className="cursor-pointer text-purple-600 dark:text-purple-400 md:block hidden hover:text-purple-700 dark:hover:text-purple-300 transition-colors" />
          <img
            src="/assets/male_persona.avif"
            alt="Profile"
            className="rounded-full w-8 h-8 cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-purple-500/50 transition-all duration-300"
            width={400}
            height={300}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="text-sm md:block hidden text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline cursor-pointer transition-colors"
          >
            Logout
          </button>
          <ThemeToggle customClassName="md:block hidden" />
        </div>
      </div>
    </header>
  );
};
