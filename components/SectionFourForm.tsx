"use client";

import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import AlertModal from "@/components/AlertModal";
import { Part4Section } from "@/config/part4Data";

interface SectionFourFormProps {
    data: Part4Section[];
    answers: Record<number, number>;
    onAnswer: (questionId: number, score: number) => void;
    onBack: () => void;
    onSubmit: () => void | Promise<void>;
    isSubmitting?: boolean;
    region?: string;
    recommendations?: Record<string, any>;
    onRecommendationsChange?: (recs: Record<string, any>) => void;
    additionalInfo?: Record<string, any>;
    onAdditionalInfoChange?: (info: Record<string, any>) => void;
    respondentName?: string;
    interviewerName?: string;
}

// Group definitions for Central region logic
const CENTRAL_GROUPS = [
    {
        id: 1,
        questions: [1],
        label: "ข้อที่ 1\nความสามารถทำกิจวัตรประจำวัน", // Adjusted label for display
        questionsLabel: "1",
        dimension: "การทำงาน\nของร่างกาย",
    },
    {
        id: 2,
        questions: [2, 3],
        label: "ข้อที่ 2-3\nการเคลื่อนไหว / ความทนทาน",
        questionsLabel: "2-3",
        dimension: "การทำงาน\nของร่างกาย",
    },
    {
        id: 3,
        questions: [4, 5, 6, 7],
        label: "ข้อที่ 4-7\nความรุนแรงของอาการ",
        questionsLabel: "4-7",
        dimension: "อาการของโรค",
    },
    {
        id: 4,
        questions: [8, 9, 10],
        label: "ข้อที่ 8-10\nความกังวล/ผลกระทบทางใจ",
        questionsLabel: "8-10",
        dimension: "สุขภาพจิตใจ",
    },
    {
        id: 5,
        questions: [11, 12, 14, 16],
        label: "ข้อที่ 11, 12, 14, 16\nการจัดการโรค/พฤติกรรมสุขภาพ",
        questionsLabel: "11,12,14,16",
        dimension: "การดูแลตนเอง",
    },
    {
        id: 6,
        questions: [13, 15],
        label: "ข้อที่ 13, 15\nการตัดสินใจ/การรับมือ",
        questionsLabel: "13,15",
        dimension: "การดูแลตนเอง",
    },
    {
        id: 7,
        questions: [17, 18, 19, 20],
        label: "ข้อที่ 17-20\nบทบาททางสังคม/ความเครียด",
        questionsLabel: "17-20",
        dimension: "สังคม",
    },
    {
        id: 8,
        questions: [21, 22, 23],
        label: "ข้อที่ 21-23\nการประเมินสุขภาพตนเอง",
        questionsLabel: "21-23",
        dimension: "สุขภาพโดยรวม",
    },
    {
        id: 9,
        questions: [24, 25, 26],
        label: "ข้อที่ 24-26\nความเข้าใจ/ข้อมูลการรักษา",
        questionsLabel: "24-26",
        dimension: "ความพึงพอใจ",
    },
    {
        id: 10,
        questions: [27, 28, 29],
        label: "ข้อที่ 27-29\nการตัดสินใจ/ความยืดหยุ่น",
        questionsLabel: "27-29",
        dimension: "ความพึงพอใจ",
    },
];

