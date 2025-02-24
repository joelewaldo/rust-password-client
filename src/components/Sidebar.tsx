import { useState } from "react";
import { Bell, Lock, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeSwitcherMini from "./ThemeSwitcherMini";

import { useAlert } from "../context/AlertContext";
import { usePageManager } from "../context/PageManager";

export default function Sidebar() {
  const { addAlert } = useAlert();
  const { switchPage } = usePageManager();
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
            <li
              className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => switchPage("password")}
            >
              <Lock />
              {isExpanded && <span>Passwords</span>}
            </li>
            <li
              className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => switchPage("alert")}
            >
              <Bell />
              {isExpanded && <span>Alerts</span>}
            </li>
            <li
              className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => switchPage("settings")}
            >
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
