import {
  createStudent,
  getNextStudentSequence,
  getStudent,
} from "@/controllers/students";
import express from "express";
const studentRouter = express.Router();

studentRouter.post("/students", createStudent);
studentRouter.get("/students", getStudent);
studentRouter.get("/students/seq", getNextStudentSequence);
// schoolRouter.get("/customers/:id", getCustomerById);
// schoolRouter.get("/api/v2/customers", getV2Customers);

export default studentRouter;
