-- CreateEnum (safe - checks if already exists)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'FormSubmissionType') THEN
    CREATE TYPE "FormSubmissionType" AS ENUM ('DONATION_STATEMENT', 'CHANGE_OF_ADDRESS', 'EMAIL_SUBSCRIPTION');
  END IF;
END $$;

-- CreateTable (safe - uses IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS "FormSubmission" (
    "id" TEXT NOT NULL,
    "formType" "FormSubmissionType" NOT NULL,
    "email" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (safe - uses IF NOT EXISTS)
CREATE UNIQUE INDEX IF NOT EXISTS "FormSubmission_transactionId_key" ON "FormSubmission"("transactionId");
