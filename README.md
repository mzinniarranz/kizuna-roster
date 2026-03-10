# Kizuna

Gestor de roster para raids de World of Warcraft. Permite añadir personajes manualmente o importarlos desde la guild via API de Blizzard. Autenticación con Battle.net OAuth.

## Stack

- Next.js 15 · React 19 · Tailwind CSS v4
- Prisma + SQLite (local) / PostgreSQL (producción)
- NextAuth v5 — proveedor Battle.net
- next-intl — soporte en/es

## Desarrollo local

### Requisitos

- Node.js 20+
- pnpm

### Instalación

```bash
pnpm install
```

### Variables de entorno

Copia `.env.local` y rellena los valores:

```bash
cp .env.local .env
```

Necesitas una app registrada en [Battle.net Developer Portal](https://develop.battle.net/) para obtener `BLIZZARD_CLIENT_ID` y `BLIZZARD_CLIENT_SECRET`.

Genera `AUTH_SECRET` con:

```bash
npx auth secret
```

### Base de datos

```bash
pnpm prisma migrate dev
```

### Arrancar

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).
