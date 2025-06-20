import type { router } from '@/router'
import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createORPCReactQueryUtils } from '@orpc/react-query'

const link = new RPCLink({
  url: new URL('/rpc', typeof window !== 'undefined' ? window.location.href : process.env.VERCEL_URL ? `https://orpc-next-playground.vercel.app` : 'http://localhost:3000'),
  headers: async () => {
    if (typeof window === 'undefined') {
      const { headers } = await import('next/headers')
      return Object.fromEntries(await headers())
    }

    return {}
  },
  fetch: async (request, init) => {
    if (typeof window !== 'undefined') {
      return fetch(request, init)
    }

    const { handler } = await import('@/app/rpc/[[...rest]]/route')
    const { response } = await handler.handle(request, {
      prefix: '/rpc',
    })

    console.log('Response:', response)

    return response ?? new Response('Not found', { status: 404 })
  }
})

export const client: RouterClient<typeof router> = createORPCClient(link)

export const orpc = createORPCReactQueryUtils(client)
