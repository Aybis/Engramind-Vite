'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../theme/theme-toggle';
import { MobileNavLink, NavLink } from '../ui/HelperComponents';
import RenderIf from '../../utils/RenderIf';

type NavbarProps = {
  showMenu: boolean;
  showMenuMobile: boolean;
};

export default function Navbar({
  showMenu,
  showMenuMobile = true,
}: NavbarProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleConnectWallet = async () => {
    navigate('/showcase');
  };

  useEffect(() => {
    setMounted(true);
    const hasSession = document.cookie.includes('session=');
    setIsLoggedIn(hasSession);
  }, []);

  if (!mounted) {
    // Prevent SSR hydration mismatch
    return null;
  }

  return (
    <nav
      className={[
        'fixed max-w-7xl inset-x-0 mx-auto bg-white/30 z-10000 backdrop-blur-sm bg-opacity-95 top-6 dark:bg-zinc-950/30 dark:border-zinc-700 rounded-lg',
        showMenuMobile ? 'shadow-sm border-b border-gray-100/50' : '',
      ].join(' ')}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ">
        {/* Menu Content  */}
        <div className="flex justify-between items-center py-4">
          {/* Header Logo */}
          <div
            onClick={() => {
              window.location.href = '/';
            }}
            className="flex items-center cursor-pointer"
          >
            <img
              src="/engramind.svg"
              className="block dark:hidden"
              alt="Logo"
              width={120}
              height={80}
            />
            <img
              src="/engramindDark.svg"
              className="hidden dark:block"
              alt="Logo"
              width={120}
              height={80}
            />
          </div>

          {/* Menu Navigation */}
          <div className="justify-around w-1/3 md:w-1/2 hidden md:flex">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
          </div>

          {/* Button Get Started */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex gap-x-2">
                <a
                  href={'/auth/login'}
                  className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Login
                </a>
                <a
                  href={'/auth/register'}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  Sign Up
                </a>
              </div>

              <ThemeToggle />
            </div>
          )}

          {/* Menu Hamburger */}
          <RenderIf condition={showMenuMobile}>
            <div className="md:hidden">
              <button
                id="menu"
                type="button"
                name="menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-400"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      mobileMenuOpen
                        ? 'M6 18L18 6M6 6l12 12'
                        : 'M4 6h16M4 12h16M4 18h16'
                    }
                  />
                </svg>
              </button>
            </div>
          </RenderIf>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-screen block' : 'hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <MobileNavLink href="#features">Features</MobileNavLink>
          <MobileNavLink href="#how-it-works">How It Works</MobileNavLink>
          <MobileNavLink href="#pricing">Pricing</MobileNavLink>
          <MobileNavLink href="#faq">FAQ</MobileNavLink>
          <div>
            <ThemeToggle />
          </div>
          <div className="pt-4 flex flex-col space-y-3">
            <button
              onClick={() => navigate('/auth/login')}
              className="px-4 cursor-pointer py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/auth/register')}
              className="px-4 py-2 cursor-pointer rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
