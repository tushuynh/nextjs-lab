import { z } from 'zod';

export const CounterValidation = z.object({
  increment: z.coerce.number().min(1).max(3),
});

export type CounterValidationType = z.infer<typeof CounterValidation>;
