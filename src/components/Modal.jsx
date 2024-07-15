import React, { useState } from "react";
import { Button, Modal } from "antd";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const ModalEdit = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex justify-center space-x-2">
        <Button
          onClick={showModal}
          className="bg-[#e6e1ff] px-3 py-2 rounded-sm hover:bg-[#cfc7ff]"
        >
          <MdEdit className="fill-[#6e59e7]" />
        </Button>
        <Button className="bg-[#ffdada] px-3 py-2 rounded-sm hover:bg-white">
          <MdDeleteForever className="fill-[#fc4a4a]" />
        </Button>
      </div>
      <Modal
        open={open}
        title="Edit"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        className="sm:max-w-[425px]"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
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
            className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
            placeholder="Last name"
          />
          <input
            type="email"
            name="email"
            className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
            placeholder="Email"
          />
          <input
            type="tel"
            name="phone"
            className="p-2 rounded-md border focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] block w-full focus:ring-1"
            placeholder="Phone number"
          />
        </form>
      </Modal>
    </>
  );
};
export default ModalEdit;
