import { SubscriptionsPanel } from "../components/SubscriptionsPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#f7f7fb] text-zinc-900">
      <main className="flex min-h-screen w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        {/* Header: Subscrivew SaaS Subscription Dashboard */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#8243ff]/30 bg-white px-5 py-2 shadow-sm">
              <span className="text-2xl font-black tracking-tight text-[#8243ff]">Subscrivew</span>
            </div>
            <p className="text-sm font-medium text-[#52238a] sm:text-base">
              Subscription management made simple for support and finance teams.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end w-full sm:w-auto">
            <a
              href="#subscriptions"
              className="w-full sm:w-auto text-center rounded-full border border-[#8243ff]/30 bg-white px-4 py-2 text-sm font-semibold text-[#52238a] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Go to Dashboard
            </a>
            <a
              href="mailto:chirag@bidx.ai"
              className="w-full sm:w-auto text-center rounded-full bg-[#8243ff] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#5e2eb6] hover:shadow-md"
            >
              Contact Owner
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid min-h-[520px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8243ff] shadow-sm">
              Subscrivew SaaS
            </p>
            <h1 className="text-4xl font-black leading-tight text-[#180848] sm:text-5xl">
              One dashboard for all your subscription needs.
            </h1>
            <p className="max-w-2xl text-lg leading-7 text-zinc-700">
              Quickly view, manage, refund, or cancel customer subscriptions.
              Enable change of plan and streamline support/finance workflows — all from one screen.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-4 w-full">
              <a
                href="#subscriptions"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-[#8243ff] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#5e2eb6] hover:shadow-md"
              >
                View subscriptions
              </a>
              <a
                href="mailto:chirag@bidx.ai"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-[#8243ff]/30 bg-white px-5 py-3 text-sm font-semibold text-[#52238a] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                Get support
              </a>
            </div>
          </div>
          {/* Feature highlight cards */}
          <div className="relative overflow-hidden rounded-2xl border border-[#8243ff]/30 bg-white shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ede7ff] via-white to-[#d7cdfb] opacity-80" aria-hidden />
            <div className="relative grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#8243ff]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8243ff]">All-in-one</p>
                <p className="mt-2 text-base font-semibold text-[#180848]">Unified view</p>
                <p className="text-sm text-zinc-600">See all subscriptions at a glance with powerful filters.</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#8243ff]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8243ff]">Fast Actions</p>
                <p className="mt-2 text-base font-semibold text-[#180848]">Refunds & Changes</p>
                <p className="text-sm text-zinc-600">Change plans, refund payments, or cancel instantly.</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#8243ff]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8243ff]">Optimized</p>
                <p className="mt-2 text-base font-semibold text-[#180848]">Support tools</p>
                <p className="text-sm text-zinc-600">Designed for support/finance — take action and update status now.</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-[#8243ff]/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8243ff]">Secure</p>
                <p className="mt-2 text-base font-semibold text-[#180848]">Audit-safe</p>
                <p className="text-sm text-zinc-600">Actions require confirmation and can be exported for records.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Subscriptions Panel (Client Island) */}
        <section id="subscriptions" className="rounded-2xl border border-[#8243ff]/20 bg-white/90 px-6 py-10 shadow-md sm:px-10">
          <SubscriptionsPanel />
        </section>

        {/* Footer CTA and Info */}
        <section
          id="cta"
          className="rounded-2xl border border-[#8243ff]/15 bg-gradient-to-br from-white via-[#efebfa] to-white px-6 py-12 text-[#180848] shadow-sm sm:px-12"
        >
          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8243ff]">Subscrivew</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Modern subscription operations, simplified.</h2>
              <p className="text-base text-[#5e2eb6]">
                Designed by Chirag Dodiya for teams that care about accuracy, clarity, and fast service. 
                Focus on customers, not operations.
              </p>
            </div>
            <div className="grid gap-4 rounded-xl border border-[#8243ff]/20 bg-white/85 p-6 text-sm shadow-sm sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#52238a]">Explore</p>
                <a className="block text-[#4f2b8c] transition hover:text-[#8243ff]" href="#subscriptions">
                  Dashboard
                </a>
                <a className="block text-[#4f2b8c] transition hover:text-[#8243ff]" href="#features">
                  Features
                </a>
                <a className="block text-[#4f2b8c] transition hover:text-[#8243ff]" href="mailto:chirag@bidx.ai">
                  Contact
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#52238a]">About</p>
                <a className="block text-[#4f2b8c] transition hover:text-[#8243ff]" href="mailto:chirag@bidx.ai">
                  Owner: Chirag Dodiya
                </a>
                <a className="block text-[#4f2b8c] transition hover:text-[#8243ff]" href="mailto:chirag@bidx.ai">
                  chirag@bidx.ai
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center border-t border-[#8243ff]/15 pt-6 text-center text-xs text-[#5e2eb6]">
            <span>
              Subscrivew &bull; &copy; {new Date().getFullYear()} Chirag Dodiya 
              &bull; MIT license &bull; Ready to ship
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}