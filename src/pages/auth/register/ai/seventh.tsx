import Header from "../../../../components/layout/Header";
import { Link } from "react-router-dom";

export const SeventhAIPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-800 font-sans  px-4">
      <Header />
      <section className="flex justify-center items-center min-h-[calc(100vh-64px)] pt-24">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-[32px] p-10 text-center max-w-xl w-full shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            All set! Time to dive in.
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            You’ll be redirected to your Memory Locker dashboard to start
            creating your core memories. If nothing happens,{" "}
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              click here
            </Link>
            .
          </p>
          <Link
            to="/auth/register/ai/sixth"
            className="text-sm text-zinc-500 underline hover:underline mb-4 inline-block"
          >
            Back
          </Link>
        </div>
      </section>
    </div>
  );
};
