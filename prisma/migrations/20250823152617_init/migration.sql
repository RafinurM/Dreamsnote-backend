-- DropForeignKey
ALTER TABLE "public"."Dream" DROP CONSTRAINT "Dream_userId_fkey";

-- CreateTable
CREATE TABLE "public"."_DreamToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DreamToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DreamToUser_B_index" ON "public"."_DreamToUser"("B");

-- AddForeignKey
ALTER TABLE "public"."_DreamToUser" ADD CONSTRAINT "_DreamToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Dream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DreamToUser" ADD CONSTRAINT "_DreamToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
