// Import modules
import "dotenv/config";
import "./lib/express/express.js";
import "./lib/discord/discord.js";
import { checkStatus } from "./lib/checkStatus.js";
import { QuickDB } from "quick.db";
import cron from "node-cron";
export const db = new QuickDB();
checkStatus();
cron.schedule('30 * * * *', () => {
    checkStatus();
}); 