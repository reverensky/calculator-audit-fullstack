import{ createContext, useContext, useEffect, useState } from "react";

// Define theme type
const ThemeContext = createContext();

/**
 * ThemeProvider wraps the app and provides theme context (light/dark)
 */
export const ThemeProvider = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme to the <html> tag on mount & when theme changes
  useEffect(() => {
    const root = document.documentElement;
    // Add or remove 'dark' class based on theme
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Persist theme in localStorage
    localStorage.setItem("theme", theme);
    setIsMounted(true);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!isMounted) {
    return null; // Prevent flicker during initial render
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

