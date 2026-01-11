import { awsProviderConfig } from './awsProviderConfig';
import { gcpProviderConfig } from './gcpProviderConfig';
import { ProviderConfig, ProviderKey } from './types';

const providerConfigs = {
  aws: awsProviderConfig,
  gcp: gcpProviderConfig,
} satisfies Record<ProviderKey, ProviderConfig>;

export type ProviderConfigs = typeof providerConfigs;
export type ProviderKeys = keyof ProviderConfigs;

export function hasProviderConfig<K extends string>(key?: K | null): key is K & ProviderKeys {
  return key != null && key in providerConfigs;
}

export function getProviderConfig<K extends ProviderKeys>(key: K) {
  return providerConfigs[key];
}

export const providers = Object.values(providerConfigs).map(({ key, label }) => ({
  key,
  label,
}));

export type Providers = typeof providers;
