"use client";

import React, { useEffect, useCallback, useRef } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ManagementUser({ session }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownToastRef = useRef(false);

  const showToast = useCallback((message) => {
    if (!hasShownToastRef.current) {
      toast.success(message);
      hasShownToastRef.current = true;
    }
  }, []);

  useEffect(() => {
    const authStatus = searchParams.get("auth");
    if (authStatus === "signup") {
      showToast("Sign up success!");
    } else if (authStatus === "login") {
      showToast("Login success!");
    }

    if (authStatus) {
      router.replace("/management", undefined, { shallow: true });
    }
  }, [searchParams, router, showToast]);

  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Roseanne",
      lastName: "Park",
      email: "rose@example.com",
      phone: "0801234567",
    },
    {
      id: 2,
      firstName: "Pansa",
      lastName: "Vosbein",
      email: "milk@example.com",
      phone: "0809876543",
    },
    {
      id: 3,
      firstName: "Manichar",
      lastName: "Aimdilokwong",
      email: "marmink@example.com",
      phone: "0812345678",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <Container>
      <Navbar session={session} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-2/5 px-3 py-2 border rounded focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block focus:ring-1"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-[#e6e1ff]">
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone number</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.firstName}</td>
                  <td className="border p-2">{user.lastName}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button className="mt-4 bg-[#6e59e7] text-white px-4 py-2 rounded hover:bg-[#523fbc]">
            Edit
          </button>
        </div>
      </div>
    </Container>
  );
}
