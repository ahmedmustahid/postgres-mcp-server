import dotenv from "dotenv";
import { connect } from "node:http2";
dotenv.config();

export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === null) {
    throw new Error(`${name} is not defined`);
  }
  if (typeof value !== "string") {
    throw new Error(`${name} must be a string`);
  }
  return value;
}

const postgres = process.env["POSTGRES_URL"]
  ? {
      connectionString: getEnvVar("POSTGRES_URL")
    }
  : {
      username: getEnvVar("POSTGRES_USERNAME"),
      password: getEnvVar("POSTGRES_PASSWORD"),
      host: getEnvVar("POSTGRES_HOST"),
      port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
      database: getEnvVar("POSTGRES_DATABASE"),
    };

export const config = {
  postgres,
  server: {
    port: parseInt(process.env.PORT || "3000", 10),
    host: process.env.HOST || "0.0.0.0",
    corsOrigins: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : ["http://localhost:8080", "http://localhost:3000"],
  },
};
