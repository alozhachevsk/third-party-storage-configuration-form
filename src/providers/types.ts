import { z } from 'zod';
import { FieldPath } from 'react-hook-form';

export type ProviderKey = string;

export type ProviderSchema = z.core.$ZodObject<Record<string, z.core.$ZodString>>;

export type ProviderField<Name extends string = string> = {
  name: Name;
  label: string;
  placeholder?: string;
  fullWidth?: boolean;
  defaultValue?: string;
} & (
  | {
      type: 'text' | 'password';
    }
  | {
      type: 'select';
      options: { label: string; value: string }[];
    }
);

export type ProviderDestination = Record<string, unknown>;

export type ProviderConfig<
  K extends ProviderKey = ProviderKey,
  S extends ProviderSchema = ProviderSchema,
> = {
  key: K;
  label: string;
  fields: ProviderField<FieldPath<z.infer<S>>>[];
  schema: S;
  buildDestination: (values: z.infer<S>) => ProviderDestination;
};
