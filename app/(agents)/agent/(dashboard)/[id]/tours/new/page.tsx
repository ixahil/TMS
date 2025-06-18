"use client";

import { ContentLayout } from "@/components/layouts/content-layout";
import CommonForm from "@/components/shared/forms/form-component";
import { TourFormControls } from "@/configs/agents";
import { post } from "@/lib/api/mutations";
import { TourSchema, TourSchemaType } from "@/schema/tour";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { getTourValues } from "../../../../../../../lib/form-helper";

const AddTour = () => {
  const router = useRouter();
  const form = useForm<TourSchemaType>({
    resolver: zodResolver(TourSchema),
    defaultValues: getTourValues(),
  });

  const onSubmit = async (formData: TourSchemaType): Promise<void> => {
    toast.loading("Saving product...", { id: "saving" });

    const { error } = await post("/api/v1/agents/tours/new", formData);
    if (error) {
      toast.error(error.message);
      form.setError("root", {
        type: "validate",
        message: error.message,
      });
    } else {
      router.back();
      mutate("/api/v1/agents/tours");
    }
    toast.dismiss("saving");
  };

  return (
    <ContentLayout title="Add Tour" className="container mx-auto">
      {/* <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
       */}
      <FormProvider {...form}>
        <CommonForm onSubmit={onSubmit} formControls={TourFormControls} />
      </FormProvider>
    </ContentLayout>
  );
};

export default AddTour;
