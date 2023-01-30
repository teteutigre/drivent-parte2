import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

import { Payment, NewPayment } from "@/protocols";

import httpStatus from "http-status";
import paymentService from "@/services/payment-service";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  if (!req.query.ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const ticketId = Number(req.query.ticketId);

  try {
    const payment = await paymentService.readPayment(userId, ticketId);
    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const newPayment = req.body as NewPayment;

  try {
    const payment = await paymentService.createPayment(userId, newPayment);
    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
