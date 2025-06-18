"use client";

import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { AppSidebar } from "@/components/layouts/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Loader } from "@/components/ui/loader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { agentMenu } from "@/configs/agents";
import { useUser } from "@/lib/api/useUser";
import { useParams, useRouter } from "next/navigation";
import { ReactNode, Suspense, useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { isError, isLoading, user } = useUser(params.id);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isError) {
      router.replace("/agent/login");
    } else if (!isLoading && !isError) {
      setReady(true);
    }
  }, [isError, isLoading, user, router]);

  if (!ready || isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider
          suppressHydrationWarning
          defaultOpen={true}
          // style={{
          //   "--sidebar-width": "16rem",
          //   "--sidebar-width-mobile": "20rem",
          // }}
        >
          <AppSidebar menu={agentMenu} />
          <div className={"w-full h-full"}>
            <Header />

            <main
              className={
                "w-full min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300"
              }
            >
              {children}
            </main>
            <footer className={"ease-in-out duration-300"}>
              <Footer />
            </footer>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default DashboardLayout;
