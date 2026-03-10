# Kizuna — Contexto del Proyecto

Aplicación web para gestión de roster de World of Warcraft. Autenticación vía Battle.net OAuth.

## Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + Tailwind CSS v4
- **ORM:** Prisma con SQLite (`prisma/kizuna.db`)
- **Auth:** NextAuth v5 (beta) — proveedor Battle.net
- **i18n:** next-intl — locales `en` y `es`, enrutado por `[locale]`
- **Package manager:** pnpm

## Arquitectura

Sigue arquitectura hexagonal. Los alias de path ya están configurados en `tsconfig.json`:

```
@domain/*       → src/domain/*
@application/*  → src/application/*
@infrastructure/* → src/infrastructure/*
@presentation/* → src/presentation/*
@/*             → src/*
```

### Dónde va cada cosa

| Qué | Dónde |
|-----|-------|
| Entidades, interfaces de repositorio, value objects | `src/domain/` |
| Casos de uso | `src/application/` |
| Prisma, APIs externas (Blizzard), adapters | `src/infrastructure/` |
| Componentes, páginas, hooks de UI | `src/presentation/` |
| Páginas y layouts Next.js | `src/app/[locale]/` |
| Rutas API | `src/app/api/` |

## Comandos

```bash
pnpm dev          # Desarrollo
pnpm build        # Build producción
pnpm lint         # ESLint
pnpm tsc --noEmit # Type check
```

## Internacionalización

El proyecto está en dos idiomas: **inglés (`en`)** y **español (`es`)**.

- Cualquier texto visible al usuario debe tener su key en `messages/en.json` **y** `messages/es.json`
- Antes de dar una tarea por terminada, comprobar que ambos archivos tienen las mismas keys traducidas
- Nunca dejar strings literales en los componentes — usar siempre `useTranslations` de next-intl

## Consideraciones

- La sesión de usuario llega desde NextAuth (`auth.ts`); el `addedById` en Character viene del `userId` de la sesión
- El cliente Prisma es un singleton en `src/infrastructure/db/prisma.ts`
- Los textos visibles al usuario van en `messages/en.json` y `messages/es.json`
- `wowClassConfig.ts` contiene colores y etiquetas UI de clases WoW — no mezclar con el dominio
