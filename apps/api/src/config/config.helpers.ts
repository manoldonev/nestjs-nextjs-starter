export enum EnvName {
  development = 'development',
  production = 'production',
}

export const getEnvName = (value: string | undefined): EnvName => {
  const nodeEnv = value || '';

  return nodeEnv === 'development' || nodeEnv === ''
    ? EnvName.development
    : (nodeEnv as EnvName);
};

export function getEnvVar(key: string, defaults: string): string;
export function getEnvVar(key: string, defaults?: string): string | undefined;
export function getEnvVar(key: string, defaults?: boolean): boolean;
export function getEnvVar(key: string, defaults: number): number;
export function getEnvVar(key: string, defaults?: number): number | undefined;
export function getEnvVar(key: string, defaults: unknown[]): unknown[];
export function getEnvVar(
  key: string,
  defaults?: unknown[]
): unknown[] | undefined;
export function getEnvVar(
  key: string,
  defaults?: string | boolean | number | unknown[]
): string | boolean | number | unknown[] | undefined {
  const value = process.env[key];

  if (value === undefined) {
    return defaults;
  }

  switch (typeof defaults) {
    case 'boolean':
      return value === 'true';
    case 'number': {
      const parsedValue = Number.parseInt(value, 10);
      return isNaN(parsedValue) ? defaults : parsedValue;
    }
    case 'object':
      try {
        return JSON.parse(value);
      } catch {
        return defaults;
      }
    case 'string':
      return value;
    default:
      return value;
  }
}
