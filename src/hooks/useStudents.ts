/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { Students } from "@/types/students";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const useStudents = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>({});

  const addStudent = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`/api/student`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };
  const getSingleStudent = async (id: string) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/student/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.data) {
        const student: Students = response.data.data;
        setData(student);
        return student; // ✅ return the student
      }

      throw new Error("No student data found");
    } catch (error) {
      throw error; // ❌ don't return the error, throw it so caller can catch
    } finally {
      setIsLoading(false);
    }
  };

  const getStudent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/student`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data) {
        return response?.data?.data;
      }
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };
  const editStudent = async (
    data: any,
    id: any,
    refetch: () => object
    // close?: any
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/student/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setIsLoading(false);
        refetch();
        router.push("/students");
        toast({
          title: `Student detail edited successful`,
          status: "success",
          position: "top",
          isClosable: true,
        });
        // close();
        return response.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteStudent = async (id: any) => {
    try {
      const response = await axios.delete(`/api/student/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    addStudent,
    isLoading,
    editStudent,
    getStudent,
    deleteStudent,
    getSingleStudent,
    data,
  };
};

export default useStudents;
