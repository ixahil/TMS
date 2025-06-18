"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { MediaModal } from "../modal/media-modal";

const ProfileImageUploader = ({ label }: { label: string }) => {
  const { watch } = useFormContext();

  const image = watch("profile");
  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {image && (
        <Image
          src={Array.isArray(image) ? image[0] : image}
          alt="profile image"
          width={100}
          height={100}
        />
      )}
      <MediaModal
        name="profile"
        label="Profile Image"
        multiple={false}
        modalTitle="Select Profile Image"
      />
    </div>
  );
};

export default ProfileImageUploader;
