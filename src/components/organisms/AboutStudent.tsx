/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card } from "@chakra-ui/react";
import React from "react";

const AboutStudent = ({
  name,
  dob,
  gpa,
  major,
}: {
  name: string;
  dob: string;
  gpa: any;
  major: string;
}) => {
  return (
    <div className="flex flex-col lg:flex-row  items-start w-full gap-4">
      <Card className="flex flex-col space-y-2 border-none p-3 rounded-none shadow-xl lg:w-1/3 w-full">
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Name</p>
          <p>{name}</p>
        </div>
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Date of Birth</p>
          <p>{dob}</p>
        </div>
      </Card>
      <Card className="flex flex-col space-y-2 border-none p-3 rounded-none shadow-xl  lg:w-2/3 w-full">
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Major</p>
          <p>{major}</p>
        </div>

        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>GPA</p>
          <p>{gpa}</p>
        </div>
      </Card>
    </div>
  );
};

export default AboutStudent;
