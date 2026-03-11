import { auth } from "@/auth";
import { isGuildOfficer } from "@application/bot-management/isGuildOfficer";
import { getScheduledMessages } from "@application/bot-management/getScheduledMessages";
import { BotManagementPanel } from "@presentation/components/bot-management/BotManagementPanel";
import { UnauthorizedMessage } from "@presentation/components/bot-management/UnauthorizedMessage";

export default async function BotManagementPage() {
  const session = await auth();
  const sessionWithId = session as typeof session & { userId?: string };

  if (!sessionWithId?.userId) {
    return <UnauthorizedMessage />;
  }

  const officer = await isGuildOfficer(sessionWithId.userId);
  if (!officer) {
    return <UnauthorizedMessage />;
  }

  const messages = await getScheduledMessages();
  const serialized = messages.map((m) => ({
    ...m,
    startDate: m.startDate.toISOString(),
    endDate: m.endDate.toISOString(),
    createdAt: m.createdAt.toISOString(),
  }));

  return <BotManagementPanel initialMessages={serialized} />;
}
