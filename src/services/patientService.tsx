import type { IncytesBilateralQuestionCollectionResponseModel } from "@/models/dto/incytes";
import type { ReportQuestion, ReportSection } from "../models/report";
import { randomIntFromInterval } from "@/util/utils";

const MOCK_DATA: IncytesBilateralQuestionCollectionResponseModel = {
  answeredQuestions: [
    {
      revisions: [],
      questions: [],
      patientCaseSurveyInstanceId: 0,
      bilateralAreaId: null,
      patientCaseSurveyInstanceVersion: 0
    }
  ],
  isSuccessful: true,
  errorMessage: "",
  errorCode: 0,
  redirectTo: "",
  hasDataOrDataNotAvailable: false
}

export const patientService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getReportById(_reportId: string): Promise<{
    sections: ReportSection[];
    questions: Record<string, ReportQuestion>;
  }> {
    return new Promise((resolve, reject) => {
      //const response = await fetch(`/api/patient/${reportId}`);
      //const data: IncytesBilateralQuestionCollectionResponseModel = await response.json();
      const data = MOCK_DATA;

      if (data.answeredQuestions.length === 0) {
        // error
        reject();
      }

      const sections: ReportSection[] = [];
      const questionsObj: Record<string, ReportQuestion> = {};
      data.answeredQuestions[0].questions.forEach(q => {
        let questionId = q.id ? q.id : randomIntFromInterval(10000, 99999);

        let existingIdx = sections.findIndex(v => v.name === q.bundleName);
        if (existingIdx === -1) {
          sections.push({
            name: q.bundleName,
            id: q.bundleId,
            color: "green",
            questionIds: []
          })
          existingIdx = sections.length - 1;
        }
        sections[existingIdx].questionIds.push(questionId);
      });

      resolve({
        sections: sections,
        questions: questionsObj,
      });
    });
  },
}
