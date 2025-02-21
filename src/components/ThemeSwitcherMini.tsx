import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitcherMini() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none hover:bg-gray-500 flex items-center gap-4 p-2 rounded cursor-pointer"
    >
      {theme === "light" ? (
        <FaMoon className="text-gray-700 dark:text-gray-400 w-5 h-5" />
      ) : (
        <FaSun className="text-yellow-500 w-5 h-5" />
      )}
    </button>
  );
}
