import { test, expect } from '@playwright/test';
import date from '../support/date';

require('dotenv').config();

const URL_BASE = process.env.URL_BASE;
const NAME = process.env.NAME_UPDATE;
const JOB = process.env.JOB_UPDATE;
const DATE = date.getCurrentDate();

test.describe('Update Reqres', () => {

  test('Update user', async ({ request }) => {
    const response = await request.put(URL_BASE + '/users/2', {
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