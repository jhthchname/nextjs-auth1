"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { email, password } = formData;
    if (!formData.email || !formData.password) {
      setError("Please fill out all required fields!");
      return;
    }
    if (email && password) {
      try {
        const result = await axios.post(
          "/api/auth/signin",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        if (result?.data?._id) {
          return router.push("/?auth=login");
        } else {
          setError(
            "Login failed. Please check your credentials and try again."
          );
        }
      } catch (error) {
        console.error("Login error", error);
        if (error.response) {
          setError(
            `Server error: ${
              error.response.data.message || error.response.statusText
            }`
          );
        } else {
          console.error("Error message:", error.message);
          setError("An error occurred. Please try again.");
        }
      }
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
            {error && (
              <p className="text-red-500 bg-red-100 rounded-md p-2 border-solid border-2 border-red-400">
                {error}
              </p>
            )}
            <input
              type="email"
              name="email"
              onChange={handleInput}
              value={formData.email}
              className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={formData.password}
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
            <a className="text-gray-700 ">Don&apos;t have an account?</a>
            <Link
              href="/signup"
              className="text-[#6e59e7] font-bold ml-2 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
