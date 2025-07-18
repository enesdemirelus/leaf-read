"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SyncUserClient from "../app/SyncUserClient";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const logo = {
    url: "/",
    src: "/favicon.ico",
    alt: "LeafRead",
    title: "LeafRead",
  };

  const menu = [
    { title: "My Books", url: "#" },
    { title: "Discover", url: "#" },
    { title: "Stats", url: "#" },
    { title: "Settings", url: "#" },
    { title: "Backend Test", url: "/backend-test" },
  ];

  return (
    <section className="">
      <div className="p-2">
        {/* Desktop */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {menu.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm" className="bg-white">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
              <SyncUserClient />
            </SignedIn>
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                      <span className="text-lg font-semibold tracking-tighter">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <div className="flex flex-col gap-4">
                    {menu.map((item) => (
                      <a
                        key={item.title}
                        href={item.url}
                        className="text-md font-semibold hover:underline"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button variant="outline">Login</Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button>Sign up</Button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
