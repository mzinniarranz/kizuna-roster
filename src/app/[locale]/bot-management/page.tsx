import { auth } from "@/auth";
import { isGuildOfficer } from "@application/bot-management/isGuildOfficer";
import { getScheduledMessages } from "@application/bot-management/getScheduledMessages";
import { BotManagementPanel } from "@presentation/components/bot-management/BotManagementPanel";
import { UnauthorizedMessage } from "@presentation/components/bot-management/UnauthorizedMessage";
import { TopBar } from "@presentation/components/TopBar";

export default async function BotManagementPage() {
  const session = await auth();
  const sessionWithId = session as typeof session & { userId?: string };

  const isUnauthorized =
    !sessionWithId?.userId ||
    !(await isGuildOfficer(sessionWithId.userId).catch(() => false));

  if (isUnauthorized) {
    return (
      <div className="flex flex-col h-screen bg-[#06090f]">
        <TopBar />
        <UnauthorizedMessage />
      </div>
    );
  }

  const messages = await getScheduledMessages();
  const serialized = messages.map((m) => ({
    ...m,
    startDate: m.startDate.toISOString(),
    endDate: m.endDate.toISOString(),
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-col h-screen bg-[#06090f]">
      <TopBar />
      <BotManagementPanel initialMessages={serialized} />
    </div>
  );
}
