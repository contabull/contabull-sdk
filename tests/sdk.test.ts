import axios from 'axios';
import crypto from "crypto-js"
import jwt from "jsonwebtoken"
import { Contabull } from '../src/sdk';

jest.mock('axios');
jest.mock('jsonwebtoken');
jest.mock('crypto-js');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedJwt = jwt as jest.Mocked<typeof jwt>;
const mockedCrypto = crypto as jest.Mocked<typeof crypto>;


const axiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  request: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};

describe('Contabull', () => {
  let sdk: Contabull;

  beforeEach(() => {
    mockedAxios.create.mockReturnValue(axiosInstance as any);

    sdk = new Contabull({
      apiKey: 'test-api-key',
      baseUrl: 'https://api.contabull.com',
      privateKey: 'test-private-key',
    });

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.contabull.com',
      timeout: 10000,
    });

    expect(axiosInstance.interceptors.request.use).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
    expect(axiosInstance.interceptors.response.use).toHaveBeenCalledWith(expect.any(Function), expect.any(Function));
  });

  test('SDK initialization', () => {
    expect(sdk).toBeDefined();
  });

  test('request', async () => {
    axiosInstance.request.mockResolvedValue({
      data: {
        message: 'Successful',
      },
    });

    const result = await sdk.request({ url: 'https://api.contabull.com/test' });

    expect(result).toBeDefined();
    expect((result as any).message).toBe('Successful');
  });

  test('request interceptors apply proper authentication headers', async () => {
    mockedJwt.sign.mockReturnValue('signed' as any);
    mockedCrypto.SHA256.mockImplementation(() => ({
      toString: jest.fn().mockReturnValue('test-sha256'),
    } as any));

    const requestInterceptor = axiosInstance.interceptors.request.use.mock.calls[0][0];

    const testConfig = {
      url: '/test',
      data: { test: 'data' }
    };

    const modifiedConfig = await requestInterceptor(testConfig);

    expect(mockedJwt.sign).toHaveBeenCalledWith(expect.any(Object), 'test-private-key', { algorithm: "RS256" });
    expect(modifiedConfig.headers).toBeDefined();
    expect(modifiedConfig.headers['X-API-KEY']).toBe('test-api-key');
    expect(modifiedConfig.headers['Authorization']).toBe('Bearer signed');
    expect(modifiedConfig.url).toBe('/test');
  });

  test('response error interceptor transforms errors correctly', async () => {
    const responseErrorInterceptor = axiosInstance.interceptors.response.use.mock.calls[0][1];
    const mockAxiosError = {
      response: {
        status: 400,
        data: {
          message: 'Bad Request',
          additionalData: 'test-data'
        }
      },
      message: 'Request failed with status code 400'
    };

    try {
      await responseErrorInterceptor(mockAxiosError);
      fail('L\'intercepteur aurait dû rejeter la promesse');
    } catch (error) {
      expect(error).toEqual({
        status: 400,
        message: 'Bad Request',
        data: {
          message: 'Bad Request',
          additionalData: 'test-data'
        },
        originalError: mockAxiosError
      });
    }

    const mockNetworkError = {
      message: 'Network Error'
    };

    try {
      await responseErrorInterceptor(mockNetworkError);
      fail('L\'intercepteur aurait dû rejeter la promesse');
    } catch (error) {
      expect(error).toEqual({
        status: 0,
        message: 'Network Error',
        data: null,
        originalError: mockNetworkError
      });
    }
  });

  test('request error interceptor passes through errors', async () => {
    const requestErrorInterceptor = axiosInstance.interceptors.request.use.mock.calls[0][1];

    const mockError = new Error('Request configuration error');

    try {
      await requestErrorInterceptor(mockError);
      fail('L\'intercepteur aurait dû rejeter la promesse');
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  test('response success interceptor passes through responses', async () => {
    const responseSuccessInterceptor = axiosInstance.interceptors.response.use.mock.calls[0][0];

    const mockResponse = {
      status: 200,
      data: { result: 'success' },
      headers: { 'content-type': 'application/json' },
      config: {}
    };

    const result = await responseSuccessInterceptor(mockResponse);

    // Vérifier que la réponse est retournée sans modification
    expect(result).toBe(mockResponse);
  });

  test('signRequest handles different data configurations correctly', async () => {
    mockedJwt.sign.mockReturnValue('signed' as any);

    mockedCrypto.SHA256.mockImplementation(() => ({
      toString: jest.fn().mockReturnValue('test-sha256'),
    } as any));

    const requestInterceptor = axiosInstance.interceptors.request.use.mock.calls[0][0];

    // Test avec data présent
    const configWithData = {
      url: '/test',
      data: { test: 'data' }
    };

    await requestInterceptor(configWithData);

    // Vérifier que SHA256 a été appelé avec la données JSON stringifiée
    // expect(mockedCrypto.SHA256).toHaveBeenCalledWith(JSON.stringify({ test: 'data' }));

    // Réinitialiser le spy
    mockedCrypto.SHA256.mockClear();

    // Test sans data
    const configWithoutData = {
      url: '/test',
      data: undefined
    };

    await requestInterceptor(configWithoutData);

    // Vérifier que SHA256 a été appelé avec "{}"
    expect(mockedCrypto.SHA256).toHaveBeenCalledWith("{}");

    // Réinitialiser le spy
    mockedCrypto.SHA256.mockClear();

    // Test avec null data
    const configWithNullData = {
      url: '/test',
      data: null
    };

    await requestInterceptor(configWithNullData);

    // Vérifier que SHA256 a été appelé avec "{}"
    expect(mockedCrypto.SHA256).toHaveBeenCalledWith("{}");
  });
});
