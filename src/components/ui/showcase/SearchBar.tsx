interface Props {
  title: string;
  showRoleOption?: boolean;
}

export const SearchBar = ({ showRoleOption = false, title }: Props) => (
  <div className="flex gap-3 w-full flex-wrap mb-6">
    <input
      type="text"
      placeholder={`Search ${title}...`}
      className="flex-1 px-4 py-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-xl border border-white/30 dark:border-zinc-700/50 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-600/50 focus:border-transparent transition-all shadow-sm"
    />
    {showRoleOption && (
      <select className="px-4 py-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-xl border border-white/30 dark:border-zinc-700/50 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-600/50 transition-all shadow-sm cursor-pointer">
        <option>Sort by Role</option>
      </select>
    )}
  </div>
);
