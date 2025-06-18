"use client";
import { MediaGallery } from "@/components/shared/image-uploaders/media-gallery";
import { useQuery } from "@/lib/api/use-swr";
import { MediaData } from "@/types";

const Gallery = () => {
  const { data, isLoading, error } = useQuery<MediaData>(
    `/api/v1/agents/media`,
    `/api/v1/agents/media`
  );
  return <MediaGallery data={data} isLoading={isLoading} error={error} />;
};

export default Gallery;
