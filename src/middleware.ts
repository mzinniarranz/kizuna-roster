import { auth } from "@/auth";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

export default auth((request: NextRequest & { auth: unknown }) => {
  return intlMiddleware(request);
});

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
