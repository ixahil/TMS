"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { ContentLayout } from "@/components/layouts/content-layout";
import FormField from "@/components/shared/form-input";
import ProfileImageUploader from "@/components/shared/image-uploaders/profile-image-uploader";
import { SubmitButton } from "@/components/shared/submit-button";
import { post } from "@/lib/api/mutations";
import { useUser } from "@/lib/api/useUser";
import toast from "react-hot-toast";
import { mutate } from "swr";

const EditAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Number is required"),
  profile: z.any().optional(),
});

type EditAccountType = z.infer<typeof EditAccountSchema>;

const AccountPage = () => {
  const params = useParams<{ id: string }>();
  const { user, isLoading } = useUser(params.id);

  const form = useForm<EditAccountType>({
    resolver: zodResolver(EditAccountSchema),
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      profile: user.profile || "",
    },
  });

  const onSubmit = async (formData: EditAccountType) => {
    const { error, data } = await post(`/api/v1/users/update/${user._id}`, {
      name: formData.name,
      phone: formData.phone,
      profile: formData.profile[0],
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account updated");
      mutate(`/api/v1/users/${user._id}`, data);
    }
  };

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <ContentLayout title="Edit Account" className="max-w-xl mx-auto space-y-6">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <ProfileImageUploader label="Profile Image" />

          <FormField label="Name" name="name" />
          <FormField label="Phone" name="phone" type="number" />

          <SubmitButton label="Update" />
        </form>
      </FormProvider>
    </ContentLayout>
  );
};

export default AccountPage;
