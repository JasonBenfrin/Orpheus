const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require('../functions/valid')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('2pause')
		.setDescription('Pauses the song.'),
	async execute(interaction) {
    const player = interaction.client.playerManager.get(interaction.guildId)

    if(!valid(interaction)) return

    if(!player) return interaction.reply('**There is no song currently playing**')
    
		if(player.state.status === 'playing'){
      player.pause();
      return interaction.reply('**Paused :pause_button: **')
    }else{
      return interaction.reply('**The music is already paused!**')
    }
	}
};