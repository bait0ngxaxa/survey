import { QuestionSlider } from "@/components/ui/form";
import { Part4Section } from "@/config/part4";

interface SurveySectionProps {
    section: Part4Section;
    answers: Record<number, number>;
    onAnswer: (questionId: number, score: number) => void;
}

export default function SurveySection({
    section,
    answers,
    onAnswer,
}: SurveySectionProps) {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 space-y-8">
                <div className="border-b border-gray-100 pb-6">
                    <h2 className="text-2xl font-bold text-indigo-900 mb-3">
                        {section.title}
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {section.description}
                    </p>
                </div>
                <div className="space-y-4">
                    {section.questions.map((q) => (
                        <QuestionSlider
                            key={q.id}
                            id={q.id}
                            text={q.text}
                            value={answers[q.id]}
                            onChange={(score) => onAnswer(q.id, score)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
