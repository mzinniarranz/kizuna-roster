// dayOfWeek: 0 = Sunday, 1 = Monday, ..., 6 = Saturday (matches JS Date / node-cron)
export interface BotScheduledMessage {
  id: string;
  text: string;
  date: Date;
  dayOfWeek: number;
  hour: number;
  minute: number;
  startDate: Date;
  endDate: Date;
  channelId: string | null;
  discordMsgId: string | null;
  createdByBlizzardId: string;
  createdAt: Date;
}
