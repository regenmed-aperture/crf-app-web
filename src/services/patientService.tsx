import type { IncytesBilateralQuestionCollectionResponseModel, IncytesConfirmUserRegistrationResponseModel, IncytesPatientAuthenticationResponseModel, IncytesUserRegistrationStatusResponseModel } from "@/models/dto/incytes";
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


  /**
   * Verifies MFA phone code.
   *
   * @param {string} code - the code
   * @param {string | null} mfaSign - The MFA sign from HTTP header
   * @returns {IncytesPatientAuthenticationResponseModel | null} response indicating if the verification was successful or null otherwise
   */
  async completePhoneVerification(code: string, mfaSign: string | null): Promise<IncytesPatientAuthenticationResponseModel | null> {
    return fetch(`/api/authorization/verifyPhone/code/${code}`, {
      method: 'post',
      headers: mfaSign ? { 'mfaSign': mfaSign } : {}
    })
    .then(response => {
      if (!response.ok){
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(data => {
      return data as IncytesPatientAuthenticationResponseModel;
    })
    .catch(error => {
      return null;
    });
  },


  /**
   * Register new patient either with verification token or using self-registration
   *
   * @param {string} email - patient's email
   * @param {string} password - patient's password
   * @param {boolean} rememberMe - flag indicating if patient wants to stay signed in
   * @param {string} language - patient's language
   * @param {string} token - verification token
   * @param {string} originalEmail - original email that was set on case creation (if any)
   * @returns {IncytesPatientAuthenticationResponseModel | null} response indicating if the registration was successful or null otherwise
   */
  async registerUser(email: string, password: string, rememberMe: boolean, language: string, token: string, originalEmail: string):
  Promise<IncytesPatientAuthenticationResponseModel | null> {
    return fetch('/api/registration', {
      method: 'post',
      body: JSON.stringify({
        email: email,
        password: password,
        rememberMe: rememberMe,
        language: language,
        verificationToken: token, 
        originalEmail: originalEmail
      }),
      headers: { 'content-type': 'application/json' }
    })
    .then(response => {
      if (!response.ok){
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(data => {
      return data as IncytesPatientAuthenticationResponseModel;
    })
    .catch(error => {
      return null;
    });
  },


  /**
   * Send verification code to patient's email to confirm it
   *
   * @param {string} email - patient's email
   * @param {string} language - patient's language
   * @returns {IncytesPatientAuthenticationResponseModel | null} response indicating if the code was sent successfully or null otherwise
   */
  async sendVerificationCode(email: string, language: string): Promise<IncytesPatientAuthenticationResponseModel | null> {
    return fetch(`/api/registration`, {
      method: 'post',
      body: JSON.stringify({ email: email, language: language }),
      headers: { 'content-type': 'application/json' }
    })
    .then(response => {
      if (!response.ok){
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(data => {
      return data as IncytesPatientAuthenticationResponseModel;
    })
    .catch(error => {
      return null;
    });
  },


  /**
   * Resend email with verification code to patient
   *
   * @param {string} email - patient's email
   * @returns {IncytesUserRegistrationStatusResponseModel | null} response indicating if the code was sent successfully or null otherwise
   */
  async resendVerificationCode(email: string): Promise<IncytesUserRegistrationStatusResponseModel | null> {
    return fetch('/api/registration/resendEmailVerification', {
      method: 'post',
      body: JSON.stringify({ email: email }),
      headers: { 'content-type': 'application/json' }
    })
    .then(response => {
      if (!response.ok){
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(data => {
      return data as IncytesUserRegistrationStatusResponseModel;
    })
    .catch(error => {
      return null;
    });
  },


  /**
   * Submit the verification code that was sent to patient's email
   *
   * @param {string} email - patient's email 
   * @param {string} code - the verification code
   * @returns {IncytesConfirmUserRegistrationResponseModel | null} response indicating if code confirmation was successful or null otherwise
   */
  async confirmCode(email: string, code: string): Promise<IncytesConfirmUserRegistrationResponseModel | null> {
    return fetch(`/api/registration/confirm`, {
      method: 'post',
      body: JSON.stringify({ email: email, code: code }),
      headers: { 'content-type': 'application/json' }
    })
    .then(response => {
      if (!response.ok){
        throw new Error("Bad request");
      }
      return response.json();
    })
    .then(data => {
      return data as IncytesUserRegistrationStatusResponseModel;
    })
    .catch(error => {
      return null;
    });
  }
}
