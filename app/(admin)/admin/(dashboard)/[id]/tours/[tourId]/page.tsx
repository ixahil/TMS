"use client";

import { useQuery } from "@/lib/api/use-swr";
import { useParams } from "next/navigation";
import EditTour from "./edit-tour";
import { TourData } from "@/types";
import { ContentLayout } from "@/components/layout/dashboard/content-layout";

const EditTourPage = () => {
  const params = useParams<{ tourId: string }>();

  const { error, data, isLoading } = useQuery<TourData>(
    `/api/v1/tours/${params.tourId}`,
    `/api/v1/tours/${params.tourId}`
  );

  return (
    <ContentLayout
      title="Add Tour"
      className="container mx-auto"
      isLoading={isLoading}
      error={error}
    >
      {data && <EditTour tour={data.tour} />}
    </ContentLayout>
  );
};

export default EditTourPage;
