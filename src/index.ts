// Import modules
import "dotenv/config";
import "./lib/express/express.js";
import "./lib/discord/discord.js";
import { checkStatus } from "./lib/checkStatus.js";
import { QuickDB } from "quick.db";
export const db = new QuickDB();
checkStatus();