"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      router.push("/management?auth=login");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
        <div className="px-8">
          <h2 className="font-bold text-2xl text-[#000000]">Log In</h2>
          <form
            className="text-sm flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="Password"
            />
            <div className="mb-2 ml-2 text-xs text-[#6e59e7] underline">
              <a href="#">Forget Password?</a>
            </div>
            <button
              type="submit"
              className="bg-[#6e59e7] text-white rounded-md py-2 active:bg-[#806aff]"
            >
              Login
            </button>
          </form>
          <div className="mt-5 text-sm flex justify-center items-center">
            <p className="text-gray-700 ">Don&apos;t have an account?</p>
            <a href="/signup" className="text-[#6e59e7] font-bold ml-2">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
