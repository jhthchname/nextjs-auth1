"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      phone
    ) {
      router.push("/management?auth=signup");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
        <div className="px-8">
          <h2 className="font-bold text-2xl text-[#000000]">Sign Up</h2>
          <form
            onSubmit={handleSubmit}
            className="text-sm flex flex-col gap-4 mt-4 "
          >
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="First name"
            />
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="Last name"
            />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="Password"
            />
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="Confirm password"
            />
            <input
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="Phone number"
            />
            <button className="bg-[#6e59e7] text-white rounded-md py-2 active:bg-[#806aff]">
              Sign up
            </button>
          </form>
          <div className="mt-5 text-sm flex justify-center items-center ">
            <a className="text-gray-700 ">Already have an account? </a>
            <a href="/login" className="text-[#6e59e7] font-bold ml-2">
              Log in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
