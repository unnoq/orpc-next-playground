export async function register() {
    console.log('Registering ORPC instrumentation...', process.env.NEXT_RUNTIME);

    await import('./lib/orpc.server');
}