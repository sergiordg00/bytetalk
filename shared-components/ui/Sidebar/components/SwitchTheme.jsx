import clsx from "clsx";

import { useTheme } from "@/context/ThemeContext";

export default function SwitchTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={clsx(
        "relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full",
        theme === "dark" ? 'bg-fuchsia-500' : 'bg-gray-300'
      )}
    >
      <span className="sr-only">
        Toogle app theme
      </span>

      <span className={clsx(
        "inline-block h-4 w-4 rounded-full bg-white transition",
        theme === "dark" ? 'translate-x-7' : 'translate-x-1'
      )}/>
    </button>
  );
}