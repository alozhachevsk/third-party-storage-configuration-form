import { ZodType } from 'zod';
import { AwsFormValues, GcpFormValues } from '@/providers/schemas';

export type ProviderKey = 'aws' | 'gcp';

export interface ProviderField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'select';
  options?: { label: string; value: string }[];
  placeholder?: string;
  fullWidth?: boolean;
}

export interface ProviderConfig<
  TValues extends Record<string, any>,
  K extends ProviderKey = ProviderKey,
> {
  key: K;
  label: string;
  fields: ProviderField[];
  schema: ZodType<TValues>;
  buildDestination: (values: TValues) => Record<string, unknown>;
}

export interface ProviderOption {
  key: ProviderKey;
  label: string;
}

export interface ProviderFormValuesMap {
  aws: AwsFormValues;
  gcp: GcpFormValues;
}

export type AnyProviderConfig = ProviderConfig<AwsFormValues> | ProviderConfig<GcpFormValues>;
