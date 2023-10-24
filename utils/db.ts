import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.dbDatabase,
  namedPlaceholders: true,
  decimalNumbers: true,
});
