import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';
const EMAIL = 'eve.holt@reqres.in';
const PASSWD = 'cityslicka';

test.describe('Login Reqres', () => {

  test('Login successful', async ({ request }) => {
    const response = await request.post(BASE_URL + '/login', {
      data: {
        email: EMAIL,
        password: PASSWD,
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(200);
    expect(responseData).toHaveProperty('token');
  });

  test('Login email blank', async ({ request }) => {
    const response = await request.post(BASE_URL + '/login', {
      data: {
        email: '',
        password: PASSWD,
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(400);
    expect(responseData).toHaveProperty('error', 'Missing email or username');
  });

  test('Login password blank', async ({ request }) => {
    const response = await request.post(BASE_URL + '/login', {
      data: {
        email: EMAIL,
        password: '',
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(400);
    expect(responseData).toHaveProperty('error', 'Missing password');
  });

  test('Login user not found', async ({ request }) => {
    const response = await request.post(BASE_URL + '/login', {
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