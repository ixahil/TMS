"use client";

import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type InputType =
  | "text"
  | "tel"
  | "password"
  | "email"
  | "date"
  | "time"
  | "date"
  | "number";

interface Props<T extends FieldValues> {
  label: string;
  name: keyof T;
  type?: InputType;
}

const FormField = <T extends FieldValues>({
  label,
  name,
  type = "text",
}: Props<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="space-y-2">
      <Label className="font-bold" htmlFor={name as string}>
        {label}
      </Label>
      <Input type={type} id={name as string} {...register(name as Path<T>)} />
      {errors[name] && (
        <span className="mt-2 text-destructive text-sm">
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  );
};

export default FormField;
