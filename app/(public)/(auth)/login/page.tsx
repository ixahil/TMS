"use client";
import FormField from "@/components/shared/form-input";
import { SubmitButton } from "@/components/shared/submit-button";
import { post } from "@/lib/api/mutations";
import { loginSchema, LoginSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { mutate } from "swr";

const Login = () => {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginSchema) => {
    const { data, error } = await post("/api/v1/auth/users/login", formData);
    if (error) {
      form.setError("root", {
        type: "value",
        message: error.message,
      });
      toast.error(error.message);
    } else {
      mutate(`/api/v1/users/${data.user._id}`, data.user, false);
      mutate(`/api/v1/users/me`, data.user, false);
      toast.success(`Welcome ${data.user.name}`);
      router.push(`/`);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name="email" label="Email" type="email" />
        <FormField name="password" label="Password" type="password" />
        {form.formState.errors.root && (
          <div className="mt-2 text-destructive text-sm">
            * {form.formState.errors.root.message}
          </div>
        )}
        <SubmitButton className="w-full" />
        <div className="flex justify-between">
          <Link href={"/register"} className="flex gap-2">
            <MoveLeft />
            <span>Signup</span>
          </Link>
          <Link href={"/agent/login"} className="flex gap-2">
            <span>Are you an Agent?</span>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default Login;
