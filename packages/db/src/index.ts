import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  memorybookPrisma?: PrismaClient;
};

export const db =
  globalForPrisma.memorybookPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.memorybookPrisma = db;
}

export * from "@prisma/client";
