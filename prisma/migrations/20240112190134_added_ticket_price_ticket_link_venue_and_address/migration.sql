/*
  Warnings:

  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.
  - Added the required column `address` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_link` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_price` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue_name` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "ticket_link" TEXT NOT NULL,
ADD COLUMN     "ticket_price" TEXT NOT NULL,
ADD COLUMN     "venue_name" TEXT NOT NULL;
