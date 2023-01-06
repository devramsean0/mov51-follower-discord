import type { Request, Response } from "express";
import { cookiesMNGR } from "../../lib/misc/cookies.js";
//import { container } from "./../../container.js";

const data = {
    type: 'get',
    route: '/twitch/success',
    secure: false,
    funct: async (req: Request, res: Response) => {
        const cookies = new cookiesMNGR(req.cookies);
        //console.log(req.cookies)
        console.log(cookies.getCookie("discordID"))
        res.send("Hi")
    }
}
export default data;