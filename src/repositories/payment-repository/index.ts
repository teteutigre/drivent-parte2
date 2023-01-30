import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Payment } from "../../protocols";

async function readPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

async function createPayment(newPayment: Payment) {
  return prisma.payment.create({
    data: newPayment,
  });
}

const paymentRepository = {
  readPayment,
  createPayment,
};

export default paymentRepository;
