import { os } from '@orpc/server'
import { dbProviderMiddleware } from './middlewares/db'
import { requiredAuthMiddleware } from './middlewares/auth'
export const pub = os
  .use(async ({ next }) => {

    const { headers } = await import('next/headers')
    console.log('------------------ORPC Middleware------------------')
    console.log(Object.fromEntries(await headers()))

    return next()
  })
  .use(dbProviderMiddleware)

export const authed = pub
  .use(requiredAuthMiddleware)
