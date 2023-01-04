import type { Request, Response } from "express";
//import { container } from "./../../container.js";

const data = {
    type: 'get',
    route: '/twitch/success',
    secure: false,
    funct: async (req: Request, res: Response) => {
        console.log(req.user)
        res.send("Hi")
    }
}
export default data;