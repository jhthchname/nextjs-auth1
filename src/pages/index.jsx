import { checkAuth } from "@/auth/common";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";

export async function getServerSideProps({ req }) {
  return await checkAuth(req);
}

export default function Home({ user }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (result?.data?.total > 0) {
        setData(result.data.users);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("Error querying user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    queryData();
  }, [queryData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome to the My App</h1>
      <Link href="/usermanagement"></Link>
    </div>
  );
}
