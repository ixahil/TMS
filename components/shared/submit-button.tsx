"use client";

import { useFormState } from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton({
  label = "Submit",
  className,
  disabled = false,
}: {
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  const { isSubmitting } = useFormState();
  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
      className={`${className} ${
        disabled &&
        "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"
      }`}
    >
      {isSubmitting ? <Loader2 className="animate-spin" /> : label}
    </Button>
  );
}
