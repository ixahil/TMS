import { IUser } from "@/types";
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

export function useUser(id: string) {
  const { data, error, isLoading } = useSWR(
    `/api/v1/users/${id}`,
    () => fetcher<IUser>(`/api/v1/users/${id}`),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  return {
    user: data as IUser,
    isLoading,
    isError: error,
  };
}

export function useUserWithoutId() {
  const { data, error, isLoading } = useSWR(
    `/api/v1/users/me`,
    () => fetcher<IUser>(`/api/v1/users/me`),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  return {
    user: data as IUser,
    isLoading,
    isError: error,
  };
}
