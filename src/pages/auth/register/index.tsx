"use client";

import Navbar from "../../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success) {
        navigate("/auth/register/ai");
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.log(error, "<<< error");
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-800 font-sans">
      {/* Navigation */}
      <Navbar showMenu={false} />
      <section className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            One sign-up.
            <br />A lifetime of impact.
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              id="name"
              label="Your Name"
              type="text"
              placeholder="Johnny Silverhand"
              required
              value={form.name}
              onChange={handleChange}
            />

            <InputField
              id="email"
              label="Your Email"
              type="email"
              placeholder="johnny@example.com"
              required
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              id="password"
              label="Your Password"
              type="password"
              placeholder="********"
              required
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-md transition text-center"
              disabled={loading}
            >
              {loading ? "Registering..." : "Continue"}
            </button>
          </form>

          <p className="text-xs text-center mt-4 text-zinc-500 dark:text-zinc-400">
            By joining, you agree to our{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Privacy
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

// Define the InputFieldProps interface
interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 dark:text-zinc-200"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full border border-zinc-300 dark:border-zinc-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
