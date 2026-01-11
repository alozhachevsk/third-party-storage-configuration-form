import { ProviderConfig } from '@/providers/types';

export async function backendValidation(
  providerConfig: ProviderConfig,
  values: Record<string, string | undefined>,
) {
  console.log(`Setting up backend validation for provider "${providerConfig.key}"`);

  await new Promise(resolve => setTimeout(resolve, 100));

  const errors = Object.entries(values)
    .map(([key, value]) => {
      if (!value?.includes('error')) {
        return null;
      }

      return [key, `Field contains invalid value "error"`] as const;
    })
    .filter(value => !!value);

  return errors.length > 0 ? Object.fromEntries(errors) : null;
}
