/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { response } from "@/lib/res";
import Student from "@/schema/studentSchema";

import dbConnect from "@/lib/db";

export async function POST(req: Request) {
  await dbConnect();
  const { name, registrationNumber, dob, major, gpa } = await req.json();
  try {
    if (!name) {
      return response(400, "Please send a name");
    }
    if (!registrationNumber) {
      return response(400, "Registration Number is needed");
    }
    if (!dob) {
      return response(400, "Date of Birth is needed");
    }
    if (!major) {
      return response(400, "Major is needed");
    }
    if (!gpa) {
      return response(400, "GPA is needed");
    }

    const result = await Student.create({
      name,
      registrationNumber,
      dob,
      major,
      gpa,
    });

    return response(201, "User created successfully", result);
  } catch (err: any) {
    return response(500, "Server Error Occurred", err.message);
  }
}
export async function GET(req: Request) {
  await dbConnect();
  const students = await Student.find();
  if (!students) return response(204, "Please send a name");
  return response(201, "User fetched successfully", students);
}


