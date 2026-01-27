-- CreateEnum UserRole
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR', 'FINANCE', 'EVENT_MANAGER');

-- CreateEnum EventType
CREATE TYPE "EventType" AS ENUM ('PUJA', 'CULTURAL', 'EDUCATION', 'FESTIVAL');

-- CreateEnum DonationFrequency
CREATE TYPE "DonationFrequency" AS ENUM ('ONE_TIME', 'MONTHLY', 'YEARLY');

-- CreateEnum FormSubmissionType
CREATE TYPE "FormSubmissionType" AS ENUM ('DONATION_STATEMENT', 'CHANGE_OF_ADDRESS', 'EMAIL_SUBSCRIPTION');

-- CreateTable User
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable Event
CREATE TABLE IF NOT EXISTS "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "category" "EventType" NOT NULL,
    "location" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable Donation
CREATE TABLE IF NOT EXISTS "Donation" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "donorName" TEXT NOT NULL,
    "donorEmail" TEXT NOT NULL,
    "frequency" "DonationFrequency" NOT NULL,
    "stripePaymentId" TEXT,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable PujaSponsorship
CREATE TABLE IF NOT EXISTS "PujaSponsorship" (
    "id" TEXT NOT NULL,
    "pujaId" TEXT NOT NULL,
    "pujaServiceName" TEXT NOT NULL,
    "sponsorName" TEXT NOT NULL,
    "sponsorEmail" TEXT NOT NULL,
    "sponsorPhone" TEXT,
    "requestedDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "notes" TEXT,
    "attachmentUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PujaSponsorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable FacilityRequest
CREATE TABLE IF NOT EXISTS "FacilityRequest" (
    "id" TEXT NOT NULL,
    "requesterName" TEXT NOT NULL,
    "requesterEmail" TEXT NOT NULL,
    "requesterPhone" TEXT NOT NULL,
    "eventType" TEXT NOT NULL DEFAULT 'other',
    "eventName" TEXT,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "numberOfGuests" INTEGER NOT NULL,
    "details" TEXT,
    "requirements" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacilityRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable Newsletter
CREATE TABLE IF NOT EXISTS "Newsletter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable FormSubmission
CREATE TABLE IF NOT EXISTS "FormSubmission" (
    "id" TEXT NOT NULL,
    "formType" "FormSubmissionType" NOT NULL,
    "email" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex User_email_key
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- CreateIndex Donation_stripePaymentId_key
CREATE UNIQUE INDEX IF NOT EXISTS "Donation_stripePaymentId_key" ON "Donation"("stripePaymentId");

-- CreateIndex PujaSponsorship_transactionId_key
CREATE UNIQUE INDEX IF NOT EXISTS "PujaSponsorship_transactionId_key" ON "PujaSponsorship"("transactionId");

-- CreateIndex FacilityRequest_transactionId_key
CREATE UNIQUE INDEX IF NOT EXISTS "FacilityRequest_transactionId_key" ON "FacilityRequest"("transactionId");

-- CreateIndex FormSubmission_transactionId_key
CREATE UNIQUE INDEX IF NOT EXISTS "FormSubmission_transactionId_key" ON "FormSubmission"("transactionId");
