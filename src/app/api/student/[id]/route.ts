/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/db";
import { response } from "@/lib/res";
import Student from "@/schema/studentSchema";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  if (!id) {
    return response(400, "Select a Student");
  }
  const student = await Student.findOne({ _id: id }).exec();

  if (!student) {
    return response(204, `No Student with ${id} found`);
  }
  await student.deleteOne({ _id: id });
  return response(201, "Student deleted successfully");
}
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  if (!id) {
    return response(400, "No Student Found");
  }
  const student = await Student.findOne({ _id: id }).exec();
  if (!student) {
    return response(204, `No Student with ${id} found`);
  }
  return response(201, "User fetched successfully", student);
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  if (!id) {
    return response(400, "No Student Found");
  }
  const { name, registrationNumber, dob, major, gpa } = await req.json();
  const student = await Student.findOne({ _id: id }).exec();
  try {
    if (name) {
      student.name = name;
    }
    if (registrationNumber) {
      student.registrationNumber = registrationNumber;
    }
    if (dob) {
      student.dob = dob;
    }
    if (major) {
      student.major = major;
    }
    if (gpa) {
      student.gpa = gpa;
    }

    const result = await student.save();

    return response(201, "Student edited successfully", result);
  } catch (err: any) {
    return response(500, "Server Error Occurred", err.message);
  }
}
