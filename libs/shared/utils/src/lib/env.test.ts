import { getAppEnvironmentName, getAppEnvTitle } from './env';

describe('getEnv', () => {
  describe('getAppEnvironmentName', () => {
    it('returns the value of NX_PUBLIC_WEB_ENV if set', () => {
      const mockProcess = {
        env: { NX_PUBLIC_WEB_ENV: 'development' },
      } as unknown as NodeJS.Process;
      expect(getAppEnvironmentName(mockProcess.env.NX_PUBLIC_WEB_ENV)).toBe('development');
    });

    it('returns "local" for localhost or gitpod hostnames', () => {
      // @ts-expect-error - overriding window location for mocking
      delete window.location;
      window.location = { hostname: 'localhost' } as any;
      expect(getAppEnvironmentName()).toBe('local');
      window.location = { hostname: 'gitpod' } as any;
      expect(getAppEnvironmentName()).toBe('local');
    });

    it('returns "dev" for dev hostnames', () => {
      window.location = { hostname: 'dev.example.com' } as any;
      expect(getAppEnvironmentName()).toBe('dev');
    });

    it('returns "staging" for staging hostnames', () => {
      window.location = { hostname: 'staging.example.com' } as any;
      expect(getAppEnvironmentName()).toBe('staging');
    });

    it('returns "production" as a fallback', () => {
      window.location = { hostname: 'example.com' } as any;
      expect(getAppEnvironmentName()).toBe('production');
    });

    describe('getAppEnvTitle', () => {
      it('returns default title for production environment', () => {
        expect(getAppEnvTitle({ envName: 'production' })).toBe('MMS');
      });

      it('returns modified title for non-production environments', () => {
        expect(getAppEnvTitle({ envName: 'dev' })).toBe('MMS [DEV] ');
        expect(getAppEnvTitle({ envName: 'staging' })).toBe('MMS [STAGING] ');
        expect(getAppEnvTitle({ envName: 'local' })).toBe('MMS [LOC] ');
      });

      it('uses custom titleGenerator when provided', () => {
        const mockTitleGenerator = jest.fn((envTitle) => `Custom Title [${envTitle}]`);
        expect(getAppEnvTitle({ envName: 'dev', titleGenerator: mockTitleGenerator })).toBe('Custom Title [DEV]');
        expect(mockTitleGenerator).toHaveBeenCalledWith('DEV');
      });
    });
  });
});
