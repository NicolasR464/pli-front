/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

/** This assures that the env variables are properly set up */
export const environment = createEnv({
    /** Server-side env variables */
    server: {
        MOCK_ENABLED: z.string(),
        BACK_ROOT: z.string(),
        USER_PORT: z.string(),
        USER_BASE_URL: z.string(),
        ARTICLE_PORT: z.string(),
        ARTICLE_BASE_URL: z.string(),
        TRANSACTION_PORT: z.string(),
        TRANSACTION_BASE_URL: z.string(),
        INSTMESSAGE_PORT: z.string(),
        INSTANT_MESSAGE_BASE_URL: z.string(),
    },

    /** Client-side env variables. Starts by 'NEXT_PUBLIC_' */
    client: {
        NEXT_PUBLIC_MOCK_ENABLED: z.string(),
        NEXT_PUBLIC_BACK_ROOT: z.string(),
        NEXT_PUBLIC_USER_PORT: z.string(),
        NEXT_PUBLIC_USER_BASE_URL: z.string(),
        NEXT_PUBLIC_ARTICLE_PORT: z.string(),
        NEXT_PUBLIC_ARTICLE_BASE_URL: z.string(),
        NEXT_PUBLIC_TRANSACTION_PORT: z.string(),
        NEXT_PUBLIC_TRANSACTION_BASE_URL: z.string(),
        NEXT_PUBLIC_INSTMESSAGE_PORT: z.string(),
        NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL: z.string(),
    },

    /** Also add your client-side env variables here to avoid TS errors */
    experimental__runtimeEnv: {
        NEXT_PUBLIC_MOCK_ENABLED: process.env.NEXT_PUBLIC_MOCK_ENABLED!,
        NEXT_PUBLIC_BACK_ROOT: process.env.NEXT_PUBLIC_BACK_ROOT!,
        NEXT_PUBLIC_USER_PORT: process.env.NEXT_PUBLIC_USER_PORT!,
        NEXT_PUBLIC_USER_BASE_URL: process.env.NEXT_PUBLIC_USER_BASE_URL!,
        NEXT_PUBLIC_ARTICLE_PORT: process.env.NEXT_PUBLIC_ARTICLE_PORT!,
        NEXT_PUBLIC_ARTICLE_BASE_URL: process.env.NEXT_PUBLIC_ARTICLE_BASE_URL!,
        NEXT_PUBLIC_TRANSACTION_PORT: process.env.NEXT_PUBLIC_TRANSACTION_PORT!,
        NEXT_PUBLIC_TRANSACTION_BASE_URL:
            process.env.NEXT_PUBLIC_TRANSACTION_BASE_URL!,
        NEXT_PUBLIC_INSTMESSAGE_PORT: process.env.NEXT_PUBLIC_INSTMESSAGE_PORT!,
        NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL:
            process.env.NEXT_PUBLIC_INSTANT_MESSAGE_BASE_URL!,
    },
})
