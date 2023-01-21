import { fetch as sapphireFetch} from "@sapphire/fetch";
import { container } from "../../container.js";
import { db } from "../../index.js";
import type { IappTokenRefreshed } from "../../types/twitchAPI.js";
export async function fetch<T>(url: string, options: { authorization: string, type?: string, refreshToken?: string, discordID?: string}) {
    var res;
    try {
    res = await sapphireFetch<T>(url, {
        headers: {
            "Authorization": `Bearer ${options.authorization}`,
            "Client-Id": String(process.env.TWITCH_CLIENT_ID)
        },
        method: options.type || "GET"
    })
    return res;
    } catch (e: any){
        if (e.status == 401) {
            try {
                const newToken = await sapphireFetch<IappTokenRefreshed>(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${encodeURIComponent(options.refreshToken || "")}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST"
                })
                const usersTable = db.table('users');
                await usersTable.set(`_${options.discordID}.accessToken`, newToken.access_token);
                await usersTable.set(`_${options.discordID}.refreshToken`, newToken.refresh_token);
                res = await sapphireFetch<T>(url, {
                    headers: {
                        "Authorization": `Bearer ${options.authorization}`,
                        "Client-Id": String(process.env.TWITCH_CLIENT_ID)
                    },
                    method: options.type || "GET"
                })
                return res;
            } catch (e2) {
                container.discordClient.users.send(options.discordID, "Your Twitch token has expired, please re-link your account with the command `/start`")
                return { data: []};
            }

        }
        return { data: []};
    }
}