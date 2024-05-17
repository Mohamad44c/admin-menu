"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { navLinks } from "@/lib/constants";
import Logo from "@/public/nexus-logo.png";

const LeftSideBar = () => {
  const pathname = usePathname();
  return (
    <div className="h-screen left-0 top-0 p-10 flex flex-col gap-16 bg-nexus-blue shadow-xl max-lg:hidden">
      <Image 
        priority={true}
        src={Logo}
        alt="Nexus"
        className="flex gap-4 text-body-medium items-center"
      />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium items-center ${
              pathname === link.url ? "text-blue-1" : "text-white"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p className="text-white">Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
