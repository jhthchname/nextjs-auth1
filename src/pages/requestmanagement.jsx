import React from "react";
import LayoutContainer from "../components/Layout";
import { checkAuth } from "@/auth/common";

export async function getServerSideProps({ req }) {
  return await checkAuth(req);
}

export default function RequestManagement(props) {
  return (
    <LayoutContainer user={props?.user}>
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Request Management
          </h2>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ชื่อเรื่อง
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ประเภท
                  </th>
                  <th scope="col" className="py-3 px-6">
                    รายละเอียด
                  </th>
                  <th scope="col" className="py-3 px-6">
                    วันที่แจ้ง
                  </th>
                  <th scope="col" className="py-3 px-6">
                    วันที่อนุมัติ
                  </th>
                  <th scope="col" className="py-3 px-6">
                    สถานะ
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
}
