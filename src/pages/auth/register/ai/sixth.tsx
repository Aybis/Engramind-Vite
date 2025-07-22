import Header from "../../../../components/layout/Header";
import { Mic } from "lucide-react";
import { Link } from "react-router-dom";

export const SixthAIPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-800 font-sans">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 pt-32">
        {/* Left panel */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-4">
            Get a feel for your AI self!
          </h1>
          <img
            src="/assets/oc-thinking.png"
            alt="AI Thinking"
            width={200}
            height={200}
            className="mb-4"
          />
          <p className="text-sm font-medium text-zinc-500 mb-2">
            Your Personality Type
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              "Empathetic",
              "Strategic Thinker",
              "Detail Oriented",
              "Leader",
              "Creative",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-purple-100 text-purple-600 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="bg-purple-100 p-4 rounded-full mb-2 text-purple-600">
            <Mic className="h-8 w-8" />
          </div>
          <div className="w-full flex items-center gap-2 px-6">
            <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-md overflow-hidden">
              <div className="h-full w-1/3 bg-zinc-900 dark:bg-white transition-all duration-300" />
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              10db
            </span>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm p-4">
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px]">
            <div className="flex justify-start items-start gap-2">
              <img
                src="/assets/oc-thinking.png"
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="bg-zinc-200 dark:bg-zinc-700 text-sm text-zinc-900 dark:text-white px-4 py-2 rounded-xl max-w-[80%]">
                <p className="font-semibold mb-1">Hey there!</p>
                <p>Classic start — what’s cookin’?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white px-4 py-2 rounded-xl max-w-[80%]">
                Hello Nico!
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white px-4 py-2 rounded-xl max-w-[80%]">
                I’m you, don’t you remember
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white px-4 py-2 rounded-xl max-w-[80%]">
                I just made you 5 minutes ago…
              </div>
            </div>
            <div className="flex justify-start">
              <div className="flex justify-start items-start gap-2">
                <img
                  src="/assets/oc-thinking.png"
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="bg-zinc-200 dark:bg-zinc-700 text-sm text-zinc-900 dark:text-white px-4 py-2 rounded-xl max-w-[80%]">
                  <p className=" mb-1">
                    Well yeah, you are right! I’m your digital twin!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat input and actions */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask a thing or two!"
                className="w-full border border-zinc-300 dark:border-zinc-600 rounded-md px-4 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white pr-10"
              />
              <button className="absolute right-2 top-2.5 text-purple-600">
                <Mic className="h-4" />
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <Link
                to="/auth/register/ai/fifth"
                className="bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-md"
              >
                Back
              </Link>
              <Link
                to="/auth/register/ai/seventh"
                className="bg-black text-white text-sm font-medium px-4 py-2 rounded-md"
              >
                Save & Finish Setup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
