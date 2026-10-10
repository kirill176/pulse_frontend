import { isEmpty } from '@utils/GeneralUtils';

describe('General Functions', () => {
  test('check isEmpty func', () => {
    expect(isEmpty(undefined)).toBeTruthy();
  });
});
