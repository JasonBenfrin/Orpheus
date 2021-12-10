const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require('./play')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the song'),
	async execute(interaction) {
		
	}
};