import prisma from "../../lib/prisma";
import { getSubmissionSnapshot } from "../../lib/utils/submissionSnapshot";

async function backfillSubmissionSnapshots(): Promise<void> {
    const submissions = await prisma.surveySubmission.findMany({
        select: {
            id: true,
            respondentNameSnapshot: true,
            genderSnapshot: true,
            birthDateSnapshot: true,
            rawAnswers: true,
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    gender: true,
                    birthDate: true,
                    nationalId: true,
                },
            },
        },
    });

    let updatedRecords = 0;
    let respondentNameUpdates = 0;
    let genderUpdates = 0;
    let birthDateUpdates = 0;

    for (const submission of submissions) {
        const snapshot = getSubmissionSnapshot(submission);
        let recordUpdated = false;

        if (
            submission.respondentNameSnapshot === null &&
            snapshot.respondentName !== null
        ) {
            const result = await prisma.surveySubmission.updateMany({
                where: {
                    id: submission.id,
                    respondentNameSnapshot: null,
                },
                data: { respondentNameSnapshot: snapshot.respondentName },
            });
            if (result.count > 0) {
                respondentNameUpdates += 1;
                recordUpdated = true;
            }
        }

        if (
            submission.genderSnapshot === null &&
            snapshot.gender !== null
        ) {
            const result = await prisma.surveySubmission.updateMany({
                where: { id: submission.id, genderSnapshot: null },
                data: { genderSnapshot: snapshot.gender },
            });
            if (result.count > 0) {
                genderUpdates += 1;
                recordUpdated = true;
            }
        }

        if (
            submission.birthDateSnapshot === null &&
            snapshot.birthDate !== null
        ) {
            const result = await prisma.surveySubmission.updateMany({
                where: { id: submission.id, birthDateSnapshot: null },
                data: { birthDateSnapshot: snapshot.birthDate },
            });
            if (result.count > 0) {
                birthDateUpdates += 1;
                recordUpdated = true;
            }
        }

        if (recordUpdated) updatedRecords += 1;
    }

    console.warn(`Checked ${submissions.length} survey submissions.`);
    console.warn(`Updated ${updatedRecords} survey submissions.`);
    console.warn(
        `Snapshot fields updated: respondentName=${respondentNameUpdates}, gender=${genderUpdates}, birthDate=${birthDateUpdates}.`,
    );
}

async function main(): Promise<void> {
    try {
        await backfillSubmissionSnapshots();
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error: unknown) => {
    console.error("Submission snapshot backfill failed.", error);
    process.exitCode = 1;
});
