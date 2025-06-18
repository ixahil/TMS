// import { CommandMenu } from "@/components/command-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { CiHeart, CiSearch, CiUser } from "react-icons/ci";
import SearchComponent from "../shared/search";
import ThemeSwitcher from "../shared/theme-switcher";
import { Button } from "@/components/ui/button";
import { MainNav } from "./main-nav";

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
            <Dialog>
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
            </Dialog>
            <UserButtons />
            <ThemeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}
const UserButtons = () => {
  const isLoggedIn = false;
  return isLoggedIn ? (
    <div className="flex divide-x divide-border">
      <div className="px-4">
        <CiUser size={30} />
      </div>
      <div className="px-4">
        <CiHeart size={30} />
      </div>
    </div>
  ) : (
    <div className="pl-4 flex">
      <Button variant={"default"} className="text-lg">
        <Link href={"/agents/login"}>Are you an Agent?</Link>
      </Button>
      <Button variant={"link"} className="text-lg">
        <Link href={"/login"}>Login</Link>
      </Button>
      <Button variant={"link"} className="text-lg">
        <Link href={"/register"}>Register</Link>
      </Button>
    </div>
  );
};
