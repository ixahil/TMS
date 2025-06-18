"use client";

import OtpInput from "@/components/shared/otp-input";
import { Button } from "@/components/ui/button";
import { post } from "@/lib/api/mutations";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

export function OTPStep({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCountDown, setResendCountDown] = useState(60);
  const [isOTPSend, setIsOTPSend] = useState(false);

  const handleComplete = (code: string) => {
    setOtp(code);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter OTP");

    setIsSubmitting(true);

    const { data, error } = await post("/api/v1/auth/verify", {
      otp,
      email,
    });

    if (error) {
      toast.error(error.message);
    } else {
      mutate(`/api/v1/users/${data.user._id}`, data.user);
      toast.success("Verification successful");
      router.push(`/${data.user.role.toLowerCase()}/${data.user._id}`);
    }

    setIsSubmitting(false);
  };

  const resendOTP = async () => {
    setIsOTPSend(true);
    setIsSubmitting(true);

    const { data, error } = await post("/api/v1/auth/resend-verification", {
      email,
    });

    if (error) {
      toast.error(error.message);
      setResendCountDown(0);
    } else {
      toast.success(data.message);
      setResendCountDown(60);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendCountDown > 0) {
      timer = setTimeout(() => setResendCountDown(resendCountDown - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [resendCountDown]);

  return (
    <div className="space-y-4">
      {!isOTPSend ? (
        <div className="w-full mx-auto text-center space-y-2">
          <h2>
            is your email correct? OTP will be send on this{" "}
            <span className="font-bold text-primary">{email}</span>
          </h2>
          <Button onClick={resendOTP}>Send OTP</Button>
        </div>
      ) : (
        <form
          className="flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-center">Enter OTP</h1>
            <OtpInput length={6} onComplete={handleComplete} />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
            <Button
              variant={"outline"}
              className="w-full"
              onClick={resendOTP}
              disabled={resendCountDown > 0}
            >
              Resend OTP {resendCountDown > 0 && resendCountDown}
            </Button>

            {isOTPSend && (
              <div>
                <h1 className="text-2xl font-semibold text-center text-green-500">
                  OTP Sent Successfully
                </h1>
                <p className="text-center">
                  Check your mail{" "}
                  <Link
                    href="https://mail.google.com/mail/u/0/#inbox"
                    target="_blank"
                    className="text-primary underline"
                  >
                    Mail
                  </Link>
                </p>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
