"use client";
import FormField from "@/components/shared/form-input";
import { SubmitButton } from "@/components/shared/submit-button";
import { post } from "@/lib/api/mutations";
import { registerSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { OTPStep } from "@/components/shared/otp-step";

const Register = () => {
  const [email, setEmail] = useState("");
  const form = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: registerSchema) => {
    const { data, error } = await post("/api/v1/auth/admin/register", formData);
    if (error) {
      form.setError("root", {
        type: "value",
        message: error.message,
      });
      toast.error(error.message);
    } else {
      setEmail(data.email);
      toast.success("Register Successfull, please verify");
    }
  };

  return (
    <>
      {form.formState.isSubmitSuccessful ? (
        <OTPStep email={email} />
      ) : (
        <FormProvider {...form}>
          <form
            className="space-y-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField name="name" label="Name" type="text" />
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />
            {form.formState.errors.root && (
              <div className="mt-2 text-destructive text-sm">
                * {form.formState.errors.root.message}
              </div>
            )}
            <SubmitButton className="w-full" />
            <div className="flex justify-between">
              <Link href={"/admin/login"} className="flex gap-2">
                <MoveLeft />
                <span>Login</span>
              </Link>
              <Link href={"/"} className="flex gap-2">
                <span>Are you an User?</span>
              </Link>
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default Register;
