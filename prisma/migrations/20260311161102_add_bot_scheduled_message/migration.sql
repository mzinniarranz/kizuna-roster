-- CreateTable
CREATE TABLE "BotScheduledMessage" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "channelId" TEXT,
    "createdByBlizzardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BotScheduledMessage_pkey" PRIMARY KEY ("id")
);
