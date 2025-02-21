import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [key, setKey] = useState("");

  async function generateKey() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setKey(await invoke("generate_key"));
  }

  return (
    <main className="flex">
      <button
        className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-white opacity-100 focus:outline-none"
        onClick={() => generateKey()}
      >
        Generate a key
      </button>
      <p>{key}</p>
    </main>
  );
}

export default App;
