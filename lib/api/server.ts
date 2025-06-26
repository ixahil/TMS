import { ITour } from "@/types";

export async function getTour(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/tours/${id}`);

  if (!res.ok) {
    return { data: null, error: `HTTP error: ${res.status}` };
  }

  const json = await res.json();

  const tour = json?.data?.tour as ITour | undefined;

  if (!tour) {
    return { data: null, error: "Tour is missing in response." };
  }

  return { data: { tour }, error: null };
}
