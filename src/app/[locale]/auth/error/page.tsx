import Link from "next/link";

interface AuthErrorPageProps {
  searchParams: Promise<{ error?: string }>;
}

const ERROR_MESSAGE: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The sign-in link is no longer valid.",
  Default: "An unexpected error occurred during sign in.",
};

export default async function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  const { error } = await searchParams;
  const message = ERROR_MESSAGE[error ?? "Default"] ?? ERROR_MESSAGE.Default;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-white">Authentication error</h1>
          <p className="text-sm text-white/50">{message}</p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 text-sm font-semibold rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
