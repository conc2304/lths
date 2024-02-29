import { FeatureFlag } from './types';
import {
  generateFlagId,
  getFlagStatusByFlagId,
  parseFlagId,
  createFeatureFlagPayload,
  updateFeatureFlagPayload,
  deleteFeatureFlagPayload,
} from './utils';

describe('utils', () => {
  describe('generateFlagId', () => {
    it('generates correct flag ID', () => {
      const result = generateFlagId({ title: 'Test Flag', module: 'Module' });
      expect(result).toMatch(/^MMS_MODULE--test-flag$/);
    });
  });

  describe('getFlagStatusByFlagId', () => {
    const flags: FeatureFlag[] = [
      { id: 'MMS_MODULE--TEST1', description: 'Test Flag 1', enabled: true, title: 'Test 1', module: 'Module' },
      { id: 'MMS_MODULE--TEST2', description: 'Test Flag 2', enabled: false, title: 'Test 2', module: 'Module' },
    ];

    it('returns true for enabled flag', () => {
      const result = getFlagStatusByFlagId('MMS_MODULE--TEST1', flags);
      expect(result).toBe(true);
    });

    it('returns false for disabled flag', () => {
      const result = getFlagStatusByFlagId('MMS_MODULE--TEST2', flags);
      expect(result).toBe(false);
    });

    it('returns fallback value if flag not found', () => {
      const result = getFlagStatusByFlagId('MMS_MODULE--NOTFOUND', flags, true);
      expect(result).toBe(true);
    });
  });

  describe('parseFlagId', () => {
    it('parses flag ID correctly', () => {
      const result = parseFlagId('MMS_MODULE--TEST');
      expect(result).toEqual({ title: 'TEST', module: 'MODULE', appPrefix: 'MMS' });
    });
  });

  // todo add tests for formatting the payload
  describe('createFeatureFlagPayload', () => {
    const flags: FeatureFlag[] = [
      { id: 'MMS_MODULE--TEST1', description: 'Test Flag 1', enabled: true, title: 'Test 1', module: 'Module' },
      { id: 'MMS_MODULE--TEST2', description: 'Test Flag 2', enabled: false, title: 'Test 2', module: 'Module' },
    ];

    const newFlag: FeatureFlag = {
      id: 'MMS_MODULE--NEW',
      description: 'New Flag',
      enabled: true,
      title: 'New',
      module: 'Module',
    };

    it('creates payload correctly', () => {
      const result = createFeatureFlagPayload(newFlag, flags);
      expect(result).toHaveLength(3);
      expect(result[2].name).toBe(newFlag.id);
      expect(result[2].value).toBe(newFlag);
    });
  });

  describe('updateFeatureFlagPayload', () => {
    const flags: FeatureFlag[] = [
      { id: 'MMS_MODULE--TEST1', description: 'Test Flag 1', enabled: true, title: 'Test 1', module: 'Module' },
      { id: 'MMS_MODULE--TEST2', description: 'Test Flag 2', enabled: false, title: 'Test 2', module: 'Module' },
    ];

    const editedFlag: FeatureFlag = {
      id: 'MMS_MODULE--TEST2',
      description: 'Edited Flag',
      enabled: true,
      title: 'Edited',
      module: 'Module',
    };

    it('updates payload correctly', () => {
      const result = updateFeatureFlagPayload(editedFlag, flags);
      expect(result).toHaveLength(2);
      expect(result[1].value).toBe(editedFlag);
    });
  });

  describe('deleteFeatureFlagPayload', () => {
    const flags: FeatureFlag[] = [
      { id: 'MMS_MODULE--TEST1', description: 'Test Flag 1', enabled: true, title: 'Test 1', module: 'Module' },
      { id: 'MMS_MODULE--TEST2', description: 'Test Flag 2', enabled: false, title: 'Test 2', module: 'Module' },
    ];

    const deletedFlag: FeatureFlag = {
      id: 'MMS_MODULE--TEST2',
      description: 'Test Flag 2',
      enabled: false,
      title: 'Test 2',
      module: 'Module',
    };

    it('deletes payload correctly', () => {
      const result = deleteFeatureFlagPayload(deletedFlag, flags);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('MMS_MODULE--TEST1');
    });
  });
});
