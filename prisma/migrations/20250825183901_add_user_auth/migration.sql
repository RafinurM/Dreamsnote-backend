-- DropForeignKey
ALTER TABLE "public"."Dream" DROP CONSTRAINT "Dream_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "dreams" TEXT[];
