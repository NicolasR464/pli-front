import { z } from 'zod'

import { createEnv } from '@t3-oss/env-core'

export const environment = createEnv({
    server: {
        MOCK_ENABLED: z.string(),
        BACK_ROOT: z.string(),
        USER_PORT: z.string(),
        USER_BASE_URL: z.string(),
    },

    /**
     * The prefix that client-side variables must have. This is enforced both at
     * a type-level and at runtime.
     */
    clientPrefix: 'NEXT_PUBLIC_',

    client: {
        NEXT_PUBLIC_MOCK_ENABLED: z.string(),
        NEXT_PUBLIC_BACK_ROOT: z.string(),
        NEXT_PUBLIC_USER_BASE_URL: z.string(),
        NEXT_PUBLIC_USER_PORT: z.string(),
    },

    /**
     * What object holds the environment variables at runtime. This is usually
     * `process.env` or `import.meta.env`.
     */
    runtimeEnv: process.env,

    /**
     * By default, this library will feed the environment variables directly to
     * the Zod validator.
     *
     * This means that if you have an empty string for a value that is supposed
     * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
     * it as a type mismatch violation. Additionally, if you have an empty string
     * for a value that is supposed to be a string with a default value (e.g.
     * `DOMAIN=` in an ".env" file), the default value will never be applied.
     *
     * In order to solve these issues, we recommend that all new projects
     * explicitly specify this option as true.
     */
    emptyStringAsUndefined: true,
})
