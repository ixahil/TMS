"use client";

import { AppBreadcrumb } from "@/components/shared/breadcrumb";
import { Modal } from "@/components/shared/modal/modal";
import { OTPStep } from "@/components/shared/otp-step";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/lib/api/useUser";
import { useParams } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

export function Header() {
  const params = useParams<{ id: string }>();

  const { user } = useUser(params.id);
  return (
    <header className="sticky h-16 top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-4">
          <SidebarTrigger />
          <AppBreadcrumb />
        </div>
        <div className="space-y-1 text-center pt-4 pb-2">
          <h2>Welcome {user.name}</h2>
          {!user.isEmailVerified && (
            <div className="flex gap-2 items-center">
              <p className="text-destructive">
                Your email is not verified, please verify here{" "}
              </p>
              <Modal title="Verify OTP">
                <OTPStep email={user.email} />
              </Modal>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
