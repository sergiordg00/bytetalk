"use client";

import { createContext, useContext, useEffect,  useState } from "react";

import useIsFirstRender from "@/hooks/useIsFirstRender";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // TODO: THE BEST WAY FOR THE THEME IS TO USE COOKIES SO THAT SERVER CAN RENDER IN THE CORRECT THEME. (we could init the body in layout.jsx and this state)
  const [theme, setTheme] = useState("light");
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    initThemeOnClient();
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      localStorage.setItem("theme", theme);
      document.body.setAttribute("data-theme", theme); 
    }
  }, [theme]);

  function initThemeOnClient() {
    const themeInitValue = localStorage.getItem("theme") || "light";

    document.body.setAttribute("data-theme", themeInitValue);
    setTheme(themeInitValue);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }

  return { theme, toggleTheme };
}