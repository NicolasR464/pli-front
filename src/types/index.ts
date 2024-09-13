/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

/** Execution context. */
export const Context = z.enum(['SERVER', 'CLIENT'])

export type Context = z.infer<typeof Context>
