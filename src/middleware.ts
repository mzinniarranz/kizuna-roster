import NextAuth from "next-auth";
import createIntlMiddleware from "next-intl/middleware";

import { authConfig } from "./auth.config";
import { routing } from "./i18n/routing";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createIntlMiddleware(routing);

export default auth((request) => {
  return intlMiddleware(request);
});

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
