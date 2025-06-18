"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { CommonFormItem } from "@/types";
import CountryCityStateSelect from "../Country-State-Select";
import ItineraryElement from "../ItineraryElement";
import MultiImageUploader from "../image-uploaders/multiple-image-uploader";
// import { Modal } from "../modal/modal";
// import { MediaGallery } from "../image-uploaders/media-gallery";
// import { Label } from "@/components/ui/label";
import ProfileImageUploader from "../image-uploaders/profile-image-uploader";
import { MediaElement } from "./media-component";

type FormElemRendererProps = {
  elem: CommonFormItem;
};

export const FormElemRenderer = ({ elem }: FormElemRendererProps) => {
  const {
    componentType,
    name,
    label,
    placeholder,
    disabled,
    required,
    type,
    multiple,
  } = elem;

  const { control, formState } = useFormContext();
  const nameKey = name;

  switch (componentType) {
    case "input":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    required={required}
                    disabled={disabled}
                  />
                </FormControl>
                {formState.errors[nameKey] && (
                  <FormMessage>
                    {formState?.errors[nameKey]?.message as string}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
      );

    case "checkbox":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="flex gap-2 items-centers justify-center space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    required={required}
                    disabled={disabled}
                    name={name}
                  />
                </FormControl>
                <FormLabel htmlFor={name}>{label}</FormLabel>

                {formState.errors[nameKey] && (
                  <FormMessage>
                    {formState?.errors[nameKey]?.message as string}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
      );

    case "number":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={placeholder}
                    type={type}
                    required={required}
                    disabled={disabled}
                    onChange={(e) => {
                      const value = e.target.value
                        ? Number(e.target.value)
                        : undefined; // Convert to number
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                {formState.errors[nameKey] && (
                  <FormMessage>
                    {formState?.errors[nameKey]?.message as string}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
      );

    case "textarea":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={placeholder}
                    {...field} // Use field to manage value
                    required={required}
                    disabled={disabled}
                  />
                </FormControl>
                {formState.errors[nameKey] && (
                  <FormMessage>
                    {formState?.errors[nameKey]?.message as string}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
      );

    case "select":
      return (
        <FormField
          control={control}
          name={nameKey}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={String(field.value)} // Ensure this is controlled
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {elem.options?.map((option) => (
                    <SelectItem key={option.handle} value={option.handle}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage>
                {formState?.errors[nameKey]?.message as string}
              </FormMessage>
            </FormItem>
          )}
        />
      );

    case "gallery":
      return <MediaElement />;

    case "media":
      return multiple ? (
        <MultiImageUploader name={name} label={label} required={required} />
      ) : (
        <ProfileImageUploader label={label} />
      );
    case "itinerary":
      return <ItineraryElement />;

    case "select-specified":
      return <CountryCityStateSelect />;

    default:
      return <>Not Implemented</>;
  }
};
