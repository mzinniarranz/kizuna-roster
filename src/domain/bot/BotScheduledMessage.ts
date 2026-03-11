// dayOfWeek: 0 = Sunday, 1 = Monday, ..., 6 = Saturday (matches JS Date / node-cron)
export interface BotScheduledMessage {
  id: string;
  text: string;
  dayOfWeek: number;
  hour: number;
  minute: number;
  startDate: Date;
  endDate: Date;
  channelId: string | null;
  createdByBlizzardId: string;
  createdAt: Date;
}
