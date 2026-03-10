import { prisma } from "@infrastructure/db/prisma";

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const events = await prisma.raidEvent.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: 5,
  });

  return events.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date.toISOString(),
  }));
}
