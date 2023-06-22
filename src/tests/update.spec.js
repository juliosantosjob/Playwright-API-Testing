import { test, expect } from '@playwright/test';
import hp from '../support/helpers';

const name = 'morpheus';
const job = 'zion resident';
const currentDate = hp.getCurrentDate();

test.describe('Update Reqres', () => {
  test('Update user', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      data: {
        email: name,
        password: job
      }
    });
    const responseData = await response.json();
    expect(response.status()).toBe(200);
    expect(responseData.updatedAt.substring(0, 10)).toEqual(currentDate);
  });
});