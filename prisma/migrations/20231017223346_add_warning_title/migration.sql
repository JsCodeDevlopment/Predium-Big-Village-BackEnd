/*
  Warnings:

  - Added the required column `title` to the `Warnings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Warnings" ADD COLUMN     "title" TEXT NOT NULL;