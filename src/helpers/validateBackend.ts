import { Path, UseFormSetError } from 'react-hook-form';
import { ProviderFormValuesMap, ProviderKey } from '@/providers/types.ts';

export function validateBackend<K extends ProviderKey>(
  values: ProviderFormValuesMap[K],
  setError: UseFormSetError<ProviderFormValuesMap[K]>,
): boolean {
  let hasError = false;

  (Object.keys(values) as (keyof ProviderFormValuesMap[K])[]).forEach(key => {
    const typedKey = key as Path<ProviderFormValuesMap[K]>;

    if (values[key] === 'error') {
      setError(typedKey, {
        type: 'manual',
        message: 'Backend validation failed for this field',
      });
      hasError = true;
    }
  });

  return hasError;
}
