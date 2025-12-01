import type { IncytesPatientAuthenticationResponseModel, IncytesPatientGenerateAutoSignInLinkResponseModel } from "@/models/dto/incytes";

export const authorizationService = {
  async generateAutoSignInLinkComponents(patientId: string): Promise<IncytesPatientGenerateAutoSignInLinkResponseModel> {
    const response = await fetch(`/api/authorization/generatelink/${patientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`generate link failed: ${response.statusText}`);
    }

    const data: IncytesPatientGenerateAutoSignInLinkResponseModel = await response.json();

    return data;
  },

  async autoSignIn(patientData: string, token: string): Promise<IncytesPatientAuthenticationResponseModel> {
    const payload = {
      "data": patientData,
      "token": token,
    }

    const response = await fetch(`/api/authorization/autosignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`sign in failed: ${response.statusText}`);
    }

    const data: IncytesPatientAuthenticationResponseModel = await response.json();

    return data;
  },

  async signInEmailPwd(email: string, password: string): Promise<IncytesPatientAuthenticationResponseModel> {
    const response = await fetch("/api/authorization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email?.trim(),
        password: password?.trim()
      }),
    });

    if (!response.ok) {
      throw new Error(`sign in failed: ${response.statusText}`);
    }

    const data: IncytesPatientAuthenticationResponseModel = await response.json();

    return data;
  },
}
