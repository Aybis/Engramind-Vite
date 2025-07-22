import Header from "../../../../components/layout/Header";
import { Mic } from "lucide-react";
import { Link } from "react-router-dom";

export const SecondAIPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-800 font-sans">
      <Header />
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            No pressure! this isn’t a test, just you being you.
          </h1>

          <div className="flex justify-center mb-6">
            <img
              src="/assets/oc-project-development.svg"
              alt="Growing Illustration"
              width={240}
              height={240}
            />
          </div>

          <p className="text-xs text-zinc-500 mb-1">Question 1/20</p>
          <p className="text-sm text-gray-700 dark:text-zinc-300 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id
            quam ac elit condimentum congue sit amet sit amet nisl.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-white p-4 rounded-full">
              <Mic className="h-8 w-8" />
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-md overflow-hidden">
                <div className="h-full w-1/3 bg-zinc-900 dark:bg-white transition-all duration-300" />
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                10db
              </span>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link
              to={"/auth/register/ai"}
              className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-zinc-700 transition"
            >
              Previous
            </Link>
            <Link
              to={"/auth/register/ai/third"}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
