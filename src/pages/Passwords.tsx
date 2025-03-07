import { useState } from "react";
import { usePasswordApi } from "../hooks/usePasswordApi";
import { useAlert } from "../context/AlertContext";
import NewPasswordOverlay from "../components/overlays/NewPasswordOverlay";
import { useEffect } from "react";

import { Password } from "../types/ResponseTypes";

export default function PasswordsPage() {
  const { addAlert } = useAlert();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, loading, error } = usePasswordApi<Password[]>(
    `password/search?search_term=&page=${page}&page_size=${pageSize}`
  );

  const [showOverlay, setShowOverlay] = useState(false);

  const handleAddPassword = (service: string, password: string) => {
    console.log("New password submitted:", service, password);
    setShowOverlay(false);
  };

  return (
    <>
      <section className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-4xl p-6">Passwords</h1>
        <div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setShowOverlay(true)}
          >
            New Password
          </button>
        </div>
      </section>

      {showOverlay && (
        <NewPasswordOverlay
          onClose={() => setShowOverlay(false)}
          onSubmit={handleAddPassword}
        />
      )}

      <div className="flex flex-col items-center">
        {loading && <p>Loading passwords...</p>}
        {error && <p className="text-red-500">Error loading passwords.</p>}

        {!loading && !error && data && (
          <>
            <ul className="list-disc">
              {data.map((password, index) => (
                <li key={index} className="py-1">
                  {password.service}
                </li>
              ))}
            </ul>

            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                disabled={data.length < pageSize}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
