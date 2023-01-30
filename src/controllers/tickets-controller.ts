import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/ticket-service";
import { Ticket, TicketType } from "@/protocols";

import { Response } from "express";
import httpStatus from "http-status";

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketService.readTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId: number = req.body.ticketTypeId;

  try {
    const createdTicket = await ticketService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(createdTicket);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicketType(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticketsType = (await ticketService.readAllTicketType()) as TicketType[];
    return res.status(httpStatus.OK).send(ticketsType);
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
