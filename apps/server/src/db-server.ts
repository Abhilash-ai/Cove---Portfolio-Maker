import EmbeddedPostgres from 'embedded-postgres';
import net from 'net';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function isPortOpen(port: number, host = '127.0.0.1'): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(600);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
    socket.connect(port, host);
  });
}

let pgInstance: any = null;

export async function ensurePostgresRunning(port = 5433): Promise<void> {
  const isOpen = await isPortOpen(port);
  if (isOpen) {
    console.log(`[Database] PostgreSQL is already active on port ${port}`);
    return;
  }

  const databaseDir = path.resolve(__dirname, '../pgdata');
  pgInstance = new EmbeddedPostgres({
    port,
    databaseDir,
    user: 'postgres',
    password: 'password'
  });

  try {
    await pgInstance.start();
    console.log(`[Database] PostgreSQL started on port ${port}`);
  } catch (err: any) {
    console.log(`[Database] Initializing cluster...`);
    await pgInstance.initialise();
    // Configure trust for local development
    const hbaPath = path.join(databaseDir, 'pg_hba.conf');
    if (fs.existsSync(hbaPath)) {
      let content = fs.readFileSync(hbaPath, 'utf8');
      content = content.replace(/host\s+all\s+all\s+127\.0\.0\.1\/32\s+password/g, 'host    all             all             127.0.0.1/32            trust');
      content = content.replace(/host\s+all\s+all\s+::1\/128\s+password/g, 'host    all             all             ::1/128                 trust');
      fs.writeFileSync(hbaPath, content, 'utf8');
    }
    await pgInstance.start();
    try {
      await pgInstance.createDatabase('cove');
    } catch {}
    try {
      await pgInstance.createDatabase('amstudio');
    } catch {}
    console.log(`[Database] PostgreSQL initialized and ready on port ${port}`);
  }
}

export async function stopPostgres(): Promise<void> {
  if (pgInstance) {
    await pgInstance.stop();
    pgInstance = null;
    console.log(`[Database] PostgreSQL stopped`);
  }
}

// Standalone runner
if (process.argv[1] === __filename) {
  const port = parseInt(process.env.PG_PORT || '5433', 10);
  ensurePostgresRunning(port).then(() => {
    console.log(`PostgreSQL service running. Press Ctrl+C to stop.`);
  }).catch((err) => {
    console.error('Failed to run PostgreSQL:', err);
    process.exit(1);
  });
}
