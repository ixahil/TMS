"use client";
import { CommonFormTypes } from "@/config/forms-data";
import { FormElemRenderer } from "@/utils/formElementRenderer";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";

type Props = {
  formControls: CommonFormTypes[];
};

const CommonForm = ({ formControls }: Props) => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-4 w-full">
        {formControls.map((formElem) => (
          <FormElemRenderer key={formElem.name} elem={formElem} />
        ))}
      </form>
    </Form>
  );
};

export default CommonForm;
