import { Provider } from '@angular/core';
import { ENV, AppEnvironment } from './environment.tokens';

// Normalize boolean-like strings
function toBool(val: unknown, fallback = false): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') {
    const v = val.trim().toLowerCase();
    return ['1', 'true', 'yes', 'y', 'on'].includes(v);
  }
  return fallback;
}

// Attempt to safely read env in both SSR and CSR
function readProcessEnv(key: string): string | undefined {
  try {
    // @ts-expect-error: process may not exist in browser build
    return typeof process !== 'undefined' && process?.env ? process.env[key] : undefined;
  } catch {
    return undefined;
  }
}

function readWindowEnv(key: string): string | undefined {
  try {
    // eslint-disable-next-line no-undef
    const w: any = (typeof window !== 'undefined') ? (window as any) : undefined;
    if (!w) return undefined;
    return w.__env?.[key];
  } catch {
    return undefined;
  }
}

function getEnvVar(key: string, fallback?: string): string {
  return readProcessEnv(key) ?? readWindowEnv(key) ?? (fallback ?? '');
}

const defaultEnv: AppEnvironment = {
  apiBaseUrl: 'https://example.com/api',
  backendUrl: 'https://example.com',
  frontendUrl: 'http://localhost:3000',
  wsUrl: 'ws://localhost:3000',
  nodeEnv: 'development',
  loggingLevel: 'info',
  featureFlags: '',
  experimentsEnabled: false,
};

export const environmentFactory = (): AppEnvironment => {
  const apiBase = getEnvVar('NG_APP_API_BASE') || getEnvVar('NG_APP_BACKEND_URL') || defaultEnv.apiBaseUrl;
  return {
    apiBaseUrl: apiBase,
    backendUrl: getEnvVar('NG_APP_BACKEND_URL', defaultEnv.backendUrl),
    frontendUrl: getEnvVar('NG_APP_FRONTEND_URL', defaultEnv.frontendUrl),
    wsUrl: getEnvVar('NG_APP_WS_URL', defaultEnv.wsUrl),
    nodeEnv: getEnvVar('NG_APP_NODE_ENV', defaultEnv.nodeEnv),
    loggingLevel: getEnvVar('NG_APP_LOG_LEVEL', defaultEnv.loggingLevel),
    featureFlags: getEnvVar('NG_APP_FEATURE_FLAGS', defaultEnv.featureFlags),
    experimentsEnabled: toBool(getEnvVar('NG_APP_EXPERIMENTS_ENABLED'), defaultEnv.experimentsEnabled),
  };
};

/**
 * PUBLIC_INTERFACE
 * Provides the ENV token for dependency injection across the app.
 */
export const provideEnvironment: Provider = {
  provide: ENV,
  useFactory: environmentFactory,
};
