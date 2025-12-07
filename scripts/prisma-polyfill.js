// Polyfill para __dirname y __filename en ES modules (necesario para Prisma)
import { join } from "path";

// Determinar la ruta correcta según el entorno
const isProduction = process.env.NODE_ENV === "production" || process.argv.includes("preview");
const basePath = isProduction
  ? join(process.cwd(), ".output/server/prisma/generated")
  : join(process.cwd(), "prisma/generated");

if (typeof globalThis.__dirname === "undefined") {
  Object.defineProperty(globalThis, "__dirname", {
    value: basePath,
    writable: false,
    configurable: false,
  });
}

if (typeof globalThis.__filename === "undefined") {
  Object.defineProperty(globalThis, "__filename", {
    value: join(basePath, "index.js"),
    writable: false,
    configurable: false,
  });
}

