"use client";

import { useEffect, useState, useTransition } from "react";
import {
  fetchSubscriptions,
  setSubscriptionPlan,
  cancelSub,
  refundSub,
} from "@/app/actions/subscriptionActions";

type Subscription = {
  id: string;
  customer: string;
  email: string;
  status: "active" | "cancelled" | "past_due" | "trialing";
  plan: string;
  amount: number;
  startDate: string;
  renewDate: string;
  lastPayment: string;
};

const PLAN_OPTIONS = ["Starter", "Pro", "Business"];

function formatAmount(amount: number) {
  return `$${(amount / 100).toFixed(2)}`;
}

function formatDate(date: string) {
  return date;
}

export function SubscriptionsPanel() {
  const [rows, setRows] = useState<Subscription[]>([]);
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [actionStatus, setActionStatus] = useState<{[id: string]: string}>({});
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions().then((data) => {
      setRows(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter.length
    ? rows.filter(sub =>
        sub.customer.toLowerCase().includes(filter.toLowerCase()) ||
        sub.email.toLowerCase().includes(filter.toLowerCase()) ||
        sub.id.toLowerCase().includes(filter.toLowerCase()))
    : rows;

  const handleChangePlan = (id: string, newPlan: string) => {
    setActionStatus(s => ({ ...s, [id]: "" }));
    startTransition(() => {
      setSubscriptionPlan(id, newPlan).then((updated) => {
        setRows((subs) =>
          subs.map((sub) =>
            sub.id === id ? updated : sub
          )
        );
        setActionStatus((s) => ({ ...s, [id]: "Plan changed!" }));
        setEditingId(null);
      });
    });
  };

  const handleRefund = (id: string) => {
    setActionStatus(s => ({ ...s, [id]: "" }));
    startTransition(() => {
      refundSub(id).then((updated) => {
        setRows((subs) =>
          subs.map((sub) =>
            sub.id === id ? updated : sub
          )
        );
        setActionStatus((s) => ({ ...s, [id]: "Payment refunded!" }));
        setConfirmId(null);
      });
    });
  };

  const handleCancel = (id: string) => {
    setActionStatus(s => ({ ...s, [id]: "" }));
    startTransition(() => {
      cancelSub(id).then((updated) => {
        setRows((subs) =>
          subs.map((sub) =>
            sub.id === id ? updated : sub
          )
        );
        setActionStatus((s) => ({ ...s, [id]: "Subscription cancelled." }));
        setConfirmId(null);
      });
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold text-[#180848] flex-1">
          Subscriptions
        </h2>
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search customer, email, or ID..."
          className="block rounded-md border border-[#8243ff]/20 px-3 py-1.5 text-sm text-[#180848] bg-white outline-none ring-0 transition focus:border-[#8243ff] focus:shadow-[0_0_0_2px_rgba(130,67,255,0.09)] min-w-[220px]"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#8243ff]/10 bg-white shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-[#433269] text-sm">Loading subscriptions...</div>
        ) : (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#f1edfa] text-[#433269]">
              <th className="px-4 py-2 text-left font-semibold">Customer</th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Plan</th>
              <th className="px-4 py-2 text-left font-semibold">Amount</th>
              <th className="px-4 py-2 text-left font-semibold">Renew</th>
              <th className="px-4 py-2 text-left font-semibold">Last Payment</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-zinc-400 text-sm">
                  No subscriptions found.
                </td>
              </tr>
            )}
            {filtered.map(sub => (
              <tr
                key={sub.id}
                className="border-t border-[#8243ff]/8 hover:bg-[#f7f3fd]"
              >
                <td className="px-4 py-2">{sub.customer}</td>
                <td className="px-4 py-2">{sub.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold
                      ${
                        sub.status === "active"
                          ? "bg-green-100 text-green-700"
                          : sub.status === "trialing"
                          ? "bg-blue-100 text-blue-700"
                          : sub.status === "past_due"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {editingId === sub.id ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedPlan || sub.plan}
                        onChange={e => setSelectedPlan(e.target.value)}
                        className="rounded border px-2 py-1 text-sm"
                        disabled={isPending}
                      >
                        {PLAN_OPTIONS.map(plan => (
                          <option value={plan} key={plan}>
                            {plan}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleChangePlan(sub.id, selectedPlan || sub.plan)}
                        className="rounded bg-[#8243ff] text-white px-2 py-1 text-xs font-semibold hover:bg-[#5e2eb6]"
                        disabled={isPending}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded bg-gray-200 text-[#5e2eb6] px-2 py-1 text-xs font-semibold hover:bg-gray-300"
                        disabled={isPending}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{sub.plan}</span>
                      <button
                        onClick={() => { setEditingId(sub.id); setSelectedPlan(sub.plan); }}
                        className="rounded bg-[#f1edfa] text-[#8243ff] px-2 py-0.5 text-xs font-semibold hover:bg-[#e6dff9]"
                        title="Change plan"
                        disabled={isPending}
                      >
                        Change
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{formatAmount(sub.amount)}</td>
                <td className="px-4 py-2">{formatDate(sub.renewDate)}</td>
                <td className="px-4 py-2">{formatDate(sub.lastPayment)}</td>
                <td className="px-4 py-2 space-x-1">
                  <button
                    onClick={() => setConfirmId(sub.id + "---REFUND")}
                    className="rounded bg-[#f1edfa] text-[#8243ff] px-2 py-0.5 text-xs font-semibold hover:bg-[#e6dff9]"
                    disabled={isPending || (sub.status !== "active" && sub.status !== "past_due")}
                  >
                    Refund
                  </button>
                  <button
                    onClick={() => setConfirmId(sub.id + "---CANCEL")}
                    className="rounded bg-gray-200 text-[#5e2eb6] px-2 py-0.5 text-xs font-semibold hover:bg-gray-300"
                    disabled={isPending || (sub.status !== "active" && sub.status !== "trialing" && sub.status !== "past_due")}
                  >
                    Cancel
                  </button>
                  {confirmId === sub.id + "---REFUND" && (
                    <span className="ml-2">
                      <button
                        onClick={() => handleRefund(sub.id)}
                        className="rounded bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold hover:bg-red-200"
                        disabled={isPending}
                      >
                        Confirm Refund
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="ml-1 rounded bg-gray-100 text-gray-500 px-2 py-0.5 text-xs font-semibold hover:bg-gray-200"
                        disabled={isPending}
                      >
                        Cancel
                      </button>
                    </span>
                  )}
                  {confirmId === sub.id + "---CANCEL" && (
                    <span className="ml-2">
                      <button
                        onClick={() => handleCancel(sub.id)}
                        className="rounded bg-red-100 text-red-700 px-2 py-0.5 text-xs font-semibold hover:bg-red-200"
                        disabled={isPending}
                      >
                        Confirm Cancel
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="ml-1 rounded bg-gray-100 text-gray-500 px-2 py-0.5 text-xs font-semibold hover:bg-gray-200"
                        disabled={isPending}
                      >
                        Back
                      </button>
                    </span>
                  )}
                  {actionStatus[sub.id] && (
                    <span className="block mt-1 text-xs text-green-700">{actionStatus[sub.id]}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
      <div className="mt-8 text-xs text-[#433269] italic">
        All data is persisted in PostgreSQL via Prisma. 
      </div>
    </div>
  );
}

export default SubscriptionsPanel;