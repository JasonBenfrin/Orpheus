const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require('../functions/valid')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('2stop')
		.setDescription('Stops the song and deletes the Queue'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId
    const player = interaction.client.playerManager.get(interaction.guildId)

    if(!valid(interaction)) return

    if(!player) return interaction.reply('**There is no song currently playing**')
    
    if(me === user) {
      interaction.client.connectionManager.delete(interaction.guildId)
      interaction.client.playerManager.delete(interaction.guildId)
      interaction.client.playlistManager.delete(interaction.guildId)
      interaction.client.queueManager.delete(interaction.guildId)
      interaction.client.beforeShuffle.delete(interaction.guildId)
      interaction.client.loopOption.set(interaction.guildId, 'off')
      player.stop()
      return interaction.reply('**Stopped** :stop_button:')
    }else{
      return interaction.reply('You are not in the same channel as the bot!')
    }
	}
};