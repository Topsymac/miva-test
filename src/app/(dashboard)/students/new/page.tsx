/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useStudents from "@/hooks/useStudents";
import { Students } from "@/types/students";
import { Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
    const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Students>();

  const toast = useToast();
  const { addStudent,  isLoading } = useStudents();
  const queryClient = useQueryClient();

  // Queries
  const mutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      console.log("Student Added Successfully");
      toast({
        title: `Student Added Successfully`,
        status: "success",
        position: "top",
        isClosable: true,
      });
      router.push("/students")
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    },
  });
  const onSubmit: SubmitHandler<Students> = (data: any) => {
    data.gpa = Number(data.gpa);
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <div className="relative h--auto max-h-[95vh] lg:w-2/5 overflow-y-auto rounded-xl bg-white p-6">
      {" "}
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-x-10">
          <div className="w-full">
            <div className="mb-6">
              <label className="text-xs font-bold text-black"> Name</label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg bg-gray-100 focus:border-gray-500"
                placeholder="John Doe"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors?.name && (
                <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                  {errors?.name.message}
                </span>
              )}
            </div>
            <div className="mb-6">
              {" "}
              <label className="text-xs font-bold text-black">Reg Number</label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg bg-gray-100 focus:border-gray-500"
                {...register("registrationNumber", {
                  required: "Registration is required",
                })}
              />
              {errors?.registrationNumber && (
                <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                  {errors?.registrationNumber.message}
                </span>
              )}
            </div>
            <div className="mb-6">
              {" "}
              <label className="text-xs font-bold text-black">
                Date of Birth
              </label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dob", {
                  required: "Date of Birth is required",
                })}
              />
              {errors?.dob && (
                <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                  {errors?.dob.message}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="text-xs font-bold text-black">Major</label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg bg-gray-100 focus:border-gray-500"
                placeholder="e.g Computer Science"
                type="text"
                {...register("major", {
                  required: "Major is required",
                })}
              />
              {errors?.major && (
                <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                  {errors?.major.message}
                </span>
              )}
            </div>
            <div className="mb-6">
              <label className="text-xs font-bold text-black">GPA</label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg bg-gray-100 focus:border-gray-500"
                placeholder="3.5"
                step="0.01"
                type="number"
                {...register("gpa", {
                  required: "GPA is required",
                })}
              />
              {errors?.gpa && (
                <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                  {errors?.gpa.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          {" "}
          <Button type="submit" colorScheme="blue" className="min-w-[100px] ">
            {isLoading ? <Spinner size="10" /> : <>Add Student</>}
          </Button>{" "}
        </div>{" "}
      </form>
    </div>
  );
};

export default Page;
