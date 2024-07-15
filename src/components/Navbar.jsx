"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export default function Navbar({ user }) {
  const router = useRouter();

  const _signOut = async () => {
    try {
      const result = await axios.post(
        "/api/auth/signout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (result?.data?._id) router.push("/login");
    } catch (error) {
      console.log("error signout=========>", error);
    }
  };

  return (
    <nav className="flex justify-between items-center shadow-md p-5 bg-white">
      <div className="ml-20">
        <Link href="/">
          <Image
            src="../public/next.svg"
            width={100}
            height={100}
            alt="nextjs logo"
          />
        </Link>
      </div>
      <ul className="flex space-x-4">
        {user?._id ? (
          <>
            <li>
              <Link
                href="/usermanagement"
                className="text-[#6e59e7] mr-20 text-lg font-bold my-2"
              >
                User Management
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="text-[#6e59e7] mr-10 text-lg font-bold my-2"
                onClick={_signOut}
              >
                Logout
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}
