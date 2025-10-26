'use client';

import Navbar from '../../components/layout/Navbar';
import { LogIn, Apple } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { axiosBackend } from '../../utils/api';
import Cookies from 'js-cookie';

const LoginCard = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || !form.email || !form.password) return;

    setLoading(true);
    const toastId = toast.loading('Logging in...', {
      id: 'login',
      duration: Infinity,
    });

    try {
      const { data } = await axiosBackend.post('/users/login', form);

      if (data?.success) {
        const cookieOptions = { expires: 1 };
        Cookies.set('access_token', data.accessToken, cookieOptions);
        Cookies.set('name', data.name, cookieOptions);
        Cookies.set('refresh_token', data.refreshToken, cookieOptions);
        Cookies.set('email', data.email, cookieOptions);

        toast.success('Successfully logged in!', {
          id: toastId,
          duration: 4000,
        });
        navigate('/showcase');
      } else {
        toast.error(data?.message || 'Login failed', {
          id: toastId,
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(`Something went wrong. ${error}`, {
        id: toastId,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !form.email || !form.password;

  return (
    <div className="w-full max-w-md bg-white/10 dark:bg-zinc-900/10 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10">
      {/* Welcome back header */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
        <LogIn className="h-5 w-5" />
        <span className="text-sm">Login.</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        A lifetime of impact.
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username/Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent transition-all"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent transition-all"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right -mt-3">
          <a
            href="#"
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isDisabled
              ? 'bg-purple-300/20 text-purple-500/60 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 shadow-lg hover:shadow-xl cursor-pointer'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-zinc-700"></div>
          </div>
          <div className="relative bg-white dark:bg-zinc-900 px-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          type="button"
          onClick={() => navigate('/auth/register')}
          className="w-full cursor-pointer py-3 rounded-xl font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-purple-200 dark:border-purple-800 transition-all duration-200"
        >
          Sign Up
        </button>
      </form>

      {/* Terms and Privacy */}
      <p className="text-xs text-center mt-6 text-gray-500 dark:text-gray-400">
        By joining, you agree to our{' '}
        <a
          href="#"
          className="text-purple-600 dark:text-purple-400 hover:underline"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="#"
          className="text-purple-600 dark:text-purple-400 hover:underline"
        >
          Privacy
        </a>
      </p>
    </div>
  );
};

export const LoginPage = () => (
  <div
    className="min-h-screen bg-cover bg-center bg-no-repeat bg-white dark:bg-zinc-900 flex flex-col"
    style={{ backgroundImage: 'url(/assets/bg/background.png)' }}
  >
    <Navbar showMenu={false} showMenuMobile={false} />
    <div className="flex-1 flex items-center justify-center p-4">
      <LoginCard />
    </div>
    <footer className="py-4 text-center">
      <p className="text-sm text-purple-500 leading-relaxed">
        &copy; Engramind 2025
      </p>
    </footer>
  </div>
);
