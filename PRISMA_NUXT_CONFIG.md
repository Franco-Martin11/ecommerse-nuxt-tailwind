# Configuración de Prisma con Nuxt 3

Este documento explica las configuraciones implementadas para resolver los problemas de integración entre Prisma ORM y Nuxt 3, específicamente los errores relacionados con módulos ES y la resolución de `__dirname` en producción.

## 📋 Tabla de Contenidos

- [Problema Identificado](#problema-identificado)
- [Solución Implementada](#solución-implementada)
- [Configuraciones Detalladas](#configuraciones-detalladas)
- [Uso](#uso)
- [Troubleshooting](#troubleshooting)

## 🔍 Problema Identificado

Al integrar Prisma ORM con Nuxt 3, se encontraron los siguientes problemas:

1. **Error de Build**: `Invalid module ".prisma" is not a valid package name`
   - Ocurre durante el proceso de build con Nitro
   - Relacionado con la resolución de módulos de Prisma en pnpm

2. **Error de Preview/Producción**: `ReferenceError: __dirname is not defined in ES module scope`
   - Prisma usa `__dirname` y `__filename` que no están disponibles en módulos ES
   - El error aparece al ejecutar `pnpm preview` o en producción

## ✅ Solución Implementada

La solución consta de cinco componentes principales:

1. **Configuración del Schema de Prisma**: Output personalizado para evitar conflictos con pnpm
2. **Configuración de pnpm (`.npmrc`)**: Hoisting de dependencias de Prisma
3. **Singleton de Prisma Client**: Uso de `createRequire` para resolución correcta de rutas
4. **Configuración de Nitro**: Hooks para copiar archivos de Prisma al output
5. **Polyfills de Runtime**: Plugin de Nitro y script para definir `__dirname` y `__filename`

## 🔧 Configuraciones Detalladas

### 1. Schema de Prisma (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated"
}
```

**Explicación**:
- `output = "./generated"`: Genera el cliente de Prisma en una carpeta local en lugar de `node_modules`
- Esto evita problemas de resolución de módulos con pnpm
- La carpeta `prisma/generated/` debe estar en `.gitignore`

### 2. Singleton de Prisma Client (`server/utils/prisma.ts`)

```typescript
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
```

**Explicación**:
- **`createRequire`**: Permite usar `require` en módulos ES para resolver rutas correctamente
- **`package.json` como base**: Usa `package.json` como archivo base para `createRequire`, asegurando que siempre existe y está en la raíz del proyecto
- **`process.cwd()`**: Obtiene la ruta absoluta del proyecto, evitando problemas de resolución de rutas relativas
- **Patrón Singleton**: Evita múltiples instancias de PrismaClient
- En desarrollo, reutiliza la misma instancia globalmente
- En producción, crea una nueva instancia por request (mejor para serverless)

**Nota importante**: Esta solución es necesaria porque las rutas relativas (`../../prisma/generated`) no se resuelven correctamente en el contexto de Nuxt/Nitro durante el desarrollo. Usar `createRequire` con `process.cwd()` asegura que la ruta se resuelva correctamente independientemente del sistema operativo o la ubicación del archivo.

### 3. Configuración de Nuxt (`nuxt.config.ts`)

#### Configuración de Nitro

```typescript
nitro: {
  esbuild: {
    options: {
      target: "node18",
    },
  },
  externals: {
    inline: ["prisma/generated"],
  },
  experimental: {
    wasm: true,
  },
  hooks: {
    "build:before": async () => {
      // Copia archivos de Prisma al output
    },
    "build:after": async () => {
      // Inyecta polyfill en nitro.mjs (backup)
    },
  },
}
```

**Explicación**:
- `externals.inline`: Indica a Nitro que no empaquete `prisma/generated` como externo
- `esbuild.target: "node18"`: Asegura compatibilidad con Node.js 18+
- `experimental.wasm: true`: Habilita soporte WASM necesario para Prisma
- `build:before`: Copia todos los archivos de Prisma (incluyendo el query engine) al output
- `build:after`: Intenta inyectar polyfill directamente en el bundle (método backup)

#### Hook `build:before`

Este hook copia todos los archivos necesarios de Prisma al directorio de output:

```typescript
"build:before": async () => {
  const { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } = await import("fs");
  const { join } = await import("path");
  
  const prismaGenerated = join(process.cwd(), "prisma/generated");
  const outputDir = join(process.cwd(), ".output/server/prisma/generated");
  
  if (existsSync(prismaGenerated)) {
    mkdirSync(outputDir, { recursive: true });
    
    // Copiar todos los archivos necesarios
    const files = readdirSync(prismaGenerated);
    for (const file of files) {
      const sourcePath = join(prismaGenerated, file);
      const destPath = join(outputDir, file);
      const stat = statSync(sourcePath);
      
      if (stat.isFile()) {
        copyFileSync(sourcePath, destPath);
      }
    }
  }
}
```

**Importante**: Este hook asegura que el query engine (`.node` files) esté disponible en el output de producción.

### 4. Plugin de Nitro para Polyfill (`server/plugins/prisma-polyfill.ts`)

```typescript
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
```

**Explicación**:
- **Plugin de Nitro**: Se ejecuta automáticamente cuando Nitro inicia
- **Detección de entorno**: Ajusta la ruta según si está en desarrollo o producción
- **Definición global**: Define `__dirname` antes de que Prisma lo necesite
- Este plugin se carga automáticamente en todos los entornos de Nuxt

### 5. Polyfill de Runtime para Preview (`scripts/prisma-polyfill.js`)

```javascript
// Polyfill para __dirname y __filename en ES modules (necesario para Prisma)
import { join } from "path";

if (typeof globalThis.__dirname === "undefined") {
  const basePath = join(process.cwd(), ".output/server/prisma/generated");
  Object.defineProperty(globalThis, "__dirname", {
    value: basePath,
    writable: false,
    configurable: false,
  });
}

if (typeof globalThis.__filename === "undefined") {
  const basePath = join(process.cwd(), ".output/server/prisma/generated");
  Object.defineProperty(globalThis, "__filename", {
    value: join(basePath, "index.js"),
    writable: false,
    configurable: false,
  });
}
```

**Explicación**:
- Define `__dirname` y `__filename` globalmente antes de que Prisma los necesite
- Usa `globalThis` para compatibilidad entre Node.js y navegadores
- Apunta a la ubicación correcta del cliente generado en producción

### 6. Configuración de pnpm (`.npmrc`)

```ini
shamefully-hoist=true
public-hoist-pattern[]=*prisma*
```

**Explicación**:
- **`shamefully-hoist=true`**: Hace que pnpm hoist todas las dependencias al nivel superior, similar a npm/yarn
- **`public-hoist-pattern[]=*prisma*`**: Asegura que todos los paquetes relacionados con Prisma se hoisteen públicamente
- Esto resuelve problemas de resolución de módulos con Prisma en pnpm

### 7. Scripts de Build (`package.json`)

```json
{
  "scripts": {
    "build": "nuxt build",
    "build:full": "prisma generate && nuxt build",
    "dev": "nuxt dev",
    "preview": "node --import ./scripts/prisma-polyfill.js .output/server/index.mjs",
    "preview:nuxt": "nuxt preview",
    "postinstall": "nuxt prepare && prisma generate"
  }
}
```

**Explicación**:
- **`build:full`**: Genera Prisma Client antes del build (útil para CI/CD)
- **`preview`**: Usa el polyfill manual para preview local
- **`postinstall`**: Genera Prisma Client automáticamente después de instalar dependencias
  - Esto es crucial para Vercel y otros servicios de deployment
  - `nuxt prepare` asegura que Nuxt esté listo antes de generar Prisma

## 🚀 Uso

### Desarrollo

```bash
# Generar el cliente de Prisma
pnpm prisma generate

# Iniciar servidor de desarrollo
pnpm dev
```

### Build y Preview

```bash
# Build de producción
pnpm build

# Preview del build (usa el polyfill automáticamente)
pnpm preview
```

### Producción

Para producción, asegúrate de:

1. **Generar Prisma Client antes del build**:
   ```bash
   pnpm prisma generate
   pnpm build
   ```

2. **Ejecutar con el polyfill**:
   ```bash
   node --import ./scripts/prisma-polyfill.js .output/server/index.mjs
   ```

   O en tu Dockerfile/script de despliegue:
   ```dockerfile
   CMD ["node", "--import", "./scripts/prisma-polyfill.js", ".output/server/index.mjs"]
   ```

## 📁 Estructura de Archivos

```
proyecto/
├── prisma/
│   ├── schema.prisma          # Schema con output personalizado
│   └── generated/             # Cliente generado (en .gitignore)
├── server/
│   ├── plugins/
│   │   └── prisma-polyfill.ts # Plugin de Nitro para __dirname
│   └── utils/
│       └── prisma.ts          # Singleton de PrismaClient
├── scripts/
│   └── prisma-polyfill.js     # Polyfill de __dirname/__filename para preview
├── .npmrc                      # Configuración de pnpm para Prisma
├── nuxt.config.ts              # Configuración de Nuxt y Nitro
└── package.json               # Scripts actualizados con postinstall
```

## 🔍 Troubleshooting

### Error: "Cannot find module '../../prisma/generated'" o "Cannot find module 'C:\prisma\generated'"

**Solución**: 
1. Asegúrate de ejecutar `pnpm prisma generate` antes del build
2. Verifica que `server/utils/prisma.ts` use `createRequire` con `process.cwd()` como se muestra en la configuración
3. Si el error persiste, verifica que la ruta `prisma/generated/index.js` existe

### Error: "__dirname is not defined" en preview

**Solución**: Verifica que el script `preview` en `package.json` use `--import ./scripts/prisma-polyfill.js`.

### Error: "Query engine not found"

**Solución**: 
1. Verifica que el hook `build:before` se ejecutó correctamente
2. Revisa que `.output/server/prisma/generated/query_engine-*.node` existe
3. Ejecuta `pnpm build` nuevamente

### El servidor no inicia en producción

**Solución**: Asegúrate de ejecutar el servidor con el polyfill:
```bash
node --import ./scripts/prisma-polyfill.js .output/server/index.mjs
```

## 📝 Notas Importantes

1. **pnpm y Prisma**: Esta configuración está optimizada para pnpm. Si usas npm o yarn, puede que necesites ajustes menores.

2. **Query Engine**: El query engine (archivos `.node`) se copia automáticamente durante el build. No es necesario incluirlo manualmente.

3. **Gitignore**: Asegúrate de que `prisma/generated/` esté en `.gitignore` ya que se genera automáticamente.

4. **Variables de Entorno**: El `DATABASE_URL` debe estar configurado correctamente en producción.

## 🚀 Despliegue en Vercel

### Configuración Requerida

Para desplegar tu aplicación Nuxt 3 con Prisma en Vercel, necesitas configurar lo siguiente:

#### 1. Variables de Entorno

En el dashboard de Vercel, configura las siguientes variables de entorno:

- **`DATABASE_URL`**: URL de conexión a tu base de datos PostgreSQL
  - Formato: `postgresql://usuario:contraseña@host:puerto/database?schema=public`
  - Ejemplo: `postgresql://user:pass@host.vercel-postgres.com:5432/db?sslmode=require`

#### 2. Build Command

Vercel detectará automáticamente Nuxt 3, pero asegúrate de que el build command sea:

```bash
pnpm build
```

O si prefieres usar el script completo:

```bash
pnpm run build:full
```

**Nota**: El script `postinstall` en `package.json` ya ejecuta `prisma generate` automáticamente después de instalar dependencias, por lo que no necesitas agregarlo al build command.

#### 3. Install Command

Asegúrate de que Vercel use pnpm:

```bash
pnpm install
```

Vercel detectará automáticamente pnpm si existe `packageManager` en `package.json` (ya está configurado).

#### 4. Output Directory

Vercel detectará automáticamente `.output` como directorio de salida para Nuxt 3. No necesitas configurarlo manualmente.

#### 5. Node.js Version

Asegúrate de que Vercel use Node.js 18 o superior. Puedes configurarlo en:

- **Dashboard de Vercel** → Tu proyecto → Settings → General → Node.js Version
- O crear un archivo `.nvmrc` en la raíz del proyecto:
  ```
  18
  ```

#### 6. Verificación de Configuración

Tu `package.json` ya incluye:

```json
{
  "scripts": {
    "postinstall": "nuxt prepare && prisma generate"
  }
}
```

Esto asegura que:
- `nuxt prepare` se ejecuta para preparar Nuxt
- `prisma generate` genera el cliente de Prisma antes del build

### Checklist de Deployment

Antes de desplegar, verifica:

- [ ] Variable `DATABASE_URL` configurada en Vercel
- [ ] Build Command: `pnpm build` (o `pnpm run build:full`)
- [ ] Install Command: `pnpm install` (automático si `packageManager` está en `package.json`)
- [ ] Node.js Version: 18 o superior
- [ ] El hook `build:before` en `nuxt.config.ts` copiará los archivos de Prisma automáticamente
- [ ] El plugin `server/plugins/prisma-polyfill.ts` se cargará automáticamente en producción

### Troubleshooting en Vercel

#### Error: "Cannot find module 'prisma/generated'"

**Solución**: 
1. Verifica que `postinstall` se ejecute correctamente
2. Revisa los logs de build en Vercel para confirmar que `prisma generate` se ejecutó
3. Asegúrate de que `.npmrc` esté en el repositorio

#### Error: "__dirname is not defined"

**Solución**: 
- El plugin `server/plugins/prisma-polyfill.ts` debería resolver esto automáticamente
- Si persiste, verifica que el plugin esté en `server/plugins/` (se carga automáticamente)

#### Error: "Query engine not found"

**Solución**:
1. Verifica que el hook `build:before` en `nuxt.config.ts` se ejecutó
2. Revisa los logs de build para confirmar que los archivos se copiaron a `.output/server/prisma/generated/`
3. Asegúrate de que `experimental.wasm: true` esté en la configuración de Nitro

#### Build falla en Vercel

**Solución**:
1. Verifica que todas las dependencias estén en `package.json` (no solo en `devDependencies`)
2. Asegúrate de que `@prisma/client` esté en `dependencies`
3. Revisa los logs de build para identificar el error específico

### Configuración Opcional: vercel.json

Si necesitas configuración adicional, puedes crear `vercel.json`:

```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "framework": "nuxtjs",
  "nodeVersion": "18.x"
}
```

Sin embargo, Vercel detecta automáticamente Nuxt 3, por lo que este archivo generalmente no es necesario.

## 🔗 Referencias

- [Documentación oficial de Prisma para Nuxt](https://www.prisma.io/docs/guides/nuxt)
- [Prisma en Vercel](https://www.prisma.io/docs/guides/deployment/deploying-to-vercel)
- [Nuxt 3 - Nitro Configuration](https://nitro.unjs.io/config)
- [Node.js ES Modules](https://nodejs.org/api/esm.html)
- [Vercel - Nuxt Deployment](https://nuxt.com/deploy/vercel)

## 🔄 Historial de Cambios

### Diciembre 2024 - Solución Final para Resolución de Módulos

**Problema resuelto**: Error de resolución de módulos en desarrollo (`Cannot find module 'C:\prisma\generated'`)

**Solución implementada**: 
- Uso de `createRequire` con `process.cwd()` para resolver la ruta de Prisma de forma absoluta
- Esto evita problemas de resolución de rutas relativas en el contexto de Nuxt/Nitro
- Funciona correctamente en desarrollo, build y producción

**Archivos modificados**:
- `server/utils/prisma.ts`: Cambiado de importación relativa a `createRequire` con ruta absoluta

**Código implementado**:
```typescript
import { join } from "path";
import { createRequire } from "module";

// Resolver la ruta de Prisma de forma absoluta usando createRequire
// Usamos package.json como archivo base para createRequire (siempre existe)
const baseFile = join(process.cwd(), "package.json");
const require = createRequire(`file://${baseFile}`);
const prismaPath = join(process.cwd(), "prisma/generated/index.js");
const { PrismaClient } = require(prismaPath);
```

### Diciembre 2024 - Plugin de Nitro y Configuración de pnpm

**Mejoras implementadas**:
- Plugin de Nitro (`server/plugins/prisma-polyfill.ts`) para definir `__dirname` automáticamente
- Configuración de `.npmrc` para resolver problemas de hoisting con pnpm
- Script `postinstall` para generar Prisma Client automáticamente en deployments

**Archivos agregados**:
- `server/plugins/prisma-polyfill.ts`: Plugin de Nitro para polyfill automático
- `.npmrc`: Configuración de hoisting para pnpm

---

**Última actualización**: Diciembre 2024
**Versiones probadas**: 
- Nuxt 3.16.2
- Prisma 6.5.0
- Node.js 18+ (probado con Node.js 23.7.0)
- pnpm 9.12.0

