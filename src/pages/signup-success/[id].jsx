import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SignupSuccess = () => {
  const router = useRouter();
  const { id } = router?.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) queryUser();
  }, [id]);

  const queryUser = async () => {
    try {
      const result = await axios.get(`/api/user/${id}`);
      setUser(result?.data);
      if (result?.data) {
        router.push("/");
      }
    } catch (err) {
      router.push("/signup");
    }
  };

  console.log("user========>", user);
};

export default SignupSuccess;
