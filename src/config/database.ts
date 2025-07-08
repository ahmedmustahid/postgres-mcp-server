import pg from "pg";
import { config } from "./env.js";

const c = config.postgres;

export const databaseUrl = c.connectionString
    ?? `postgresql://${encodeURIComponent(c.username)}:${encodeURIComponent(c.password)}@${c.host}:${c.port}/${c.database}?sslmode=require`;

export const resourceBaseUrl = new URL(databaseUrl);
resourceBaseUrl.protocol = "postgres:";
resourceBaseUrl.password = ""; // Clear password for constructing resource URIs

export const pool = new pg.Pool({
    connectionString: databaseUrl,
});

export const SCHEMA_PATH = "schema";
