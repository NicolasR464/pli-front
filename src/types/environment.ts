/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

/** This assures that the env variables are properly set up */
export const environment = createEnv({
    /** Server-side env variables */
    server: {
        USER_PORT: z
            .string()
            .regex(/^\d+$/u, { message: 'USER_PORT must be a number' })
            .transform(Number)
            .refine((value) => value > 0 && value <= 65_535, {
                message: 'USER_PORT must be a valid port number (1-65535)',
            }),
        USER_BASE_URL: z.string().url(),
        ARTICLE_PORT: z
            .string()
            .regex(/^\d+$/u, { message: 'ARTICLE_PORT must be a number' })
            .transform(Number)
            .refine((value) => value > 0 && value <= 65_535, {
                message: 'ARTICLE_PORT must be a valid port number (1-65535)',
            }),
        ARTICLE_BASE_URL: z.string().url(),
        TRANSACTION_PORT: z
            .string()
            .regex(/^\d+$/u, { message: 'TRANSACTION_PORT must be a number' })
            .transform(Number)
            .refine((value) => value > 0 && value <= 65_535, {
                message:
                    'TRANSACTION_PORT must be a valid port number (1-65535)',
            }),
        TRANSACTION_BASE_URL: z.string().url(),
        INSTANT_MESSAGE_PORT: z
            .string()
            .regex(/^\d+$/u, {
                message: 'INSTANT_MESSAGE_PORT must be a number',
            })
            .transform(Number)
            .refine((value) => value > 0 && value <= 65_535, {
                message:
                    'INSTANT_MESSAGE_PORT must be a valid port number (1-65535)',
            }),
        INSTANT_MESSAGE_BASE_URL: z.string().url(),
    },

    /** Client-side env variables. Starts by 'NEXT_PUBLIC_' */
    client: {
        NEXT_PUBLIC_USER_BASE_URL: z.string().url(),
        NEXT_PUBLIC_ARTICLE_BASE_URL: z.string().url(),
        NEXT_PUBLIC_TRANSACTION_BASE_URL: z.string().url(),
        NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL: z.string().url(),
    },

    /** Also add your client-side env variables here to avoid TS errors */
    experimental__runtimeEnv: {
        NEXT_PUBLIC_USER_BASE_URL: process.env.NEXT_PUBLIC_USER_BASE_URL!,
        NEXT_PUBLIC_ARTICLE_BASE_URL: process.env.NEXT_PUBLIC_ARTICLE_BASE_URL!,
        NEXT_PUBLIC_TRANSACTION_BASE_URL:
            process.env.NEXT_PUBLIC_TRANSACTION_BASE_URL!,
        NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL:
            process.env.NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL!,
    },
})
