import { Palette, Zap } from 'lucide-react';
import { useState } from 'react';
import { Category } from '../../../utils/helper';

interface Props {
  onClose: () => void;
  onChooseMode: (mode: Category) => void;
}

export const CreationMode = ({ onClose, onChooseMode }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Select Creation Mode
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        Select how you would like to create your scenario
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div
          onClick={() => {
            setSelectedCategory(Category.Quick);
          }}
          className={`border-2 transition-all rounded-xl p-6 cursor-pointer ${
            selectedCategory === Category.Quick
              ? 'border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-purple-950/20'
              : 'border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-gray-300 dark:hover:border-zinc-600'
          }`}
        >
          <div className="flex items-start gap-3">
            <Zap
              className={`w-5 h-5 mt-0.5 ${
                selectedCategory === Category.Quick
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-1">
                Quick Creation
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                One step to creation
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setSelectedCategory(Category.Advanced)}
          className={`border-2 transition-all rounded-xl p-6 cursor-pointer ${
            selectedCategory === Category.Advanced
              ? 'border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-purple-950/20'
              : 'border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-gray-300 dark:hover:border-zinc-600'
          }`}
        >
          <div className="flex items-start gap-3">
            <Palette
              className={`w-5 h-5 mt-0.5 ${
                selectedCategory === Category.Advanced
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-1">
                Advanced Creation
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Four steps to creation
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 cursor-pointer bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 font-medium border border-gray-300 dark:border-zinc-600"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (selectedCategory !== null) {
              onChooseMode(selectedCategory);
            }
          }}
          disabled={selectedCategory === null}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            selectedCategory !== null
              ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer shadow-md hover:shadow-lg'
              : 'bg-purple-300 dark:bg-purple-900/40 text-white cursor-not-allowed opacity-60'
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};