// UI Steps for Central region (7 steps)
const CENTRAL_UI_STEPS = [
    {
        questions: [1, 2, 3],
        containedGroups: [1, 2],
        title: "ข้อ 1-3 มิติการทำงานของร่างกาย (Physical Function)",
        description: `ข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน มากน้อยแค่ไหนในช่วง 1 เดือน ที่ผ่านมา

ตอนที่ 1 การทำงานของร่างกาย
เป็นการประเมินว่าใน 1 เดือนที่ผ่านมาท่านทำกิจกรรมต่าง ๆ ต่อไปนี้ในชีวิตประจำวันได้บ่อยแค่ไหน โดยมีเกณฑ์การให้คะแนน ดังนี้
คะแนน 1 = ทำไม่ได้เลย หมายถึง ท่านทำกิจกรรมนั้นไม่ได้เลย
คะแนน 2 = ทำได้นาน ๆ ครั้ง หมายถึง ท่านทำกิจกรรมนั้นได้ประมาณ 1 วันต่อสัปดาห์
คะแนน 3 = ทำได้บางครั้ง หมายถึง ท่านทำกิจกรรมนั้นได้ประมาณ 2-3 วันต่อสัปดาห์
คะแนน 4 = ทำได้บ่อย ๆ หมายถึง ท่านทำกิจกรรมนั้นได้ประมาณ 4 วันต่อสัปดาห์
คะแนน 5 = ทำได้เกือบทุกวัน หมายถึง ท่านทำกิจกรรมนั้นได้ประมาณ 5-6 วันต่อสัปดาห์
คะแนน 6 = ทำได้ทุกวัน หมายถึง ท่านทำกิจกรรมนั้นได้ทุกวัน`,
    },
    {
        questions: [4, 5, 6, 7],
        containedGroups: [3],
        title: "ข้อ 4-7 มิติอาการของโรค (Symptoms)",
        description: `ใน 1 เดือนที่ผ่านมาท่านมีอาการต่างๆต่อไปนี้บ่อยแค่ไหน

ตอนที่ 2 เกี่ยวกับอาการของโรค
เป็นการประเมินว่าใน 1 เดือนที่ผ่านมาท่านมีอาการต่างๆ ต่อไปนี้บ่อยแค่ไหน โดยมีเกณฑ์การให้คะแนน ดังนี้
คะแนน 1 = ไม่มีเลย หมายถึง ท่านไม่มีอาการต่างๆ นั้นเกิดขึ้นเลย
คะแนน 2 = มีนานๆ ครั้ง หมายถึง ท่านมีอาการต่างๆ นั้นเกิดขึ้นประมาณ 1 ครั้งต่อสัปดาห์
คะแนน 3 = มีบางครั้ง หมายถึง ท่านมีอาการต่างๆ นั้นเกิดขึ้นประมาณ 2-3 ครั้งต่อสัปดาห์
คะแนน 4 = มีบ่อยๆ หมายถึง ท่านมีอาการต่างๆ นั้นเกิดขึ้นประมาณ 4 ครั้งต่อสัปดาห์
คะแนน 5 = มีเกือบทุกวัน หมายถึง ท่านมีอาการต่างๆนั้นเกิดขึ้นประมาณ 5-6 ครั้งต่อสัปดาห์
คะแนน 6 = มีทุกวัน หมายถึง ท่านมีอาการต่างๆ นั้นเกิดขึ้นทุกวัน`,
    },
    {
        questions: [8, 9, 10],
        containedGroups: [4],
        title: "ข้อที่ 8-10 มิติสุขภาพทางด้านจิตใจ (Psychological Well-being)",
        description: `ข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน มากน้อยแค่ไหนในช่วง 1 เดือน ที่ผ่านมา

ตอนที่ 3 เกี่ยวกับเรื่องทางด้านจิตใจ
เป็นการประเมินว่าข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านมากน้อยแค่ไหน ในช่วง 1 เดือน ที่ผ่านมาโดยมีเกณฑ์การให้คะแนน ดังนี้
คะแนน 1 = ไม่ตรงเลย หมายถึง ข้อความนั้นไม่ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านเลย
คะแนน 2 = ตรงน้อยมาก หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 1 ส่วนใน 5 ส่วน
คะแนน 3 = ตรงบ้าง หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 2 ส่วนใน 5 ส่วน
คะแนน 4 = ตรงพอสมควร หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 3 ส่วนใน 5 ส่วน
คะแนน 5 = ตรงเกือบทั้งหมดหมายถึงข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 4 ส่วนใน 5 ส่วน
คะแนน 6 = ตรงทั้งหมด หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านทั้งหมด`,
    },
    {
        questions: [11, 12, 13, 14, 15, 16], // Combined G5 and G6 questions as requested (11-16)
        containedGroups: [5, 6],
        title: "ข้อ 11-16 มิติทางด้านบทบาทการดูแลตนเอง (Self - care management)",
        description: `ข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน มากน้อยแค่ไหนในช่วง 1 เดือน ที่ผ่านมา

ตอนที่ 4 เกี่ยวกับเรื่อง การจัดการดูแลตนเอง
เป็นการประเมินว่าข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านมากน้อยแค่ไหน ในช่วง 1 เดือน ที่ผ่านมาโดยมีเกณฑ์การให้คะแนน ดังนี้
คะแนน 1 = ไม่ตรงเลย หมายถึง ข้อความนั้นไม่ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านเลย
คะแนน 2 = ตรงน้อยมาก หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 1 ส่วนใน 5 ส่วน
คะแนน 3 = ตรงบ้าง หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 2 ส่วนใน 5 ส่วน
คะแนน 4 = ตรงพอสมควร หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 3 ส่วนใน 5 ส่วน
คะแนน 5 = ตรงเกือบทั้งหมดหมายถึงข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 4 ส่วนใน 5 ส่วน
คะแนน 6 = ตรงทั้งหมด หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านทั้งหมด`,
    },
    {
        questions: [17, 18, 19, 20],
        containedGroups: [7],
        title: "ข้อ 17-20 มิติทางด้านสังคม(Social well-being)",
        description: `ข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน มากน้อยแค่ไหนในช่วง 1 เดือน ที่ผ่านมา

ตอนที่ 5 เกี่ยวกับเรื่องทางสังคม
เป็นการประเมินว่าข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านมากน้อยแค่ไหน ในช่วง 1 เดือน ที่ผ่านมาโดยมีเกณฑ์การให้คะแนน ดังนี้
คะแนน 1 = ไม่ตรงเลย หมายถึง ข้อความนั้นไม่ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านเลย
คะแนน 2 = ตรงน้อยมาก หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 1 ส่วนใน 5 ส่วน
คะแนน 3 = ตรงบ้าง หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 2 ส่วนใน 5 ส่วน
คะแนน 4 = ตรงพอสมควร หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 3 ส่วนใน 5 ส่วน
คะแนน 5 = ตรงเกือบทั้งหมดหมายถึงข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 4 ส่วนใน 5 ส่วน
คะแนน 6 = ตรงทั้งหมด หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านทั้งหมด`,
    },
    {
        questions: [21, 22, 23],
        containedGroups: [8],
        title: "ข้อ 21-23 มิติสุขภาพโดยรวม(Global judgments of health)",
        description: `ข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน มากน้อยแค่ไหนในช่วง 1 เดือน ที่ผ่านมา

ตอนที่ 6 เกี่ยวกับเรื่องสุขภาพโดยรวม
เป็นการประเมินว่าข้อความต่อไปนี้ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านมากน้อยแค่ไหน ในช่วง 1 เดือน ที่ผ่านมาโดยมีเกณฑ์การให้คะแนน ดังนี้
คะแนน 1 = ไม่ตรงเลย หมายถึง ข้อความนั้นไม่ตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านเลย
คะแนน 2 = ตรงน้อยมาก หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 1 ส่วนใน 5 ส่วน
คะแนน 3 = ตรงบ้าง หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 2 ส่วนใน 5 ส่วน
คะแนน 4 = ตรงพอสมควร หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 3 ส่วนใน 5 ส่วน
คะแนน 5 = ตรงเกือบทั้งหมดหมายถึงข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่าน 4 ส่วนใน 5 ส่วน
คะแนน 6 = ตรงทั้งหมด หมายถึง ข้อความนั้นตรงกับความเป็นจริงที่เกิดขึ้นกับตัวท่านทั้งหมด`,
    },
    {
        questions: [24, 25, 26, 27, 28, 29], // Combined G9 and G10
        containedGroups: [9, 10],
        title: "ข้อ 24-29 มิติความพึงพอใจต่อการรักษาและการดูแล(Satisfaction with care and flexibility of treatment)",
        description: `ท่านพึงพอใจต่อการดูแลรักษาและการควบคุม เบาหวาน ของท่านและบุคคลากรทางการแพทย์มากน้อยแค่ไหน

ตอนที่ 7 เกี่ยวกับความพึงพอใจต่อการดูแลรักษา
เป็นการประเมินว่าท่านพึงพอใจต่อการดูแลรักษาและการควบคุมเบาหวานของ ท่านและบุคคลากรทางการแพทย์มากน้อยแค่ไหนในเรื่องต่อไปนี้
โดยมีเกณฑ์การให้คะแนน ดังนี้
คะแนน 1 = ไม่พอใจเลย หมายถึง ท่านไม่พึงพอใจต่อเรื่องนั้นเลย
คะแนน 2 = พอใจน้อยมาก หมายถึง ท่านพึงพอใจต่อเรื่องนั้น 1 ส่วนใน 5 ส่วน
คะแนน 3 = พอใจบ้าง หมายถึง ท่านพึงพอใจต่อเรื่องนั้น 2 ส่วนใน 5 ส่วน
คะแนน 4 = พอใจพอสมควร หมายถึง ท่านพึงพอใจต่อเรื่องนั้น 3 ส่วนใน 5 ส่วน
คะแนน 5 = พอใจมาก หมายถึง ท่านพึงพอใจต่อเรื่องนั้น 4 ส่วนใน 5 ส่วน
คะแนน 6 = พอใจมากที่สุด หมายถึง ท่านพึงพอใจต่อเรื่องนั้นมากที่สุด`,
    },
];

