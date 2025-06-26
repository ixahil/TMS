"use client";

import { ContentLayout } from "@/components/layout/dashboard/content-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { post, postFormData } from "@/lib/api/mutations";
import { useUser } from "@/lib/api/useUser";
import { MediaData } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

export const MediaGallery = ({
  data,
  error,
  isLoading,
}: {
  data: MediaData | undefined;
  error: string;
  isLoading: boolean;
}) => {
  const params = useParams();
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { user } = useUser(params.id as string);

  const endpoint =
    user.role == "ADMIN" ? "/api/v1/admin/media" : "/api/v1/agents/media";

  const images = data?.images || [];

  const uploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles) {
      toast.error("No files selected");
      return;
    }

    setIsUploading(true);

    toast.loading("uploading...", { id: "uploading" });

    const formData = new FormData();
    const newFiles = Array.from(selectedFiles);
    const previewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setLocalImages(previewUrls);

    newFiles.forEach((file) => {
      formData.append("images", file);
    });

    const { data: newData, error } = await postFormData(endpoint, formData);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Uploaded successfully!");
      mutate(
        endpoint,
        { images: [...(data?.images ?? []), ...newData.images] },
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

  async function handleDelete() {
    setIsUploading(true);

    toast.loading("uploading...", { id: "uploading" });

    const { error } = await post(`${endpoint}/bulk-delete`, {
      images: selected,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("deleted successfully!");
      mutate(endpoint);
    }

    toast.dismiss("uploading");
    setIsUploading(false);
    setSelectMode(!selectMode);
    setSelected([]);
  }

  function setAllSelected(checked: boolean | "indeterminate") {
    if (checked === true) {
      const allIds = images.map((img) => img._id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  }

  return (
    <ContentLayout
      title="Media"
      className="space-y-6 p-8"
      error={error}
      isLoading={isLoading}
    >
      <div className="max-w-xl mx-auto">
        <Label htmlFor="images" className="text-lg font-medium">
          Media
        </Label>
        <Input
          type="file"
          className="hidden"
          multiple
          id="images"
          accept="image/*"
          required
          onChange={uploadMedia}
          disabled={isUploading}
        />
        <Label
          htmlFor="images"
          className={`flex cursor-pointer border-2 border-dashed border-gray-400 w-full h-24 rounded-xl items-center justify-center hover:border-gray-600 transition duration-200 ${
            isUploading && "cursor-not-allowed brightness-50"
          }`}
        >
          Upload Image
        </Label>
      </div>

      <div className="flex justify-start items-center gap-4 sticky top-20">
        {selectMode && (
          <Checkbox
            className="size-6"
            onCheckedChange={setAllSelected}
            checked={selected.length === images.length && images.length > 0}
          />
        )}
        <Button
          type="button"
          variant={"outline"}
          onClick={() => {
            setSelectMode((prev) => !prev);
            setSelected([]); // clear selected on toggle
          }}
        >
          {selectMode ? "Cancel" : "Select"}
        </Button>
        {selectMode && (
          <Button
            variant={"destructive"}
            type="button"
            onClick={handleDelete}
            disabled={selected.length === 0}
          >
            Delete
          </Button>
        )}
      </div>

      <div>
        {localImages.length > 0 ? (
          <div className="flex gap-4 flex-wrap items-center">
            {localImages.map((image, index) => (
              <div className="relative w-fit" key={image + index}>
                <Image
                  className="brightness-25"
                  src={image}
                  width={100}
                  height={100}
                  alt="Image-uploading"
                />
                <Loader2 className="animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex gap-4 flex-wrap items-center">
          {images && images.length > 0 ? (
            images.map((image) => {
              const isChecked = selected.includes(image._id);
              return (
                <label
                  key={image.asset_id}
                  htmlFor={image._id}
                  className="relative"
                >
                  <Image
                    src={image.thumbnail}
                    width={100}
                    height={100}
                    alt={image.filename}
                    className={selectMode && isChecked ? "brightness-75" : ""}
                  />
                  {selectMode && (
                    <Checkbox
                      id={image._id}
                      checked={isChecked}
                      onCheckedChange={() => {
                        setSelected((prev) =>
                          isChecked
                            ? prev.filter((id) => id !== image._id)
                            : [...prev, image._id]
                        );
                      }}
                      className="absolute top-1 left-1 w-5 h-5"
                    />
                  )}
                </label>
              );
            })
          ) : localImages.length == 0 ? (
            <h4 className="text-center">
              No images uploaded, upload the image above
            </h4>
          ) : null}
        </div>
      </div>
    </ContentLayout>
  );
};
