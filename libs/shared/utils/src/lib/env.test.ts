import { afterEach } from 'node:test';

import { getAppEnvironmentName, getAppEnvTitle, WebEnvName } from './env';

describe('getEnv', () => {
  describe('getAppEnvironmentName', () => {
    const preLocation = window?.location ?? {};
    beforeEach(() => {
      // @ts-expect-error - overriding window location for mocking
      delete window.location;
    });

    afterEach(() => {
      window.location = preLocation;
    });

    it('returns the value of NX_PUBLIC_WEB_ENV if set', () => {
      const mockProcess = {
        env: { NX_PUBLIC_WEB_ENV: 'dev' },
      } as unknown as NodeJS.Process;

      expect(getAppEnvironmentName(mockProcess.env.NX_PUBLIC_WEB_ENV)).toBe('dev');
    });

    it('returns "local" for localhost or gitpod hostnames', () => {
      window.location = { hostname: 'localhost' } as any;
      expect(getAppEnvironmentName()).toBe('local');
      window.location = { hostname: 'gitpod' } as any;
      expect(getAppEnvironmentName()).toBe('local');
    });

    it('returns "dev" for dev hostnames', () => {
      window.location = { hostname: 'mms-dev-k8s.briteliteimmersive.io' } as any;
      expect(getAppEnvironmentName()).toBe('dev');
    });

    it('returns "staging" for staging hostnames', () => {
      window.location = { hostname: '"mms-staging.briteliteimmersive.io"' } as any;
      expect(getAppEnvironmentName()).toBe('staging');
    });

    it('returns "production" as a fallback', () => {
      window.location = { hostname: 'mms.lths.app' } as any;
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

    describe('environment indicator', () => {
      // The first item in the tuple is the env variable passed down from the ci pipeline
      const envs: WebEnvName[] = ['dev', 'local', 'qa', 'staging', 'production'];

      for (const nxWebEnv of envs) {
        it(`returns correct environment title for ${nxWebEnv} : NX_PUBLIC_WEB_ENV.`, () => {
          jest.isolateModules(() => {
            require('../../../../../.env');
            process.env.NX_PUBLIC_WEB_ENV = nxWebEnv;
          });

          expect(getAppEnvironmentName(process.env.NX_PUBLIC_WEB_ENV)).toBe(nxWebEnv);
        });
      }

      it('returns "production" when NX_PUBLIC_WEB_ENV does not match expected and on production url', () => {
        window.location = { hostname: 'mms.lths.app' } as any;
        jest.isolateModules(() => {
          require('../../../../../.env');
          process.env.NX_PUBLIC_WEB_ENV = 'BANANA';
        });

        expect(getAppEnvironmentName(process.env.NX_PUBLIC_WEB_ENV)).toBe('production');
      });
    });
  });
});
