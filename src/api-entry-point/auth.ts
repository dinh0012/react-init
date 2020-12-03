import { request, ResponseError } from 'common/utils/request';

export const loginRequest = (users): Promise<{} | { err: ResponseError }> =>
  request('authenticate', { method: 'POST', body: users });
