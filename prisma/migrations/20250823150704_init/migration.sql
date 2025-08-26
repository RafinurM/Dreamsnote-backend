/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Post";

-- CreateTable
CREATE TABLE "public"."Dream" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Dream_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Dream" ADD CONSTRAINT "Dream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
