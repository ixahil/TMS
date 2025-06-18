import { mutate } from "swr";

export async function post(endpoint: string, data: unknown) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (res.status === 404) {
      return { data: null, error: { message: "404 route not found" } };
    }

    const resData = await res.json();
    if (res.ok) {
      return { data: resData.data, error: null };
    }
    return { data: null, error: resData };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Internal Error" } };
  }
}

export async function postFormData(endpoint: string, formData: FormData) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.status === 404) {
      return { data: null, error: { message: "404 route not found" } };
    }

    const resData = await res.json();
    if (res.ok) {
      return { data: resData.data, error: null };
    }
    return { data: null, error: resData };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Internal Error" } };
  }
}

export async function deleteRoute(endpoint: string) {
  try {
    const res = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.status === 404) {
      return { data: null, error: { message: "404 route not found" } };
    }

    const resData = await res.json();
    if (res.ok) {
      mutate("agents/tours");
      return { data: resData, error: null };
    }
    return { data: null, error: resData };
  } catch (error) {
    console.log(error);
    return { data: null, error: { message: "Internal Error" } };
  }
}
