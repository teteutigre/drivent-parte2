import { Router } from "express";

import { getTicket, getTicketType, postTicket } from "@/controllers/tickets-controller";
import { validateBody, authenticateToken } from "@/middlewares";
import { ticketSchema } from "../schemas/index";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/", getTicket)
  .get("/types", getTicketType)
  .post("/", validateBody(ticketSchema), postTicket);

export { ticketRouter };
