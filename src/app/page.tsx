import Link from 'next/dist/client/link';
import { redirectToScalarForm } from './actions';
import { CreatePlanetMutationForm } from './orpc-mutation';
import { ListPlanetsQuery } from './orpc-query';
import { OrpcServerAction } from './orpc-server-action';

export default function Home() {
  return (
    <div>
      <h1>ORPC Playground</h1>
      You can visit the{' '}
      <form action={redirectToScalarForm}>
        <input type="text" name="user[name]" defaultValue="unnoq" hidden />
        <input type="text" name="user[age]" defaultValue="18" hidden />
        <button type="submit">Redirect to Scalar API Reference</button>
      </form>{' '}
      page.
      <Link href="/dashboard">
        <button>Go to Dashboard</button>
      </Link>
      <hr />
      <OrpcServerAction />
      <hr />
      <CreatePlanetMutationForm />
      <hr />
      <ListPlanetsQuery limit={1} />
      <ListPlanetsQuery limit={2} />
      <ListPlanetsQuery limit={3} />
    </div>
  );
}
