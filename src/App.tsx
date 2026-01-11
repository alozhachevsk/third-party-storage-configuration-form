import { useState } from 'react';
import { getProviderConfig, hasProviderConfig, providers } from './providers';
import { DestinationJson, ProviderForm, ProviderSelector } from '@/components';
import { ProviderDestination, ProviderKey } from '@/providers/types';
import { Card } from '@/components/ui/card';
import { backendValidation } from '@/lib/backendValidation';

export function App() {
  const [selectedProvider, setSelectedProvider] = useState<ProviderKey | null>(null);
  const [destinationJson, setDestinationJson] = useState<ProviderDestination | null>(null);

  const handleChangeProvider = (provider: ProviderKey) => {
    setSelectedProvider(provider);
    setDestinationJson(null);
  };

  const handleCancel = () => {
    setSelectedProvider(null);
    setDestinationJson(null);
  };

  const handleSubmit = (destinationJson: ProviderDestination) => {
    setDestinationJson(destinationJson);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-5">
      <div className="w-full max-w-137.5">
        <Card className="flex h-auto min-h-80 flex-col gap-5 p-5">
          <h2 className="mb-2 text-2xl">Third-Party Storage</h2>

          <ProviderSelector
            providers={providers}
            selectedProvider={selectedProvider}
            onChangeProvider={handleChangeProvider}
          />

          {hasProviderConfig(selectedProvider) && (
            <ProviderForm
              key={selectedProvider}
              providerConfig={getProviderConfig(selectedProvider)}
              backendValidation={backendValidation}
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
