import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProviderConfig, ProviderDestination } from '@/providers/types';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { backendValidation } from '@/lib/backendValidation';
import { Spinner } from '@/components/ui/spinner.tsx';

export type ProviderFormProps<PC extends ProviderConfig> = {
  providerConfig: PC;
  backendValidation: typeof backendValidation;
  onCancel: () => void;
  onSubmit: (destination: ProviderDestination) => void;
};

export function ProviderForm<PC extends ProviderConfig>({
  providerConfig,
  backendValidation,
  onCancel,
  onSubmit,
}: ProviderFormProps<PC>) {
  const [isBackendValidation, setIsBackendValidation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = useMemo(
    () =>
      Object.fromEntries(
        providerConfig.fields.map(field => [field.name, field.defaultValue ?? '']),
      ),
    [providerConfig],
  );

  const form = useForm({
    resolver: zodResolver(providerConfig.schema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async values => {
    try {
      setIsBackendValidation(true);

      const errors = await backendValidation(providerConfig, values);

      if (errors) {
        Object.entries(errors).forEach(([key, message]) =>
          form.setError(key, { type: 'backend', message }),
        );

        return;
      }

      onSubmit(providerConfig.buildDestination(values));
    } finally {
      setIsBackendValidation(false);
    }
  });

  useEffect(() => form.reset(defaultValues), [form, defaultValues]);

  return (
    <form className="flex flex-1 flex-col gap-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
        {providerConfig.fields.map(field => (
          <div
            className={cn('relative grid gap-2 pb-5', field.fullWidth && 'sm:col-span-2')}
            key={field.name}
          >
            <Label htmlFor={field.name}>{field.label}</Label>

            {field.type === 'select' && (
              <Controller
                control={form.control}
                name={field.name}
                render={({ field: renderField }) => (
                  <Select
                    name={field.name}
                    value={String(renderField.value ?? field.defaultValue ?? '')}
                    onValueChange={renderField.onChange}
                  >
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            )}

            {field.type === 'text' && (
              <Input id={field.name} type="text" {...form.register(field.name)} />
            )}

            {field.type === 'password' && (
              <div className="relative">
                <Input
                  id={field.name}
                  type={showPassword ? 'text' : 'password'}
                  className="pr-10"
                  {...form.register(field.name)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            )}

            {form.formState.errors[field.name] && (
              <p className="absolute bottom-0 left-0 text-xs text-red-500">
                {form.formState.errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outline"
          disabled={form.formState.isValidating || isBackendValidation}
        >
          {(form.formState.isValidating || isBackendValidation) && <Spinner />}
          Submit
        </Button>
      </div>
    </form>
  );
}
