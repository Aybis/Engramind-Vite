export function useTheme() {
  const getSystemPreference = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const currentTheme = localStorage.getItem('theme');

    // If currently following system, switch to manual mode
    if (currentTheme === 'system' || !currentTheme) {
      const systemPrefersDark = getSystemPreference();
      // Toggle opposite of system preference
      if (systemPrefersDark) {
        localStorage.setItem('theme', 'light');
        applyTheme(false);
      } else {
        localStorage.setItem('theme', 'dark');
        applyTheme(true);
      }
    } else if (currentTheme === 'dark') {
      localStorage.setItem('theme', 'light');
      applyTheme(false);
    } else {
      localStorage.setItem('theme', 'dark');
      applyTheme(true);
    }
  };

  const setInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    const systemPrefersDark = getSystemPreference();

    // Priority: 1. System preference, 2. User override via localStorage
    if (!stored || stored === 'system') {
      // Follow system preference
      localStorage.setItem('theme', 'system');
      applyTheme(systemPrefersDark);
    } else if (stored === 'dark') {
      applyTheme(true);
    } else if (stored === 'light') {
      applyTheme(false);
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem('theme');
      // Only apply system preference if user hasn't manually overridden
      if (currentTheme === 'system' || !currentTheme) {
        applyTheme(e.matches);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
  };

  const theme = () => {
    return localStorage.getItem('theme');
  };

  return { toggleTheme, setInitialTheme, theme };
}
