'use client';

import { orpc } from '@/lib/orpc';
import { useSuspenseQuery } from '@tanstack/react-query';

export function MeComponent() {
  const query = useSuspenseQuery(orpc.auth.me.queryOptions());

  return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
}
