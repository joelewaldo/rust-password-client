import { useState } from "react";
import { usePasswordApi } from "../hooks/usePasswordApi";
import { useAlert } from "../context/AlertContext";
import { useEffect } from "react";

import { Password } from "../types/ResponseTypes";

export default function PasswordsPage() {
  const { addAlert } = useAlert();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, loading, error } = usePasswordApi<Password[]>(
    `password/search?search_term=&page=${page}&page_size=${pageSize}`
  );

  //   useEffect(() => {
  //     if (error) {
  //       addAlert("Failed to fetch passwords. Please try again.");
  //       console.error(error);
  //     }
  //   }, [error, addAlert]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-4xl p-6">Passwords</h1>

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
  );
}
