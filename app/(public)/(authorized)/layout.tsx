"use client";
import { Loader } from "@/components/ui/loader";
import { useUserWithoutId } from "@/lib/api/useUser";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const AuthorizedLayout = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false);

  const { isError, isLoading, user } = useUserWithoutId();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.replace("/login");
    } else if (!isLoading && !isError) {
      setReady(true);
    }
  }, [isError, isLoading, user, router]);

  if (!ready || isLoading) {
    return <Loader />;
  }

  return children;
};

export default AuthorizedLayout;
