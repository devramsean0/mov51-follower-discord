import "dotenv/config";
import "./lib/express/express.js";
import { QuickDB } from "quick.db";
export const db = new QuickDB();