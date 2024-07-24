import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

export default function ModalEdit({ user, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await onUpdate({ ...user, ...formData }); // Merge existing user data with form data
    } catch (error) {
      console.error("Update error", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleReset = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    });
  };

  return (
    <>
      <Modal
        open={true}
        title="Edit"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        className="sm:max-w-[425px]"
        footer={[
          <Button key="reset" onClick={handleReset}>
            Reset
          </Button>,
          <Button
            key="submit"
            loading={loading}
            onClick={handleOk}
            className="bg-[#6e59e7] text-white"
          >
            Submit
          </Button>,
        ]}
      >
        <form className="text-sm flex flex-col gap-4 mt-4 ">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
            placeholder="Last name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
            placeholder="Email"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
            placeholder="Phone number"
          />
        </form>
      </Modal>
    </>
  );
}
