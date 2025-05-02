/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import useStudents from "@/hooks/useStudents";
import { Students } from "@/types/students";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Page = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Students>();

  const { getSingleStudent, editStudent, isLoading } = useStudents();

  const { data, refetch } = useQuery<Students>({
    queryKey: ["singleStudent"],
    queryFn: () => getSingleStudent(id as string),
    enabled: true,
  });

  const onSubmit: SubmitHandler<Students> = (data: any) => {
    data.gpa = Number(data.gpa);
    console.log(data);
    editStudent(data, id, refetch);
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        registrationNumber: data.registrationNumber,
        dob: data.dob?.split("T")[0], // in case it's an ISO string
        major: data.major,
        gpa: data.gpa,
      });
    }
  }, [data, reset]);

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
                // defaultValue={data?.name}
                {...register("name")}
              />
            </div>
            <div className="mb-6">
              {" "}
              <label className="text-xs font-bold text-black">Reg Number</label>
              <Input
                // defaultValue={data?.registrationNumber}
                className="transition3 mt-2 h-10 rounded-lg bg-gray-100 focus:border-gray-500"
                {...register("registrationNumber")}
              />
            </div>
            <div className="mb-6">
              {" "}
              <label className="text-xs font-bold text-black">
                Date of Birth
              </label>
              <Input
                id="dateOfBirth"
                type="date" // Chakra UI Input with type "date"
                // defaultValue={data?.dob}
                {...register("dob")}
              />
            </div>
            <div className="mb-6">
              <label className="text-xs font-bold text-black">Major</label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg bg-gray-100 focus:border-gray-500"
                placeholder="e.g Computer Science"
                // defaultValue={data?.major}
                type="text"
                {...register("major")}
              />
            </div>
            <div className="mb-6">
              <label className="text-xs font-bold text-black">GPA</label>
              <Input
                className="transition3 mt-2 h-10 rounded-lg bg-gray-100 focus:border-gray-500"
                placeholder="3.5"
                step="0.01"
                type="number"
                // defaultValue={data?.gpa}
                {...register("gpa")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          {" "}
          <Button type="submit" colorScheme="red" className="min-w-[100px]">
            {isLoading ? <Spinner size="10" /> : <>Edit Student</>}
          </Button>{" "}
        </div>{" "}
      </form>
    </div>
  );
};

export default Page;
