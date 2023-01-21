import { fetch } from "./misc/fetch.js";
import { fetch as sapphireFetch } from "@sapphire/fetch";
import type { IappToken, Istreams } from "../types/twitchAPI.js";
import { db } from "../index.js";
import { container } from "../container.js";
import manager from "./misc/discordRolesManager.js";

export async function checkStatus(userID?:string) {
    const appToken = await sapphireFetch<IappToken>(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`, {
        method: "POST"
    });
    const isMovStreamingCheckRes = await fetch<Istreams>(`https://api.twitch.tv/helix/streams?user_id=${process.env.TWITCH_CHANNEL_ID}`, {
       authorization: appToken.access_token,
    });
    
    if (typeof userID === 'undefined') {
        if (isMovStreamingCheckRes.data.length !< 0) {
            console.log("Mov is not streaming");
            return
        } else {
            const linkedUsers: string[] | null = await db.get("linkedUsers");
            const table = db.table("users");
            if (linkedUsers === null) return;
            linkedUsers.forEach(async (val) => {
                const userData: any = await table.get(`_${val}`);
                const userRes = await fetch<Istreams>(`https://api.twitch.tv/helix/streams/followed?user_id=${userData.data[0].id}`, {
                    authorization: userData.accessToken,
                    refreshToken: userData.refreshToken,
                    discordID: val,
                })
                userRes.data.filter((val) => val.user_id === process.env.TWITCH_CHANNEL_ID);
                if (userRes.data.length <= 0) new manager(container.discordClient).removeRole(val) // Implement loose role
                else new manager(container.discordClient).addRole(val) // Implement gain role
            })
        }
    } else {
        if (isMovStreamingCheckRes.data.length > 0) {
            return
        } else {
            const table = db.table("users");
            const userData: any = await table.get(`_${userID}`);
            const userRes = await fetch<Istreams>(`https://api.twitch.tv/helix/streams/followed?user_id=${userData.data[0].id}`, {
                authorization: userData.accessToken,
                refreshToken: userData.refreshToken,
                discordID: userID,
            });
            userRes.data.filter((val) => val.user_id === process.env.TWITCH_CHANNEL_ID);
            if (userRes.data.length <= 0) new manager(container.discordClient).removeRole(userID) // Implement loose role
            else new manager(container.discordClient).addRole(userID) // Implement gain role
        }
    }
}