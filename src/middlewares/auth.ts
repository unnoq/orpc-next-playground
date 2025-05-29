import type { User } from '@/schemas/user'
import { os } from '@orpc/server'

export const requiredAuthMiddleware = os
  .$context<{ session?: { user?: User } }>()
  .middleware(async ({ context, next }) => {
    /**
     * Why we should ?? here?
     * Because it can avoid `getSession` being called when unnecessary.
     * {@link https://orpc.unnoq.com/docs/best-practices/dedupe-middleware}
     */
    const session = context.session ?? await getSession()

    if (!session.user) {
      throw new Error('UNAUTHORIZED')
    }

    return next({
      context: { user: session.user },
    })
  })

async function getSession() {
  /**
   * You can use headers or cookies here to create the user object:
   * import { cookies, headers } from 'next/headers'
   * const headerList = await headers();
   * const cookieList = await cookies();
   *
   * These lines are commented out because Stackblitz has issues with Next.js headers and cookies.
   * However, this works fine in a local environment.
   */

  return { user: { id: 'unique', name: 'unnoq', email: 'contact@unnoq.com' } }
}
