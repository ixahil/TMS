import axios from "axios";
import useSWR from "swr";

async function fetcher<T>(url: string): Promise<T> {
  try {
    const res = await axios.get(url);

    const contentType = res.headers["content-type"];
    if (contentType && !contentType.includes("application/json")) {
      throw new Error("Unexpected content type: " + contentType);
    }
    return res.data.data;
  } catch (err: unknown) {
    const isAxiosErr = axios.isAxiosError(err);
    const serverMessage = isAxiosErr ? err.response?.data?.message : null;

    throw new Error(serverMessage || "Unexpected error occurred");
  }
}

export function useQuery<T>(endpoint: string, key: string) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    key,
    () => fetcher<T>(endpoint),
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isLoading,
    error: error?.message || "",
    mutate,
  };
}
