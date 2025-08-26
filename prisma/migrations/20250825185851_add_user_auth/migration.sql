/*
  Warnings:

  - The `likes` column on the `Dream` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Dream" DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER[];
