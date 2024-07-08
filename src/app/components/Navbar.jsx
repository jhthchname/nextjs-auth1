"use client";

import React from "react";
import Link from "next/link";
import NextLogo from "../../../public/next.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";

function Navbar({ session }) {
  return (
    <nav className="flex justify-between items-center shadow-md p-5">
      <div className="ml-20">
        <Link href="/">
          <Image src={NextLogo} width={100} height={100} alt="nextjs logo" />
        </Link>
      </div>
      <ul className="flex space-x-4">
        {!session ? (
          <li>
            <Link
              href="/login"
              className="text-[#6e59e7] mr-20 text-lg font-bold my-2"
            >
              Logout
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;
