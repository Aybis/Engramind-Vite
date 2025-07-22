import Header from "../../../../components/layout/Header";
import { Link } from "react-router-dom";

export const FirstAIPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-800 font-sans">
      <Header />

      <section className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Time to Build Your AI
            <br />
            Personality!
          </h1>

          <div className="flex justify-center mb-6">
            <img
              src="/assets/oc-growing.png"
              alt="AI personality setup"
              className="w-64 h-64"
              width={256}
              height={256}
            />
          </div>

          <p className="text-sm text-gray-700 dark:text-zinc-300 mb-6">
            Let’s get to know you! We’ll ask a few questions to shape your AI
            personality.
            <br />
            Your voice will also be recorded so the locker can sound just like
            you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={"/auth/register"}
              className="bg-white border border-zinc-300 dark:border-zinc-600 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            >
              Use Default AI Voice
            </Link>
            <Link
              to={"/auth/register/ai/second"}
              className="bg-zinc-800 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              Customize with My Voice
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
