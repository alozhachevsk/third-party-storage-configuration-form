import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ProviderKey } from '@/providers/types';
import { Providers } from '@/providers';

export interface ProviderSelectorProps {
  providers: Providers;
  selectedProvider: ProviderKey | null;
  onChangeProvider: (provider: ProviderKey) => void;
}

export function ProviderSelector({
  providers,
  selectedProvider,
  onChangeProvider,
}: ProviderSelectorProps) {
  if (selectedProvider) {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="provider">Choose Provider</Label>
        <Select
          value={selectedProvider}
          onValueChange={(value: ProviderKey) => onChangeProvider(value)}
        >
          <SelectTrigger id="provider" className="w-full">
            <SelectValue placeholder="Select a provider" />
          </SelectTrigger>
          <SelectContent>
            {providers.map(provider => (
              <SelectItem key={provider.key} value={provider.key}>
                {provider.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Choose Provider</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {providers.map(provider => (
          <Button
            key={provider.key}
            variant="secondary"
            onClick={() => onChangeProvider(provider.key)}
          >
            {provider.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
