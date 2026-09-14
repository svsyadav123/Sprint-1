import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// Shared hook intentionally lives beside its provider so Settings can update the app-level theme.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("zeromindTheme");
    return ["light", "dark", "samaze"].includes(saved) ? saved : "light";
  });

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
    localStorage.setItem("zeromindTheme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
