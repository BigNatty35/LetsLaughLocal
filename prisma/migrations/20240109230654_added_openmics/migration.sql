-- CreateTable
CREATE TABLE "OpenMic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "frequency" TEXT NOT NULL,
    "signupForm" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "signupTime" TIMESTAMP(3) NOT NULL,
    "info" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpenMic_pkey" PRIMARY KEY ("id")
);
