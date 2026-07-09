import { QuestionSlider } from "@/components/ui/form";
import { type Part4Section } from "@/config/part4";

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
        <section className="relative">
            <div className="relative proms-panel rounded-2xl overflow-hidden">
                <div className="p-5 sm:p-8 space-y-8">
                    <div className="relative border-b border-slate-200 pb-6 overflow-hidden">
                        <h2 className="relative mb-3 text-2xl font-bold text-sky-900 thai-text break-words">
                            {section.title}
                        </h2>
                        <p className="relative text-slate-700 text-base sm:text-lg leading-relaxed proms-header-gradient p-4 rounded-xl border border-sky-100 thai-text break-words">
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
        </section>
    );
}
