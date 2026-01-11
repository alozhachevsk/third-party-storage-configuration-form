import { ProviderConfig } from './types';
import { AwsSchema, awsSchema } from '@/providers/schemas';

export const awsProviderConfig: ProviderConfig<'aws', AwsSchema> = {
  key: 'aws',

  label: 'AWS',

  fields: [
    {
      name: 'bucket',
      label: 'Bucket name',
      type: 'text',
    },
    {
      name: 'region',
      label: 'Region name',
      type: 'select',
      options: [
        { label: 'US East (N. Virginia)', value: 'us-east-1' },
        { label: 'US East (Ohio)', value: 'us-east-2' },
        { label: 'US West (N. California)', value: 'us-west-1' },
        { label: 'US West (Oregon)', value: 'us-west-2' },
      ],
      defaultValue: 'us-east-1',
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

  schema: awsSchema,

  buildDestination: ({ bucket, region, key, secret }) => ({
    url: `s3://s3.${region}.amazonaws.com/${bucket}`,
    key,
    secret,
  }),
};
