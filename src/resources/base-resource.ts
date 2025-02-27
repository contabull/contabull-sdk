import type { AxiosInstance } from "axios"

export abstract class BaseResource {
  protected client: AxiosInstance
  protected basePath: string

  constructor(client: AxiosInstance, basePath: string) {
    this.client = client
    this.basePath = basePath
  }

  protected async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(`${this.basePath}${path}`, { params });

    return response.data;
  }

  protected async post<T>(path: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(`${this.basePath}${path}`, data);

    return response.data;
  }

  protected async put<T>(path: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(`${this.basePath}${path}`, data);

    return response.data;
  }

  protected async patch<T>(path: string, data?: any): Promise<T> {
    const response = await this.client.patch<T>(`${this.basePath}${path}`, data);

    return response.data;
  }

  protected async delete<T>(path: string): Promise<T> {
    const response = await this.client.delete<T>(`${this.basePath}${path}`);

    return response.data;
  }
}

