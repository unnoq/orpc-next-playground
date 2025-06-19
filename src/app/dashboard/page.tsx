import { orpc } from '@/lib/orpc';
import { headers } from 'next/dist/server/request/headers';

export default async function DashboardPage() {
  console.log('------------------DashboardPage------------------');

  console.log(Object.fromEntries(await headers()));
  const me = await orpc.auth.me.call();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <p>User: {me?.email}</p>
    </div>
  );
}
