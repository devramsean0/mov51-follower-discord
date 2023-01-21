import type { Request, Response } from "express";
import { db } from "../../index.js";
import { checkStatus } from "../../lib/checkStatus.js";
import { cookiesMNGR } from "../../lib/misc/cookies.js";
//import { container } from "./../../container.js";

const data = {
    type: 'get',
    route: '/twitch/success',
    secure: false,
    funct: async (req: Request, res: Response) => {
        const cookies = new cookiesMNGR(req.cookies);
        const discordID = cookies.getCookie("discordID");
        const table = db.table("users");
        await table.set(`_${discordID}`, req.user);
        await db.push("linkedUsers", discordID);
        res.send("Hi")
        checkStatus(discordID);
    }
}
export default data;