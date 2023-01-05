import type { Application } from "express";
import fs from "node:fs";
import logger from "../misc/logger.js";
import { container } from "../../container.js";
//import passport from "passport";
const directory = `${process.cwd()}/dist/routes`;
export async function generateRoutes(app: Application) {
    logger.info("Started Loading Routes")
    const routeFolders = fs.readdirSync(directory);
    for (const folder of routeFolders) {
	    const routeFiles = fs.readdirSync(`${directory}/${folder}`).filter(file => file.endsWith('.js'));
	    for (const file of routeFiles) {
		    const route = require(`${directory}/${folder}/${file}`);
            route.name = `${folder}_${file.replace('.js', '')}_${route.default.type}`;
		    container.routes.set(route.default.route, {
                type: route.default.type,
                funct: route.default.funct,
                route: route.default.route,
                secure: route.default.secure
            });
           await createRoute(app, route.default.type, route.default.route, route.default.funct);

            logger.success(`Loaded Route: ${route.name}`);
	    }
    }
    logger.success("Finished Loading Routes")
    //app._router.stack.forEach(function(r: any){
    //    console.log(r)
    //  })
}
async function createRoute(app: Application, type: string, route: string, funct: Function) {
    switch (type) {
        case "get":
                return app.get(route, (async (req, res) => {
                    await funct(req, res)
                }))
        default:
            return logger.warn(`Invalid Route Type: ${type} on ${route}`);
    }
}