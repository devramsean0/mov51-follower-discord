import type { Request, Response } from "express";
import { container } from "./../../container.js";

const data = {
    type: 'get',
    route: '/',
    secure: false,
    funct: async (_req: Request, res: Response) => {
        res.sendFile("index.html", {root: container.pagesPath})
    }
}
export default data;