import { Department } from "./../../node_modules/.prisma/client/index.d";
import { db } from "@/db/db";
import {
  DepartmentCreateProps,
  StreamCreateProps,
  TypedRequestBody,
} from "@/types/types";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createDepartment(
  req: TypedRequestBody<DepartmentCreateProps>,
  res: Response
) {
  const data = req.body;
  const slug = generateSlug(data.name);
  data.slug = slug;
  try {
    // Check if the school already exists\
    const existingDepartment = await db.department.findUnique({
      where: {
        slug,
      },
    });

    if (existingDepartment) {
      return res.status(409).json({
        data: null,
        error: "Department Name already exist",
      });
    }

    const newDepartment = await db.department.create({
      data,
    });
    console.log(
      `Department created successfully: ${newDepartment.name} (${newDepartment.id})`
    );
    return res.status(201).json({
      data: newDepartment,
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

export async function getDepartments(req: Request, res: Response) {
  try {
    const departments = await db.department.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        teachers: true,
        subjects: true,
      },
    });
    return res.status(200).json(departments);
  } catch (error) {
    console.log(error);
  }
}

export async function getBriefDepartments(req: Request, res: Response) {
  try {
    const departments = await db.department.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
      },
    });
    return res.status(200).json(departments);
  } catch (error) {
    console.log(error);
  }
}
