import Link from "next/link";
import React from "react";
import Image from "next/image";

import { HomeIcon, ReloadIcon } from "@radix-ui/react-icons";

const navItems = [
  {
    href: "/dashboard",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/dashboard/golfers",
    label: "Golfers",
    image: "/golf-icon.png",
  },
  {
    href: "/dashboard/rounds",
    label: "Rounds",
    icon: ReloadIcon,
  },
  {
    href: "/dashboard/courses",
    label: "Courses",
    image: "/rounds.png",
  },
];
export const TabNavigation = () => {
  return (
    <div>
      <nav>
        <ul className="flex items-center justify-around px-6 text-black">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {item.icon && <item.icon className="-mb-1 h-7 w-7" />}
                {item.image && (
                  <Image
                    src={item.image}
                    alt="icon"
                    height={30}
                    width={30}
                    className="aspect-square h-7 w-7 bg-blend-darken"
                  />
                )}
                <span className="sr-only">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
