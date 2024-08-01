import users from './handlers/users'

import { setupWorker } from 'msw/browser'
import { setupServer } from 'msw/node'

const handlers = [...users]

export const enableMocks = async (): Promise<void> => {
    const isServer = typeof window === 'undefined'

    // Server
    if (isServer) {
        // Const { setupServer } = await import('msw/node')

        setupServer(...handlers).listen()
    }

    // Browser
    if (!isServer) {
        // Const { setupWorker } = await import('msw/browser')

        await setupWorker(...handlers).start({
            onUnhandledRequest: (request, print) => {
                const path = new URL(request.url).pathname

                if (path.startsWith('/_next') || path.startsWith('/__next'))
                    return

                print.warning()
            },
        })
    }
}
