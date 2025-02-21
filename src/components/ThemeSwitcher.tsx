import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-4 p-2 rounded">
      <FaSun className="text-yellow-500 w-5 h-5" />
      <button
        onClick={toggleTheme}
        className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
          theme === "dark" ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`relative w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
      <FaMoon className="text-gray-700 dark:text-gray-400 w-5 h-5" />
    </div>
  );
}
