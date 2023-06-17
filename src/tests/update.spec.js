import { test, expect } from '@playwright/test';
import date from '../support/date';

const BASE_URL = 'https://reqres.in/api';
const NAME = 'morpheus';
const JOB = 'zion resident';
const DATE = date.getCurrentDate();

test.describe('Update Reqres', () => {

  test('Update user', async ({ request }) => {
    const response = await request.put(BASE_URL + '/users/2', {
      data: {
        email: NAME,
        password: JOB
      }
    });
    const responseData = await response.json();
    expect(response.status()).toBe(200);
    expect(responseData.updatedAt.substring(0, 10)).toEqual(DATE);
  });
});