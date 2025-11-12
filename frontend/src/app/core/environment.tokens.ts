import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
  apiBaseUrl: string;
  backendUrl: string;
  frontendUrl: string;
  wsUrl: string;
  nodeEnv: string;
  loggingLevel: string;
  featureFlags: string;
  experimentsEnabled: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Provide ENV token to access app environment values derived from process.env (SSR) or window (CSR).
 */
export const ENV = new InjectionToken<AppEnvironment>('ENV');
