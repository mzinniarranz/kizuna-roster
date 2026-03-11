import { prisma } from "@infrastructure/db/prisma";

export async function getMonthEventAttendance(
  year: number,
  month: number // 0-indexed
): Promise<Record<number, number>> {
  const events = await prisma.raidEvent.findMany({
    where: {
      date: {
        gte: new Date(Date.UTC(year, month, 1)),
        lt: new Date(Date.UTC(year, month + 1, 1)),
      },
    },
    include: {
      _count: { select: { attendances: true } },
    },
  });

  return Object.fromEntries(
    events.map((event) => [event.date.getUTCDate(), event._count.attendances])
  );
}
