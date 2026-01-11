import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, DefaultValues, Path, UseFormSetError } from 'react-hook-form';
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
import { AnyProviderConfig, ProviderField, ProviderFormValuesMap } from '@/providers/types';
import { cn } from '@/lib/utils.ts';
import { z } from 'zod';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type ProviderFormProps<K extends keyof ProviderFormValuesMap> = {
  providerConfig: AnyProviderConfig;
  onCancel: () => void;
  onSubmit: (
    values: ProviderFormValuesMap[K],
    setError: UseFormSetError<ProviderFormValuesMap[K]>,
  ) => void;
};

export function ProviderForm<K extends keyof ProviderFormValuesMap>({
  providerConfig,
  onCancel,
  onSubmit,
}: ProviderFormProps<K>) {
  type FormValues = ProviderFormValuesMap[K];
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = providerConfig.fields.reduce<Partial<FormValues>>((acc, field) => {
    const key = field.name as keyof FormValues;

    if (field.type === 'select' && field.options?.length) {
      acc[key] = field.options[0].value as FormValues[typeof key];
    }

    return acc;
  }, {}) as DefaultValues<FormValues>;

  const {
    handleSubmit,
    control,
    register,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(providerConfig.schema as z.ZodType<FormValues, any, any>),
    defaultValues,
  });

  return (
    <form
      className="flex flex-1 flex-col gap-6"
      onSubmit={handleSubmit(values => onSubmit(values, setError))}
    >
      <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
        {providerConfig.fields.map((field: ProviderField) => {
          const fieldError = errors[field.name as keyof ProviderFormValuesMap[K]]?.message as
            | string
            | undefined;

          return (
            <div
              className={cn('relative grid gap-2 pb-5', field.fullWidth && 'sm:col-span-2')}
              key={field.name}
            >
              <Label htmlFor={field.name}>{field.label}</Label>

              {field.type === 'select' && field.options && (
                <Controller
                  control={control}
                  name={field.name as unknown as Path<FormValues>}
                  render={({ field: selectField }) => (
                    <Select
                      value={selectField.value as string}
                      onValueChange={selectField.onChange}
                    >
                      <SelectTrigger className={'w-full'}>
                        <SelectValue placeholder={`Select ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options!.map(option => (
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
                <Input
                  id={field.name}
                  type="text"
                  {...register(field.name as unknown as Path<FormValues>)}
                />
              )}

              {field.type === 'password' && (
                <div className="relative">
                  <Input
                    id={field.name}
                    type={showPassword ? 'text' : 'password'}
                    className="pr-10"
                    {...register(field.name as unknown as Path<FormValues>)}
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

              {fieldError && (
                <p className="absolute bottom-0 left-0 text-xs text-red-500">{fieldError}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className={'mt-10 flex justify-end gap-4'}>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
