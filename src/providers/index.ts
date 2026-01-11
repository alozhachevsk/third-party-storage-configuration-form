import { awsProviderConfig } from './awsProviderConfig.ts';
import { gcpProviderConfig } from './gcpProviderConfig.ts';
import { AnyProviderConfig, ProviderKey } from './types.ts';

export const providerConfigs = [awsProviderConfig, gcpProviderConfig] as const;

export const providersConfig = {
  aws: awsProviderConfig,
  gcp: gcpProviderConfig,
} as const;

export function getProviderConfig(key: ProviderKey): AnyProviderConfig {
  return providersConfig[key];
}

export const providers: { key: ProviderKey; label: string }[] = providerConfigs.map(
  ({ key, label }) => ({ key, label }),
);
