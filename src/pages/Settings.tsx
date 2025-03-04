import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useAlert } from "../context/AlertContext";

export default function SettingsPage() {
  const [dbUrl, setDbUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [testLoading, setTestLoading] = useState(false);
  const { addAlert } = useAlert();

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
      addAlert("Database URL Saved!");
    } catch (error) {
      console.error("Failed to save DB URL:", error);
      addAlert("Failed to save Database URL.");
    }
    setLoading(false);
  }

  async function testDbUrl() {
    setTestLoading(true);
    setTestStatus("idle");
    try {
      const apiBaseUrl = new URL(dbUrl.endsWith("/") ? dbUrl : `${dbUrl}/`);
      const response = await axios.get(`${apiBaseUrl.href}api/status`, {
        timeout: 5000,
      });

      if (response.status === 200 && response.data.healthy) {
        setTestStatus("success");
      } else {
        setTestStatus("error");
      }
    } catch (error) {
      console.error("DB URL test failed:", error);
      setTestStatus("error");
    }
    setTestLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Database URL
      </label>

      <div className="flex flex-col gap-2 sm:flex-row items-start sm:items-center">
        <input
          type="text"
          value={dbUrl}
          onChange={(e) => {
            setDbUrl(e.target.value);
            setTestStatus("idle");
          }}
          placeholder="Enter database URL"
          className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 flex-1 transition-all duration-300"
        />

        <button
          onClick={testDbUrl}
          disabled={testLoading || !dbUrl}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 w-full sm:w-auto"
        >
          {testLoading ? (
            <FaSpinner className="animate-spin text-lg" />
          ) : testStatus === "success" ? (
            "Success"
          ) : testStatus === "error" ? (
            "Error"
          ) : (
            "Test"
          )}
        </button>
      </div>

      <button
        onClick={saveDbUrl}
        disabled={loading || !dbUrl}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed w-full flex items-center justify-center transition-all duration-300"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
