import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import SurveyForm from "@/components/SurveyForm";

import { surveyData } from "@/config/surveyData";

interface SurveyPageProps {
    params: Promise<{
        region: string;
    }>;
}

export default async function SurveyPage({ params }: SurveyPageProps) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const { region } = await params;
    const config = surveyData[region];

    if (!config) {
        return notFound();
    }

    return <SurveyForm config={config} region={region} />;
}
