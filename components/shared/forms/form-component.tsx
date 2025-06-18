"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FieldError, FieldValues, useFormContext } from "react-hook-form";
import { FormElemRenderer } from "./element-renderer";
import { CommonFormGroup } from "@/types";

type CommonFormProps<T extends FieldValues> = {
  formControls: CommonFormGroup;
  onSubmit: (values: T) => void | Promise<void>;
};

function CommonForm<T extends FieldValues>({
  formControls,
  onSubmit,
}: CommonFormProps<T>) {
  const { handleSubmit, formState } = useFormContext<T>();
  const router = useRouter();

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end items-center gap-4 sticky top-20">
        <Button type="button" variant={"outline"} onClick={() => router.back()}>
          Cancel
        </Button>
        <Button disabled={formState.isSubmitting || !formState.isDirty}>
          {formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </div>
      <div>
        <ul className="flex flex-col items-start gap-2">
          {Object.keys(formState.errors).map((key, index) => {
            const error = formState.errors[
              key as keyof typeof formState.errors
            ] as FieldError;

            return (
              <li
                key={index}
                className="text-destructive list-inside list-disc"
              >
                {error?.message ?? null}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid sm:grid-cols-8 gap-8">
        <div className="col-span-6 space-y-8">
          {formControls.left.map((formGroup) => (
            <InputGroupCard
              key={formGroup.groupLabel}
              label={formGroup.groupLabel}
            >
              {formGroup.items.map((elem, index) => (
                <FormElemRenderer key={index} elem={elem} />
              ))}
            </InputGroupCard>
          ))}
        </div>
        <div className="col-span-2 space-y-8">
          {formControls.right.map((formGroup) => (
            <InputGroupCard
              key={formGroup.groupLabel}
              label={formGroup.groupLabel}
            >
              {formGroup.items.map((elem, index) => (
                <FormElemRenderer key={index} elem={elem} />
              ))}
            </InputGroupCard>
          ))}
        </div>
      </div>
    </form>
  );
}

const InputGroupCard = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <div className="p-6 shadow-md border-2 rounded-lg bg-slate-50 dark:bg-[#09090B] flex flex-col items-start gap-4">
      <p>{label}</p>
      {children}
    </div>
  );
};

export default CommonForm;
