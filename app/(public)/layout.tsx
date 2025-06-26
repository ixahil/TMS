import { Poppins } from "next/font/google";
import React, { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/public/header";
import SiteFooter from "@/components/layout/public/footer";

const poppins = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type Props = {
  children: ReactNode;
};

const PublicLayout = (props: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${poppins.variable} antialiased`}>
        <SiteHeader />
        <main className="flex-1 min-h-screen">{props.children}</main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
};

export default PublicLayout;
