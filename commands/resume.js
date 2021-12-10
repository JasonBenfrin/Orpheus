const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require('./play')
const valid = require('../functions/valid')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the song'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId

		if(player.player.state.status === 'paused' && valid(interaction)){
      player.player.unpause();
      return interaction.reply('**Resumed :arrow_forward: **')
    }else{
      return interaction.reply('**The music is already playing!**')
    }
	}
};