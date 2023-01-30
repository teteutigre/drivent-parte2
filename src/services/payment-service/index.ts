import { unauthorizedError, notFoundError } from "@/errors";

import paymentRepository from "@/repositories/payment-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

import { Ticket, TicketType, Payment, NewPayment } from "@/protocols";
import { TicketStatus, Enrollment } from "@prisma/client";

async function readPayment(userId: number, ticketId: number): Promise<Payment> {
  const ticket = (await ticketRepository.findTicketById(ticketId)) as Ticket;
  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = (await enrollmentRepository.findByUserId(userId)) as Enrollment;
  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  const payment = (await paymentRepository.readPayment(ticket.id)) as Payment;
  return payment;
}

async function createPayment(userId: number, newPayment: NewPayment): Promise<Payment> {
  const ticket = (await ticketRepository.findTicketById(newPayment.ticketId)) as Ticket;
  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = (await enrollmentRepository.findByUserId(userId)) as Enrollment;
  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  const ticketType = (await ticketRepository.readTicketType(ticket.ticketTypeId)) as TicketType;

  const payment: Payment = {
    ticketId: newPayment.ticketId,
    value: ticketType.price,
    cardIssuer: newPayment.cardData.issuer,
    cardLastDigits: newPayment.cardData.number.slice(
      newPayment.cardData.number.length - 4,
      newPayment.cardData.number.length,
    ),
  };

  const createdPayment = await paymentRepository.createPayment(payment);

  await ticketRepository.updateStatus(ticket.id, TicketStatus.PAID);

  return createdPayment;
}

const paymentService = {
  readPayment,
  createPayment,
};

export default paymentService;
