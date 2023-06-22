import { test, expect } from '@playwright/test';

const email = 'eve.holt@reqres.in';
const password = 'cityslicka';

test.describe('Login Reqres', () => {
  test('Login successful', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: email,
        password: password,
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(200);
    expect(responseData).toHaveProperty('token');
  });

  test('Login email blank', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: '',
        password: password,
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(400);
    expect(responseData).toHaveProperty('error', 'Missing email or username');
  });

  test('Login password blank', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: email,
        password: '',
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(400);
    expect(responseData).toHaveProperty('error', 'Missing password');
  });

  test('Login user not found', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: 'user1312@gmail.com',
        password: 'test123',
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(400);
    expect(responseData).toHaveProperty('error', 'user not found');
  });
});