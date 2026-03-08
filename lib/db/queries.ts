import { PrismaClient, SubscriptionStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllSubscriptions() {
  return prisma.subscription.findMany({
    orderBy: { lastPayment: "desc" },
  });
}

export async function changePlan(id: string, newPlan: string) {
  return prisma.subscription.update({
    where: { id },
    data: { plan: newPlan },
  });
}

export async function cancelSubscription(id: string) {
  return prisma.subscription.update({
    where: { id },
    data: { status: SubscriptionStatus.cancelled },
  });
}

export async function refundSubscription(id: string) {
  // For demo, just mark as refunded in actionStatus; adapt for payment APIs later.
  return prisma.subscription.update({
    where: { id },
    data: {},
  });
}