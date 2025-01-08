import { db } from "@/db/db";
import { SubjectCreateProps, TypedRequestBody } from "@/types/types";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createSubject(
  req: TypedRequestBody<SubjectCreateProps>,
  res: Response
) {
  const data = req.body;
  const slug = generateSlug(data.name);
  data.slug = slug;
  try {
    // Check if the school already exists\
    const existingSubject = await db.subject.findUnique({
      where: {
        slug,
      },
    });

    if (existingSubject) {
      return res.status(409).json({
        data: null,
        error: "Subject Name already exist",
      });
    }

    const newSubject = await db.subject.create({
      data,
    });
    console.log(
      `Subject created successfully: ${newSubject.name} (${newSubject.id})`
    );
    return res.status(201).json({
      data: newSubject,
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

export async function getSubjects(req: Request, res: Response) {
  try {
    const subjects = await db.subject.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(subjects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to get subjects",
    });
  }
}

export async function getBriefSubjects(req: Request, res: Response) {
  try {
    const subjects = await db.subject.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
      },
    });
    return res.status(200).json(subjects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to get subjects",
    });
  }
}
