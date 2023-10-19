/*
  Warnings:

  - Added the required column `people_id` to the `Vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicles" ADD COLUMN     "people_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicles" ADD CONSTRAINT "Vehicles_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
