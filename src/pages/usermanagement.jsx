import React, { useState } from "react";
import LayoutContainer from "../components/Layout";
import ModalEdit from "../components/Modal";
import { FaSearch } from "react-icons/fa";
import { Button, Modal } from "antd";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { checkAuth } from "@/auth/common";

export async function getServerSideProps({ req }) {
  return await checkAuth(req);
}

export default function UserManagement(props) {
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleUpdate = async (updatedUser) => {
    try {
      await fetch(`/api/user/update/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`/api/user/delete/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <LayoutContainer user={props?.user}>
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            User Management
          </h2>
          <div className="mb-4">
            <div className="relative w-2/5">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 pl-10 border rounded focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block focus:ring-1"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr className="bg-[#e6e1ff]">
                  <th className="border p-2">First Name</th>
                  <th className="border p-2">Last Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone number</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2">{user.firstName}</td>
                    <td className="border p-2">{user.lastName}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.phone}</td>
                    <td className="border p-2">
                      <div className="flex justify-center space-x-2">
                        <Button
                          onClick={() => handleEdit(user)}
                          className="bg-[#e6e1ff] px-3 py-2 rounded-sm hover:bg-[#cfc7ff]"
                        >
                          <MdEdit className="fill-[#6e59e7]" />
                        </Button>
                        <Button
                          onClick={() => {
                            Modal.confirm({
                              title:
                                "Are you sure you want to delete this user?",
                              onOk: () => handleDelete(user.id),
                            });
                          }}
                          className="bg-[#ffdada] px-3 py-2 rounded-sm hover:bg-white"
                        >
                          <MdDeleteForever className="fill-[#fc4a4a]" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && selectedUser && (
            <ModalEdit
              user={selectedUser}
              onClose={() => setIsModalOpen(false)}
              onUpdate={handleUpdate}
            />
          )}
        </div>
      </section>
    </LayoutContainer>
  );
}
