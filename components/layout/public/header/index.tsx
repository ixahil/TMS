"use client";
// import { CommandMenu } from "@/components/command-menu"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { MainNav } from "./main-nav";
import { useUserWithoutId } from "@/lib/api/useUser";
import { Loader } from "@/components/ui/loader";
import { mutate } from "swr";

// import { MobileNav } from "@/components/mobile-nav"
// import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 shadow-md border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-24 w-full px-16 items-center mx-auto justify-between">
        <MainNav />
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex w-fit items-center justify-between">
            {/* <Dialog>
              <DialogTrigger asChild>
                <CiSearch
                  size={30}
                  className="w-full cursor-pointer border-r-2 pr-4"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Search</DialogTitle>
                </DialogHeader>
                <SearchComponent />
              </DialogContent>
            </Dialog> */}
            <UserButtons />
            {/* <ThemeSwitcher /> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
const UserButtons = () => {
  const { user, isLoading } = useUserWithoutId();
  // const user = null;
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  const handleLogout = async () => {
    await fetch("/api/v1/users/logout", { credentials: "include" });
    mutate(`/api/v1/users/me`, null, false);

    router.push(`/`);
    router.refresh();
  };

  return user ? (
    <div className="flex divide-x divide-border">
      <div className="px-4 flex gap-2 flex-row-reverse">
        <Link href={"/user"} className="px-4 flex gap-2 flex-row-reverse">
          <CiUser size={30} /> <span className="font-bold">{user?.name}</span>
        </Link>
      </div>
      <Button
        onClick={handleLogout}
        variant={"default"}
        className="text-lg bg-orange-500 hover:bg-orange-600"
      >
        Logout
      </Button>
    </div>
  ) : (
    <div className="pl-4 flex">
      <Button
        variant={"default"}
        className="text-lg bg-orange-500 hover:bg-orange-600"
      >
        <Link href={"/agent/login"}>Are you an Agent?</Link>
      </Button>
      <Button variant={"link"} className="text-lg text-orange-500">
        <Link href={"/login"}>Login</Link>
      </Button>
      <Button variant={"link"} className="text-lg text-orange-500">
        <Link href={"/register"}>Register</Link>
      </Button>
    </div>
  );
};
