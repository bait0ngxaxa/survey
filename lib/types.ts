export interface Part1Data {
    bloodSugarKnown: string;
    fastingLevel: string;
    hba1cLevel: string;
    visitDoctor: string;
    notVisitReason: string;
}

export interface SectionTwoData {
    respondentName: string;
    gender: string;
    age: string;
    birthDate: string;
    education: string;
    educationOther: string;
    maritalStatus: string;
    occupation: string;
    occupationOther: string;
    income: string;
    supportSource: string;
    supportSourceOther: string;
    financialStatus: string;
    diabetesDuration: string;
    diabetesAge: string;
    treatmentType: string;
    treatmentOther: string;
    medicationCount: string;
    paymentMethod: string;
    paymentMethodOther: string;
    livingArrangement: string;
    livingMembers: string;
    livingArrangementOther: string;
    familySupport: string;
    workSupport: string;
    dietFood: string;
    dietSnack: string;
    dietDrink: string;
    alcohol: string;
    alcoholYears: string;
    alcoholDays: string;
    smoking: string;
    smokingYears: string;
    smokingAmount: string;
    otherDiseases: string;
    otherDiseasesList: string;
    complications: string[];
    complicationsOther: string;
    screenings: {
        physical: string;
        physicalOther: string;
        foot: string;
        footOther: string;
        eye: string;
        eyeOther: string;
        urine: string;
        urineOther: string;
        lipid: string;
        lipidOther: string;
        dental: string;
        dentalOther: string;
        hba1c: string;
        hba1cOther: string;
        other: string;
        otherText: string;
    };
    adviceReceived: string;
    adviceCount: string;
    adviceCountUnknown: boolean;
    adviceTopics: string;
    adviceSources: Record<string, string>;
    peerDiscussion: string;
    peerDiscussionTopic: string;
    activities: string;
    activitiesTopic: string;
    admissions: string;
    admissionCount: string;
    admissionReason: string;
}

export interface MedicalRecordData {
    bloodSugar: string;
    hba1c: string;
    bloodPressure: string;
    microAlbumin: string;
    microAlbuminRatio: string;
    microAlbuminOther: string;
    creatinine: string;
    weight: string;
    lipid_tchol: string;
    lipid_tg: string;
    lipid_ldl: string;
    lipid_hdl: string;
    otherDiseases: string;
    diabetesDurationYears: string;
    diabetesDurationMonths: string;
}

export interface SectionFourData {
    answers: Record<number, number>;
    reportData?: Record<string, any>;
}
