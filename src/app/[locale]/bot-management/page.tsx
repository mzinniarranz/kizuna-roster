import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { isGuildOfficer } from "@application/bot-management/isGuildOfficer";
import { getScheduledMessages } from "@application/bot-management/getScheduledMessages";
import { BotManagementPanel } from "@presentation/components/bot-management/BotManagementPanel";

export default async function BotManagementPage() {
  const session = await auth();
  const sessionWithId = session as typeof session & { userId?: string };

  if (!sessionWithId?.userId) {
    redirect("/");
  }

  const officer = await isGuildOfficer(sessionWithId.userId);
  if (!officer) {
    redirect("/");
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
