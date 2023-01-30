import { Router } from "express";
import { validateBody, authenticateToken } from "@/middlewares";
import paymentSchema from "@/schemas/payment-schema";
import { getPayment, postPayment } from "@/controllers/payments-controller";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(paymentSchema), postPayment);

export { paymentRouter };
