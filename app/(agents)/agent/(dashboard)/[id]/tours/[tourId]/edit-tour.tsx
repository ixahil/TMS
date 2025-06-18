import CommonForm from "@/components/shared/forms/form-component";
import { TourFormControls } from "@/configs/agents";
import { post } from "@/lib/api/mutations";
import { TourSchema, TourSchemaType } from "@/schema/tour";
import { ITour } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { getTourValues } from "../../../../../../../lib/form-helper";

const EditTour = ({ tour }: { tour: ITour }) => {
  const router = useRouter();

  const form = useForm<TourSchemaType>({
    resolver: zodResolver(TourSchema),
    defaultValues: getTourValues(tour),
  });

  const onSubmit = async (formData: TourSchemaType) => {
    if (!form.formState.isDirty) {
      toast.error("Product not edited");
      return;
    }

    toast.loading("Saving product...", { id: "saving" });

    const { error, data } = await post(
      `/api/v1/agents/tours/${tour._id}`,
      formData
    );
    if (error) {
      toast.error(error.message);
      form.setError("root", {
        type: "validate",
        message: error.message,
      });
    } else {
      mutate(`/api/v1/tours/${tour._id}`, data.tour);
      mutate(`/api/v1/agents/tours`);
      router.back();
    }

    toast.dismiss("saving");
  };

  return (
    <>
      {/* <pre>{JSON.stringify(form.getValues(), null, 2)}</pre> */}
      <FormProvider {...form}>
        <CommonForm onSubmit={onSubmit} formControls={TourFormControls} />
      </FormProvider>
    </>
  );
};

export default EditTour;
