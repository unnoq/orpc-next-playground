"server only";

import { router } from '@/router'
import { createRouterClient } from '@orpc/server'
import { headers } from 'next/headers'

/**
 * This is part of the Optimize SSR setup.
 *
 * @see {@link https://orpc.unnoq.com/docs/integrations/next#optimize-ssr}
 */
globalThis.$client = createRouterClient(router, {
  /**
   * Provide initial context if needed.
   *
   * Because this client instance is shared across all requests,
   * only include context that's safe to reuse globally.
   * For per-request context, use middleware context or pass a function as the initial context.
   */
  context: async () => {
    console.log('------------------ORPC Context------------------')
    console.log(Object.fromEntries(await headers()))
    return ({
      headers: await headers(),
    })
  },
})
