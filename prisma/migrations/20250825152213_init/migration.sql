/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_DreamToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_DreamToUser" DROP CONSTRAINT "_DreamToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_DreamToUser" DROP CONSTRAINT "_DreamToUser_B_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "password",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_DreamToUser";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
