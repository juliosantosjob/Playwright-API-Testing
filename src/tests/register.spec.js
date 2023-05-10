import { test, expect } from '@playwright/test';

require('dotenv').config();

const URL_BASE = process.env.URL_BASE;
const EMAIL = process.env.EMAIL_REGIST;
const PASSWD = process.env.PASSWORD_REGIST;

test.describe('Register Reqres', () => {

  test('Register successful', async ({ request }) => {
    const response = await request.post(URL_BASE + '/register', {
      data: {
        email: EMAIL,
        password: PASSWD
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(200);
    expect(responseData).toHaveProperty('id', 4);
    expect(responseData).toHaveProperty('token');
  });

  test('Register user not defined', async ({ request }) => {
    const response = await request.post(URL_BASE + '/register', {
      data: {
        email: 'user_123@gmail.com',
        password: PASSWD
      }
    });

    const responseData = await response.json();
    expect(response.status()).toBe(400);
    expect(responseData)
      .toHaveProperty('error', 'Note: Only defined users succeed registration');
  });
});