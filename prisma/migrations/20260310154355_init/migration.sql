-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "realmSlug" TEXT NOT NULL,
    "wowClass" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "blizzardId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_blizzardId_key" ON "Character"("blizzardId");
