const { SlashCommandBuilder } = require('@discordjs/builders');
const { valid } = require("../functions/valid.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('2disconnect')
		.setDescription('Disconnects the bot from the channel.'),
	async execute(interaction) {
    const me = interaction.guild.me.voice.channelId;
    const user = interaction.member.voice.channelId;

    if(!valid(interaction)) return
    if(me != user) return interaction.reply('**You are not in the same channel as me!**')

    let player = interaction.client.playerManager.get(interaction.guildId)
		if(player) player.stop()
    let connection = interaction.client.connectionManager.get(interaction.guildId)
		if(connection) connection.destroy()
    connection = undefined
    delete(connection)
    interaction.client.connectionManager.delete(interaction.guildId)
    interaction.client.playlistManager.delete(interaction.guildId)
    interaction.client.playerManager.delete(interaction.guildId)
    interaction.client.beforeShuffle.delete(interaction.guildId)
    interaction.client.queueManager.delete(interaction.guildId)
    interaction.client.loopOption.set(interaction.guildId, 'off')
    return interaction.reply('**Left the voice channel :no_entry_sign: **')
	}
};