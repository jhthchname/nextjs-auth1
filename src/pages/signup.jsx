"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ManageToast } from "@/components/common";
import { Toaster } from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const { showToast } = ManageToast();

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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      setError("Please fill out all required fields!");
      return;
    }
    console.log("formData========>", formData);
    try {
      const response = await axios({
        method: "POST",
        url: "/api/user/create",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      });
      console.log("response=========>", response);
      // let result = response.json();
      if (response?.data?._id) {
        showToast("Sign up success!");
        router.push(`/signup-success/${response.data?._id}`);
      }
    } catch (error) {
      console.error("Signup error", error);
      setError(error?.message || "An error occurred during signup");
    }
    return;
  };

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
          <div className="px-8">
            <h2 className="font-bold text-2xl text-[#000000]">Sign Up</h2>
            <form
              onSubmit={handleSubmit}
              className="text-sm flex flex-col gap-4 mt-4 "
            >
              {error && (
                <p className="text-red-500 bg-red-100 rounded-md p-2 border-solid border-2 border-red-400">
                  {error}
                </p>
              )}
              <input
                type="text"
                name="firstName"
                onChange={handleInput}
                value={formData.firstName}
                className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
                placeholder="First name"
              />
              <input
                type="text"
                name="lastName"
                onChange={handleInput}
                value={formData.lastName}
                className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
                placeholder="Last name"
              />
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
              <input
                type="password"
                name="confirmPassword"
                onChange={handleInput}
                value={formData.confirmPassword}
                className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
                placeholder="Confirm password"
              />
              <input
                type="tel"
                name="phone"
                onChange={handleInput}
                value={formData.phone}
                className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
                placeholder="Phone number"
              />
              <button
                type="submit"
                className="bg-[#6e59e7] text-white rounded-md py-2 active:bg-[#806aff]"
              >
                Sign up
              </button>
            </form>
            <div className="mt-5 text-sm flex justify-center items-center ">
              <a className="text-gray-700 ">Already have an account?</a>
              <Link
                href="/login"
                className="text-[#6e59e7] font-bold ml-2 hover:underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
