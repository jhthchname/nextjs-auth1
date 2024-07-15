import React, { useEffect, useState } from "react";
import LayoutContainer from "../components/Layout";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { checkAuth } from "@/auth/common";
import { ManageToast } from "@/components/common";
import axios from "axios";
import { motion } from "framer-motion";

export async function getServerSideProps({ req }) {
  return await checkAuth(req);
}

export default function Home(props) {
  const router = useRouter();
  const defaultFilter = { query: "", skip: 0, limit: 10 };
  const [filter, setFilter] = useState(defaultFilter);
  const [data, setData] = useState([]);
  const searchParams = useSearchParams();
  const { showToast } = ManageToast();

  useEffect(() => {
    const authStatus = searchParams.get("auth");
    console.log("authStatus:", authStatus);

    if (!authStatus) {
      console.log("No authStatus in URL");
    }

    if (authStatus === "signin") {
      console.log("Showing toast for login success");
      showToast("Login success!");
      router.replace("/", undefined, { shallow: true });
    }

    _queryData();
  }, [searchParams]);

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

  return (
    <LayoutContainer user={props?.user}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <motion.h1
          className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to My App
        </motion.h1>
      </div>
    </LayoutContainer>
  );
}
