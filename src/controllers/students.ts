import { db } from "@/db/db";
import { StudentCreateProps, TypedRequestBody } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { Request, Response } from "express";

export async function createStudent(
  req: TypedRequestBody<StudentCreateProps>,
  res: Response
) {
  const data = req.body;
  const { email, rollNo, regNo, dob, admissionDate } = data;
  data.dob = convertDateToIso(dob);
  data.admissionDate = convertDateToIso(admissionDate);

  try {
    // Check if the email already exists\
    const existingEmail = await db.student.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "Email  already exist",
      });
    }

    // Check if the phone already exists\
    const existingRollNo = await db.student.findUnique({
      where: {
        rollNo,
      },
    });

    if (existingRollNo) {
      return res.status(409).json({
        data: null,
        error: "Roll Number already exist",
      });
    }

    // Check if the NIN already exists\
    const existingRegNo = await db.student.findUnique({
      where: {
        regNo,
      },
    });

    if (existingRegNo) {
      return res.status(409).json({
        data: null,
        error: "Registration Number already exist",
      });
    }

    const newStudent = await db.student.create({
      data,
    });
    console.log(
      `Student created successfully: ${newStudent.firstName} (${newStudent.id})`
    );
    return res.status(201).json({
      data: newStudent,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}
export async function getStudent(req: Request, res: Response) {
  try {
    const students = await db.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
  }
}

export async function getNextStudentSequence(req: Request, res: Response) {
  try {
    const lasStudent = await db.student.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    const regNo = lasStudent?.regNo.split("/")[3];
    const newRegNo = regNo ? parseInt(regNo) + 1 : 1;
    return res.status(200).json(newRegNo);
  } catch (error) {
    console.log(error);
  }
}
