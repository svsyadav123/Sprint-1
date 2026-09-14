import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const envPath = fileURLToPath(new URL("../.env", import.meta.url));
const result = dotenv.config({ path: envPath, override: true, quiet: true });

if (result.error) {
  console.error("Unable to load backend/.env:", result.error.message);
  process.exit(1);
}
