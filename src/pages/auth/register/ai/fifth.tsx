import Header from "../../../../components/layout/Header";
import { Link } from "react-router-dom";

export const FifthAIPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-800 font-sans">
      <Header />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 pt-24">
        <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm mb-24">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Meet your digital twin!
          </h1>

          <div className="flex justify-center mb-4">
            <img
              src="/assets/oc-thinking.png"
              alt="AI version"
              width={200}
              height={200}
            />
          </div>

          <p className="text-sm font-medium text-center text-zinc-500 mb-2">
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

          <div className="mb-6">
            <h2 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
              AI Description
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              You’re the type of AI that listens before speaking, always
              scanning the bigger picture, but never afraid to get into the
              weeds when precision matters. You approach decisions with empathy,
              but don’t shy away from bold innovation.
            </p>
          </div>

          {[
            "Family",
            "Friends",
            "Love Ones",
            "Hobby",
            "Interest",
            "Work-Life",
          ].map((section) => (
            <div className="mb-6" key={section}>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                {section}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                commodo egestas pretium. Curabitur et nulla eu arcu fermentum
                finibus sed non ipsum. Nulla at nisi vel quam ultricies volutpat
                sit amet viverra nunc. Praesent nec odio venenatis, commodo
                massa a, facilisis leo. Aliquam erat volutpat.
              </p>
            </div>
          ))}

          <div className="flex justify-between">
            <Link
              to="/auth/register/ai/fourth"
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md font-medium"
            >
              Reset Personality
            </Link>
            <Link
              to="/auth/register/ai/sixth"
              className="bg-black hover:bg-zinc-800 text-white text-sm px-4 py-2 rounded-md font-medium"
            >
              Try Personality
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
