const { SlashCommandBuilder } = require('@discordjs/builders');
const valid = require('../functions/valid')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the current music'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId
    const player = interaction.client.playerManager.get(interaction.guildId)

    if(!valid(interaction)) return

    if(player.state.status === 'idle') return interaction.reply('**There is no song currently playing**')
    
    if(me === user) {
      player.stop()
      return interaction.reply('**Stopped** :stop_button:')
    }else{
      return interaction.reply('You are not in the same channel as the bot!')
    }
	}
};