import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

export const usePasswordApi = <T,>(
  route: string,
  options?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const api_base_url = new URL(await invoke<string>("get_db_url"));
        const response = await axios<T>(`${api_base_url}api/${route}`, options);
        setData(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route, options]);

  return { data, loading, error };
};
