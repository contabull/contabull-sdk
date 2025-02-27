export const mockApiResponse = (status: number, data: any) => {
  return Promise.resolve({
    status,
    ok: status >= 200 && status < 300,
    json: () => Promise.resolve(data),
  });
};

export const mockApiError = (status: number, message: string) => {
  return Promise.reject({
    status,
    message,
  });
};

// Add more testing utilities as needed 