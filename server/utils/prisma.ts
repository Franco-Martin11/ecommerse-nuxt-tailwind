import { join } from "path";
import { createRequire } from "module";

// Resolver la ruta de Prisma de forma absoluta usando createRequire
// Usamos package.json como archivo base para createRequire (siempre existe)
const baseFile = join(process.cwd(), "package.json");
const require = createRequire(`file://${baseFile}`);
const prismaPath = join(process.cwd(), "prisma/generated/index.js");
const { PrismaClient } = require(prismaPath);

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

