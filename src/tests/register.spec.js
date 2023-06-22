import { test, expect } from '@playwright/test';

const email = 'eve.holt@reqres.in';
const password = 'cityslicka';

test.describe('Register Reqres', () => {
  test('Register successful', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/register`, {
      data: {
        email: email,
        password: password
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(200);
    expect(responseData).toHaveProperty('token');
  });

  test('Register user not defined', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/register`, {
      data: {
        email: 'user_123@gmail.com',
        password: password
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(400);
    expect(responseData).toHaveProperty('error', 
      'Note: Only defined users succeed registration');
  });
});