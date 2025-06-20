import { orpc } from '@/lib/orpc';
import { getMe } from './actions';

import { MeComponent } from './me-component';

export default async function DashboardPage() {
  const user1 = await orpc.auth.me.call();
  const user2 = await getMe();

  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(user1, null, 2)}
      {JSON.stringify(user2, null, 2)}
      <p>Welcome to the dashboard!</p>
      {/* <MeComponent /> */}
    </div>
  );
}
