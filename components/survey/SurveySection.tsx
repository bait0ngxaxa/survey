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
        <div className="relative group">
            {/* Outer Glow on Hover */}
            <div className="absolute inset-[-2px] bg-gradient-to-br from-sky-200/30 via-blue-200/20 to-cyan-200/30 rounded-[1.625rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-white/80 overflow-hidden">
                <div className="p-8 space-y-8">
                    <div className="relative border-b border-slate-100/80 pb-6 overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-[-50%] left-[-20%] w-40 h-40 bg-indigo-100/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-[-50%] right-[-20%] w-40 h-40 bg-sky-100/20 rounded-full blur-3xl" />

                        <h2 className="relative text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 mb-3">
                            {section.title}
                        </h2>
                        <p className="relative text-slate-600 text-lg leading-relaxed bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-100/80 shadow-sm">
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
        </div>
    );
}
