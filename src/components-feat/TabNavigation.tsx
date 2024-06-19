"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

import { HomeIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/dashboard/golfers",
    label: "Golfers",
    image: "/golf-icon.svg",
  },
  {
    href: "/dashboard/rounds",
    label: "Rounds",
    image: "/golf-cart.svg",
  },
  {
    href: "/dashboard/courses",
    label: "Courses",
    image: "/course-icon.svg",
  },
];
export const TabNavigation = () => {
  // get the current route

  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname == "/dashboard" && href == "/dashboard") {
      return true;
    } else if (pathname !== "/dashboard" && href.includes(pathname)) {
      return true;
    }

    return false;
  };

  const shouldShow = React.useMemo(() => {
    // Do not show if the pathname contains a number after the last slash
    const regex = /\d+$/;
    return !pathname.match(regex);
  }, [pathname]);

  return shouldShow ? (
    <div className="h-20 flex-shrink-0 pt-3">
      <nav>
        <ul className="flex items-center justify-around px-6 text-foreground">
          {navItems.map((item) => (
            <li
              key={item.href}
              className={cn(
                isActive(item.href) ? "border-primary " : "border-transparent",
                "border-b-2 pb-3 transition-all duration-150 ease-in-out",
              )}
            >
              <Link href={item.href}>
                {item.icon && <item.icon className="h-7  w-7" />}
                {item.image && (
                  <Image
                    src={item.image}
                    alt="icon"
                    height={30}
                    width={30}
                    className="aspect-square h-7 w-7"
                  />
                )}
                <span className="sr-only">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  ) : null;
};
