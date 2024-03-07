-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "ticket_link" DROP NOT NULL,
ALTER COLUMN "ticket_price" DROP NOT NULL,
ALTER COLUMN "ticket_price" SET DEFAULT 'Free';
