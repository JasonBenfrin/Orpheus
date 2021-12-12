const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

const valid = require('../functions/valid')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Disconnects the bot'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId
    const player = interaction.client.playerManager.get(interaction.guildId)

    if(!valid(interaction)) return

		if(me === user){
      player.stop()
      let connection = getVoiceConnection(interaction.guild.id)
      connection.destroy()
      connection = undefined
      delete(connection)
      return interaction.reply('**Left the voice channel :no_entry_sign: **')
    }else{
      return interaction.reply('**You are not in the same channel as the bot!**')
    }
	}
};