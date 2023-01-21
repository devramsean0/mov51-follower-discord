import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export = {
	data: new SlashCommandBuilder().setName('start').setDescription('Start the authorization flow'),
	async execute(interaction: CommandInteraction) {
		const row = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Begin')
					.setStyle(ButtonStyle.Link)
					.setURL(`${process.env.HOSTNAME}/#discordID=${interaction.user.id}`),
			)
		await interaction.reply({content:'Press the button to continue!', components: [row]});
	}
};