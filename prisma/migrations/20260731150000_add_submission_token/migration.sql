-- Add a durable idempotency key to every submission.
ALTER TABLE "SurveySubmission"
    ADD COLUMN "submissionToken" TEXT;

-- Backfill legacy rows before enforcing the non-null constraint.
UPDATE "SurveySubmission"
SET "submissionToken" = gen_random_uuid()::text
WHERE "submissionToken" IS NULL;

ALTER TABLE "SurveySubmission"
    ALTER COLUMN "submissionToken" SET NOT NULL;

CREATE UNIQUE INDEX "SurveySubmission_submissionToken_key"
    ON "SurveySubmission"("submissionToken");
