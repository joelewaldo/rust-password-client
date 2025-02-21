import { useState } from "react";
import { Lock, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeSwitcherMini from "./ThemeSwitcherMini";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex">
      <div
        className={`h-screen bg-gray-800 dark:bg-gray-950 text-white p-4 transition-all duration-300 flex flex-col justify-between $ {
          isExpanded ? "w-64" : "w-16"
        }`}
      >
        <div>
          <button
            className="mb-4 flex items-center cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
          <ul>
            <li className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Lock />
              {isExpanded && <span>Passwords</span>}
            </li>
            <li className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded cursor-pointer">
              <Settings />
              {isExpanded && <span>Settings</span>}
            </li>
          </ul>
        </div>
        <div>
          {isExpanded && <ThemeSwitcher />}
          {!isExpanded && <ThemeSwitcherMini />}
        </div>
      </div>
    </div>
  );
}
