"use server";

import {
  getAllSubscriptions,
  changePlan,
  cancelSubscription,
  refundSubscription,
} from "@/lib/db/queries";

// Fetch all subscriptions
export async function fetchSubscriptions() {
  const subs = await getAllSubscriptions();
  // Convert all Date fields to YYYY-MM-DD for client
  return subs.map((s) => ({
    ...s,
    startDate: s.startDate.toISOString().slice(0, 10),
    renewDate: s.renewDate.toISOString().slice(0, 10),
    lastPayment: s.lastPayment.toISOString().slice(0, 10),
  }));
}

// Change the plan of a subscription
export async function setSubscriptionPlan(id: string, newPlan: string) {
  const updated = await changePlan(id, newPlan);
  return {
    ...updated,
    startDate: updated.startDate.toISOString().slice(0, 10),
    renewDate: updated.renewDate.toISOString().slice(0, 10),
    lastPayment: updated.lastPayment.toISOString().slice(0, 10),
  };
}

// Cancel a subscription
export async function cancelSub(id: string) {
  const result = await cancelSubscription(id);
  return {
    ...result,
    startDate: result.startDate.toISOString().slice(0, 10),
    renewDate: result.renewDate.toISOString().slice(0, 10),
    lastPayment: result.lastPayment.toISOString().slice(0, 10),
  };
}

// Refund action (note: this is a stub)
export async function refundSub(id: string) {
  const result = await refundSubscription(id);
  return {
    ...result,
    startDate: result.startDate.toISOString().slice(0, 10),
    renewDate: result.renewDate.toISOString().slice(0, 10),
    lastPayment: result.lastPayment.toISOString().slice(0, 10),
  };
}