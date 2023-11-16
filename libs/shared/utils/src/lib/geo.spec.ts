import { getCountryData, validatePostalCode } from './geo';

describe('Country utilities', () => {
  describe('getCountryData', () => {
    it('should return the correct country object when provided with a valid code', () => {
      const result = getCountryData({ code: 'AE' });
      expect(result).toEqual({
        code: 'AE',
        label: 'United Arab Emirates',
        phone: '971',
      });
    });

    it('should return the correct country object when provided with a valid label', () => {
      const result = getCountryData({ country: 'Andorra' });
      expect(result).toEqual({
        code: 'AD',
        label: 'Andorra',
        phone: '376',
      });
    });

    it('should return undefined for an invalid code or label', () => {
      const result = getCountryData({ code: 'MOCKCODE' });
      expect(result).toBeUndefined();
    });
  });

  describe('validatePostalCode', () => {
    it('should validate postal code for a given country code', () => {
      expect(validatePostalCode('GB', 'GIR 0AA')).toBe(true);
    });

    it('should invalidate incorrect postal code for a given country code', () => {
      expect(validatePostalCode('GB', '1234')).toBe(false);
    });

    it('should return true if no country code is provided', () => {
      expect(validatePostalCode(undefined, '1234')).toBe(true);
    });

    it('should return true if there is no regex pattern for the provided country code', () => {
      expect(validatePostalCode('BAD_CODE', '1234')).toBe(true);
    });

    it('should log information if there is no regex pattern for the provided country code', () => {
      const consoleSpy = jest.spyOn(console, 'info');
      validatePostalCode('BAD_CODE', '1234');
      expect(consoleSpy).toHaveBeenCalledWith('No postal code pattern found for territory ID: BAD_CODE');
    });
  });
});
