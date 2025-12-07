import { join } from "path";

// Polyfill para __dirname que Prisma necesita en ES modules
export default defineNitroPlugin(() => {
  if (typeof globalThis.__dirname === "undefined") {
    // Determinar la ruta correcta según el entorno
    const isProduction = process.env.NODE_ENV === "production";
    const basePath = isProduction
      ? join(process.cwd(), ".output/server/prisma/generated")
      : join(process.cwd(), "prisma/generated");
    
    // Definir __dirname globalmente antes de que Prisma lo use
    Object.defineProperty(globalThis, "__dirname", {
      value: basePath,
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }
});
