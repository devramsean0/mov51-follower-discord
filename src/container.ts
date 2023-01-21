import type { Client } from "discord.js"

export const container: IContainer = {
    routes: new Map(),
    pagesPath: `${process.cwd()}/pages`,
    cronJob: null,
    commands: new Map(),
    url: "",
    discordClient: "",
}
interface IContainer {
    routes: Map<string, any>
    pagesPath: string
    cronJob: any
    commands: Map<string, any>,
    url: string,
    discordClient: Client | any ,
}