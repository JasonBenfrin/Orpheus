const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require('../functions/valid.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('2unshuffle')
		.setDescription('Retrieves the Queue before being shuffled.'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId;

    if(!valid(interaction)) return
    if(me != user) return interaction.reply('**You are not in the same channel as me!**')

    const client = interaction.client;

    if(!client.queueManager.get(interaction.guildId)) return interaction.reply('**There is no Queue currently playing.**')

    if(!client.beforeShuffle.get(interaction.guildId)) return interaction.reply('**The playlist wasn\'t shuffled before.**')

    const beforeShuffled = [];
    const queue = client.beforeShuffle.get(interaction.guildId)
    queue.forEach(song => {
      beforeShuffled.push(song)
    })
    client.queueManager.set(interaction.guildId, beforeShuffled)

		return interaction.reply("**Playlist has been unshuffled. :arrow_right:**");
	}
};