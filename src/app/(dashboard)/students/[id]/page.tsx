"use client";
import AboutStudent from "@/components/organisms/AboutStudent";
import useStudents from "@/hooks/useStudents";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CiEdit } from "react-icons/ci";

export default function StudentPage() {
  const router = useRouter();
  const { id } = useParams();
  const { getSingleStudent, data } = useStudents();

  useEffect(() => {
    getSingleStudent(id as string);
  }, []);

  return (
    <section className="">
      <div className="mb-4 flex flex-col gap-y-3 lg:gap-y-0 lg:items-center justify-between lg:flex-row"></div>
      <div className="w-full mt-12">
        <div className="flex flex-col items-center lg:justify-between lg:flex-row gap-y-4 lg:gap-y-0">
          <div className="font-bold text-2xl">
            Reg No:{data?.registrationNumber}
          </div>
          <div
            className="flex gap-2 items-center bg-blue-400 p-2 rounded-lg text-white px-6 cursor-pointer"
            onClick={() => router.push(`/students/${id}/edit`)}
          >
            <CiEdit color="white" size={20} />
            Edit
          </div>
        </div>
        <div className="mt-5 flex lg:flex-row flex-col-reverse w-full items-start gap-5">
          <AboutStudent
            name={data.name}
            dob={data.dob}
            gpa={data.gpa}
            major={data.major}
          />
        </div>
      </div>
    </section>
  );
}
