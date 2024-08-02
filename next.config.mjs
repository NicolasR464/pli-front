import { fileURLToPath } from 'node:url'
import createJiti from 'jiti'
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('./src/types/environment')

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        /**
         * @fixme This is completely redundant. webpack should understand
         * export conditions and don't try to import "msw/browser" code
         * that's clearly marked as client-side only in the app.
         */
        if (isServer) {
            if (Array.isArray(config.resolve.alias)) {
                config.resolve.alias.push({ name: 'msw/browser', alias: false })
            } else {
                config.resolve.alias['msw/browser'] = false
            }
        } else {
            if (Array.isArray(config.resolve.alias)) {
                config.resolve.alias.push({ name: 'msw/node', alias: false })
            } else {
                config.resolve.alias['msw/node'] = false
            }
        }

        return config
    },
}

export default nextConfig
