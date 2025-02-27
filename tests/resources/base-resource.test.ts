import axios, { AxiosInstance } from 'axios';
import { BaseResource } from '../../src/resources/base-resource';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

class TestBaseResource extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, '/test');
  }
}

describe('BaseResource', () => {
  let resource: any;
  
  beforeEach(() => {
    resource = new TestBaseResource(mockedAxios);
  });
  
  test('AuthorizationResource initialization', () => {
    expect(resource).toBeDefined();
  });
  
  test('get', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        message: 'Successful',
      },
    });
    
    const params = { 'a': 'b' };
    const result = await resource.get('/get', params);

    expect(result).toBeDefined();
    expect(result.message).toBe('Successful');
    expect(mockedAxios.get).toHaveBeenCalledWith('/test/get', { params });
  });
  
  test('post', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        message: 'Successful',
      },
    });
    
    const data = { 'a': 'b' };
    const result = await resource.post('/post', data);

    expect(result).toBeDefined();
    expect(result.message).toBe('Successful');
    expect(mockedAxios.post).toHaveBeenCalledWith('/test/post', data);
  });
  
  test('put', async () => {
    mockedAxios.put.mockResolvedValue({
      data: {
        message: 'Successful',
      },
    });
    
    const data = { 'a': 'b' };
    const result = await resource.put('/put', data);

    expect(result).toBeDefined();
    expect(result.message).toBe('Successful');
    expect(mockedAxios.put).toHaveBeenCalledWith('/test/put', data);
  });
  
  test('patch', async () => {
    mockedAxios.patch.mockResolvedValue({
      data: {
        message: 'Successful',
      },
    });
    
    const data = { 'a': 'b' };
    const result = await resource.patch('/patch', data);

    expect(result).toBeDefined();
    expect(result.message).toBe('Successful');
    expect(mockedAxios.patch).toHaveBeenCalledWith('/test/patch', data);
  });
  
  test('delete', async () => {
    mockedAxios.delete.mockResolvedValue({
      data: {
        message: 'Successful',
      },
    });
    
    const result = await resource.delete('/delete');

    expect(result).toBeDefined();
    expect(result.message).toBe('Successful');
    expect(mockedAxios.delete).toHaveBeenCalledWith('/test/delete');
  });
}); 