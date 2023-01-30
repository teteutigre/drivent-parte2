import { AddressEnrollment } from "@/protocols";
import { getAddress } from "@/utils/cep-service";
import { notFoundError } from "@/errors";
import addressRepository, { CreateAddressParams } from "@/repositories/address-repository";
import { exclude } from "@/utils/prisma-utils";
import { Address, Enrollment } from "@prisma/client";

import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository, { CreateEnrollmentParams } from "@/repositories/enrollment-repository";

import { Ticket, TicketType } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function readTicket(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.readTicket(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const newTicket = {
    ticketTypeId: ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  const createdTicket = await ticketRepository.createTicket(newTicket);
  return createdTicket;
}

async function readAllTicketType(): Promise<TicketType[]> {
  const ticketsType = (await ticketRepository.readAllTicketType()) as TicketType[];

  return ticketsType;
}

const ticketService = {
  readTicket,
  createTicket,
  readAllTicketType,
};

export default ticketService;
