/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const useAuth = () => {
  const toast = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: any) => {
    // help toast
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/auth/login`,

        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": localStorage.getItem("i18nextLng"),
          },
        }
      );

      if (response?.data) {
        // window?.localStorage.setItem("miva-token", response?.data?.data?.token);

        setCookie("miva-token", response?.data?.data?.token);
        toast({
          title: `Login Successful`,
          status: "success",
          position: "top",
          isClosable: true,
        });
        router.push("/students");
      }
    } catch (error: any) {
      // alert(error.message);
      console.log("new", error);
      toast({
        title: `${error?.response?.data?.message}`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Add setIsLoggedIn as parameter

    // make request to login logs endpoint

    // window?.localStorage.removeItem("miva-token");
    deleteCookie("miva-token");

    router.push("/login");
  };

  return { login, logout, isLoading };
};

export default useAuth;
