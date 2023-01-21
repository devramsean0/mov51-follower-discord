import type { Client } from "discord.js";

export default class manager {
    private client;
    constructor (client: Client) {
        this.client = client;
    }
    async addRole (userID: string) {
        const member = await (await this.client.guilds.fetch(String(process.env.DISCORD_GUILD_ID))).members;
        (await member.fetch(userID)).roles.add(String(process.env.DISCORD_FOLLOWER_ROLE_ID));
        console.log("Added role")
    }
    async removeRole (userID: string) {
        const member = await (await this.client.guilds.fetch(String(process.env.DISCORD_GUILD_ID))).members;
        (await member.fetch(userID)).roles.remove(String(process.env.DISCORD_FOLLOWER_ROLE_ID));
        console.log("Removed role")
    }
}