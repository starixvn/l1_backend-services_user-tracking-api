import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SignInReq, SignOutReq, ApiResp } from './types';

export class TrackingClient {
  private client: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }

  async signIn(data: SignInReq): Promise<ApiResp> {
    const response = await this.client.post<ApiResp>('/game/sign-in', data);

    return response.data;
  }

  async signOut(data: SignOutReq): Promise<ApiResp> {
    const response = await this.client.post<ApiResp>('/game/sign-out', data);

    return response.data;
  }
}
