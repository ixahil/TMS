import React from "react";
import { MediaModal } from "../modal/media-modal";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Trash } from "lucide-react";

export const MediaElement = () => {
  const { watch, setValue } = useFormContext();

  const images: string[] = watch("images");

  function handleRemove(image: string) {
    setValue(
      "images",
      images.filter((i: string) => i !== image)
    );
  }

  return (
    <div className="space-y-4">
      <MediaModal
        name="images"
        label="Images"
        modalTitle="Add or upload image"
        multiple={true}
      />
      <div className="flex gap-4 flex-wrap">
        {images.map((image: string, index: number) => {
          return (
            <div
              key={index}
              className="relative flex flex-col items-end w-40 h-40 rounded-lg overflow-hidden transition-transform transform hover:scale-105 border border-gray-300 shadow-lg"
            >
              <Image
                src={image}
                width={150}
                height={150}
                alt={`Product Image ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-1 right-1 flex space-x-2">
                <button
                  type="button"
                  aria-label={`Remove image ${index + 1}`}
                  onClick={() => handleRemove(image)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
