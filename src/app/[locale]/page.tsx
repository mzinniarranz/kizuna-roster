import { auth } from "@/auth";
import { getRoster } from "@application/roster/getRoster";
import { getRosterComposition } from "@application/roster/getRosterComposition";
import { prismaCharacterRepository } from "@infrastructure/character/prismaCharacterRepository";
import { RosterSidebar } from "@presentation/components/roster/RosterSidebar";
import { CompositionTable } from "@presentation/components/roster/CompositionTable";
import { RosterPoller } from "@presentation/components/roster/RosterPoller";
import { AppFooter } from "@presentation/components/AppFooter";

export default async function HomePage() {
  const session = await auth();
  const sessionWithToken = session as typeof session & { userId?: string };

  const [characters, composition] = await Promise.all([
    getRoster(prismaCharacterRepository),
    getRosterComposition(prismaCharacterRepository),
  ]);

  return (
    <div className="flex h-screen bg-[#06090f] overflow-hidden">
      <RosterPoller />
      <div className="w-64 flex-shrink-0 border-r border-[#1a2438] overflow-hidden bg-[#090d1a]">
        <RosterSidebar
          characters={characters}
          userId={sessionWithToken?.userId}
        />
      </div>
      <main
        className="flex-1 overflow-y-auto px-10 py-10 flex flex-col gap-10 items-center justify-start"
        style={{
          background:
            "radial-gradient(ellipse 100% 45% at 50% -5%, #0d1e3f 0%, #06090f 60%)",
        }}
      >
        <CompositionTable composition={composition} />
        <AppFooter />
      </main>
    </div>
  );
}
