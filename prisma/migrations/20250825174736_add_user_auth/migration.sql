-- AddForeignKey
ALTER TABLE "public"."Dream" ADD CONSTRAINT "Dream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
