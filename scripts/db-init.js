import { execSync } from "node:child_process";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set");
  process.exit(1);
}

function run(cmd) {
  console.log(`→ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

console.log("🚀 Starting database initialization…");

/**
 * Runs Prisma migration(s) using the official pipeline; disables non-Prisma/manual folder migration.
 */
run(`npx prisma migrate deploy`);

console.log("🎉 Database migrations completed (via Prisma).");