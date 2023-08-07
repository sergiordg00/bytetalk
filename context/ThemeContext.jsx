"use client";

import { createContext, useContext, useEffect,  useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme); /* For portals */
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* 
        This div is necessary because due to server components being rendered on the server (no localStorage) 
        i need to be able to set the theme on render phase. But i also need to add it to body later (client side) for portals 
      */}
      
      <div className="h-full w-full" data-theme={theme}>
        {children}
      </div>
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