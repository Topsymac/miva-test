"use client";
import StudentsTable from "@/components/organisms/StudentsTable";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Page = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"major" | "gpa" | "">("");
  const [filterValue, setFilterValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="">
        <div className="mb-4 flex flex-col lg:flex-row items-center justify-between"></div>
        <div className="flex lg:flex-row flex-col lg:items-center gap-y-4 justify-between gap-x-2.5">
          {/* Search & Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4  w-full lg:mt-36 mt-8">
            {/* Search Input */}
            <span className="w-full lg:w-96">
              <Input
                className="transition h-10 rounded-lg bg-lightgray w-full lg:w-[10%]"
                placeholder="Search by name or reg number"
                bgColor={"#EDEDED"}
                type="search"
                onChange={handleSearch}
                value={searchTerm}
              />
            </span>

            {/* Filter by Major */}
            <select
              value={filterType === "major" ? filterValue : ""}
              onChange={(e) => {
                setFilterType("major");
                setFilterValue(e.target.value);
              }}
              className="border! p-2! rounded-lg bg-"
            >
              <option value="">All Majors</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Economics">Economics</option>
              <option value="Biology">Biology</option>
              <option value="Physiology">Physiology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Engineering">Engineering</option>
              <option value="Medicine">Medicine</option>
              <option value="SLT">SLT</option>
              <option value="Business Admin">Business Admin</option>
              <option value="Law">Law</option>
            </select>

            {/* Filter by GPA */}
            <select
              value={filterType === "gpa" ? filterValue : ""}
              onChange={(e) => {
                setFilterType("gpa");
                setFilterValue(e.target.value);
              }}
              className="border! p-2! rounded-lg"
            >
              <option value="">All GPAs</option>
              <option value="3.0">Less than 3.0</option>
              <option value="3.5">Between 3.5 and 3.9</option>
              <option value="4.0">4.0</option>
            </select>
          </div>

          <Button
            onClick={() => {
              router.push("/students/new");
              // setOpen(true);
              // typeRef.current = "add";
            }}
            leftIcon={<FaPlus size={20} color="white" />}
            className="flex items-center "
            colorScheme="blue"
          >
            Add Student
          </Button>
        </div>
        <StudentsTable
          searchTerm={searchTerm}
          filterType={filterType}
          filterValue={filterValue}
        />
      </div>
    </div>
  );
};

export default Page;
