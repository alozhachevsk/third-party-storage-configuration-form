import { useState } from 'react';
import { getProviderConfig, providers } from './providers';
import { DestinationJson, ProviderForm, ProviderSelector } from '@/components';
import { ProviderFormValuesMap, ProviderKey } from '@/providers/types.ts';
import { Card } from '@/components/ui/card.tsx';
import { UseFormSetError } from 'react-hook-form';
import { validateBackend } from '@/helpers';

export function App() {
  const [selectedProvider, setSelectedProvider] = useState<ProviderKey | null>(null);
  const [destinationJson, setDestinationJson] = useState<Record<string, unknown> | null>(null);

  const onChangeProvider = (provider: ProviderKey) => {
    setSelectedProvider(provider);
    setDestinationJson(null);
  };

  const handleCancel = () => {
    setSelectedProvider(null);
    setDestinationJson(null);
  };

  const handleSubmit = <K extends ProviderKey>(
    values: ProviderFormValuesMap[K],
    setError: UseFormSetError<ProviderFormValuesMap[K]>,
  ) => {
    if (!selectedProvider) {
      return;
    }

    const hasError = validateBackend(values, setError);

    if (hasError) {
      return;
    }

    const config = getProviderConfig(selectedProvider);
    const destination = config.buildDestination(values);

    setDestinationJson(destination);
  };

  return (
    <div className={'flex min-h-screen w-full items-center justify-center p-5'}>
      <div className={'w-full max-w-[550px]'}>
        <Card className={'flex h-auto min-h-[320px] flex-col gap-5 p-5'}>
          <h2 className={'mb-2 text-2xl'}>Third-Party Storage</h2>

          <ProviderSelector
            providers={providers}
            selectedProvider={selectedProvider}
            onChangeProvider={onChangeProvider}
          />

          {selectedProvider && (
            <ProviderForm<typeof selectedProvider>
              key={selectedProvider}
              providerConfig={getProviderConfig(selectedProvider)}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </Card>

        {destinationJson && <DestinationJson data={destinationJson} />}
      </div>
    </div>
  );
}

export default App;
