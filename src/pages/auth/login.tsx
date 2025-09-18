"use client";

import Navbar from "../../components/layout/Navbar";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { axiosBackend } from "../../utils/api";
import Cookies from "js-cookie";

interface EmailInputProps {
  form: { email: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput = ({ form, handleChange }: EmailInputProps) => (
  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium mb-1 dark:text-zinc-200"
    >
      Your Email <span className="text-red-500">*</span>
    </label>
    <div className="flex gap-x-2 items-center border rounded-md px-3 py-2 mb-4 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600">
      <Mail className="text-zinc-600 h-4" />
      <input
        type="email"
        id="email"
        placeholder="ava.wright@gmail.com"
        className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white"
        value={form.email}
        onChange={handleChange}
      />
    </div>
    <label
      htmlFor="password"
      className="block text-sm font-medium mb-1 dark:text-zinc-200"
    >
      Your Password <span className="text-red-500">*</span>
    </label>
    <div className="flex items-center border rounded-md px-3 py-2 mb-4 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600">
      <input
        type="password"
        id="password"
        placeholder="********"
        className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white"
        value={form.password}
        onChange={handleChange}
      />
    </div>
  </div>
);

const GoogleButton = () => (
  <button
    type="button"
    className="w-full border cursor-pointer border-zinc-300 dark:border-zinc-600 py-2 rounded-md flex justify-center items-center text-sm font-medium text-gray-700 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
  >
    <img
      src="/assets/google-icon.webp"
      alt="Google"
      width={20}
      height={20}
      className="w-5 h-5 mr-2"
    />
    Continue with Google
  </button>
);

const TermsAndPrivacy = () => (
  <p className="text-xs text-center mt-4 text-zinc-500 dark:text-zinc-400">
    By joining, you agree to our{" "}
    <span className="text-purple-600 hover:underline">Terms of Service</span>{" "}
    and <span className="text-purple-600 hover:underline">Privacy</span>
  </p>
);

const LoginCard = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    const toastId = toast.loading(`Logging in...`, {
      id: "login",
      duration: Infinity,
    });
    try {
      const response = await axiosBackend.post("/users/login", {
        email: form.email,
        password: form.password,
      });
      const result = response.data;
      if (result?.success) {
        Cookies.set("access_token", result?.accessToken, { expires: 1 });
        Cookies.set("name", result?.name, { expires: 1 });
        Cookies.set("refresh_token", result?.refreshToken, { expires: 1 });
        Cookies.set("email", result?.email, { expires: 1 });
        toast.success(`Successfully logged in!`, {
          id: toastId,
          duration: 4000,
        });
        navigate("/showcase");
      } else {
        toast.error(result?.message, {
          id: toastId,
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error(`Something went wrong. ${error?.toString()}`, {
        id: toastId,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mt-[75px] md:mt-0 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        <span className="">One sign-up.</span>
        <br />
        <span className="">A lifetime of impact.</span>
      </h1>
      <EmailInput form={form} handleChange={handleChange} />
      <button
        onClick={handleLogin}
        disabled={loading || !form?.email || !form?.password}
        className="w-full bg-purple-500 cursor-pointer hover:bg-purple-600 text-white font-semibold py-2 rounded-md mb-4 transition text-center"
      >
        {loading ? "Logging in..." : "Continue"}
      </button>
      <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        Or continue with your preferred provider
      </div>
      <GoogleButton />
      <TermsAndPrivacy />
    </div>
  );
};

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-800 font-sans">
      <Navbar showMenu={false} />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <LoginCard />
      </div>
    </div>
  );
};
