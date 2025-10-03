import type { IncytesPatientGetByIdResponse } from "../models/incytes";
import type { ReportQuestion, ReportSection } from "../models/report";

const MOCK_DATA: IncytesPatientGetByIdResponse = {
  questions: []
}

export const patientService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getReportById(_reportId: string): Promise<{
    sections: ReportSection[];
    questions: Record<string, ReportQuestion>;
  }> {
    //const response = await fetch(`/api/patient/${reportId}`);
    //const data: IncytesPatientGetByIdResponse = await response.json();
    const data = MOCK_DATA;

    const sections: ReportSection[] = [];
    const questionsObj: Record<string, ReportQuestion> = {};
    data.questions.forEach(q => {
      const newId = crypto.randomUUID() as string;
      questionsObj[newId] = {
        id: newId,
        ...q,
      }

      let existingIdx = sections.findIndex(v => v.name === q.section);
      if (existingIdx === -1) {
        sections.push({
          name: q.section,
          id: crypto.randomUUID() as string,
          color: "green",
          questions: []
        })
        existingIdx = sections.length - 1;
      }
      sections[existingIdx].questions.push(newId);
    });

    return {
      sections: sections,
      questions: questionsObj,
    };
  },
}
