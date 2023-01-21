import cron from "node-cron";
import { checkStatus } from "./checkStatus.js";

export function createCronJob() {
    cron.schedule('30 * * * *', () => {
        checkStatus();
    }); 
}