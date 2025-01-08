import { db } from "@/db/db";
import {
  ParentCreateProps,
  StreamCreateProps,
  TypedRequestBody,
} from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createParent(
  req: TypedRequestBody<ParentCreateProps>,
  res: Response
) {
  const data = req.body;
  const { email, phone, nin, dob } = data;
  data.dob = convertDateToIso(dob);

  try {
    // Check if the email already exists\
    const existingEmail = await db.parent.findUnique({
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
    const existingPhone = await db.parent.findUnique({
      where: {
        phone,
      },
    });

    if (existingPhone) {
      return res.status(409).json({
        data: null,
        error: "Phone Number already exist",
      });
    }

    // Check if the NIN already exists\
    const existingNIN = await db.parent.findUnique({
      where: {
        nin,
      },
    });

    if (existingNIN) {
      return res.status(409).json({
        data: null,
        error: "NIN already exist",
      });
    }

    const newParent = await db.parent.create({
      data,
    });
    console.log(
      `Parent created successfully: ${newParent.firstName} (${newParent.id})`
    );
    return res.status(201).json({
      data: newParent,
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
export async function getParent(req: Request, res: Response) {
  try {
    const parents = await db.parent.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(parents);
  } catch (error) {
    console.log(error);
  }
}

export async function createStream(
  req: TypedRequestBody<StreamCreateProps>,
  res: Response
) {
  const data = req.body;
  const slug = generateSlug(data.title);
  data.slug = slug;
  try {
    // Check if the stream already exists\
    const existingStream = await db.stream.findUnique({
      where: {
        slug,
      },
    });

    if (existingStream) {
      return res.status(409).json({
        data: null,
        error: "Stream Title already exist",
      });
    }

    const newStream = await db.stream.create({
      data,
    });
    console.log(
      `Class created successfully: ${newStream.title} (${newStream.id})`
    );
    return res.status(201).json({
      data: newStream,
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
export async function getStreams(req: Request, res: Response) {
  try {
    const streams = await db.stream.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(streams);
  } catch (error) {
    console.log(error);
  }
}
