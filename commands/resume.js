const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require('../functions/valid')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('2resume')
		.setDescription('Resumes the song.'),
	async execute(interaction) {
    const player = interaction.client.playerManager.get(interaction.guildId)

    if(!valid(interaction)) return

    if(!player) return interaction.reply('**There is no song currently playing**')

		if(player.state.status === 'paused' || player.status === 'autopaused'){
      player.unpause();
      return interaction.reply('**Resumed :arrow_forward: **')
    }else{
      return interaction.reply('**The music is already playing!**')
    }
	}
};