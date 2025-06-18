"use client";
import { useFormContext } from "react-hook-form";
import { useState, useRef } from "react";
import Image from "next/image";
import { Trash, Edit } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const MultiImageUploader = ({
  name,
  label,
  required,
}: {
  name: string;
  label: string;
  required: boolean;
}) => {
  const { setValue, getValues, formState } = useFormContext();
  const initialValues = getValues("images");
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);

  const [localFiles, setLocalFiles] = useState<(File | string)[]>(
    Array.isArray(initialValues)
      ? [...initialValues]
      : initialValues
      ? [initialValues]
      : []
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      const updatedFiles = [...localFiles, ...newFiles];
      setValue(name, updatedFiles);
      setLocalFiles(updatedFiles);
    }
  };

  const handleRemove = (file: File | string) => {
    const updatedFiles = localFiles.filter((f) => f !== file);
    setLocalFiles(updatedFiles);
    setValue(name, updatedFiles);

    if (typeof file === "string") {
      setRemovedFiles((prevRemovedFiles) => [...prevRemovedFiles, file]);

      setValue("removedImages", [...removedFiles, file]);
    }
  };

  const handleEdit = (index: number) => {
    inputRef.current?.setAttribute("data-index", index.toString());
    inputRef.current?.click();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const index = Number(e.target.getAttribute("data-index"));
      const newFile = e.target.files[0];
      const updatedFiles = [...localFiles];
      const oldFile = updatedFiles[index];
      updatedFiles[index] = newFile; // Update with new file
      setLocalFiles(updatedFiles);
      setValue(name, updatedFiles); // Update form state
      if (typeof oldFile === "string") {
        setRemovedFiles((prevRemovedFiles) => [...prevRemovedFiles, oldFile]);
        setValue("removedImages", [...removedFiles, oldFile]);
      }
    }
  };

  return (
    <div className="space-y-4 w-full">
      {formState.errors && (
        <span>{formState?.errors[name]?.message as string}</span>
      )}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {localFiles.map((file, index) => {
          const imageUrl =
            file instanceof File ? URL.createObjectURL(file) : file;
          return (
            <div
              key={index}
              className="relative flex flex-col items-end w-40 h-40 rounded-lg overflow-hidden transition-transform transform hover:scale-105 border border-gray-300 shadow-lg"
            >
              <Image
                src={imageUrl}
                width={150}
                height={150}
                alt={`Product Image ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-1 right-1 flex space-x-2">
                <button
                  type="button"
                  aria-label={`Remove image ${index + 1}`}
                  onClick={() => handleRemove(file)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                >
                  <Trash className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label={`Edit image ${index + 1}`}
                  onClick={() => handleEdit(index)}
                  className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Label htmlFor={name} className="text-lg font-medium">
        {label}
      </Label>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleEditChange}
      />
      <Input
        type="file"
        className="hidden"
        multiple
        id={name}
        accept="image/*"
        required={required}
        onChange={handleAdd}
      />
      <Label
        htmlFor={name}
        className="flex cursor-pointer border-2 border-dashed border-gray-400 w-full h-24 rounded-xl items-center justify-center hover:border-gray-600 transition duration-200"
      >
        Upload Image
      </Label>
    </div>
  );
};

export default MultiImageUploader;
