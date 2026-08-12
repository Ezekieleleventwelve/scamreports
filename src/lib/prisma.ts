import { PrismaClient } from "@prisma/client";

/** Bump when Prisma schema changes so dev HMR reloads a fresh client. */
const PRISMA_CLIENT_VERSION = "warnlist-entry-v2";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
  prismaClientVersion?: string;
};

function createPrismaClient() {
  return new PrismaClient();
}

function getPrismaClient(): PrismaClient {
  const stale =
    process.env.NODE_ENV !== "production" &&
    globalForPrisma.prisma &&
    (globalForPrisma.prismaClientVersion !== PRISMA_CLIENT_VERSION ||
      !("warnlistEntry" in globalForPrisma.prisma));

  if (stale && globalForPrisma.prisma) {
    void globalForPrisma.prisma.$disconnect();
    globalForPrisma.prisma = undefined;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
    globalForPrisma.prismaClientVersion = PRISMA_CLIENT_VERSION;
  }

  return globalForPrisma.prisma;
}

export const prisma = getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaClientVersion = PRISMA_CLIENT_VERSION;
}

export default prisma;
