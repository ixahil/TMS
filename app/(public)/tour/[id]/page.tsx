import { notFound } from "next/navigation";
import { TourDetails } from "../../_components/tour-details";
import { getTour } from "@/lib/api/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TourPage({ params }: Props) {
  const { id } = await params;

  try {
    const { data, error } = await getTour(id);

    if (error) {
      notFound();
    }

    return data?.tour ? <TourDetails tour={data.tour} /> : null;
  } catch (error) {
    console.error("Error fetching tour:", error);
    notFound();
  }
}
