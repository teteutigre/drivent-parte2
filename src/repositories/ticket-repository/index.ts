import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Ticket, TicketType } from "@/protocols";
import { TicketStatus } from "@prisma/client";

export async function createTicket(ticket: Ticket): Promise<Ticket> {
  return prisma.ticket.create({
    data: ticket,
    include: {
      TicketType: true,
    },
  });
}

export async function updateStatus(id: number, status: TicketStatus) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: status,
    },
  });
}

export async function readTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

export async function findTicketById(id: number): Promise<Ticket> {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
  });
}

export async function readAllTicketType(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

export async function readTicketType(id: number): Promise<TicketType> {
  return prisma.ticketType.findUnique({
    where: {
      id,
    },
  });
}

const ticketRepository = {
  createTicket,
  readTicket,
  findTicketById,
  readAllTicketType,
  readTicketType,
  updateStatus,
};

export default ticketRepository;
