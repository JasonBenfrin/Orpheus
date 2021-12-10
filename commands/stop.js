const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerIdleState } =require('@discordjs/voice')
const player = require('./play')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the current music'),
	async execute(interaction) {
		const channel = interaction.member.voice.channel;
    const me = interaction.guild.me.voice.channelId
    const user = interaction.member.voice.channelId

    if(!channel) return interaction.reply('Please join a voice channel!');

    if(!me) return interaction.reply('**I\'m not in a voice channel!**')

    // console.log(player.player.state.status)

    if(player.player.state.status === 'idle') return interaction.reply('**There is no song currently playing**')
    
    if(me === user) {
      player.player.stop()
      return interaction.reply('**Stopped** :stop_button:')
    }else{
      return interaction.reply('You are not in the same channel as the bot!')
    }
	}
};