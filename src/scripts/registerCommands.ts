import fs from 'node:fs';
import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import logger from '../lib/misc/logger.js';
// Constants
const commandsFolder = `${process.cwd()}/dist/commands`;
const discordToken = String(process.env.DISCORD_TOKEN);
const discordClientID = String(process.env.DISCORD_CLIENT_ID);
// Set Arrays
const commands: any[] = [];
const commandFiles = fs.readdirSync(commandsFolder).filter((file) => file.endsWith('.js'));
// Load Commands Builder json
for (const file of commandFiles) {
	const command = require(`${commandsFolder}/${file}`);
	commands.push(command.data.toJSON());
}
// Setup REST
const rest = new REST({ version: '10' }).setToken(discordToken);
// Register Commands
(async () => {
	try {
		logger.info('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(discordClientID), { body: [] });
		await rest.put(Routes.applicationCommands(discordClientID), { body: commands });
	} catch (error) {
		console.log('Encountered Error', error);
	}
})();