// eslint-disable-next-line max-classes-per-file
import { PREFIX_API } from 'common/const';
import { getToken, removeToken } from 'common/utils/auth';
import { PRIVATE_PATH, PUBLIC_PATH } from 'routes/path';
import { message } from 'antd';
import i18n from 'i18next';
import { alertError } from 'common/utils/alert';

type StatusCode = 401 | 200 | 201 | 403;

export interface ResponseAPI<T> {
  isSuccess: boolean;
  message: string;
  result: object | null | T | T[];
  statusCode: StatusCode;
}

export class ResponseAPIError extends Error {
  public response: ResponseAPI<any>;

  constructor(response: ResponseAPI<any>) {
    super(response.message);
    this.response = response;
  }
}

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

function parseBlob(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.blob();
}

function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response);
  error.response = response;
  throw error;
}

const handleError = error => {
  const {
    response: { status },
  } = error;

  if (status === 401) {
    // alertError(i18n.t('Unauthorized'));
    removeToken();
    // window.location.href = PUBLIC_PATH.LOGIN;
  }

  if (status === 403) {
    message.error(i18n.t('Permission denied!'));
    window.location.href = PRIVATE_PATH.PERMISSION_DENIED;
  }
};

function checkStatusApiResponse(response: ResponseAPI<any>) {
  if (!response.statusCode) {
    return response;
  }

  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }

  const error = new ResponseAPIError(response);
  error.response = response;
  throw error;
}

export async function request(
  url: string,
  options?: RequestInit & { parameters?; downloadFile?: boolean },
  workWithFile = false,
): Promise<{} | { err: ResponseError } | Blob | any> {
  const body = options?.body;
  let parameters = options?.parameters;

  if (parameters) {
    parameters = Object.keys(parameters).reduce((newParams: {}, key) => {
      if (parameters[key] !== undefined) {
        newParams[key] = parameters[key];
      }

      return newParams;
    }, {});
  }

  const downloadFile = options?.downloadFile;
  const parametersQuery = new URLSearchParams(parameters).toString();
  let bodyData;

  if (workWithFile && body) {
    bodyData = body;
  } else if (!workWithFile && body) {
    bodyData = JSON.stringify(body);
  }

  const headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${getToken()}`,
    type: workWithFile ? 'formData' : '',
  };
  workWithFile && delete headers['Content-Type'];

  const defaultOptions: RequestInit = {
    method: 'GET',
    headers,
  };
  const data = fetch(
    `${PREFIX_API}${url}${parametersQuery ? `?${parametersQuery}` : ''}`,
    {
      ...defaultOptions,
      ...options,
      body: bodyData,
    },
  ).then(checkStatus);

  if (downloadFile) {
    return data.then(parseBlob);
  }

  return data.then(parseJSON).then(checkStatusApiResponse).catch(handleError);
}
