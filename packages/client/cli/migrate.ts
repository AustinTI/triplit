import { Migration } from '@triplit/db';
import { codegen } from './codegen';
import { readMigrations } from './migrations';
import { readRemoteMigrationStatus } from './status';
import { RemoteAccessOptions } from './utils/remote';
import { request } from './utils/request';
import { parseJWT } from './utils/token';

async function applyMigration(
  migration: Migration,
  direction: 'up' | 'down',
  remoteOptions: RemoteAccessOptions
) {
  const { token, originOverride } = remoteOptions;
  const payload = parseJWT(token);
  const projectId = payload?.['x-triplit-project-id'];
  if (!projectId) {
    throw new Error('Could not find project ID in token');
  }
  const origin = originOverride || `https://${projectId}.triplit.io`;
  const res = await request(`${origin}/migration/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ migration, direction }),
  });
  if (!res.ok) {
    throw new Error(
      `Error applying ${direction} migration ${migration.version}`
    );
  }
}

export type UpCommandArgs = {
  version?: number;
  token: string;
  origin?: string;
};

export async function upCommand(args: UpCommandArgs) {
  const remoteOptions = {
    token: args.token,
    originOverride: args.origin,
  };
  // Get migration version from remote
  const { data, error } = await readRemoteMigrationStatusWithCmdMessages(
    remoteOptions
  );
  if (error) {
    console.error(error);
    return;
  }

  const { version: serverVersion } = data!;

  // If no schema or already using migrations, apply proper migrations
  const startVersion = serverVersion || 0;
  const endVersion = args.version;
  if (endVersion && endVersion < startVersion) {
    console.error(
      `Migration version ${endVersion} is less than server version ${startVersion}`
    );
    return;
  }
  const migrations = readMigrations().filter(
    (m) => m.version > startVersion && (!endVersion || m.version <= endVersion)
  );

  let currentVersion = startVersion;
  try {
    if (migrations.length === 0) {
      console.log('No migrations to apply');
    } else {
      for (const migration of migrations) {
        console.log('applying up migration with version', migration.version);
        await applyMigration(migration, 'up', remoteOptions);
        currentVersion = migration.version;
      }
    }
  } finally {
    await codegen(currentVersion);
  }
}

export type DownCommandArgs = {
  version: number;
  token: string;
  origin?: string;
};

export async function downCommand(args: DownCommandArgs) {
  const remoteOptions = {
    token: args.token,
    originOverride: args.origin,
  };
  // Get migration version from remote
  const { data, error } = await readRemoteMigrationStatusWithCmdMessages(
    remoteOptions
  );
  if (error) {
    console.error(error);
    return;
  }

  const { version: serverVersion } = data!;
  const startVersion = serverVersion || 0;
  const endVersion = args.version;
  if (endVersion > startVersion) {
    console.error(
      `Migration version ${endVersion} is greater than server version ${startVersion}`
    );
    return;
  }
  const migrations = readMigrations()
    .filter((m) => m.version <= startVersion && m.version > endVersion)
    .reverse();

  let currentVersion = startVersion;
  try {
    if (migrations.length === 0) {
      console.log('No migrations to apply');
    } else {
      for (const migration of migrations) {
        console.log('applying down migration with version', migration.version);
        await applyMigration(migration, 'down', remoteOptions);
        currentVersion = migration.parent;
      }
    }
  } finally {
    codegen(currentVersion);
  }
}

async function readRemoteMigrationStatusWithCmdMessages(
  options: RemoteAccessOptions
) {
  try {
    const { data, error } = await readRemoteMigrationStatus(options);
    if (error) {
      return { data: undefined, error };
    }
    if (!data)
      return {
        data: undefined,
        error: 'Could not read migration status from server',
      };

    if (data.type === 'schema' && data.version == undefined)
      return {
        data: undefined,
        error: 'Server schema is not using migrations',
      };

    return { data, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
}
