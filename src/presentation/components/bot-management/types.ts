export interface ScheduledMessageData {
  id: string;
  text: string;
  date: string;
  dayOfWeek: number;
  hour: number;
  minute: number;
  startDate: string;
  endDate: string;
  channelId: string | null;
  createdByBlizzardId: string;
  createdAt: string;
}

export interface MessageFormState {
  text: string;
  date: string;
  dayOfWeek: number;
  time: string;
  startDate: string;
  endDate: string;
}

export function emptyForm(): MessageFormState {
  const today = new Date().toISOString().slice(0, 10);
  const threeMonthsLater = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  return {
    text: "",
    date: today,
    dayOfWeek: 1,
    time: "19:00",
    startDate: today,
    endDate: threeMonthsLater,
  };
}
