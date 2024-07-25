import React, { useEffect, useState } from "react";
import LayoutContainer from "../components/Layout";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { checkAuth } from "@/auth/common";
import { ManageToast } from "@/components/common";
import axios from "axios";

export async function getServerSideProps({ req }) {
  return await checkAuth(req);
}

export default function RequestForm(props) {
  const router = useRouter();
  const defaultFilter = { query: "", skip: 0, limit: 10 };
  const [filter, setFilter] = useState(defaultFilter);
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const { showToast, resetSuccessToast } = ManageToast();

  const [form, setForm] = useState({
    title: "",
    type: "",
    detail: "",
  });

  const [requestTypes, setRequestTypes] = useState([]);

  useEffect(() => {
    const authStatus = searchParams.get("auth");
    console.log("authStatus:", authStatus);
    console.log("Current token:", props?.user?.token);

    if (!authStatus) {
      console.log("No authStatus in URL");
    }

    if (authStatus === "login") {
      showToast("Login success!");
      router.replace("/", undefined, { shallow: true });
    }

    _queryData();
    fetchRequestTypes();
  }, [searchParams, router, showToast, resetSuccessToast]);

  const _queryData = async () => {
    try {
      const result = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${props?.user?.token}`,
        },
        params: filter,
      });
      if (result?.data?.total > 0) {
        setData(result?.data);
      } else setData([]);
    } catch (error) {
      console.log("error query data user=========>", error);
    }
  };

  const fetchRequestTypes = async () => {
    try {
      const response = await axios.get("/api/type-form", {
        headers: {
          Authorization: `Bearer ${props?.user?.token}`,
        },
      });
      if (response.data.results) {
        setRequestTypes(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching request types:", error);
      showToast("ไม่สามารถดึงข้อมูลประเภทคำขอได้", "error");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleReset = () => {
    setForm({
      title: "",
      type: "",
      detail: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, type, detail } = form;
    if (!form.title || !form.type || !form.detail) {
      showToast("กรุณากรอกข้อมูลให้ครบทุกช่อง", "error");
      return;
    }
    if (title && type && detail) {
      try {
        const response = await axios({
          method: "POST",
          url: "/api/form/create",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props?.user?.token}`, // เพิ่มบรรทัดนี้
          },
          data: JSON.stringify(form),
        });
        if (response?.data?._id) {
          showToast("ส่งคำขอสำเร็จ", "success");
          handleReset();
          resetSuccessToast();
        } else {
          showToast(
            "ส่งคำขอไม่สำเร็จ กรุณาตรวจสอบข้อมูลและลองอีกครั้ง",
            "error"
          );
        }
      } catch (error) {
        console.error("Send request error", error);
        if (error.response) {
          if (error.response.status === 401) {
            showToast(
              "Token ไม่ถูกต้องหรือหมดอายุ กรุณาเข้าสู่ระบบใหม่",
              "error"
            );
          } else {
            showToast(
              `เกิดข้อผิดพลาดจากเซิร์ฟเวอร์: ${
                error.response.data.message || error.response.statusText
              }`,
              "error"
            );
          }
        } else if (error.request) {
          showToast("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", "error");
        } else {
          console.error("Error message:", error.message);
          showToast("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", "error");
        }
      }
    }
  };

  return (
    <LayoutContainer user={props?.user}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-6 text-4xl tracking-tight font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Request Form
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-black sm:text-xl">
            ยินดีต้อนรับสู่ระบบยื่นคำขอ กรุณากรอกรายละเอียดให้ครบถ้วน
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ชื่อเรื่อง
              </label>
              <input
                type="text"
                id="title"
                value={form.title}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] focus:ring-1 block w-full p-2.5"
                placeholder="ระบุชื่อเรื่องที่ต้องการยื่นตำขอ"
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ประเภท
              </label>
              <select
                id="type"
                value={form.type}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] focus:ring-1 block w-full p-2.5"
              >
                <option value="">เลือกประเภทคำขอ</option>
                {requestTypes.map((type) => (
                  <option key={type._id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="detail"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                รายละเอียด
              </label>
              <textarea
                id="detail"
                rows="6"
                value={form.detail}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-[#6e59e7] focus:ring-[#806aff] focus:ring-1 block w-full p-2.5"
                placeholder="อธิบายรายละเอียดเพิ่มเติม"
              ></textarea>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="py-3 px-6 text-sm font-medium text-center text-white rounded-lg bg-[#806aff] sm:w-fit hover:bg-[#6e59e7] focus:ring-4 focus:outline-none focus:ring-[#9f90f7]"
              >
                ส่งคำขอ
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-6 text-sm font-medium text-center text-white rounded-lg bg-gray-400 sm:w-fit hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300"
              >
                รีเซ็ต
              </button>
            </div>
          </form>
        </div>
      </section>
    </LayoutContainer>
  );
}