export default function SectionFourForm({
    data,
    answers,
    onAnswer,
    onBack,
    onSubmit,
    region,
    recommendations = {},
    onRecommendationsChange,
    additionalInfo = {},
    onAdditionalInfoChange,
    respondentName,
    interviewerName,
    isSubmitting: isSubmittingProp = false,
}: SectionFourFormProps) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Use prop if available, otherwise local state (though we prefer prop now)
    // We can just use the prop directly for the loading indicator.
    // But we need to handle the "handleConfirmSubmit" logic.

    // We'll keep a local one just in case parent doesn't provide it,
    // OR just rely on the prop + local "optimistic" loading if needed.
    // Actually, let's purely rely on the prop if provided, or fallback to local.
    // But mixing them is messy.
    // Let's assume we will pass it from parent.
    // For backward compatibility or testing, we can keep local state but sync it?
    // Simpler: user clicked -> set local true. Parent props update -> effectively true.
    // If we use prop, use prop.

    const [localIsSubmitting, setLocalIsSubmitting] = useState(false);

    const isSubmitting = isSubmittingProp || localIsSubmitting;

    const isCentral = region === "central";

    const handleAnswer = (questionId: number, score: number) => {
        onAnswer(questionId, score);
    };

    const handleAdditionalInfoChange = (key: string, value: any) => {
        if (onAdditionalInfoChange) {
            onAdditionalInfoChange({ ...additionalInfo, [key]: value });
        }
    };

    const NEGATIVE_QUESTIONS = [4, 5, 6, 7, 8, 19, 20, 21, 22];

    const getGroupAverage = (questionIds: number[]) => {
        if (questionIds.length === 0) return 0;
        const sum = questionIds.reduce((acc, id) => {
            let score = answers[id] || 0;
            if (NEGATIVE_QUESTIONS.includes(id) && score > 0) {
                score = 7 - score;
            }
            return acc + score;
        }, 0);
        return Math.round(sum / questionIds.length);
    };

    const validateCurrentStep = () => {
        if (!isCentral) return true;

        const currentUIStep = CENTRAL_UI_STEPS[currentStep];
        for (const qId of currentUIStep.questions) {
            if (!answers[qId]) {
                return false;
            }
        }

        // Conditional Check for Group 2 (Questions 2-3) if in this step
        if (currentUIStep.containedGroups.includes(2)) {
            const group2Avg = getGroupAverage([2, 3]);
            if (group2Avg > 0 && group2Avg <= 2) {
                if (!additionalInfo.movementLimit && !additionalInfo.tired) {
                    return false;
                }
            }
        }

        // Conditional Check for Group 9 (Questions 24-26) if in this step
        if (currentUIStep.containedGroups.includes(9)) {
            const group9Avg = getGroupAverage([24, 25, 26]);
            if (group9Avg > 0 && group9Avg <= 2) {
                if (
                    !additionalInfo.q9Topic ||
                    additionalInfo.q9Topic.trim() === ""
                ) {
                    return false;
                }
            }
        }

        return true;
    };

    const processStepLogic = () => {
        if (!isCentral || !onRecommendationsChange) return;

        const currentUIStep = CENTRAL_UI_STEPS[currentStep];
        let newRecs = { ...recommendations };

        // Process all analytic groups contained in this UI step
        currentUIStep.containedGroups.forEach((groupId) => {
            const analyticGroup = CENTRAL_GROUPS.find((g) => g.id === groupId);
            if (!analyticGroup) return;

            let action = "";
            let relatedUnit = "";
            const avgScore = getGroupAverage(analyticGroup.questions);

            let criteria = "";
            if (avgScore <= 2) criteria = "1-2";
            else if (avgScore === 3) criteria = "3";
            else criteria = "4-6";

            // Reuse existing logic for actions/units
            if (criteria === "4-6") {
                action = "ติดตามตามรอบ";
                switch (analyticGroup.id) {
                    case 1:
                        relatedUnit = "พยาบาล / LTC";
                        break;
                    case 2:
                        relatedUnit = "นักกายภาพ/พยาบาล";
                        break;
                    case 3:
                        relatedUnit = "พยาบาล/แพทย์";
                        break;
                    case 4:
                        relatedUnit = "ทีม Mental Health";
                        break;
                    case 5:
                        relatedUnit = "ทีม HL";
                        break;
                    case 6:
                        relatedUnit = "พยาบาล / แพทย์";
                        break;
                    case 7:
                        relatedUnit = "แพทย์/ Mental Health";
                        break;
                    case 8:
                        relatedUnit = "แพทย์";
                        break;
                    case 9:
                        relatedUnit = "ทีมบริการ";
                        break;
                    case 10:
                        relatedUnit = "ทีม HL";
                        break;
                }
            } else if (criteria === "3") {
                action = "เฝ้าระวัง";
                switch (analyticGroup.id) {
                    case 1:
                        relatedUnit = "พยาบาล / LTC";
                        break;
                    case 2:
                        relatedUnit = "นักกายภาพ/พยาบาล";
                        break;
                    case 3:
                        relatedUnit = "พยาบาล/แพทย์";
                        break;
                    case 4:
                        relatedUnit = "ทีม Mental Health";
                        break;
                    case 5:
                        relatedUnit = "ทีม HL";
                        break;
                    case 6:
                        relatedUnit = "พยาบาล / แพทย์";
                        break;
                    case 7:
                        relatedUnit = "แพทย์/ Mental Health";
                        break;
                    case 8:
                        relatedUnit = "แพทย์";
                        break;
                    case 9:
                        relatedUnit = "ทีมบริการ";
                        break;
                    case 10:
                        relatedUnit = "ทีม HL";
                        break;
                }
            } else {
                // Criteria 1-2
                switch (analyticGroup.id) {
                    case 1:
                        action = "ส่ง Manager เพื่อลงทะเบียน LTC";
                        relatedUnit = "พยาบาล / LTC";
                        break;
                    case 2:
                        let actions = [];
                        if (additionalInfo.movementLimit)
                            actions.push("ส่งต่อนักกายภาพ");
                        if (additionalInfo.tired)
                            actions.push("ส่งต่อ Manager หรือ แพทย์");
                        if (actions.length === 0) actions.push("ถามเพิ่ม");
                        action = actions.join(", ");
                        relatedUnit = "นักกายภาพ/พยาบาล";
                        break;
                    case 3:
                        action = "ส่ง Manager";
                        relatedUnit = "พยาบาล/แพทย์";
                        break;
                    case 4:
                        action = "Consult ทีม Mental Health";
                        relatedUnit = "ทีม Mental Health";
                        break;
                    case 5:
                        action = "ส่งเข้าร่วม Health Literacy Program";
                        relatedUnit = "ทีม HL";
                        break;
                    case 6:
                        action = "ส่งพบ Manager";
                        relatedUnit = "พยาบาล / แพทย์";
                        break;
                    case 7:
                        action =
                            "ส่งพบ Manager หรือ ทีม Mental Health เพื่อประเมินภาวะเครียด";
                        relatedUnit = "แพทย์/ Mental Health";
                        break;
                    case 8:
                        action = "พบ Manager";
                        relatedUnit = "แพทย์";
                        break;
                    case 9:
                        action =
                            "ถามเพิ่ม: ต้องการรู้เรื่องใดเพิ่มเติม แล้วส่ง Manager";
                        relatedUnit = "ทีมบริการ";
                        break;
                    case 10:
                        action = "ประเมินเพื่อส่งเข้า Health Literacy Program";
                        relatedUnit = "ทีม HL";
                        break;
                }
            }

            newRecs[`step_${analyticGroup.id}`] = {
                id: analyticGroup.id,
                dimension: analyticGroup.dimension,
                questionsLabel: analyticGroup.questionsLabel,
                label: analyticGroup.label,
                criteria: criteria,
                averageScore: avgScore,
                action: action,
                relatedUnit: relatedUnit,
                additionalInfo:
                    avgScore <= 2
                        ? analyticGroup.id === 2
                            ? {
                                  movementLimit: additionalInfo.movementLimit,
                                  tired: additionalInfo.tired,
                              }
                            : analyticGroup.id === 9
                            ? { topic: additionalInfo.q9Topic }
                            : null
                        : null,
            };
        });

        onRecommendationsChange(newRecs);
    };

    const handleNext = () => {
        if (isCentral) {
            // If it was the last step (summary), we submit.
            // BUT, per new requirement, we don't want a summary step anymore.
            // We want a confirmation modal on the last question step.

            // Check if we are on the last question step
            const isLastQuestionStep =
                currentStep === CENTRAL_UI_STEPS.length - 1;

            if (isLastQuestionStep) {
                if (!validateCurrentStep()) {
                    setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
                    setIsAlertOpen(true);
                    return;
                }

                // Process logic for the last step
                processStepLogic();

                // Show confirmation modal
                setShowConfirmModal(true);
                return;
            }

            if (!validateCurrentStep()) {
                setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
                setIsAlertOpen(true);
                return;
            }

            processStepLogic();

            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Standard validation
            let allAnswered = true;
            for (const section of data) {
                for (const q of section.questions) {
                    if (!answers[q.id]) {
                        allAnswered = false;
                    }
                }
            }
            if (!allAnswered) {
                setAlertMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
                setIsAlertOpen(true);
                return;
            }
            onSubmit();
        }
    };

    const handleBack = () => {
        if (isCentral && currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            onBack();
        }
    };

    const renderQuestion = (q: { id: number; text: string }) => (
        <div
            key={q.id}
            className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                Object.keys(answers).length > 0 && !answers[q.id]
                    ? "bg-red-50 border border-red-200"
                    : "bg-white border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/10"
            }`}
        >
            <div className="flex flex-col gap-8">
                <div className="flex gap-5 items-start">
                    <div className="flex-none pt-1">
                        <span className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                            {q.id}
                        </span>
                    </div>
                    <p className="text-gray-800 font-medium text-xl leading-relaxed">
                        {q.text}
                    </p>
                </div>

                <div className="px-2 sm:px-8 pb-4">
                    <div className="relative py-4">
                        <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-100 rounded-full -translate-y-1/2 shadow-inner"></div>

                        <style jsx>{`
                            input[type="range"] {
                                -webkit-appearance: none;
                                width: 100%;
                                background: transparent;
                            }
                            input[type="range"]::-webkit-slider-thumb {
                                -webkit-appearance: none;
                                height: 32px;
                                width: 32px;
                                border-radius: 50%;
                                background: #ffffff;
                                border: 4px solid #4f46e5;
                                cursor: pointer;
                                margin-top: -12px;
                                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                                    0 2px 4px -1px rgba(0, 0, 0, 0.06);
                                transition: all 0.2s;
                            }
                            input[type="range"]::-webkit-slider-thumb:hover {
                                transform: scale(1.1);
                                box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
                            }
                            input[type="range"]::-webkit-slider-runnable-track {
                                width: 100%;
                                height: 8px;
                                cursor: pointer;
                                background: transparent;
                            }
                            input[type="range"]:focus {
                                outline: none;
                            }
                        `}</style>
                        <input
                            type="range"
                            min="1"
                            max="6"
                            step="1"
                            value={answers[q.id] || 0}
                            onChange={(e) =>
                                handleAnswer(q.id, parseInt(e.target.value))
                            }
                            onClick={(e) => {
                                // Force update to handle initial click on "1" if value was undefined/0
                                handleAnswer(
                                    q.id,
                                    parseInt(e.currentTarget.value)
                                );
                            }}
                            onTouchEnd={(e) => {
                                // Force update for touch devices on initial tap
                                handleAnswer(
                                    q.id,
                                    parseInt(e.currentTarget.value)
                                );
                            }}
                            className="w-full relative z-10 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                            style={{ opacity: 1 }}
                        />
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1 pointer-events-none w-full">
                            {[1, 2, 3, 4, 5, 6].map((tick) => (
                                <div
                                    key={tick}
                                    className={`w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${
                                        answers[q.id] >= tick
                                            ? "bg-indigo-500 scale-110"
                                            : "bg-gray-200"
                                    } z-0`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-6 text-sm font-medium">
                        <span className="text-gray-400">1 (น้อยที่สุด)</span>
                        <div
                            className={`flex flex-col items-center transition-all duration-300 ${
                                answers[q.id]
                                    ? "opacity-100 -translate-y-1"
                                    : "opacity-0"
                            }`}
                        >
                            <span className="text-3xl font-black text-indigo-600">
                                {answers[q.id]}
                            </span>
                            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                                คะแนนที่เลือก
                            </span>
                        </div>
                        <span className="text-gray-400">6 (มากที่สุด)</span>
                    </div>

                    <div className="flex justify-between px-0.5 mt-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => handleAnswer(q.id, num)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-200 cursor-pointer ${
                                    answers[q.id] === num
                                        ? "bg-indigo-100 text-indigo-700 font-bold shadow-inner ring-2 ring-indigo-500 ring-offset-2 scale-110"
                                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 hover:scale-110 hover:shadow-md border border-transparent hover:border-gray-200"
                                }`}
                                aria-label={`Select score ${num}`}
                                title={`เลือกคะแนน ${num}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const handleConfirmSubmit = async () => {
        if (isSubmitting) return;

        // Optimistically set local loading
        setLocalIsSubmitting(true);

        try {
            await onSubmit();
            // If success, likely unmounts or navigates.
            // If parent updates prop, isSubmitting remains true.
        } catch (error) {
            console.error("Error submitting:", error);
            // Reset local
            setLocalIsSubmitting(false);

            setAlertMessage(
                "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง (" +
                    (error as Error).message +
                    ")"
            );
            setIsAlertOpen(true);
        }
    };

    if (isCentral) {
        const currentUIStep = CENTRAL_UI_STEPS[currentStep];
        const displayQuestions = data
            .flatMap((s) => s.questions)
            .filter((q) => currentUIStep.questions.includes(q.id));

        // Calculate conditional checks for display
        let showGroup2Extra = false;
        let showGroup9Extra = false;

        if (currentUIStep.containedGroups.includes(2)) {
            const avg = getGroupAverage([2, 3]);
            showGroup2Extra = avg > 0 && avg <= 2;
        }
        if (currentUIStep.containedGroups.includes(9)) {
            const avg = getGroupAverage([24, 25, 26]);
            showGroup9Extra = avg > 0 && avg <= 2;
        }

        return (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
                <AlertModal
                    isOpen={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    message={alertMessage}
                />

                {/* Confirmation Modal */}
                {showConfirmModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {isSubmitting ? (
                                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Check size={32} />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {isSubmitting
                                        ? "กำลังส่งข้อมูล..."
                                        : "ยืนยันการส่งแบบสอบถาม?"}
                                </h3>
                                <p className="text-gray-500">
                                    {isSubmitting
                                        ? "กรุณารอสักครู่ ระบบกำลังบันทึกข้อมูลของท่าน"
                                        : "ท่านได้ทำแบบสอบถามครบถ้วนแล้ว ต้องการส่งข้อมูลเลยหรือไม่"}
                                </p>
                                {!isSubmitting && (
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() =>
                                                setShowConfirmModal(false)
                                            }
                                            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors"
                                            disabled={isSubmitting}
                                        >
                                            กลับไปแก้ไข
                                        </button>
                                        <button
                                            onClick={handleConfirmSubmit}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-blue-200 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting
                                                ? "กำลังส่ง..."
                                                : "ยืนยันส่งข้อมูล"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div className="flex-1 w-full md:mr-4">
                            <span className="text-xl font-bold text-blue-600 tracking-wide uppercase whitespace-pre-line block">
                                {currentUIStep.title}
                            </span>
                            <div className="text-gray-600 mt-2 text-lg whitespace-pre-line bg-gray-50 p-4 rounded-lg w-full">
                                {currentUIStep.description}
                            </div>
                        </div>
                        <span className="self-end md:self-start text-sm font-medium text-gray-500 whitespace-nowrap bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                            ขั้นตอนที่ {currentStep + 1} /{" "}
                            {CENTRAL_UI_STEPS.length}
                        </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                            style={{
                                width: `${
                                    ((currentStep + 1) /
                                        CENTRAL_UI_STEPS.length) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {displayQuestions.map((q) => renderQuestion(q))}
                </div>

                {showGroup2Extra && (
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 animate-in fade-in">
                        <h3 className="text-lg font-bold text-orange-800 mb-4">
                            ข้อมูลเพิ่มเติม (เนื่องจากคะแนนน้อย)
                        </h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={
                                        additionalInfo?.movementLimit || false
                                    }
                                    onChange={(e) =>
                                        handleAdditionalInfoChange(
                                            "movementLimit",
                                            e.target.checked
                                        )
                                    }
                                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                                />
                                <span className="text-gray-800">
                                    มีข้อจำกัดด้านการเคลื่อนไหว
                                </span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={additionalInfo?.tired || false}
                                    onChange={(e) =>
                                        handleAdditionalInfoChange(
                                            "tired",
                                            e.target.checked
                                        )
                                    }
                                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                                />
                                <span className="text-gray-800">
                                    ออกแรงแล้วเหนื่อย
                                </span>
                            </label>
                        </div>
                    </div>
                )}

                {showGroup9Extra && (
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 animate-in fade-in">
                        <h3 className="text-lg font-bold text-orange-800 mb-2">
                            ข้อมูลเพิ่มเติม
                        </h3>
                        <label className="block text-gray-700 mb-2">
                            ต้องการรู้เรื่องใดเพิ่มเติม:
                        </label>
                        <textarea
                            value={additionalInfo?.q9Topic || ""}
                            onChange={(e) =>
                                handleAdditionalInfoChange(
                                    "q9Topic",
                                    e.target.value
                                )
                            }
                            className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            rows={3}
                            placeholder="ระบุเรื่องที่ต้องการทราบ..."
                        />
                    </div>
                )}

                <div className="flex justify-between items-center pt-6">
                    <button
                        onClick={handleBack}
                        className="px-8 py-3 bg-white border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold"
                    >
                        ย้อนกลับ
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        ถัดไป
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 space-y-8">
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}
            />

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                {isSubmitting ? (
                                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Check size={32} />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {isSubmitting
                                    ? "กำลังส่งข้อมูล..."
                                    : "ยืนยันการส่งแบบสอบถาม?"}
                            </h3>
                            <p className="text-gray-500">
                                {isSubmitting
                                    ? "กรุณารอสักครู่ ระบบกำลังบันทึกข้อมูลของท่าน"
                                    : "ท่านได้ทำแบบสอบถามครบถ้วนแล้ว ต้องการส่งข้อมูลเลยหรือไม่"}
                            </p>
                            {!isSubmitting && (
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() =>
                                            setShowConfirmModal(false)
                                        }
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        กลับไปแก้ไข
                                    </button>
                                    <button
                                        onClick={handleConfirmSubmit}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg hover:shadow-blue-200 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "กำลังส่ง..."
                                            : "ยืนยันส่งข้อมูล"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
                <div className="py-8 px-8 text-white">
                    <h1 className="text-3xl font-bold mb-4">
                        แบบสอบถามการรายงานผลลัพธ์ของผู้ป่วยโรคเบาหวานชนิดที่ 2{" "}
                        <br />
                        โดยผู้ป่วยเป็นคนรายงาน
                    </h1>
                </div>
            </div>

            <div className="space-y-8">
                {data.map((section, sectionIndex) => (
                    <div
                        key={section.id}
                        className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                        <div className="p-8 space-y-8">
                            <div className="border-b border-gray-100 pb-6">
                                <h2 className="text-2xl font-bold text-indigo-900 mb-3">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed bg-gray-50/80 p-4 rounded-xl border border-gray-100/50">
                                    {section.description}
                                </p>
                            </div>
                            <div className="space-y-4">
                                {section.questions.map((q) =>
                                    renderQuestion(q)
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 border-t border-gray-100 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="px-8 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 font-bold transition-all flex items-center gap-3 shadow-sm hover:shadow-md active:scale-95"
                >
                    <ChevronLeft size={24} />
                    <span className="text-lg">ย้อนกลับ</span>
                </button>
                <button
                    onClick={handleNext}
                    className="px-10 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all flex items-center gap-3 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                >
                    <span className="text-lg">บันทึกข้อมูล</span>
                    <Check size={24} />
                </button>
            </div>
        </div>
    );
}
