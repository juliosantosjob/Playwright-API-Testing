import { test, expect } from '@playwright/test';

require('dotenv').config();

const URL_BASE = process.env.URL_BASE;
const EMAIL = process.env.EMAIL_LOGIN;
const PASSWD = process.env.PASSWORD_LOGIN;

test.describe('Login Reqres', () => {

  test('Login successful', async ({ request }) => {
    const response = await request.post(URL_BASE + '/login', {
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
    const response = await request.post(URL_BASE + '/login', {
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
    const response = await request.post(URL_BASE + '/login', {
      data: {
        email: EMAIL,
        password: '',
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(400);
    expect(responseData).toHaveProperty('error', 'Missing password');
  });

  test('Login user net register', async ({ request }) => {
    const response = await request.post(URL_BASE + '/login', {
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