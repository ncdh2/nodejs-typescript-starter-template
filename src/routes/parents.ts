import { createParent, getParent } from "@/controllers/parents";

import express from "express";
const parentRouter = express.Router();

parentRouter.post("/parents", createParent);
parentRouter.get("/parents", getParent);
// schoolRouter.get("/customers/:id", getCustomerById);
// schoolRouter.get("/api/v2/customers", getV2Customers);

export default parentRouter;
