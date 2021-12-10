const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require('./play')
const valid = require('../functions/valid')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the current music'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId

    if(player.player.state.status === 'idle') return interaction.reply('**There is no song currently playing**')
    
    if(me === user && valid(interaction)) {
      player.player.stop()
      return interaction.reply('**Stopped** :stop_button:')
    }else{
      return interaction.reply('You are not in the same channel as the bot!')
    }
	}
};