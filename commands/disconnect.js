const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

const player = require('./play')
const valid = require('../functions/valid')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Disconnects the bot'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId

		if(valid(interaction) && me === user){
      player.player.stop()
      let connection = getVoiceConnection(interaction.guild.id)
      connection.destroy()
      connection = undefined
      delete(connection)
      interaction.reply('**Left the voice channel :no_entry_sign: **')
    }else{
      interaction.reply('**You are not in the same channel as the bot!**')
    }
	}
};