/*
  Warnings:

  - Added the required column `start_time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "start_time" TEXT NOT NULL,
ALTER COLUMN "doors_open" SET DATA TYPE TEXT;
