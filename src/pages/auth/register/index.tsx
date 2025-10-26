'use client';

import Navbar from '../../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { axiosBackend } from '../../../utils/api';
import { toast } from 'sonner';
import { cleanErrorMessage } from '../../../utils/helper';
import { UserPlus } from 'lucide-react';

const INPUT_CLASS =
  'w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent transition-all';
const LABEL_CLASS =
  'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2';

const FormInput = ({
  id,
  type,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label htmlFor={id} className={LABEL_CLASS}>
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={INPUT_CLASS}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const RegisterCard = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || Object.values(form).some((v) => !v)) return;

    setLoading(true);
    const toastId = toast.loading('Registering...', {
      id: 'register',
      duration: Infinity,
    });

    try {
      const { data } = await axiosBackend.post('/users/register', {
        ...form,
        method: 'email-password',
      });

      if (data?.success) {
        toast.success('Successfully registered!', {
          id: toastId,
          duration: 4000,
        });
        navigate('/auth/login');
      } else {
        toast.error(cleanErrorMessage(data?.message) || 'Registration failed', {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const isDisabled = loading || Object.values(form).some((v) => !v);

  return (
    <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/50 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
        <UserPlus className="w-5 h-5" />
        <span className="text-sm">Create an account</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="name"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
        />
        <FormInput
          id="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />
        <FormInput
          id="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
            isDisabled
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
          </span>
          <button
            type="button"
            onClick={() => navigate('/auth/login')}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
          >
            Sign In
          </button>
        </div>
      </form>

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

export const RegisterPage = () => (
  <div
    className="min-h-screen bg-cover bg-center bg-no-repeat bg-white dark:bg-zinc-900 flex flex-col"
    style={{ backgroundImage: 'url(/assets/bg/background.png)' }}
  >
    <Navbar showMenu={false} showMenuMobile={false} />
    <div className="flex-1 flex items-center justify-center p-4">
      <RegisterCard />
    </div>
    <footer className="py-4 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; Engramind 2025
      </p>
    </footer>
  </div>
);
