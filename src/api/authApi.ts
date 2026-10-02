import { AuthDto } from '@app-types/authTypes';
import { EMethod } from '@models/enums';
import { apiClient } from './apiClient';

export const authApi = {
  login: (body: AuthDto) =>
    apiClient('auth/login', {
      method: EMethod.POST,
      body
    }),

  registration: (body: AuthDto) =>
    apiClient('auth/registration', {
      method: EMethod.POST,
      body
    }),

  logout: () =>
    apiClient('auth/logout', {
      method: EMethod.POST
    })
};
