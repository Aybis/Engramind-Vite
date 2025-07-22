import Header from "../../../../components/layout/Header";
import { Link } from "react-router-dom";

export const ThirdAIPage = () => {
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
          <p className="text-sm text-gray-700 dark:text-zinc-300 mb-6 max-w-sm mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id
            quam ac elit condimentum congue sit amet sit amet nisl.
          </p>

          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder=""
              className="w-full border border-zinc-300 dark:border-zinc-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none"
            />
            <div className="flex justify-between w-full">
              <Link
                to={"/auth/register/ai/second"}
                className="bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 font-medium text-sm px-4 py-2 rounded-md"
              >
                Previous
              </Link>
              <Link
                to={"/auth/register/ai/fourth"}
                className="bg-black text-white font-medium text-sm px-4 py-2 rounded-md"
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
