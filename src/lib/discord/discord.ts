import { Client, Events, GatewayIntentBits } from "discord.js";
import logger from "../misc/logger.js";
import fs from "node:fs";
import path from "node:path";
import { container } from "../../container.js";

const client = new Client({
    intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds]
});
// Command Loader
const commandsPath = `${process.cwd()}/dist/commands`;
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		container.commands.set(command.data.name, command);
	} else {
		logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
// Events
client.once(Events.ClientReady, c => {
    logger.success(`Started Discord client as ${c.user?.tag}`)
})
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
	const command = container.commands.get(interaction.commandName);
	if (!command) {
		console.log(`No command found for ${interaction.commandName}`);
		return;
	}
	try {
		await command.execute(interaction);
	} catch (error) {
		console.log(`error`, error);
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.login(process.env.DISCORD_TOKEN)
container.discordClient = client;