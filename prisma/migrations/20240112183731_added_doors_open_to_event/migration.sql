/*
  Warnings:

  - Added the required column `doors_open` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "doors_open" TIMESTAMP(3) NOT NULL;
