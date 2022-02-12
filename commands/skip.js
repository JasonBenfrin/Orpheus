const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require('../functions/valid.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('2skip')
		.setDescription('Skips the current song from the queue.'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId
    const player = interaction.client.playerManager.get(interaction.guildId)

    if(!valid(interaction)) return

    if(!player) return interaction.reply('**There is no song currently playing**')
    
    if(me === user) {
      player.stop()
      return interaction.reply('**Skipped** :track_next:')
    }else{
      return interaction.reply('You are not in the same channel as the bot!')
    }
	}
};