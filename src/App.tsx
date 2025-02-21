import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [key, setKey] = useState("");

  async function generateKey() {
    setKey(await invoke("generate_key"));
  }

  return (
    <div className="flex bg-gray-300 dark:bg-gray-900">
      <Sidebar />
      <main
        className={`flex flex-col items-center justify-center flex-1 min-h-screen ml-64 transition-all duration-300`}
      >
        <button
          className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-white opacity-100 focus:outline-none"
          onClick={generateKey}
        >
          Generate a key
        </button>
        <div className="text-center">
          <p>{key}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
