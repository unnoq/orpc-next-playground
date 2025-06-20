import type { router } from '@/router'
import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createORPCReactQueryUtils } from '@orpc/react-query'
import { BatchLinkPlugin } from '@orpc/client/plugins'

/**
 * This is part of the Optimize SSR setup.
 *
 * @see {@link https://orpc.unnoq.com/docs/integrations/next#optimize-ssr}
 */
declare global {
  var $client: RouterClient<typeof router> | undefined
}

const link = new RPCLink({
  url: new URL('/rpc', typeof window !== 'undefined' ? window.location.href : process.env.VERCEL_URL ? `https://orpc-next-playground.vercel.app` : 'http://localhost:3000'),
  headers: async () => {
    if (typeof window === 'undefined') {
      const { headers } = await import('next/headers')
      return Object.fromEntries(await headers())
    }

    return {}
  },
  plugins: [
    new BatchLinkPlugin({
      mode: 'buffered',
      groups: [{
        condition: () => true,
        context: {},
      }],
    }),
  ],
})

export const client: RouterClient<typeof router> = createORPCClient(link)

export const orpc = createORPCReactQueryUtils(client)
