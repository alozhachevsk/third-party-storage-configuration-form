import { ProviderConfig } from './types';
import { GcpFormValues, gcpSchema } from '@/providers/schemas';

export const gcpProviderConfig: ProviderConfig<GcpFormValues, 'gcp'> = {
  key: 'gcp',
  label: 'Google Cloud',

  fields: [
    {
      name: 'bucket',
      label: 'Bucket name',
      type: 'text',
      fullWidth: true,
    },
    {
      name: 'key',
      label: 'Access Key ID',
      type: 'text',
    },
    {
      name: 'secret',
      label: 'Secret Access Key',
      type: 'password',
    },
  ],

  schema: gcpSchema,

  buildDestination: ({ bucket, key, secret }) => {
    return {
      url: `gs://${bucket}`,
      key,
      secret,
    };
  },
};
