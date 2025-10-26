import { LogOut, X } from 'lucide-react';

interface Props {
  handleLogout: () => void;
  setShowConfirm: (val: boolean) => void;
}

export const LogoutForm = ({ handleLogout, setShowConfirm }: Props) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-full">
          <LogOut
            className="w-10 h-10 text-red-600 dark:text-red-500"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white text-center">
        Logout Confirmation
      </h3>

      {/* Message */}
      <p className="text-sm mb-6 text-gray-600 dark:text-gray-400 text-center leading-relaxed">
        Are you sure you want to logout? You will need to sign in again to
        access your account.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowConfirm(false)}
          className="flex-1 px-5 py-2.5 cursor-pointer bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 font-medium border border-gray-300 dark:border-zinc-600 flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="flex-1 px-5 py-2.5 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};
