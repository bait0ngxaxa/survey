-- Add nullable historical snapshot fields so legacy submissions remain valid.
ALTER TABLE "SurveySubmission"
    ADD COLUMN "respondentNameSnapshot" TEXT,
    ADD COLUMN "genderSnapshot" TEXT,
    ADD COLUMN "birthDateSnapshot" TIMESTAMP(3);

-- A submission may now exist without an identified Patient.
ALTER TABLE "SurveySubmission"
    DROP CONSTRAINT "SurveySubmission_patientId_fkey";

ALTER TABLE "SurveySubmission"
    ALTER COLUMN "patientId" DROP NOT NULL;

ALTER TABLE "SurveySubmission"
    ADD CONSTRAINT "SurveySubmission_patientId_fkey"
    FOREIGN KEY ("patientId") REFERENCES "Patient"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
