import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function SettingsPage() {
  const [dbUrl, setDbUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDbUrl() {
      try {
        const storedUrl = await invoke<string>("get_db_url");
        setDbUrl(storedUrl || "");
      } catch (error) {
        console.error("Failed to fetch DB URL:", error);
      }
    }

    fetchDbUrl();
  }, []);

  async function saveDbUrl() {
    setLoading(true);
    try {
      await invoke("set_db_url", { url: dbUrl });
    } catch (error) {
      console.error("Failed to save DB URL:", error);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Database URL
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={dbUrl}
          onChange={(e) => setDbUrl(e.target.value)}
          placeholder="Enter database URL"
          className={`border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 flex-1`}
        />
        <button
          onClick={saveDbUrl}
          disabled={loading}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
