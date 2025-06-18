"use client";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAgent } from "@/lib/api/mutations/agent";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import SectionLayout from "../../_components/layouts/section-layout";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    const response = registerAgent({ email, password, name });

    const { error } = await response;

    if (error) {
      toast(error);
      setError(error);
    } else {
      toast("Registered Successfully");
      router.push(`/agents/login`);
    }
  };

  return (
    <SectionLayout>
      <form className="space-y-4 min-w-96 w-96 mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input placeholder="name" id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input placeholder="email" id="email" name="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="password"
            id="password"
            name="password"
            required
          />
        </div>
        {error && (
          <div className="text-sm">
            <span className="text-destructive ">* {error}</span>
          </div>
        )}
        <Button disabled className="w-full">
          Submit
        </Button>
        {/* <SubmitButton className="w-full" /> */}
        <div className="flex justify-between">
          <Link href={"/login"} className="flex gap-2">
            <MoveLeft />
            <span>Already have an Account?</span>
          </Link>
          <Link href={"/agents/login"} className="flex gap-2">
            <span>Are you an agent?</span>
          </Link>
        </div>
      </form>
    </SectionLayout>
  );
};

export default RegisterPage;
