import { Info } from "lucide-react";
import {
    FormSection,
    TextInput,
    RadioGroup,
    FormNavigation,
} from "@/components/ui/form";
import { BloodSugarQuestion, DoctorVisitQuestion } from "@/components/survey";
import { Part1Data } from "@/lib/types";

interface SectionOneFormProps {
    title: string;
    part1Data: Part1Data;
    respondentName: string;
    onPart1Change: (field: keyof Part1Data, value: string) => void;
    onRespondentNameChange: (name: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export function SectionOneForm({
    title,
    part1Data,
    respondentName,
    onPart1Change,
    onRespondentNameChange,
    onNext,
    onBack,
}: SectionOneFormProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <FormSection title={title} description="ส่วนที่ 1: ข้อมูลทั่วไป">
                <div className="space-y-10">
                    <InfoBox />

                    <div className="space-y-8 pb-8 border-b border-slate-100">
                        <RadioGroup
                            name="surveyMethod"
                            label="วิธีการเก็บข้อมูล"
                            value={part1Data.surveyMethod || ""}
                            options={["ตอบด้วยตนเอง", "สัมภาษณ์"]}
                            onChange={(v) => onPart1Change("surveyMethod", v)}
                            layout="horizontal"
                        />
                        <TextInput
                            label="ชื่อผู้ให้ข้อมูล"
                            placeholder="ระบุชื่อ-นามสกุล"
                            value={respondentName}
                            onChange={onRespondentNameChange}
                        />
                        {part1Data.surveyMethod === "สัมภาษณ์" && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <TextInput
                                    label="ชื่อผู้สัมภาษณ์"
                                    placeholder="ระบุชื่อ-นามสกุลผู้สัมภาษณ์"
                                    value={part1Data.interviewerName || ""}
                                    onChange={(v) =>
                                        onPart1Change("interviewerName", v)
                                    }
                                />
                            </div>
                        )}
                    </div>

                    <BloodSugarQuestion
                        part1Data={part1Data}
                        onPart1Change={onPart1Change}
                    />
                    <div className="border-t border-slate-100" />
                    <DoctorVisitQuestion
                        part1Data={part1Data}
                        onPart1Change={onPart1Change}
                    />
                </div>

                <FormNavigation
                    onBack={onBack}
                    onNext={onNext}
                    showBack={true}
                    backLabel="ยกเลิก"
                    nextLabel="ถัดไป"
                />
            </FormSection>
        </div>
    );
}

function InfoBox() {
    return (
        <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100 flex items-start gap-4">
            <div className="p-2 bg-sky-100 rounded-full text-sky-600 mt-1">
                <Info size={24} />
            </div>
            <div>
                <h3 className="text-sky-900 font-semibold text-lg mb-1">
                    คำชี้แจง
                </h3>
                <p className="text-sky-700 leading-relaxed">
                    ก่อนที่ท่านจะตอบแบบสอบถามชุดนี้
                    ผู้วิจัยอยากทราบข้อมูลเบื้องต้นเกี่ยวกับวิธีการเก็บข้อมูล
                </p>
            </div>
        </div>
    );
}
