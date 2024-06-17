"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemsProps = {
  id: string;
};

const NavItems = ({ id }: NavItemsProps) => {
  const headerLinks = [
    {
      label: "Home",
      route: "/",
    },
    {
      label: "My Profile",
      route: `/profile/${id}`,
    },
  ];

  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-tan">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-green"
            } flex-center p-medium-20 whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
