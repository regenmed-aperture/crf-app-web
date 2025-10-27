import type { IncytesPatientAuthenticationResponseModel } from "@/models/dto/incytes";

export const userService = {
  async signIn(email: string, password: string): Promise<IncytesPatientAuthenticationResponseModel> {
    const response = await fetch(`/api/authorization`, {
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