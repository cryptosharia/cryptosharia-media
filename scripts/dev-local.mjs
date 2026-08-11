import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const fixturePath = fileURLToPath(new URL('./local-api-fixture.mjs', import.meta.url));
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const children = [];
let shuttingDown = false;

function start(command, args, env = process.env) {
    const child = spawn(command, args, { env, stdio: 'inherit' });
    children.push(child);
    child.on('exit', (code, signal) => {
        if (!shuttingDown) shutdown(code ?? (signal ? 1 : 0));
    });
    return child;
}

function shutdown(code = 0) {
    if (shuttingDown) return;
    shuttingDown = true;
    for (const child of children) {
        if (!child.killed) child.kill('SIGTERM');
    }
    setTimeout(() => process.exit(code), 100);
}

process.once('SIGINT', () => shutdown(0));
process.once('SIGTERM', () => shutdown(0));

start(process.execPath, [fixturePath]);
start(npmCommand, ['run', 'dev', '--', '--host', '127.0.0.1'], {
    ...process.env,
    PUBLIC_APP_URL: 'http://127.0.0.1:5173',
    PUBLIC_CS_API_URL: 'http://127.0.0.1:8787',
    CS_API_KEY: 'local-fixture-key'
});
