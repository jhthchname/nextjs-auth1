import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SignupSuccess = () => {
  const router = useRouter();
  const { id } = router?.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) quertUser();
  }, [id]);

  const quertUser = async () => {
    try {
      const result = await axios.get(`/api/user/${id}`);
      setUser(result?.data);
    } catch (err) {
      router.push("/signup");
    }
  };
  console.log("user========>", user);
  return (
    <div>
      <h1>Signup Success</h1>
    </div>
  );
};

export default SignupSuccess;
