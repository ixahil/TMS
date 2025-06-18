import { ContentLayout } from "@/components/layouts/content-layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postFormData } from "@/lib/api/mutations";
import { useQuery } from "@/lib/api/use-swr";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { Modal } from "./modal";
import { MediaData } from "@/types";
import { useParams } from "next/navigation";
import { useUser } from "@/lib/api/useUser";

type MediaModalProps = {
  name: string;
  label?: string;
  modalTitle?: string;
  multiple?: boolean;
};

export const MediaModal: React.FC<MediaModalProps> = ({
  name,
  label = "Upload Image",
  modalTitle = "Select or Upload media",
  multiple = true,
}) => {
  const params = useParams();
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { setValue, getValues } = useFormContext();

  const { user } = useUser(params.id as string);
  const selected: string[] = getValues(name) || [];

  const endpoint =
    user.role == "ADMIN" ? "/api/v1/admin/media" : "/api/v1/agents/media";

  const { data, isLoading, error } = useQuery<MediaData>(endpoint, endpoint);

  const images = data?.images || [];

  const uploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("No files selected");
      return;
    }

    setIsUploading(true);
    toast.loading("Uploading...", { id: "uploading" });

    const formData = new FormData();
    const newFiles = Array.from(selectedFiles);
    const previewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setLocalImages(previewUrls);

    newFiles.forEach((file) => formData.append("images", file));

    const { data: newData, error } = await postFormData(endpoint, formData);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Uploaded successfully!");
      mutate(
        endpoint,
        { images: [...(images ?? []), ...newData.images] },
        {
          optimisticData: true,
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        }
      );
      setLocalImages([]);
    }

    toast.dismiss("uploading");
    setIsUploading(false);
  };

  const toggleSelection = (thumbnail: string) => {
    const current = getValues(name) || [];
    const updated = current.includes(thumbnail)
      ? current.filter((t: string) => t !== thumbnail)
      : multiple
      ? [...current, thumbnail]
      : [thumbnail];
    setValue(name, updated);
  };

  return (
    <Modal title={modalTitle} className="w-full sm:max-w-4xl">
      <ContentLayout
        className="p-0 pt-0 pb-0 px-0 space-y-4 w-full max-w-full"
        error={error}
        isLoading={isLoading}
      >
        <div className="w-full">
          <Label
            htmlFor={`media-upload-${name}`}
            className="text-lg font-medium"
          >
            {label}
          </Label>
          <Input
            type="file"
            className="hidden"
            id={`media-upload-${name}`}
            multiple={multiple}
            accept="image/*"
            required
            onChange={uploadMedia}
            disabled={isUploading}
          />
          <Label
            htmlFor={`media-upload-${name}`}
            className={`flex cursor-pointer border-2 border-dashed border-gray-400 w-full h-24 rounded-xl items-center justify-center hover:border-gray-600 transition duration-200 ${
              isUploading && "cursor-not-allowed brightness-50"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </Label>
        </div>

        {localImages.length > 0 && (
          <div className="flex gap-4 flex-wrap items-center">
            {localImages.map((image, index) => (
              <div className="relative w-fit" key={image + index}>
                <Image
                  className="brightness-25"
                  src={image}
                  width={75}
                  height={75}
                  alt="Uploading"
                />
                <Loader2 className="animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4 flex-wrap items-center">
          {images.length > 0
            ? images.map((image) => {
                const isChecked = selected.includes(image.thumbnail);
                return (
                  <label
                    key={image.asset_id}
                    htmlFor={image._id}
                    className="relative"
                  >
                    <Image
                      src={image.thumbnail}
                      width={75}
                      height={75}
                      alt={image.filename}
                      className={isChecked ? "brightness-75" : ""}
                    />
                    <Checkbox
                      id={image._id}
                      checked={isChecked}
                      onCheckedChange={() => toggleSelection(image.thumbnail)}
                      className="absolute top-1 left-1 w-5 h-5 z-50"
                    />
                  </label>
                );
              })
            : !localImages.length && (
                <h4 className="text-center w-full">
                  No images uploaded. Upload above.
                </h4>
              )}
        </div>
      </ContentLayout>
    </Modal>
  );
};
