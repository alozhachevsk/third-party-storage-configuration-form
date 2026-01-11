import { z } from 'zod';

export const gcpSchema = z.object({
  bucket: z
    .string()
    .min(1, { message: 'Bucket is required' })
    .min(3, { message: 'Bucket must be at least 3 characters' }),
  key: z
    .string()
    .min(1, { message: 'Access Key is required' })
    .min(5, { message: 'Access Key must be at least 5 characters' }),
  secret: z
    .string()
    .min(1, { message: 'Secret Key is required' })
    .min(5, { message: 'Secret Key must be at least 5 characters' }),
});

export type GcpFormValues = z.infer<typeof gcpSchema>;
