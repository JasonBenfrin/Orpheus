const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require('./play')
const valid = require('../functions/valid')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the song'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId

		if(player.player.state.status === 'playing' && valid(interaction)){
      player.player.pause();
      return interaction.reply('**Paused :pause_button: **')
    }else{
      return interaction.reply('**The music is already paused!**')
    }
	}
};