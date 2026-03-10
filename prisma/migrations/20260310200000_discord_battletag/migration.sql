-- CreateTable
CREATE TABLE "UserProfile" (
    "blizzardId" TEXT NOT NULL,
    "battleTag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("blizzardId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_battleTag_key" ON "UserProfile"("battleTag");

-- DropForeignKey
ALTER TABLE "DiscordLink" DROP CONSTRAINT "DiscordLink_characterId_fkey";

-- DropIndex
DROP INDEX "DiscordLink_characterId_key";

-- AlterTable
ALTER TABLE "DiscordLink" DROP COLUMN "characterId",
ADD COLUMN "blizzardUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "LinkCode";

-- CreateIndex
CREATE UNIQUE INDEX "DiscordLink_blizzardUserId_key" ON "DiscordLink"("blizzardUserId");

-- AddForeignKey
ALTER TABLE "DiscordLink" ADD CONSTRAINT "DiscordLink_blizzardUserId_fkey" FOREIGN KEY ("blizzardUserId") REFERENCES "UserProfile"("blizzardId") ON UPDATE CASCADE ON DELETE RESTRICT;
