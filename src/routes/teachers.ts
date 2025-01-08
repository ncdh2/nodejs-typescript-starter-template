import { createTeacher, getTeacher } from "@/controllers/teachers";

import express from "express";
const teacherRouter = express.Router();

teacherRouter.post("/teachers", createTeacher);
teacherRouter.get("/teachers", getTeacher);
// schoolRouter.get("/customers/:id", getCustomerById);
// schoolRouter.get("/api/v2/customers", getV2Customers);

export default teacherRouter;
