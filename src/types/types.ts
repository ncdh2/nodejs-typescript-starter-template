import { Gender, SubjectCategory, SubjectType, UserRole } from "@prisma/client";
import { Request, Response } from "express";

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export type ContactProps = {
  fullName: string;
  email: string;
  phone: string;
  school: string;
  country: string;
  role: string;
  schoolPage: string;
  students: number;
  media: string;
  message: string;
};

export type UserCreateProps = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  imageUrl?: string;
  schoolId?: string;
  schoolName?: string;
};

export type UserLoginProps = {
  email: string;
  password: string;
};

export type ClassCreateProps = {
  title: string;
  slug: string;
};

export type DepartmentCreateProps = {
  name: string;
  slug: string;
};
export type SubjectCreateProps = {
  name: string;
  code: string;
  slug: string;
  shortName: string;
  category: SubjectCategory;
  type: SubjectType;
  departmentId: string;
  departmentName: string;
};

export type StreamCreateProps = {
  title: string;
  slug: string;
  classId: string;
};

export type ParentCreateProps = {
  title: string;
  firstName: string;
  lastName: string;
  relationship: string;
  nin: string;
  gender: Gender;
  dob: string;
  phone: string;
  nationality: string;
  whatsappNo: string;
  occupation: string;
  preferredMethod: string;
  email: string;
  password: string;
  address: string;
  imageUrl: string;
};

export type StudentCreateProps = {
  name: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  dob: string;
  nationality: string;
  classTitle?: string;
  parentName?: string;
  streamTitle?: string;
  classId: string;
  parentId: string;
  streamId: string;
  email: string;
  rollNo: string;
  regNo: string;
  password: string;
  phone: string;
  address: string;
  admissionDate: string;
  imageUrl: string;
};

export type TeacherCreateProps = {
  title: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  whatAppNum: string;
  nationality: string;
  nin: string;
  gender: Gender;
  dob: string;
  preferredMethod: string;
  password: string;
  dateOfJoining: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  qualification: string;
  mainSubject: string;
  mainSubjectId: string;
  subjects: string[];
  classes: string[];
  classIds: string[];
  experience: number;
  address: string;
  imageUrl: string;
};
