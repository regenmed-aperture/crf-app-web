import type { ReportSection } from "@/models/report";
import { getBgColorTWClass } from "@/util/colors";
import { motion } from "framer-motion";
import type React from "react";

interface Props {
  sections: ReportSection[];
  currentQuestionIndex: number;
  totalQuestions: number;
  className?: string;
}

export const QuestionsSectionedProgressBar: React.FC<Props> = ({
  sections,
  currentQuestionIndex,
  totalQuestions,
  className = "",
}) => {
  // Calculate which section the current question is in
  let questionsProcessed = 0;
  let currentSectionIndex = -1;
  let questionIndexInSection = 0;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionQuestionCount = section.questionIds.length;

    if (currentQuestionIndex < questionsProcessed + sectionQuestionCount) {
      currentSectionIndex = i;
      questionIndexInSection = currentQuestionIndex - questionsProcessed;
      break;
    }

    questionsProcessed += sectionQuestionCount;
  }

  const sectionWidths = sections.map(
    (section) => (section.questionIds.length / totalQuestions) * 100
  );

  return (
    <div className={`flex flex-row gap-0.5 h-4 md:h-5 ${className}`}>
      {sections.map((section, index) => {
        const isCurrentSection = index === currentSectionIndex;
        const isFirst = index === 0;
        const isLast = index === sections.length - 1;

        const sectionProgress =
          isCurrentSection
            ? ((questionIndexInSection + 1) / section.questionIds.length) * 100
            : index < currentSectionIndex
            ? 100
            : 0;

        const borderRadiusClass = isFirst && isLast
          ? "rounded-full" // Single section
          : isFirst
          ? "rounded-l-full" // First section
          : isLast
          ? "rounded-r-full" // Last section
          : ""; // Middle sections

        return (
          <div
            key={section.id}
            className="relative flex items-center"
            style={{
              width: `${sectionWidths[index]}%`,
            }}
          >
            <motion.div
              className={`relative overflow-hidden w-full ${borderRadiusClass}`}
              animate={{
                height: isCurrentSection ? 20 : 12,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              {/* bg */}
              <div className={`absolute inset-0 bg-muted ${borderRadiusClass}`} />

              {/* progress fill */}
              <motion.div
                className={`absolute inset-0 ${getBgColorTWClass(section.color)}`}
                initial={{ width: "0%" }}
                animate={{ width: `${sectionProgress}%` }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
