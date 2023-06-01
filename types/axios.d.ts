import {
  AxiosRequestHeaders as OriginalAxiosRequestHeaders,
  AxiosRequestConfig as OriginalAxiosRequestConfig,
} from 'axios';

declare module 'axios' {
  interface AxiosRequestHeaders extends OriginalAxiosRequestHeaders {
    Authorization: string;
    resourceName: HourChat.Type.ResourceName;
    overwrite: boolean;
  }

  interface AxiosInstance {
    config?: {
      headers?: AxiosRequestHeaders;
    };
  }

  interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    headers?: AxiosRequestHeaders;
    resourceName?: HourChat.Type.ResourceName;
    overwrite?: boolean;
  }
}
