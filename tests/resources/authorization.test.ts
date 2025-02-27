import axios from 'axios';
import { Authorization } from '../../src/resources';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Authorization', () => {
  let resource: any;
  
  beforeEach(() => {
    resource = new Authorization(mockedAxios);
  });
  
  test('Authorization initialization', () => {
    expect(resource).toBeDefined();
  });
  
  test('try', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        message: 'Successful',
      },
    });

    const result = await resource.try();

    expect(result).toBeDefined();
    expect(result.message).toBe('Successful');
  });
}); 