import { AuthDto } from "@app-types/authTypes";
import { apiClient } from "./apiClient";
import { EMethod } from "@models/enums";

export const authApi = {
  login: (body: AuthDto) =>
    apiClient("auth/login", {
      method: EMethod.POST,
      body,
    }),

  registration: (body: AuthDto) =>
    apiClient("auth/registration", {
      method: EMethod.POST,
      body,
    }),
};
