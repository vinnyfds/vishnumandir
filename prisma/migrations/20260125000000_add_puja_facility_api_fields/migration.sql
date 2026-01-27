-- AlterTable PujaSponsorship: add pujaId, location, attachmentUrl, transactionId
ALTER TABLE "PujaSponsorship" ADD COLUMN IF NOT EXISTS "pujaId" TEXT DEFAULT 'legacy';
ALTER TABLE "PujaSponsorship" ADD COLUMN IF NOT EXISTS "location" TEXT;
ALTER TABLE "PujaSponsorship" ADD COLUMN IF NOT EXISTS "attachmentUrl" TEXT;
ALTER TABLE "PujaSponsorship" ADD COLUMN IF NOT EXISTS "transactionId" TEXT;
UPDATE "PujaSponsorship" SET "pujaId" = COALESCE("pujaId", 'legacy') WHERE "pujaId" IS NULL;
ALTER TABLE "PujaSponsorship" ALTER COLUMN "pujaId" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "PujaSponsorship_transactionId_key" ON "PujaSponsorship"("transactionId");

-- AlterTable FacilityRequest: add eventType, startTime, endTime, numberOfGuests, requirements, transactionId; eventName nullable; rename attendees -> numberOfGuests (if exists)
ALTER TABLE "FacilityRequest" ADD COLUMN IF NOT EXISTS "eventType" TEXT DEFAULT 'other';
ALTER TABLE "FacilityRequest" ADD COLUMN IF NOT EXISTS "startTime" TEXT;
ALTER TABLE "FacilityRequest" ADD COLUMN IF NOT EXISTS "endTime" TEXT;
ALTER TABLE "FacilityRequest" ADD COLUMN IF NOT EXISTS "numberOfGuests" INTEGER;
ALTER TABLE "FacilityRequest" ADD COLUMN IF NOT EXISTS "requirements" TEXT;
ALTER TABLE "FacilityRequest" ADD COLUMN IF NOT EXISTS "transactionId" TEXT;
-- Only update numberOfGuests from attendees if attendees column exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='FacilityRequest' AND column_name='attendees') THEN
    UPDATE "FacilityRequest" SET "numberOfGuests" = "attendees" WHERE "numberOfGuests" IS NULL;
    ALTER TABLE "FacilityRequest" DROP COLUMN IF EXISTS "attendees";
  END IF;
END $$;
UPDATE "FacilityRequest" SET "eventType" = COALESCE("eventType", 'other') WHERE "eventType" IS NULL;
ALTER TABLE "FacilityRequest" ALTER COLUMN "numberOfGuests" SET NOT NULL;
ALTER TABLE "FacilityRequest" ALTER COLUMN "eventType" SET NOT NULL;
ALTER TABLE "FacilityRequest" ALTER COLUMN "eventName" DROP NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "FacilityRequest_transactionId_key" ON "FacilityRequest"("transactionId");
