"use client";

import React, { useState } from "react";
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 border-b border-[#d6cffe]">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="../public/jhinthicha.svg"
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
        <div className="md:hidden">
          <button id="menu" className="text-[#6e59e7]" onClick={toggleMenu}>
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex items-center space-x-4">
          {user?._id ? (
            <>
              <li className="relative group">
                <Link
                  href="/"
                  className="text-[#6e59e7] text-lg font-normal my-2"
                >
                  Request Form
                </Link>
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-[2px] bg-[#816def] group-hover:w-1/2"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-[2px] bg-[#816def] group-hover:w-1/2"></span>
              </li>
              <li className="relative group">
                <Link
                  href="/requestmanagement"
                  className="text-[#6e59e7] text-lg font-normal my-2"
                >
                  Request Management
                </Link>
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-[2px] bg-[#816def] group-hover:w-1/2"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-[2px] bg-[#816def] group-hover:w-1/2"></span>
              </li>
              <li className="relative group">
                <Link
                  href="/usermanagement"
                  className="text-[#6e59e7] text-lg font-normal my-2"
                >
                  User Management
                </Link>
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-[2px] bg-[#816def] group-hover:w-1/2"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-[2px] bg-[#816def] group-hover:w-1/2"></span>
              </li>
              <li className="w-5"></li>
              <li className="relative">
                <button
                  className="relative flex h-[40px] w-[80px] items-center justify-center overflow-hidden bg-[#816def] font-medium text-white transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-[#6e59e7] hover:before:border-[25px]"
                  onClick={_signOut}
                >
                  <span className="relative z-10">Logout</span>
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </div>
      {isMenuOpen ? (
        <ul className="flex-col md:hidden">
          {user?._id ? (
            <>
              <li className="py-3 ">
                <Link
                  href="/"
                  className="text-[#6e59e7] text-lg font-normal my-2 active:text-[#5d47da]"
                >
                  Request Form
                </Link>
              </li>
              <li className="py-3">
                <Link
                  href="/requestmanagement"
                  className="text-[#6e59e7] text-lg font-normal my-2 active:text-[#5d47da]"
                >
                  Request Management
                </Link>
              </li>
              <li className="py-3">
                <Link
                  href="/usermanagement"
                  className="text-[#6e59e7] text-lg font-normal my-2 active:text-[#5d47da]"
                >
                  User Management
                </Link>
              </li>
              <li className="w-5"></li>
              <li className="py-3">
                <button
                  className="relative flex h-[40px] w-[80px] items-center justify-center overflow-hidden bg-[#816def] font-medium text-white transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-[#6e59e7] hover:before:border-[25px]"
                  onClick={_signOut}
                >
                  <span className="relative z-10">Logout</span>
                </button>
              </li>
            </>
          ) : null}
        </ul>
      ) : null}
    </nav>
  );
}
