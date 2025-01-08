import { db } from "@/db/db";
import {
  TypedRequestBody,
  UserCreateProps,
  UserLoginProps,
} from "@/types/types";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  TokenPayload,
} from "@/utils/tokens";

export async function createUser(
  req: TypedRequestBody<UserCreateProps>,
  res: Response
) {
  const data = req.body;
  const { email, password, role, phone, imageUrl, schoolId, schoolName } = data;
  try {
    // Check if the user email already exists\
    const existingEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "We have already received request for this user",
      });
    }
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    data.password = hashPassword;
    const newUser = await db.user.create({
      data,
    });
    console.log(
      `Contact created successfully: ${newUser.name} (${newUser.id})`
    );
    return res.status(201).json({
      data: newUser,
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

export async function loginUser(
  req: TypedRequestBody<UserLoginProps>,
  res: Response
) {
  const data = req.body;
  const { email, password } = data;
  try {
    // Check if the user email already exists\
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return res.status(409).json({
        data: null,
        error: "Invalid credentials",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
        data: null,
      });
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Store refresh token in database
    await db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: existingUser.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Remove sensitive data
    const { password: _, ...userWithoutPassword } = existingUser;

    return res.status(201).json({
      data: {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      },
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
