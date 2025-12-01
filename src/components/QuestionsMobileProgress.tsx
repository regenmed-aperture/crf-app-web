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

export const QuestionsMobileProgress: React.FC<Props> = ({
  sections,
  currentQuestionIndex,
  totalQuestions,
  className = "",
}) => {
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

  const sectionAngles = sections.map((section) => {
    return (section.questionIds.length / totalQuestions) * 360;
  });

  const createConicGradient = () => {
    const gradientStops: string[] = [];
    let currentAngle = 0;

    sections.forEach((section, index) => {
      const sectionProgress =
        index < currentSectionIndex
          ? 1
          : index === currentSectionIndex
          ? (questionIndexInSection + 1) / section.questionIds.length
          : 0;

      const angle = sectionAngles[index];
      const filledAngle = angle * sectionProgress;

      const colorValue = getColorValue(section.color);

      if (filledAngle > 0) {
        gradientStops.push(
          `${colorValue} ${currentAngle}deg ${currentAngle + filledAngle}deg`
        );
      }

      if (filledAngle < angle) {
        gradientStops.push(
          `#e5e7eb ${currentAngle + filledAngle}deg ${currentAngle + angle}deg`
        );
      }

      currentAngle += angle;
    });

    return `conic-gradient(from -90deg, ${gradientStops.join(", ")})`;
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="h-5 flex items-center">
        <motion.span
          key={currentSectionIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-gray-700"
        >
          {sections[currentSectionIndex]?.name || ""}
        </motion.span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <motion.div
            className="relative w-16 h-16 rounded-full"
            style={{
              background: createConicGradient(),
            }}
            animate={{ rotate: 0 }}
          >
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <motion.span
                className="text-sm font-semibold text-gray-700"
                key={currentQuestionIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {currentQuestionIndex + 1}
              </motion.span>
            </div>
          </motion.div>
        </div>
        <div className="flex items-center gap-1.5">
          {sections.map((section, index) => {
            const isCurrentSection = index === currentSectionIndex;
            const isCompleted = index < currentSectionIndex;
            const sectionProgress =
              isCurrentSection
                ? ((questionIndexInSection + 1) / section.questionIds.length) *
                  100
                : isCompleted
                ? 100
                : 0;

            return (
              <motion.div
                key={section.id}
                className="relative"
                animate={{
                  scale: isCurrentSection ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Dot background */}
                <div
                  className={`w-2 h-2 rounded-full bg-gray-200`}
                  style={{
                    width: isCurrentSection ? "10px" : "8px",
                    height: isCurrentSection ? "10px" : "8px",
                  }}
                />
                {/* Progress fill */}
                <motion.div
                  className={`absolute inset-0 rounded-full ${getBgColorTWClass(
                    section.color
                  )}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: sectionProgress / 100 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
function getColorValue(color: string): string {
  const colorMap: Record<string, string> = {
    red: "rgb(248, 113, 113)",
    orange: "rgb(251, 146, 60)",
    amber: "rgb(251, 191, 36)",
    lime: "rgb(163, 230, 53)",
    green: "rgb(74, 222, 128)",
    emerald: "rgb(52, 211, 153)",
    teal: "rgb(45, 212, 191)",
    cyan: "rgb(34, 211, 238)",
    sky: "rgb(56, 189, 248)",
    blue: "rgb(96, 165, 250)",
    indigo: "rgb(129, 140, 248)",
    violet: "rgb(167, 139, 250)",
    purple: "rgb(192, 132, 252)",
    fuchsia: "rgb(232, 121, 249)",
    pink: "rgb(244, 114, 182)",
    rose: "rgb(251, 113, 133)",
  };

  return colorMap[color] || "rgb(156, 163, 175)";
}
